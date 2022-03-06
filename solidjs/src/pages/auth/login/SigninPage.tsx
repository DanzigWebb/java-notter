import { Component } from 'solid-js';
import { Page } from '@root/src/pages/Page';
import { Link, useNavigate } from 'solid-app-router';
import { PagesPathEnum } from '@root/src/pages/pages.type';
import { createForm } from '@root/src/lib/form/createForm';
import { Validators } from '@root/src/lib/form/validators/validators';
import { FormField } from '@components/form/group/FormField';
import { FormError } from '@components/form/group/FormError';
import { authService } from '@root/src/services/api/auth.service';
import { useApp } from '@root/src/shared/providers/AppProvider';

type Inputs = {
    login: string;
    password: string;
}

export const SigninPage: Component = () => {
    const app = useApp();
    const navigate = useNavigate();

    const {register, errors, setError, submit} = createForm<Inputs>({
        onSubmit: async (values) => {
            try {
                const response = await authService.login(values);
                app.setAuth(true);
                app.setUser(response.data.user);
                navigate(`/${PagesPathEnum.HOME}`, {replace: true});
            } catch (e) {
                setError('password', 'Неверный пароль');
                console.error(e);
            }
        }
    });

    return (
        <Page full>
            <div class="hero h-full bg-base-200">
                <div class="flex-col hero-content max-w-3xl lg:flex-row-reverse">
                    <div class="text-center lg:text-left">
                        <h1 class="text-5xl font-bold">Login now!</h1>
                        <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={submit} class="card-body">
                            <FormField>
                                <label class="label">
                                    <span class="label-text">Email</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="email"
                                    class="input input-bordered"
                                    classList={{'input-error': !!errors.login}}
                                    autocomplete="off"
                                    {...register('login', {
                                        validators: [
                                            Validators.required(),
                                            Validators.emailValidator()
                                        ]
                                    })}
                                />
                                <FormError show={!!errors.login}>{errors.login}</FormError>
                            </FormField>
                            <FormField>
                                <label class="label">
                                    <span class="label-text">Password</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="password"
                                    class="input input-bordered"
                                    classList={{'input-error': !!errors.password}}
                                    autocomplete="off"
                                    {...register('password', {
                                        validators: [
                                            Validators.required(),
                                            Validators.minLength(6),
                                            Validators.maxLength(10)
                                        ]
                                    })}
                                />
                                <FormError show={!!errors.password}>{errors.password}</FormError>
                            </FormField>
                            <label class="label">
                                <Link
                                    href={`/${PagesPathEnum.SIGNUP}`}
                                    class="label-text-alt link link-hover"
                                >
                                    Еще не зарегистрированы?
                                </Link>
                            </label>
                            <div class="form-control mt-6">
                                <button class="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Page>
    );
};