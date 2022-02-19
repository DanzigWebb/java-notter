import { forwardRef, ReactNode } from 'react';

type FormProps = {
    children: ReactNode;
    onSubmit?: () => void;
}

export const Form = forwardRef<HTMLFormElement, FormProps>((props, ref) => {

    const {
        onSubmit = () => {},
    } = props;

    const {children} = props;

    return (
        <form ref={ref} onSubmit={onSubmit}>
            {children}
        </form>
    );
});