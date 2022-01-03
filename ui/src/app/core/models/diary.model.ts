export interface DiaryDto {
  id: number;
  day: string;
  situation: string;
  think: string;
  emotions: string;
  reaction: string;
  bodySensation: string;
}

export interface DiaryCreateDto {
  day: string | number;
  situation: string;
  think: string;
  emotions: string;
  reaction: string;
  bodySensation: string;
}
