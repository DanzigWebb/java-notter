import { Component, createEffect, createSignal, Show } from 'solid-js';
import { Page } from '@root/src/pages';
import { useParams } from 'solid-app-router';
import { dashboardService } from '@root/src/services/api/dashboard.service';
import { useApp } from '@root/src/shared/providers/AppProvider';
import { DashboardDto } from '@root/src/services/api/dto';

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
                    <h2 class="text-xl p-4">{dashboard()?.name}</h2>

                    <div className="flex bg-base-200 h-full p-4">
                        <button class="btn btn-outline btn-sm gap-2">
                            <i class="fa-solid fa-plus"/>
                            <span>Добавить список</span>
                        </button>
                    </div>
                </div>
            </Show>
        </Page>
    );
};


function getDashboard(id: number) {
    return dashboardService.getById(id);
}