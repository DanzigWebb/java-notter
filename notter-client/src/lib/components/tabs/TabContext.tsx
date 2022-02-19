import { createContext, ReactNode } from 'react';

export interface TabContextState {
    activeTab: string | number;
    updateActive: (index: number) => void;

    activeTabContent?: ReactNode;
    updateActiveContent?: (node: ReactNode) => void;
}

export const TabsContext = createContext<TabContextState>({
    activeTab: 0,
    updateActive: (index: number) => {}
});