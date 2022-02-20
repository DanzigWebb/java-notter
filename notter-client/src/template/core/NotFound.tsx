import { Link } from 'react-router-dom';
import { AuthService } from '../../services/user/auth';

export const NotFound = () => {
    const isAuth = AuthService.isAuth;

    return (
        <div className="hero min-h-full">
            <div className="text-center hero-content">
                <div className="max-w-md">
                    <h1 className="text-5xl pb-10 leading-8">
                        <span className="font-bold">404</span>
                        <br/>
                        <span className="text-3xl">Page not found!</span>
                    </h1>
                    {!isAuth && <Link className="btn btn-primary" to="/login">Login to app</Link>}
                    {isAuth && <Link className="btn btn-primary" to="/">Get Started</Link>}
                </div>
            </div>
        </div>
    );
};