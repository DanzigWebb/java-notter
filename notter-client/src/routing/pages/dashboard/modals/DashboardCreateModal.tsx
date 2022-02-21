import { FormField } from '../../../../lib/components/form/controls/FormField';
import { FormError } from '../../../../lib/components/form/controls/FormError';
import { UnpackNestedValue, useForm } from 'react-hook-form';
import { useModal } from '../../../../lib/components/modal';

type Inputs = {
    name: string;
}

type Props = {
    onSubmit?: (name: string) => void;
}

export const DashboardCreateModal = (props: Props) => {
    const {
        onSubmit = () => {},
    } = props;

    const {register, formState: {errors}, handleSubmit} = useForm<Inputs>();

    const [onClose] = useModal();

    function onFormSubmit(data: UnpackNestedValue<Inputs>) {
        onSubmit(data.name);
        onClose();
    }

    return (
        <form className="card rounded-none" onSubmit={handleSubmit(onFormSubmit)}>
            <div className="card-body p-1">
                <header className="flex">
                    <h3 className="text-lg font-bold">Создание нового дашборда</h3>
                    <div className="flex-1"/>
                    <button className="btn btn-ghost btn-sm" type="button" onClick={onClose}>
                        <i className="fa-solid fa-xmark text-lg"/>
                    </button>
                </header>
                <FormField>
                    <label>Название</label>
                    <input
                        className="input"
                        placeholder="Работа"
                        type="text"
                        {...register('name', {required: true})}
                    />
                    <FormError isShow={!!errors.name}>Обязательное поле</FormError>
                </FormField>
                <button className="btn btn-primary">Создать</button>
            </div>
        </form>
    );
};