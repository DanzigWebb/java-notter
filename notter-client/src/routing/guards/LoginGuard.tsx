import { AuthService } from '../../services/user/auth';
import { Navigate } from 'react-router-dom';

type Props = {
    children: JSX.Element;
}

export const LoginGuard = (props: Props) => {
    const isAuth = AuthService.isAuth;

    if (isAuth) {
        return <Navigate to="/" />
    }

    const {
        children
    } = props;

    return children;
};