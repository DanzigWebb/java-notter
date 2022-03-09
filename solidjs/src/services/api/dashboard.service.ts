import { DashboardCreateDto, DashboardDto } from './dto';
import httpClient from '../http/httpClient';

class DashboardService {

    getAll() {
        return httpClient.get<DashboardDto[]>('api/v1/dashboard');
    }

    create(dto: DashboardCreateDto) {
        return httpClient.post<DashboardDto>('api/v1/dashboard', dto)
    }
}

export const dashboardService = new DashboardService();