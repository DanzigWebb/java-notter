import { FormField } from '../../../lib/components/form/controls/FormField';
import { UnpackNestedValue, useForm } from 'react-hook-form';
import { FormError } from '../../../lib/components/form/controls/FormError';
import { LoginInputs } from './login.type';

type Props = {
    onSubmit?: (data: LoginInputs) => void;
}

export const LoginForm = (props: Props) => {
    const {handleSubmit, register, formState: {errors}} = useForm<LoginInputs>();

    const {
        onSubmit = () => {}
    } = props;

    function onSubmitForm(data: UnpackNestedValue<LoginInputs>) {
        onSubmit(data);
    }

    return (
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit(onSubmitForm)}>
                <h2 className="text-2xl text-center">Login</h2>

                <FormField>
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="text"
                        placeholder="email"
                        className="input input-bordered"
                        {...register('login', {required: true})}
                    />

                    <FormError isShow={!!errors.login}>Обязательное поле</FormError>
                </FormField>
                <FormField>
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>

                    <input
                        type="text"
                        placeholder="password"
                        className="input input-bordered"
                        {...register('password', {required: true})}
                    />

                    <FormError isShow={!!errors.password}>Обязательное поле</FormError>
                </FormField>

                <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>

                <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    );
};