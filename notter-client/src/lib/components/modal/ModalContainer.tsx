import { ReactNode, useLayoutEffect, useState } from 'react';
import { ModalContext } from './ModalContext';
import { SlideDownAnimation } from '../../animations/SlideDownAnimation';

export interface ModalContainerProps {
    children: ReactNode;
    onClose: () => void;
    className?: string;
}

// Todo: добавить Fade анимацию на оверлей
export const ModalContainer = ({children, onClose, className = ''}: ModalContainerProps) => {
    const [boxShow, setBoxShow] = useState(false);

    const duration = 140;
    const length = 80;

    // Fixme подумать над тем, почему анимация иногда не проигрывается
    useLayoutEffect(() => {
        setTimeout(() => {
            setBoxShow(true);
        }, 10);
    }, []);

    function onStartClose() {
        setBoxShow(false);

        setTimeout(() => {
            onClose();
        }, duration);
    }

    return (
        <ModalContext.Provider value={{onClose: onStartClose}}>
            <div className="modal modal-open" onClick={onStartClose}>
                <SlideDownAnimation
                    className="w-full flex justify-center"
                    key={0}
                    inProp={boxShow}
                    duration={duration}
                    length={length}
                >
                    <div className={`modal-box bg-base-200 ${className}`} onClick={e => e.stopPropagation()}>
                        {children}
                    </div>
                </SlideDownAnimation>
            </div>
        </ModalContext.Provider>
    );
};
