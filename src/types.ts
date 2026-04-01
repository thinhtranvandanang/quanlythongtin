export type Priority = 'low' | 'medium' | 'high';
export type EntryType = 'task' | 'event' | 'knowledge';
export type Status = 'pending' | 'done';

export interface Entry {
  id: string;
  user_id: string;
  content: string;
  summary: string;
  type: EntryType;
  priority: Priority;
  complexity: number;
  status: Status;
  created_at: string;
  next_reminder?: string;
}
