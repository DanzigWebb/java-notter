import type { Component } from 'solid-js';
import { Header } from '@root/src/views/header/Header';
import { Sidebar } from '@root/src/views/sidebar/Sidebar';
import { JSX } from 'solid-js';
import { Routes } from 'solid-app-router';
import { useApp } from '@root/src/providers/AppProvider';

const Routers: Component = () => {
    return (
        <Routes>

        </Routes>
    );
};

const styles: JSX.CSSProperties = {
    'height': '100vh',
    'display': 'grid',
    'grid-template-rows': 'auto 1fr'
};

const App: Component = () => {
    const appContext = useApp();

    return (
        <main class="main" style={styles}>
            <Header/>
            <Sidebar show={appContext.showDrawer()}>
                <Routers/>
            </Sidebar>
        </main>
    );
};

export default App;
