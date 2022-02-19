import { createContext } from 'react';

export interface ModalContextState {
    onClose: () => void;
}

export const ModalContext = createContext<ModalContextState>({
    onClose() {}
});
