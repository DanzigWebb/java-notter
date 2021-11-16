import { TagDto } from './tag.model';

export interface NoteDto {
  id: number;
  groupId: number;
  title: string;
  description?: string;

  checked: boolean;

  createdAt: string;
  updatedAt: string;

  tags: TagDto[];
}

export interface NoteCreateDto {
  groupId?: number;
  title: string;
  description?: string;
}
