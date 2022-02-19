import { forwardRef } from 'react';

type InputProps = {
    value?: string;
    placeholder?: string;
    pattern?: string;
    onInput?: (v: string) => void;
    onBlur?: () => void;
    onFocus?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {

    const {
        value = '',
        placeholder = '',
        onInput = () => {},
        onBlur = () => {},
        onFocus = () => {},
    } = props;

    return (
        <input
            ref={ref}
            className="input"
            placeholder={placeholder}
            value={value}
            onBlur={onBlur}
            onInput={e => onInput((e.target as HTMLInputElement).value)}
            onFocus={onFocus}
        />
    );
});