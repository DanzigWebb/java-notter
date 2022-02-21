import { LoginForm } from './LoginForm';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../services/auth/authContext';

export const LoginPage = () => {
    const [auth, setAuth] = useAuth();

    if (auth) {
        return <Navigate to="/"/>
    }

    async function onLogin() {
        setAuth({type: 'LOGIN'});
    }

    return (
        <div className="page grid mx-auto h-full w-full justify-items-center items-center">
            <LoginForm onSubmit={onLogin}/>
        </div>
    );
};