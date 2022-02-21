import { dashboardService } from '../../../services/api/dashboard.service';
import { useEffect, useState } from 'react';
import { DashboardCreateDto, DashboardDto } from '../../../services/api/dto';
import { DashboardNav } from './DashboardNav';
import { Modal } from '../../../lib/components/modal';
import { DashboardCreateModal } from './modals/DashboardCreateModal';
import { DashboardFilerInputs } from './models/dashboard.models';
import { useSearchParams } from 'react-router-dom';

export const DashboardPage = () => {

    const [params, setParams] = useSearchParams();
    const [dashboards, setDashboards] = useState<DashboardDto[]>([]);
    const [filters, setFilters] = useState<Partial<DashboardFilerInputs>>({
        name: '',
        description: '',
    });

    useEffect(() => {
        dashboardService.getAll().then((res) => setDashboards(res.data));
    }, []);

    useEffect(() => {
        const filters: Partial<DashboardFilerInputs> = {};
        (Array.from(params.keys()) as (keyof DashboardFilerInputs)[]).forEach((key) => {
            filters[key] = params.get(key) || '';
        });
        setFilters(filters);
    }, [params]);

    function showCreateModal() {
        new Modal(<DashboardCreateModal
            onSubmit={name => create({name})}
        />).show();
    }

    async function create(dto: DashboardCreateDto) {
        const res = await dashboardService.create(dto);
        const dashboard = res.data;
        setDashboards(state => [...state, dashboard]);
    }

    function onFilterChange(filters: DashboardFilerInputs) {
        const params: Partial<DashboardFilerInputs> = {};
        (Object.keys(filters) as (keyof DashboardFilerInputs)[]).forEach((key) => {
            if (filters[key]) {
                params[key] = filters[key].toLowerCase();
            }
        });

        setParams(params);
    }

    return (
        <div className="page">
            <div className="container">
                <DashboardNav defaultFilters={filters} onFilterChange={onFilterChange}/>

                <div className="flex gap-3">
                    {filterDashboards(dashboards, filters).map(ds =>
                        <div className="card w-96 shadow-md" key={ds.id}>
                            <div className="card-body">
                                <h2 className="card-title">{ds.name}</h2>
                                <p>{ds.description}</p>
                            </div>
                        </div>
                    )}

                    <div className="card shadow-md">
                        <div className="card-body">
                            <div className="justify-center card-actions">
                                <button className="btn btn-lg btn-ghost" onClick={showCreateModal}>
                                    <i className="fa-solid fa-plus"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function filterDashboards(dashboards: DashboardDto[], filters: Partial<DashboardFilerInputs>) {
    const {name = '', description = ''} = filters;

    return dashboards.filter(dashboard => (
        dashboard.name.toLowerCase().includes(name)
        && (dashboard.description || '').toLowerCase().includes(description)
    ));
}