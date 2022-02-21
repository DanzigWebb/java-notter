import { Navigate } from 'react-router-dom';
import { useAuth } from '../../services/auth/authContext';

type Props = {
    children: JSX.Element;
}

export const AuthGuard = (props: Props) => {
    const [isAuth] = useAuth();

    if (!isAuth) {
        return <Navigate to="/login" replace={true}/>;
    }

    const {
        children
    } = props;

    return children;
};