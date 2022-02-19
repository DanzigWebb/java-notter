import { ReactNode } from 'react';

type FormFieldProps = {
    children: ReactNode;
}

export const FormField = (props: FormFieldProps) => {
    const {children} = props;

    return (
        <div className="form-control py-2">
            {children}
        </div>
    );

};