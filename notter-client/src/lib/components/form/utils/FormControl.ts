export class FormControl<T = any> {
    valid = true;
    touched = false;

    constructor(
        public name: string,
        public value: T,
    ) {}
}