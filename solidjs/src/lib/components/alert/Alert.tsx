import { Component, Show } from 'solid-js';
import { Portal } from 'solid-js/web';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

type Props = {
    show: boolean;
    type?: AlertType,
    onClose?: () => void;
}

/**
 * Alert - компонент, для отображение уведомлений
 *
 * @example
 * <Alert
 *     show={alertShow()}
 *     type={alertType()}
 * >
 *     <div>We use cookies for no reason!</div>
 *     <div class="flex-none">
 *         <button class="btn btn-sm btn-ghost" onClick={toggleAlert}>Ok</button>
 *     </div>
 * </Alert>
 */
export const Alert: Component<Props> = (props) => {

    return (
        <Show when={props.show}>
            <Portal>
                <div className="container fixed bottom-2 left-0 right-0">
                    <div
                        class="alert shadow-lg"
                        classList={{
                            'alert-info': props.type === 'info',
                            'alert-success': props.type === 'success',
                            'alert-warning': props.type === 'warning',
                            'alert-error': props.type === 'error',
                        }}
                    >
                        {props.children}
                    </div>
                </div>
            </Portal>
        </Show>
    );
};