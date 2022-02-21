import { Link } from 'react-router-dom';
import { useAuth } from '../../services/auth/authContext';

export const Home = () => {
    const [isAuth] = useAuth();

    return (
        <div className="hero min-h-full">
            <div className="text-center hero-content">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello there</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                        exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    {!isAuth && <Link className="btn btn-primary" to="/login">Login to app</Link>}
                    {isAuth && <Link className="btn btn-primary" to="/dashboard">Get Started</Link>}
                </div>
            </div>
        </div>
    );
};