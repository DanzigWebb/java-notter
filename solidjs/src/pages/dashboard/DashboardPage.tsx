import { Component, createEffect, createSignal, Show } from 'solid-js';
import { Page } from '@root/src/pages';
import { useParams } from 'solid-app-router';
import { dashboardService } from '@root/src/services/api/dashboard.service';
import { useApp } from '@root/src/shared/providers/AppProvider';
import { DashboardDto } from '@root/src/services/api/dto';
import { DashboardCreateBtn } from '@root/src/pages/dashboard/DashboardCreateBtn';

export const DashboardPage: Component = () => {
    const app = useApp();
    const params = useParams();

    const [dashboard, setDashboard] = createSignal<DashboardDto>();

    createEffect(async () => {
        const dashboardId = parseInt(params.id);
        if (dashboardId >= 0) {
            const response = await getDashboard(dashboardId);
            setDashboard(response.data);
        } else {
            app.setAlert({
                type: 'error',
                message: 'Не удалось получить доску'
            });
        }
    });


    return (
        <Page full>
            <Show when={dashboard()}>
                <div className="py-4 flex-1">
                    <h2 class="text-xl pb-4 pl-4">{dashboard()?.name}</h2>

                    <div className="flex bg-base-200 h-full p-4">
                        <DashboardCreateBtn/>
                    </div>
                </div>
            </Show>
        </Page>
    );
};


function getDashboard(id: number) {
    return dashboardService.getById(id);
}