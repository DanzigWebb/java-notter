import React from 'react';
import { Header } from './template';
import { Outlet } from 'react-router-dom';


function App() {
    return (
        <main className="main min-h-screen grid">
            <Header/>
            <div>
                <Outlet/>
            </div>
        </main>
    );
}

export default App;
