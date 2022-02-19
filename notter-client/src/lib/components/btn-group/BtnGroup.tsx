import React, { Component, ReactNode } from 'react';
import { BtnGroupContext, BtnGroupContextState, BtnGroupSelection } from './BtnGroupContext';

interface BtnGroupProps<T = any> {
    children: ReactNode;
    value?: T | T[];
    onChange?: (btnId: T) => void;
    multiple?: boolean;
}

export class BtnGroup<T = any> extends Component<BtnGroupProps<T>, BtnGroupContextState> {

    state: BtnGroupContextState = {
        btnGroupSelection: new BtnGroupSelection<T>(),
        multiple: !!this.props.multiple,
        updateActiveBtn: this.updateActiveBtn.bind(this)
    };

    componentDidMount() {
        this.updateValueByProps();
    }

    componentDidUpdate(prevProps: Readonly<BtnGroupProps>) {
        if (prevProps.value !== this.props.value) {
            this.updateValueByProps();
        }
    }

    protected updateValueByProps() {
        if (this.props.value) {
            const activeBtn = this.state.btnGroupSelection.add(this.props.value);
            this.setState((s) => ({...s, btnGroupSelection: activeBtn}));
        } else {
            const activeBtn = this.state.btnGroupSelection.clear();
            this.setState((s) => ({...s, btnGroupSelection: activeBtn}));
        }
    }

    private updateActiveBtn(btnId: any) {
        const btnGroupSelection = this.state.btnGroupSelection;

        if (!this.state.multiple) {
            btnGroupSelection.set(btnId);
        } else {
            btnGroupSelection.has(btnId)
                ? btnGroupSelection.remove(btnId)
                : btnGroupSelection.add(btnId);
        }

        this.setState((state) => ({
            ...state,
            btnGroupSelection
        }));

        this.onActiveBtnChange(btnId);
    }

    private onActiveBtnChange(btnId: any) {
        if (this.props.onChange) {
            this.props.onChange(btnId);
        }
    }

    render() {
        return (
            <BtnGroupContext.Provider value={this.state}>
                <div className="btn-group">
                    {this.props.children}
                </div>
            </BtnGroupContext.Provider>
        );
    }
}