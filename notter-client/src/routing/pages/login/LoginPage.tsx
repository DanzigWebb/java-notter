import { LoginForm } from './LoginForm';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const navigate = useNavigate();

    async function onLogin() {
        navigate('/');
    }

    return (
        <div className="page grid mx-auto h-full w-full justify-items-center items-center">
            <LoginForm onSubmit={onLogin}/>
        </div>
    );
};