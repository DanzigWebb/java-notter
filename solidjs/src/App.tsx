import type { Component } from 'solid-js';
import { Header } from '@root/src/shared/views/header/Header';
import { JSX } from 'solid-js';
import { Route, Routes } from 'solid-app-router';
import { Home, SigninPage, NotFound, SignupPage } from '@root/src/pages';
import { PagesPathEnum } from '@root/src/pages/pages.type';
import { PrivateGuard, PublicGuard } from '@root/src/shared/guards';
import { appStorage, userStorage } from '@root/src/services/storage';
import { useApp } from '@root/src/shared/providers/AppProvider';


const Routers: Component = () => {
    return (
        <Routes>
            <Route
                path={`/${PagesPathEnum.HOME}`}
                element={<PrivateGuard children={<Home/>}/>}
            />
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
    'height': '100vh',
    'display': 'grid',
    'grid-template-rows': 'auto 1fr'
};

const App: Component = () => {

    initApp();

    return (
        <main class="main" style={styles}>
            <Header/>

            <section>
                <Routers/>
            </section>
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
