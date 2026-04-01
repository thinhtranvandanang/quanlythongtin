export type Priority = 'low' | 'medium' | 'high';
export type EntryType = 'task' | 'event' | 'knowledge';
export type Status = 'pending' | 'done';

export interface Entry {
  id: string;
  userId: string;
  content: string;
  summary: string;
  type: EntryType;
  priority: Priority;
  complexity: number;
  status: Status;
  createdAt: any; // Firestore Timestamp
  nextReminder?: any; // Firestore Timestamp
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  lastActive?: any; // Firestore Timestamp
}
