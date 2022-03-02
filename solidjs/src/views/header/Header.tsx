import { Link } from 'solid-app-router';
import { Component, Show } from 'solid-js';
import { Tooltip } from '@components/tooltip/Tooltip';
import { useApp } from '@root/src/providers/AppProvider';

export const Header: Component = () => {
    const app = useApp();

    return (
        <header>
            <nav class="navbar bg-base-200">
                <div class="flex-1">
                    <Link href="/" class="btn btn-ghost normal-case text-xl">Notter</Link>
                </div>

                <div class="flex-none">
                    <Show when={!app.auth()}>
                        <Tooltip message="Авторизация">
                            <Link href="/login" class="btn btn-sm btn-circle btn-ghost">
                                <i class="fa-solid fa-right-to-bracket"/>
                            </Link>
                        </Tooltip>
                    </Show>

                </div>
            </nav>
        </header>
    );
};
