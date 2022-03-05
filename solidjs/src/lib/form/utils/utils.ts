import { FormControl } from '@root/src/lib/form/form.type';

/**
 * @internal
 * Set value to html control
 */
export const SetControlValue = (input: FormControl, value: any, event: Event) => {
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
export const getControlValue = (input: FormControl): any => {
    switch (input.type) {
        case 'number':
            return Number(input.value);
        case 'checkbox':
            return Boolean(input.value);
        default:
            return input.value;
    }
};
