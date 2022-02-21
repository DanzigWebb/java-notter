import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, NotFound } from './template';
import { LoginPage } from './routing/pages';
import { LoginGuard } from './routing/guards/LoginGuard';
import { AuthProvider } from './services/auth/authContext';
import { AuthGuard } from './routing/guards/AuthGuard';
import { DashboardPage } from './routing/pages/dashboard/DashboardPage';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>

            <AuthProvider>
                <Routes>
                    <Route path="/" element={<App/>}>
                        <Route index element={<Home/>}/>
                        <Route path="/login" element={<LoginGuard><LoginPage/></LoginGuard>}/>

                        <Route path="/dashboard" element={<AuthGuard><DashboardPage/></AuthGuard>}/>

                        <Route path="*" element={<NotFound/>}/>
                    </Route>
                </Routes>
            </AuthProvider>

        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
