import { LegalProfessional, ChatSession } from '../types';

export const initDB = async (): Promise<boolean> => {
  return true;
};

export const addProfessionals = async (data: LegalProfessional[], type: 'lawyer' | 'notary'): Promise<void> => {
  const response = await fetch('/api/db/professionals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data, type }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to add professionals');
  }
};

export const getAllProfessionals = async (type?: 'lawyer' | 'notary'): Promise<LegalProfessional[]> => {
  const url = type ? `/api/db/professionals?type=${type}` : '/api/db/professionals';
  const response = await fetch(url);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch professionals');
  }
  return response.json();
};

export const clearAllProfessionals = async (type?: 'lawyer' | 'notary'): Promise<void> => {
  const url = type ? `/api/db/professionals?type=${type}` : '/api/db/professionals';
  const response = await fetch(url, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to clear professionals');
  }
};

// Legacy names for compatibility if needed, but we'll update the components
export const addLawyers = (lawyers: LegalProfessional[]) => addProfessionals(lawyers, 'lawyer');
export const getAllLawyers = () => getAllProfessionals('lawyer');
export const clearAllLawyers = () => clearAllProfessionals('lawyer');

// --- CHAT SESSIONS ---
export const saveChatSession = async (chat: ChatSession): Promise<void> => {
  const response = await fetch('/api/db/chats', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(chat),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to save chat session');
  }
};

export const getAllChatSessions = async (): Promise<ChatSession[]> => {
  const response = await fetch('/api/db/chats');
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch chat sessions');
  }
  return response.json();
};

export const deleteChatSession = async (id: string): Promise<void> => {
  const response = await fetch(`/api/db/chats?id=${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete chat session');
  }
};

// --- CHECKPOINTS ---
import { Checkpoint } from '../types';

export const saveCheckpoint = async (ckpt: Checkpoint): Promise<void> => {
  const response = await fetch('/api/db/checkpoints', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ckpt),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to save checkpoint');
  }
};

export const getAllCheckpoints = async (): Promise<Checkpoint[]> => {
  const response = await fetch('/api/db/checkpoints');
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch checkpoints');
  }
  return response.json();
};

export const deleteCheckpoint = async (id: string): Promise<void> => {
  const response = await fetch(`/api/db/checkpoints?id=${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete checkpoint');
  }
};
