// frontend/src/types/index.ts

// --- Frontend-safe enum ---
export enum FolderColor {
  BLUE = 'BLUE',
  GREEN = 'GREEN',
  ORANGE = 'ORANGE',
  PURPLE = 'PURPLE',
  RED = 'RED',
  YELLOW = 'YELLOW',
}

// --- Data Models ---
export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  plan: 'FREE' | 'PRO' | 'BUSINESS';
}

export interface Folder {
  id: string;
  name: string;
  color: FolderColor;
  userId: string;
  createdAt: string;
  updatedAt: string;
  _count?: { links: number };
}

export interface Link {
  id: string;
  originalUrl: string;
  shortCode: string;
  title: string | null;
  description: string | null;
  favicon: string | null;
  clicks: number;
  isActive: boolean;
  expiresAt: string | null;
  userId: string;
  folderId: string | null;
  createdAt: string;
  updatedAt: string;
}

// --- API Payloads ---
export interface CreateLinkData {
  originalUrl: string;
  customCode?: string;
  folderId?: string;
  expiresAt?: Date;
  password?: string;
}
export type UpdateLinkData = Partial<CreateLinkData>;

export interface CreateFolderData {
  name: string;
  color: FolderColor;
}
export type UpdateFolderData = Partial<CreateFolderData>;
  