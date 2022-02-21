import { FormField } from '../../../lib/components/form/controls/FormField';
import { UnpackNestedValue, useForm } from 'react-hook-form';
import { DashboardFilerInputs } from './models/dashboard.models';
import { debounce } from '../../../lib/utils';
import { useEffect } from 'react';

type Props = {
    defaultFilters?: Partial<DashboardFilerInputs>,
    onFilterChange?: (data: UnpackNestedValue<DashboardFilerInputs>) => void;
}

export const DashboardNav = (props: Props) => {
    const {
        onFilterChange = () => {},
        defaultFilters = {}
    } = props;

    const {register, watch, reset} = useForm<DashboardFilerInputs>({
        defaultValues: defaultFilters
    });

    /*
    * Обновляем значение формы при обновлении пропса
    */
    useEffect(() => {
        reset(defaultFilters);
    }, [defaultFilters]);

    /*
    * Ставим debounce при изменении состояния формы
    */
    useEffect(() => {
        watch(debounce((value) => {
            onFilterChange(value);
        }, 200));
    }, [watch]);

    return (
        <nav className="navbar bg-base-200 my-4 rounded-lg">
            <div className="flex-none">
                <h3 className="text-2xl pr-6">Рабочие столы</h3>
                <form className="flex gap-3">
                    <FormField spacing={false}>
                        <input
                            className="input"
                            type="text"
                            autoComplete="off"
                            placeholder="Имя..."
                            {...register('name')}
                        />
                    </FormField>
                    <FormField spacing={false}>
                        <input
                            className="input"
                            type="text"
                            autoComplete="off"
                            placeholder="Описание..."
                            {...register('description')}
                        />
                    </FormField>
                </form>
            </div>

            <div className="flex-1"/>

            <div className="flex-none">
                <button className="btn btn-circle btn-ghost">
                    <i className="fa-solid fa-ellipsis-vertical"/>
                </button>
            </div>
        </nav>
    );
};