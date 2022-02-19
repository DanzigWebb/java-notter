import { ReactNode, useContext, useEffect } from 'react';
import { BtnGroupContext } from './BtnGroupContext';

interface BtnGroupItemProps<T = any> {
    btnId: T;
    children: ReactNode;
    selected?: boolean;
}

export const BtnGroupItem = <T extends any>(props: BtnGroupItemProps<T>) => {
    const context = useContext(BtnGroupContext);
    const isActive = context.btnGroupSelection.has(props.btnId);

    // Обновляем состояние BtnGroup, если кнопка предустановлено выбранна
    useEffect(() => {
        if (props.selected) {
            onSelectBtn();
        }
    }, [])

    const onSelectBtn = () => {
        if (context.updateActiveBtn) {
            context.updateActiveBtn(props.btnId)
        }
    }

    return (
        <button
            className={`btn ${isActive ? 'btn-active' : ''}`}
            onClick={onSelectBtn}
        >
            {props.children}
        </button>
    )
}