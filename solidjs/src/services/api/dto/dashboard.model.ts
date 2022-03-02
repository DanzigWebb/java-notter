import { GroupDto } from './group.model';


export interface DashboardDto {
  id: number;
  name: string;
  description?: string;

  createdAt: string;
  updatedAt: string;

  groups: GroupDto[];
}

export interface DashboardCreateDto {
  name: string;
  description?: string;
}
