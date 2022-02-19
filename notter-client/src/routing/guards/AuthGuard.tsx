import { AuthService } from '../../services/user/auth';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
    children: ReactNode;
}

export const AuthGuard = (props: Props) => {
    const isAuth = AuthService.isAuth;
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