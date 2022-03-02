import { FormElement, FormOptions } from '@root/src/lib/form/form.type';

const _setManuallyEvent = new CustomEvent('set-manually');

/**
 * @internal
 * Set value to html control
 */
const setInputValue = (input: FormElement, value: any, event: Event) => {
    if (input.type === 'checkbox') {
        (input as HTMLInputElement).checked = Boolean(value);
    } else {
        input.value = value;
    }
    input.dispatchEvent(event);
};

/**
 * @internal
 * Parse value from html control
 */
const getInputValue = (input: FormElement): any => {
    switch (input.type) {
        case 'number':
            return Number(input.value);
        case 'checkbox':
            return Boolean(input.value);
        default:
            return input.value;
    }
};

export function createForm<Inputs extends {}>(options: FormOptions<Inputs> = {}) {
    const inputs: { [key in keyof Inputs]?: FormElement } = {};

    /**
     * Registration form control
     * @example
     * <input type="text" {...register('text')}/>
     */
    const register = (name: keyof Inputs) => ({
        ref: (ref: FormElement) => {
            const instance = (inputs[name] = ref);
            if (options?.initialValues) {
                setValue(name, options.initialValues[name]!);
            }

            return instance;
        },
        name,
    });

    const setValue = <Name extends keyof Inputs, Value extends Inputs[Name]>(name: Name, value: Value) => (
        setInputValue(inputs[name]!, value, _setManuallyEvent)
    );

    const getValue = <Name extends keyof Inputs, Value extends Inputs[Name]>(name: Name): Value => (
        getInputValue(inputs[name]!)
    );

    return {
        /**
         * Registration form control
         * @example
         * <input type="text" {...register('text')}/>
         */
        register,
        /**
         * Set value to control by name
         */
        setValue,
        /**
         * Get value of control by name
         */
        getValue
    };

}