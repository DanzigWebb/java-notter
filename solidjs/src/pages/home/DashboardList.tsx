import { Component, For } from 'solid-js';
import { DashboardDto } from '@root/src/services/api/dto';

type MenuItemProps = {
    dashboard: DashboardDto;
}

const DashboardMenuItem: Component<MenuItemProps> = (props) => {

    const Icon = () => {
        const word = props.dashboard.name[0];
        return (
            <span
                class="flex items-center justify-center w-10 h-10 bg-primary text-primary-content rounded"
            >
                {word}
            </span>
        );
    };

    return (
        <div class="flex items-center w-full">
            <Icon/>
            <div class="pl-2 flex flex-col leading-4	">
                <span>{props.dashboard.name}</span>
                <span class="text-sm opacity-80">{props.dashboard.description || 'Нет описания...'}</span>
            </div>
        </div>
    );
};

type Props = {
    dashboards: DashboardDto[];
}

export const DashboardList: Component<Props> = (props) => {

    return (
        <ul className="menu">
            <For each={props.dashboards || []}>
                {item => <li><a><DashboardMenuItem dashboard={item}/></a></li>}
            </For>
        </ul>
    )
}