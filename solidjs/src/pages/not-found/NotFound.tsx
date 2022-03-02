import { Component } from 'solid-js';
import { Page } from '@root/src/pages/Page';
import { useApp } from '@root/src/providers/AppProvider';
import { Link } from 'solid-app-router';

export const NotFound: Component = () => {
    const app = useApp();

    return (
        <Page full>
            <div class="hero h-full bg-base-200">
                <div class="text-center hero-content">
                    <div class="max-w-md">
                        <h1 class="text-5xl font-bold">Hello there</h1>
                        <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>

                        <Link href={app.auth() ? '/' : '/login'}>
                            <button class="btn btn-primary">
                                {app.auth()
                                    ? 'Get started'
                                    : 'Login'
                                }
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </Page>
    );
};