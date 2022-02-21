import { dashboardService } from '../../../services/api/dashboard.service';
import { useEffect, useState } from 'react';
import { DashboardCreateDto, DashboardDto } from '../../../services/api/dto';
import { DashboardNav } from './DashboardNav';
import { Modal } from '../../../lib/components/modal';
import { DashboardCreateModal } from './modals/DashboardCreateModal';
import { UnpackNestedValue } from 'react-hook-form';
import { DashboardFilerInputs } from './models/dashboard.models';

export const DashboardPage = () => {

    const [dashboards, setDashboards] = useState<DashboardDto[]>([]);

    useEffect(() => {
        dashboardService.getAll().then((res) => setDashboards(res.data));
    }, []);

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

    function onFilterChange(data: UnpackNestedValue<DashboardFilerInputs>) {
        console.log(data);
    }

    return (
        <div className="page">
            <div className="container">
                <DashboardNav onFilterChange={onFilterChange}/>

                <div className="flex gap-3">
                    {dashboards.map(ds =>
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