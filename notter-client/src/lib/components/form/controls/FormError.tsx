import { ReactNode } from 'react';
import { SlideDownAnimation } from '../../../animations/SlideDownAnimation';

type FormErrorProps = {
    children: ReactNode;
    isShow: boolean;
}

export const FormError = (props: FormErrorProps) => {

    const {children, isShow = false} = props;

    return (
        <SlideDownAnimation inProp={isShow} duration={100} length={4}>
            <span className="form-control-error">
                {children}
            </span>
        </SlideDownAnimation>
    );
};