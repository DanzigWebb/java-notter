import React, { Component, ReactNode } from 'react';
import { TabContextState, TabsContext } from './TabContext';

interface TabGroupProps {
    children: React.ReactNode;
    onChange?: (tabIndex: any) => void;
}

export class TabGroup extends Component<TabGroupProps, TabContextState> {

    state: TabContextState = {
        activeTab: 0,
        updateActive: this.updateActiveTab.bind(this),
        updateActiveContent: this.updateActiveTabContent.bind(this)
    };

    private updateActiveTab(index: number) {
        this.setState((state) => {
            return {
                ...state,
                activeTab: index
            };
        });

        this.onChange(index);
    }

    private updateActiveTabContent(node: ReactNode) {
        this.setState((state) => {
            return {
                ...state,
                activeTabContent: node
            };
        });
    }


    // Emit when active tab is change
    private onChange(index: any) {
        if (this.props.onChange) {
            this.props.onChange(index);
        }
    }

    render() {
        return (
            <TabsContext.Provider value={this.state}>
                <div className="tabs tabs-boxed pb-2">
                    {this.props.children}
                </div>

                <div className="tabs-content">
                    {this.state.activeTabContent}
                </div>
            </TabsContext.Provider>);
    }
}
