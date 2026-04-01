import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

export interface AIAnalysis {
  summary: string;
  type: 'task' | 'event' | 'knowledge';
  priority: 'low' | 'medium' | 'high';
  complexity: number;
  suggestedAction?: string;
}

const getAIInstance = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Vui lòng cấu hình GEMINI_API_KEY trong cài đặt.");
  }
  return new GoogleGenAI({ apiKey });
};

export const geminiFlash = "gemini-3-flash-preview";

export const analyzeContent = async (content: string, retryCount = 0): Promise<AIAnalysis> => {
  const ai = getAIInstance();
  const MAX_RETRIES = 2;

  try {
    const response = await ai.models.generateContent({
      model: geminiFlash,
      contents: `Analyze the following content and provide a summary, classification (task, event, or knowledge), priority (low, medium, or high), and complexity score (1-5). 
      IMPORTANT: Provide the summary and any suggested action in Vietnamese.
      Return the result in JSON format.
      
      Content: "${content}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "A concise summary of the content in Vietnamese." },
            type: { type: Type.STRING, enum: ["task", "event", "knowledge"], description: "The type of content." },
            priority: { type: Type.STRING, enum: ["low", "medium", "high"], description: "The priority level." },
            complexity: { type: Type.INTEGER, description: "Complexity score from 1 to 5." },
            suggestedAction: { type: Type.STRING, description: "A proactive suggestion for the user in Vietnamese." }
          },
          required: ["summary", "type", "priority", "complexity"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("AI không trả về kết quả.");
    return JSON.parse(text) as AIAnalysis;
  } catch (error: any) {
    console.error("Gemini Analysis Error:", error);
    
    // Handle 503 Overloaded error with retry
    if (error.message?.includes("503") || error.message?.includes("high demand")) {
      if (retryCount < MAX_RETRIES) {
        const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff: 1s, 2s
        await new Promise(resolve => setTimeout(resolve, delay));
        return analyzeContent(content, retryCount + 1);
      }
      throw new Error("Hệ thống AI hiện đang quá tải. Vui lòng thử lại sau 1-2 phút.");
    }

    throw new Error(error.message || "Không thể phân tích nội dung bằng AI.");
  }
};

export const getProactiveSuggestions = async (entries: any[]): Promise<string[]> => {
  if (entries.length === 0) return [];
  
  try {
    const ai = getAIInstance();
    const context = entries.map(e => `- [${e.type}] ${e.summary} (Priority: ${e.priority})`).join('\n');
    
    const response = await ai.models.generateContent({
      model: geminiFlash,
      contents: `Based on the following user entries, provide 3 proactive suggestions or nudges to help them stay productive.
      IMPORTANT: Provide the suggestions in Vietnamese.
      
      Entries:
      ${context}
      
      Return the result as a JSON array of strings.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Suggestions Error:", error);
    return [];
  }
};
