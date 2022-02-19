import { ReactNode } from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';
import { Properties } from 'csstype';

const defaultDuration = 300;

const transitionStyles: Partial<Record<TransitionStatus, Properties>> = {
    entering: {opacity: 1},
    entered: {opacity: 1},
    exiting: {opacity: 0},
    exited: {opacity: 0},
};

interface FadeAnimationProps {
    inProp: boolean;
    duration?: number;
    children: ReactNode;
}

export const FadeAnimation = ({duration = defaultDuration, inProp, children}: FadeAnimationProps) => {
    const defaultStyle = {
        transition: `all ${duration}ms ease-in`,
        opacity: 0,
    };

    return (
        <Transition in={inProp} timeout={duration}>
            {state => (
                <div style={{...defaultStyle, ...transitionStyles[state]}}>
                    {children}
                </div>
            )}
        </Transition>
    );
};