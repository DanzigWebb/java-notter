import { Transition, TransitionStatus } from 'react-transition-group';
import { CSSProperties, MouseEvent, ReactNode, useRef } from 'react';
import { Properties } from 'csstype';

// Todo (1) добавить анимацию через namespace (если возможно) <Animation.SlideDown>

const defaultDuration = 300;

interface MenuAnimationProps {
    inProp: boolean;
    children: ReactNode;
    duration?: number;
    length?: number;
    style?: CSSProperties;
    className?: string;
    onClick?: (e: MouseEvent) => void;
}

export const SlideDownAnimation = (props: MenuAnimationProps) => {
    const {
        inProp = false,
        children,
        duration = defaultDuration,
        length = 20,
        style = {},
        className = '',
        onClick = () => {},
    } = props;

    const defaultStyle: CSSProperties = {
        ...style,
        transition: `all ${duration}ms ease-in-out`,
        opacity: 0,
        width: '100%',
    };

    const transitionStyles: Partial<Record<TransitionStatus, Properties>> = {
        entering: {opacity: 1, transform: 'translateY(0)'},
        entered: {opacity: 1, transform: 'translateY(0)'},
        exiting: {opacity: 0, transform: `translateY(${length}px)`},
        exited: {opacity: 0, transform: `translateY(${length}px)`},
    };

    const nodeRef = useRef(null)

    return (
        <Transition in={inProp} timeout={duration} nodeRef={nodeRef}>
            {state => (
                <div
                    className={className}
                    style={{...defaultStyle, ...transitionStyles[state]}}
                    onClick={onClick}
                >
                    {children}
                </div>
            )}
        </Transition>
    );
};