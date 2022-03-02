import { Accessor, Component, createContext, createSignal, useContext } from 'solid-js';

type AppContextType = {
    showDrawer: Accessor<boolean>;
    toggleDrawer: (v?: boolean) => void;
}

export const AppContext = createContext<AppContextType>();

export const AppProvider: Component = (props) => {

    const [showDrawer, setDrawer] = createSignal(true);

    const store: AppContextType = {
        showDrawer,
        toggleDrawer
    };

    function toggleDrawer(value?: boolean) {
        switch (value) {
            case true:
                setDrawer(true);
                break;
            case false:
                setDrawer(false);
                break;
            default:
                setDrawer(!showDrawer());
                break;
        }
    }

    return (
        <AppContext.Provider value={store}>
            {props.children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext)!;
