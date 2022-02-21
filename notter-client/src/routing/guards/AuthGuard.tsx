import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/auth/authContext';

type Props = {
    children: ReactNode;
}

export const AuthGuard = (props: Props) => {
    const [isAuth] = useAuth();
    const navigate = useNavigate();

    if (!isAuth) {
        navigate('/login', {
            replace: true,
        })
    }

    const {
        children = ''
    } = props;

    return children;
};