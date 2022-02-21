import { createContext } from 'react';
import { EventEmitter } from '../../utils';

export interface MenuContextState<T = any> {
    onSelectItem: (value?: T) => void;
    emitter?: EventEmitter;
    filter?: string;
}

export const MenuContext = createContext<MenuContextState>({
    onSelectItem() {}
});