import { Component } from 'solid-js';
import { Swap } from '@components/swap/Swap';
import { useApp } from '@root/src/providers/AppProvider';

const DrawerBtn: Component<{ icon: string, onClick: () => void }> = (props) => {
    return (
        <button className="btn btn-ghost btn-circle" onClick={() => props.onClick()}>
            <i class={`fa-solid ${props.icon}`}/>
        </button>
    );
};

export const SidebarToggle: Component = () => {

    const app = useApp();

    return (
        <Swap
            state={app.showDrawer()
                ? 'off'
                : 'on'
            }
            on={<DrawerBtn
                icon="fa-bars"
                onClick={() => app.toggleDrawer()}
            />}
            off={<DrawerBtn
                icon="fa-xmark"
                onClick={() => app.toggleDrawer()}
            />}
        />
    );
};