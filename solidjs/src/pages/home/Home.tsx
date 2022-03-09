import { Component, createSignal, onMount } from 'solid-js';
import { Page } from '@root/src/pages/Page';
import { FormField } from '@components/form/group/FormField';
import { dashboardService } from '@root/src/services/api/dashboard.service';
import { DashboardCreateDto, DashboardDto } from '@root/src/services/api/dto';
import { DashboardList } from '@root/src/pages/home/DashboardList';

export const Home: Component = () => {

    const [name, setName] = createSignal('');
    const [dashboards, setDashboards] = createSignal<DashboardDto[]>([]);

    onMount(async () => {
        await getDashboards();
    });

    async function getDashboards() {
        const response = await dashboardService.getAll();
        setDashboards(response.data);
    }

    async function onSubmit() {
        if (name().length) {
            try {
                const dto: DashboardCreateDto = {name: name()};
                await dashboardService.create(dto);
                await getDashboards();
                setName('');
            } catch (e) {
                console.error('Ошибка создания доски', e);
            }
        }
    }

    return (
        <Page>
            <div className="container py-6 m-4">
                <div class="grid gap-4 p-3 sm:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_2fr_1fr]">

                    <div class="max-w-sm w-full mx-auto">
                        <DashboardList
                            dashboards={dashboards()}>
                        </DashboardList>
                    </div>

                    <div class="card grow shadow-xl bg-base-200 text-center max-w-sm mx-auto">
                        <figure>
                            <img
                                class="w-full"
                                src="https://a.trellocdn.com/prgb/dist/images/home/orientation/new-user.e8544e0e1b2824e4ac46.svg"
                                alt=""
                            />
                        </figure>

                        <div className="card-body">
                            <div class="opacity-90 mb-4">
                                <h3 class="text-xl font-semibold pb-2">Организуйте что угодно</h3>
                                <p class="text-sm opacity-80">Соберите все в одном месте и начни перемещать элементы на
                                    вашей первой доске!</p>
                            </div>

                            <FormField>
                                <input
                                    type="text"
                                    class="input mb-2"
                                    placeholder="Над чем вы работаете?"
                                    value={name()}
                                    onInput={e => setName((e.target as HTMLInputElement).value)}
                                />
                            </FormField>

                            <button
                                className="btn btn-primary text-xs"
                                disabled={name().length === 0}
                                onClick={onSubmit}
                            >
                                Создайте свою доску
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </Page>
    );
};