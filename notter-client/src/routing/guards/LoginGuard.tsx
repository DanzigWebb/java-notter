import { Navigate } from 'react-router-dom';
import { useAuth } from '../../services/user/authContext';

type Props = {
    children: JSX.Element;
}

export const LoginGuard = (props: Props) => {
    const [isAuth] = useAuth();

    if (isAuth) {
        return <Navigate to="/"/>;
    }

    const {
        children
    } = props;

    return children;
};