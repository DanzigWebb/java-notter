import React, { useContext, useEffect } from 'react';
import { TabsContext } from './TabContext';

interface TabProps {
    children: React.ReactNode;
    label: React.ReactNode;
    index: number;
}

export const Tab = ({index, children, label}: TabProps) => {
    const context = useContext(TabsContext);
    const isActive = context.activeTab === index;


    useEffect(() => {
        if (isActive && context.updateActiveContent) {
            if (!(context.activeTabContent === children)) {
                context.updateActiveContent(children);
            }
        }
    })

    return (
        <div
            className={`tab ${isActive ? 'tab-active' : ''}`}
            onClick={() => context.updateActive(index)}
        >
            {label}
        </div>
    );
};