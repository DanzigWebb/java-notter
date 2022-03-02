import { Component, createSignal, onCleanup, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import usePopper from '@root/src/lib/popper/usePopper';
import { Placement } from '@popperjs/core';

type Props = {
    message: string;
    placement?: Placement;
}

/**
 * Tooltip - компонент обертка для создания подсказок
 *
 * @example
 * <Tooltip
 *    message="Tooltip Message"
 *    placement="right"
 * >
 *    <button class="btn btn-primary">
 *        Tooltip
 *    </button>
 * </Tooltip>
 */
export const Tooltip: Component<Props> = (props) => {

    const [show, setShow] = createSignal(false);
    const [triggerRef, setTriggerRef] = createSignal<HTMLElement>();
    const [popperRef, setPopperRef] = createSignal<HTMLElement>();

    const instance = usePopper(triggerRef, popperRef, {
        placement: props.placement || 'top',
        modifiers: [{
            name: 'offset',
            options: {
                offset: [0, 10],
            },
        }]
    });

    onCleanup(() => {
        instance()?.destroy();
    });

    return (
        <>
            <span
                class="inline-block"
                ref={setTriggerRef}
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
            >
                {props.children}
            </span>

            <Show when={show()}>
                <Portal>
                    <span
                        class="rounded shadow bg-base-200 p-2"
                        ref={setPopperRef}
                    >
                        {props.message}
                    </span>
                </Portal>
            </Show>
        </>
    );
};