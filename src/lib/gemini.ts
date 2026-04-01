import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not configured. Please add it to your environment variables.");
}

export const ai = new GoogleGenAI({ apiKey });

export const geminiFlash = "gemini-3-flash-preview";
export const geminiPro = "gemini-3.1-pro-preview";

export interface AIAnalysis {
  summary: string;
  type: 'task' | 'event' | 'knowledge';
  priority: 'low' | 'medium' | 'high';
  complexity: number;
  suggestedAction?: string;
}

export const analyzeContent = async (content: string): Promise<AIAnalysis> => {
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
  if (!text) throw new Error("AI failed to generate a response.");
  return JSON.parse(text) as AIAnalysis;
};

export const getProactiveSuggestions = async (entries: any[]): Promise<string[]> => {
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
};
