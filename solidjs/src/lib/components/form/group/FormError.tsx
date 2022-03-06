import { Component, Show } from 'solid-js';

type Props = {
    show: boolean;
}

export const FormError: Component<Props> = (props) => {
    return (
        <Show when={props.show}>
            <i class="text-sm text-error absolute -bottom-5 left-0">{props.children}</i>
        </Show>
    );
};