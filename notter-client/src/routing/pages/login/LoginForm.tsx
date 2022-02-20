import { FormField } from '../../../lib/components/form/controls/FormField';
import { UnpackNestedValue, useForm } from 'react-hook-form';
import { FormError } from '../../../lib/components/form/controls/FormError';
import { LoginInputs } from './login.type';
import { AuthService } from '../../../services/user/auth';

type Props = {
    onSubmit?: (data: LoginInputs) => void;
}

export const LoginForm = (props: Props) => {
    const {handleSubmit, register, setError, formState: {errors}} = useForm<LoginInputs>();

    const {
        onSubmit = () => {}
    } = props;

    async function onSubmitForm(data: UnpackNestedValue<LoginInputs>) {
        try {
            await AuthService.login(data);
            onSubmit(data);
        } catch (e) {
            setError('login', {
                type: 'wrongLogin',
                message: 'Неверный логин или пароль'
            });
        }
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

                    <FormError isShow={!!errors.login}>
                        {errors.login?.type === 'wrongLogin'
                            ? errors.login.message
                            : 'Обязательное поле'
                        }
                    </FormError>
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