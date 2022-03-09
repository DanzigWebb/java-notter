import type { Component } from 'solid-js';
import { Header } from '@root/src/shared/views/header/Header';
import { JSX } from 'solid-js';
import { Route, Routes } from 'solid-app-router';
import { Home, SigninPage, NotFound, SignupPage } from '@root/src/pages';
import { PagesPathEnum } from '@root/src/pages/pages.type';
import { PrivateGuard, PublicGuard } from '@root/src/shared/guards';
import { appStorage, userStorage } from '@root/src/services/storage';
import { useApp } from '@root/src/shared/providers/AppProvider';
import { Alerts } from '@root/src/shared/views/alerts/Alerts';
import { DashboardPage } from '@root/src/pages/dashboard/DashboardPage';


const Routers: Component = () => {
    return (
        <Routes>
            <Route
                path={`/`}
                element={<PrivateGuard children={<Home/>}/>}
            />
            <Route path={`/${PagesPathEnum.DASHBOARD}/:id`}>
                <Route path="/" element={<DashboardPage/>}/>
            </Route>
            <Route
                path={`/${PagesPathEnum.SIGNIN}`}
                element={<PublicGuard children={<SigninPage/>}/>}
            />
            <Route
                path={`/${PagesPathEnum.SIGNUP}`}
                element={<PublicGuard children={<SignupPage/>}/>}
            />
            <Route path="/*all" element={<NotFound/>}/>
        </Routes>
    );
};

const styles: JSX.CSSProperties = {
    'min-height': '100vh',
    'display': 'grid',
    'grid-template-rows': 'auto 1fr'
};

const App: Component = () => {

    const app = useApp();

    initApp();

    return (
        <main class="main" style={styles}>
            <Header/>

            <section class="overflow-hidden">
                <Routers/>
            </section>

            <Alerts alerts={app.alerts()}/>
        </main>
    );
};

const initApp = () => {
    const app = useApp();
    const user = userStorage.get('user');

    if (user) {
        app.setAuth(true);
        app.setUser(user);
    }

    const theme = appStorage.get('theme');

    if (theme) {
        app.setTheme(theme);
    }
};

export default App;
