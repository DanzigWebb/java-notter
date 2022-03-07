import { Component, createSignal } from 'solid-js';
import { Page } from '@root/src/pages/Page';
import { FormField } from '@components/form/group/FormField';

export const Home: Component = (props) => {

    const [name, setName] = createSignal('');

    function onSubmit() {

    }

    return (
        <Page>
            <div className="container py-6 m-4">
                <div class="card shadow-xl bg-base-200 text-center max-w-sm mx-auto">
                    <figure>
                        <img class="w-full"
                             src="https://a.trellocdn.com/prgb/dist/images/home/orientation/new-user.e8544e0e1b2824e4ac46.svg"
                             alt=""/>
                    </figure>

                    <div className="card-body">
                        <div class="opacity-90 mb-4">
                            <h3 class="text-xl font-semibold pb-2">Организуйте что угодно</h3>
                            <p class="text-sm opacity-80">Соберите все в одном месте и начни перемещать элементы на
                                вашей первой доске!</p>
                        </div>

                        <FormField>
                            <input
                                type="text"
                                class="input mb-2"
                                placeholder="Над чем вы работаете?"
                                onInput={e => setName((e.target as HTMLInputElement).value)}
                            />
                        </FormField>

                        <button
                            className="btn btn-primary text-xs"
                            disabled={name().length === 0}
                            onClick={onSubmit}
                        >
                            Создайте свою доску
                        </button>
                    </div>
                </div>
            </div>
        </Page>
    );
};