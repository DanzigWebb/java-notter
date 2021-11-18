export interface TagCreateDto {
  name: string;
}

export interface TagDto {
  id: number;
  name: string;
  color?: string;
}

export interface TagColorDto {
  id: number;
  type: string;
}
