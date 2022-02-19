import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { MenuContext } from './MenuContext';


interface MenuItemProps<T = any> {
    children: ReactNode;
    onClick?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => any;
    closeOnClick?: boolean;
    value?: T;
}

export const MenuItem = (props: MenuItemProps) => {

    const {
        children = '',
        onClick = () => {},
        closeOnClick = true,
        value,
    } = props;

    const [state, setState] = useState({
        isShow: true
    });

    const context = useContext(MenuContext);

    context.emitter?.subscribe('onFilterChange', onFilterChange);

    useEffect(() => {
        return () => {
            context.emitter?.unsubscribe('onFilterChange', onFilterChange);
        };
    });

    function onFilterChange(v: string) {
        const isShow = value.includes(v);
        setState({...state, isShow});
    }

    function close(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
        onClick(e);

        if (closeOnClick) {
            context.onSelectItem(value);
        }
    }

    if (state.isShow) {
        return (
            <li onClick={close}>
                <a>{children}</a>
            </li>
        );
    } else {
        return <></>;
    }
};