export interface TagCreateDto {
  name: string;
  color?: number;
}

export interface TagDto {
  id: number;
  name: string;
  color?: TagColorDto;
}

export interface TagColorDto {
  id: number;
  type: string;
}
