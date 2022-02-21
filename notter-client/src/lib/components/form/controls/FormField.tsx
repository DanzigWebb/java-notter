import { ReactNode } from 'react';

type FormFieldProps = {
    children: ReactNode;
    spacing?: boolean;
}

export const FormField = (props: FormFieldProps) => {
    const {
        children,
        spacing = true,
    } = props;

    const withoutSpacingClasses = (spacing: boolean) => spacing ? 'pb-2 mb-2' : 'p-0 m-0 mb-0 pb-0'

    return (
        <div className={`form-control ${withoutSpacingClasses(spacing)}`}>
            {children}
        </div>
    );

};