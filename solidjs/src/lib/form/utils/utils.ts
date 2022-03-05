import { FormControl, FormError, FormValidatorsOption } from '@root/src/lib/form/form.type';
import { reconcile, SetStoreFunction } from 'solid-js/store';

/**
 * @internal
 * Object.entries with true types
 */
export const Entries = <T extends {}>(obj: T): [keyof T, T[keyof T]][] => {
    return Object.entries(obj) as [keyof T, T[keyof T]][];
};

/**
 * @internal
 * Set value to html control
 */
export const SetControlValue = (control: FormControl, value: any, event: Event) => {
    switch (control.type) {
        case 'checkbox':
            (control as HTMLInputElement).checked = Boolean(value);
            break;
        default:
            control.value = value;
    }
    control.dispatchEvent(event);
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

/**
 * @internal
 * Validate controls by validators
 * and update errors store
 */
export const validate = <Controls>(
    controls: Controls,
    validators: FormValidatorsOption<Controls | undefined>,
    setError: SetStoreFunction<FormError<Controls>>
) => {
    const validationErrors: any = {};

    if (!validators) {
        return true;
    }

    /**
     * Enumeration validators and call validation function/s
     * to current form values
     */
    Entries(validators).forEach(([name, validators]) => {
        if (Array.isArray(validators)) {
            for (let i = 0; i < validators.length; i++) {
                const validator = validators[i];
                const error = validator(controls[name]);
                if (error) {
                    validationErrors[name] = error;
                    return;
                }
            }
        } else {
            const error = validators(controls[name]);
            if (error) {
                validationErrors[name] = error;
            }
        }
    });

    setError(reconcile(validationErrors));
    return Object.keys(validationErrors).length === 0;
};