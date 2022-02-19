import { ReactNode, useContext, useEffect } from 'react';
import { MenuContext } from '../../../menu';

type SelectDropdownProps<T = any> = {
    children: ReactNode;
    width?: number | string;
    onSelect?: (value: T) => void;
    onSearch: (value: string) => void;
}

export const SelectDropdown = (props: SelectDropdownProps) => {
    const {
        children,
        width,
        onSelect = () => {},
    } = props;

    const context = useContext(MenuContext);
    context.emitter?.subscribe('onSelect', onSelect);

    useEffect(() => {
        return () => {
            context.emitter?.unsubscribe('onSelect', onSelect);
        };
    }, []);

    function onSearch(v: string) {
        context.filter = v;
        context.emitter?.emit('onFilterChange', v);
    }

    return (
        <div style={{width}}>
            <input
                type="text"
                className="input input-ghost w-full bg-base-300"
                placeholder="Searching..."
                onChange={e => onSearch(e.target.value)}
            />

            {children}
        </div>
    );
};