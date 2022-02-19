import { LoginForm } from './LoginForm';
import { LoginInputs } from './login.type';

export const LoginPage = () => {
    function onLogin(data: LoginInputs) {
        console.log(data);
    }

    return (
        <div className="page grid mx-auto h-full w-full justify-items-center items-center">
            <LoginForm onSubmit={onLogin}/>
        </div>
    );
};