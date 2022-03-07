import { Accessor, Component, createContext, createSignal, useContext } from 'solid-js';
import { UserDto } from '@root/src/services/api/dto';
import { appStorage } from '@root/src/services/storage';

export type Theme = 'light' | 'dark';

type AppContextType = {
    auth: Accessor<boolean>;
    setAuth: (isAuth: boolean) => void;
    user: Accessor<UserDto | null>
    setUser: (u: UserDto | null) => void;
    theme: Accessor<Theme>;
    setTheme: (t: Theme) => void;
}

export const AppContext = createContext<AppContextType>();

export const AppProvider: Component = (props) => {

    const [user, setUser] = createSignal<UserDto | null>(null);
    const [auth, setAuth] = createSignal(false);
    const [theme, setTheme] = createSignal<Theme>('dark');

    const store: AppContextType = {
        user,
        setUser,
        auth,
        setAuth,
        theme,
        setTheme: updateTheme
    };

    function updateTheme(t: Theme) {
        const html = document.documentElement;
        html.setAttribute('data-theme', t);
        appStorage.set('theme', t);
        setTheme(t);
    }

    return (
        <AppContext.Provider value={store}>
            {props.children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext)!;
