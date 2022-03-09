import { Component, Show, createSignal, createEffect } from 'solid-js';
import { Portal } from 'solid-js/web';
import usePopper from '@root/src/lib/popper/usePopper';
import { Overlay } from '@components/utils/overlay/Overlay';
import { ScaleTransition } from '@components/utils/transitions';

type Props = {
    onSubmit?: (name: string) => void;
}

export const DashboardCreateBtn: Component<Props> = (props) => {

    const [state, setState] = createSignal(false);
    const [showForm, setShowForm] = createSignal(false);
    const [reference, setReference] = createSignal<HTMLElement>();
    const [popper, setPopper] = createSignal<HTMLElement>();

    const [input, setInput] = createSignal<HTMLInputElement>();

    createEffect(() => {
        const offset = -(reference()?.offsetHeight || 0);

        usePopper(reference, popper, {
            placement: 'bottom-start',
            modifiers: [{
                name: 'offset',
                options: {
                    offset: [0, offset],
                },
            }]
        });
    });

    function showState() {
        setState(true);
        setShowForm(true);
        input()?.focus();
    }

    function onSubmit() {
        const value = input()?.value;
        if (value) {
            props.onSubmit && props.onSubmit(value);
        }
    }

    return (
        <div class="relative">
            <div ref={setReference}>
                <button class="btn btn-outline gap-2 no-animation" onClick={showState}>
                    <i class="fa-solid fa-plus"/>
                    <span>Добавить список</span>
                </button>
            </div>

            <Show when={state()}>
                <Portal>
                    <Overlay onClick={() => setShowForm(false)}>
                        <div onClick={e => e.stopPropagation()} ref={setPopper}>
                            <ScaleTransition appear={true} onExit={() => setState(false)}>
                                {showForm() && (
                                    <div class="p-4 pb-2 rounded-md shadow bg-base-100">
                                        <div className="input-group">
                                            <input
                                                ref={setInput}
                                                type="text"
                                                placeholder="Имя…"
                                                class="input input-bordered"
                                            />
                                            <button class="btn btn-square" onSubmit={onSubmit}>
                                                <i class="fa-solid fa-plus"/>
                                            </button>
                                        </div>
                                        <p class="pt-2 opacity-80 text-sm">Создать новую карточку</p>
                                    </div>
                                )}
                            </ScaleTransition>
                        </div>
                    </Overlay>
                </Portal>
            </Show>
        </div>
    );
};