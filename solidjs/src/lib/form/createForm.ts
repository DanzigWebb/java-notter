import { FormControl, FormError, FormOptions } from '@root/src/lib/form/form.type';
import { createStore } from 'solid-js/store';
import { SetControlValue } from '@root/src/lib/form/utils/utils';
import { CUSTOM_EVENT_NAME } from '@root/src/lib/form/utils/constants';

const customEvent = new CustomEvent(CUSTOM_EVENT_NAME);

export function createForm<Inputs extends {}>(options: FormOptions<Inputs> = {}) {
    const refs: { [key in keyof Inputs]?: FormControl } = {};
    const [errors, setErrors] = createStore<FormError<Inputs>>({});

    const register = (name: keyof Inputs) => ({
        ref: (ref: FormControl) => {
            const controlRef = (refs[name] = ref);

            /**
             * Set default value to control with init register props
             */
            const {defaultValues} = options;
            if (defaultValues && defaultValues[name]) {
                setValue(name, defaultValues[name]!);
            }

            return controlRef;
        },
        name
    });

    const setValue = <Name extends keyof Inputs, Value extends Inputs[keyof Inputs]>(
        name: Name,
        value: Value,
    ) => SetControlValue(refs[name]!, value, customEvent);

    return {
        register,
        errors,
    };
}