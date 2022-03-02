import { Accessor, Component, createContext, createSignal, useContext } from 'solid-js';
import { UserDto } from '@root/src/services/api/dto';

type AppContextType = {
    auth: Accessor<boolean>;
    setAuth: (isAuth: boolean) => void;
    user: Accessor<UserDto | null>
    setUser: (u: UserDto | null) => void;
}

export const AppContext = createContext<AppContextType>();

export const AppProvider: Component = (props) => {

    const [user, setUser] = createSignal<UserDto | null>(null);
    const [auth, setAuth] = createSignal(false);

    const store: AppContextType = {
        user,
        setUser,
        auth,
        setAuth,
    };

    return (
        <AppContext.Provider value={store}>
            {props.children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext)!;
