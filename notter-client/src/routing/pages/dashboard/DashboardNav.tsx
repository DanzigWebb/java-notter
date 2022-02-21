import { FormField } from '../../../lib/components/form/controls/FormField';
import { UnpackNestedValue, useForm } from 'react-hook-form';
import { DashboardFilerInputs } from './models/dashboard.models';
import { debounce } from '../../../lib/utils/decorators/debounce';
import { useEffect } from 'react';

type Props = {
    onFilterChange?: (data: UnpackNestedValue<DashboardFilerInputs>) => void;
}

export const DashboardNav = (props: Props) => {
    const {register, watch} = useForm<DashboardFilerInputs>();

    const {
        onFilterChange = () => {}
    } = props;

    useEffect(() => {
        watch(debounce((value) => {
            onFilterChange(value);
        }, 400));
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