import { createContext, useContext } from 'react';

export interface ModalContextState {
    onClose: () => void;
}

export const ModalContext = createContext<ModalContextState>({
    onClose() {}
});

export function useModal() {
    const context = useContext(ModalContext);
    return [context.onClose];
}