import { Component } from 'solid-js';
import { useApp } from '@root/src/shared/providers/AppProvider';
import { useNavigate } from 'solid-app-router';
import { PagesPathEnum } from '@root/src/pages/pages.type';

export const PrivateGuard: Component = (props) => {
    const app = useApp();
    const navigate = useNavigate();

    if (!app.auth()) {
        navigate(`/${PagesPathEnum.SIGNIN}`, {replace: true});
    } else {
        return props.children;
    }
}