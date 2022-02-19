import { ReactNode, useEffect, useState } from 'react';
import { MenuContext } from './MenuContext';
import { Menu } from './Menu';
import './Menu.css';
import { usePopper } from 'react-popper';
import { SlideDownAnimation } from '../../animations/SlideDownAnimation';
import { EventEmitter } from '../../utils/emitter/EventEmitter';

interface MenuContainerProps<T = any> {
    children: ReactNode;
    reference: Element;
    onClose: (v: T) => void;
    context: Menu;
}

export function MenuContainer(props: MenuContainerProps) {
    const {
        children,
        onClose = () => {},
        reference
    } = props;

    const duration = 200;

    const emitter = new EventEmitter();
    const [show, setShow] = useState(false);

    const [popperEl, setPopperEl] = useState<HTMLElement | null>(null);
    const {styles, attributes} = usePopper(reference, popperEl);

    useEffect(() => {
        setShow(true);
    }, []);

    function onStartClose(value: any) {
        emitter.emit('onSelect', value);

        setShow(false);
        setTimeout(() => {
            onClose(value);
        }, duration);
    }

    return (
        <MenuContext.Provider value={{onSelectItem: onStartClose, emitter}}>
            <div className="menu-container" onClick={() => onStartClose(undefined)}>
                <div
                    ref={setPopperEl}
                    style={styles.popper}
                    {...attributes.popper}
                >
                    <SlideDownAnimation inProp={show} duration={duration}>
                        <ul
                            onClick={e => e.stopPropagation()}
                            className="menu bg-base-300 drop-shadow-2xl rounded-md"
                        >
                            {children}
                        </ul>
                    </SlideDownAnimation>
                </div>
            </div>
        </MenuContext.Provider>
    );
}