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
export const validateForm = <Controls>(
    controls: Controls,
    validators: FormValidatorsOption<Controls | undefined>,
    setError: SetStoreFunction<FormError<Controls>>
) => {
    const validationErrors: any = {};

    if (!validators) {
        return true;
    }

    /**
     * Validate all controls
     */
    Entries(controls).forEach(([name, value]) => {
        const error = validateControl(name, value, validators);
        if (error) {
            validationErrors[name] = error;
        } else {
            delete validationErrors[name];
        }
    });

    setError(reconcile(validationErrors));
    return Object.keys(validationErrors).length === 0;
};

export const validateControl = <Controls extends {}, Name extends keyof Partial<Controls>, Value extends Controls[Name]>(
    controlName: Name,
    value: Value,
    validators: FormValidatorsOption<Controls | undefined>,
) => {
    if (!validators) {
        return true;
    }

    const validator = validators[controlName];
    if (Array.isArray(validator)) {
        for (let i = 0; i < validator.length; i++) {
            const validatorCallback = validator[i];
            const error = validatorCallback(value);
            if (error) {
                return error;
            }
        }
    } else {
        return validator(value);
    }
};