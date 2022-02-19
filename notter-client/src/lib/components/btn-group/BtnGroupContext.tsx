import { createContext } from 'react';
import { SelectionModel } from '../../utils/selection/SelectionModel';

export interface BtnGroupContextState<T = any> {
    btnGroupSelection: SelectionModel<T>;
    multiple?: boolean;
    updateActiveBtn?: (btnId: any) => void;
}

export class BtnGroupSelection<T = any> extends SelectionModel<T> {
}

export const BtnGroupContext = createContext<BtnGroupContextState>({
    btnGroupSelection: new BtnGroupSelection()
});