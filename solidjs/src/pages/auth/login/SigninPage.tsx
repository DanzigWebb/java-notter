import { Component } from 'solid-js';
import { Page } from '@root/src/pages/Page';
import { Link } from 'solid-app-router';
import { PagesPathEnum } from '@root/src/pages/pages.type';
import { createForm } from '@root/src/lib/form/createForm';

type Inputs = {
    login: string;
    password: string;
}

export const SigninPage: Component = () => {
    const {register, errors, submit} = createForm<Inputs>({
        defaultValues: {
            login: 'email@ma.com'
        },
        validators: {
            password: (v) => {
                if (v.length === 0) {
                    return 'Обязательное поле';
                }
            }
        },
        onSubmit: (values) => {
            console.log(values);
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
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="email"
                                       class="input input-bordered" {...register('login')}/>
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Password</span>
                                </label>
                                <input type="text"
                                       placeholder="password"
                                       class="input input-bordered"
                                       classList={{'input-error': !!errors.password}}
                                       {...register('password')}
                                />
                                {errors.password && <i class="text-xs text-error">{errors.password}</i>}
                                <label class="label">
                                    <Link
                                        href={`/${PagesPathEnum.SIGNUP}`}
                                        class="label-text-alt link link-hover"
                                    >
                                        Еще не зарегистрированы?
                                    </Link>
                                </label>
                            </div>
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