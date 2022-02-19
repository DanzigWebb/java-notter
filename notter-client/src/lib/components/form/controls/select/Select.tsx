import { Menu } from '../../../menu';
import { SelectDropdown } from './SelectDropdown';
import { ReactNode, useState } from 'react';
import './Select.css';
import { SelectionModel } from '../../../../utils/selection/SelectionModel';

class Selection extends SelectionModel<any> {

}

type Props<T = any> = {
    children: ReactNode;
    placeholder?: string;
    onSearch?: (v: string) => void;
    multiple?: boolean;
}

type State = {
    selection: Selection;
}

export const Select = (props: Props) => {

    const [state, setState] = useState<State>({
        selection: new Selection()
    });

    const {
        children,
        placeholder = '',
        onSearch = () => {},
        multiple = false,
    } = props;

    function onSelect(v: any) {
        onSelectItem(v);
    }

    function onSelectItem(v: any) {
        if (!v) {
            return;
        }
        const selection = state.selection;

        if (multiple) {
            selection.add(v);
        } else {
            selection.clear();
            selection.add(v);
        }

        setState((state) => ({...state, selection}));
    }

    function openSelectMenu(el: Element) {
        const dropdown = (
            <SelectDropdown
                width={el.clientWidth}
                onSelect={onSelect}
                onSearch={onSearch}
            >
                {children}
            </SelectDropdown>
        );
        new Menu(dropdown, el).show();
    }

    function removeSelection(item: any) {
        const selection = state.selection;
        selection.remove(item);
        setState((state) => ({...state, selection}));
    }

    const isSelected = !!state.selection.size;

    return (
        <div
            className="am-select w-full select flex items-center"
            onClick={e => openSelectMenu(e.target as Element)}
        >
            <div className="am-select-inner" onClick={e => e.stopPropagation()}>
                {
                    !isSelected && <SelectPlaceholder placeholder={placeholder}/>
                }

                {
                    state.selection.asArray().map(item =>
                        <span key={item.toString()} className="badge">
                            <span className="pr-1">{item}</span>
                            <i className="fa-solid fa-xmark p-1" onClick={() => removeSelection(item)}/>
                        </span>
                    )
                }
            </div>
        </div>

    );
};

function SelectPlaceholder(props: { placeholder: string }) {
    const {placeholder = '...'} = props;
    return (
        <span className="am-select-placeholder opacity-60">{placeholder}</span>
    );
}