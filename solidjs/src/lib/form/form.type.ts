export type FormElement = HTMLInputElement | HTMLSelectElement;

export type FormValidator<T> = (value: T) => string | void;

export type FormValidatorsOption<Values> = {
    [key in keyof Partial<Values>]: FormValidator<Values[key]> | Array<FormValidator<Values[key]>>;
};

export interface FormOptions<Inputs> {
    initialValues?: Partial<Inputs>;
    validators?: FormValidatorsOption<Inputs>;
    onSubmit?: (values: Inputs) => void | Promise<void>;
}