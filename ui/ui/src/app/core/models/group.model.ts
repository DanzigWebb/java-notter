export interface GroupCreateDto {
  title: string;
  description?: string;
}

export interface GroupDto {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
  noteCount?: number;
}
