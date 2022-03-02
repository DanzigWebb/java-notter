import { Component } from 'solid-js';

export const MenuOption: Component = (props) => {
    return (
        <li><a>{props.children}</a></li>
    )
}