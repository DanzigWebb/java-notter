import { useAuth } from '../../services/user/authContext';

export const Header = () => {

    const [isAuth, setAuth] = useAuth();

    function signOut() {
        setAuth({type: 'LOGOUT'});
    }

    return (
        <header className="navbar bg-base-200">
            <div className="navbar-start">
                <div className="dropdown">
                    <label className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                        </svg>
                    </label>
                    <ul
                        tabIndex={1}
                        className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <a>Item 1</a>
                        </li>
                        <li tabIndex={0}>
                            <a>Parent</a>
                        </li>
                        <li>
                            <a>Item 3</a>
                        </li>
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    <li>
                        <a>Item 1</a>
                    </li>
                    <li tabIndex={0}>
                        <a>Parent</a>
                    </li>
                    <li>
                        <a>Item 3</a>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                {isAuth && <a className="btn" onClick={signOut}>Logout</a>}
            </div>
        </header>
    );
};