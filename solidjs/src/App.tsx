import type { Component } from 'solid-js';
import { Header } from '@root/src/views/header/Header';
import { JSX } from 'solid-js';
import { Route, Routes } from 'solid-app-router';
import { Home, LoginPage, NotFound } from '@root/src/pages';


const Routers: Component = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<LoginPage/>}/>
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

    return (
        <main class="main" style={styles}>
            <Header/>

            <section>
                <Routers/>
            </section>
        </main>
    );
};

export default App;
