import { createContext, ReactNode, useContext, useReducer } from 'react';
import { AuthService } from './auth';

type Action = { type: 'LOGIN' } | { type: 'LOGOUT' };
type Dispatch = (action: Action) => void;
type State = boolean


function authReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'LOGIN':
            return true;
        case 'LOGOUT':
            return false;
    }
}

const AuthStateContext = createContext<State | undefined>(undefined);
const AuthDispatchContext = createContext<Dispatch | undefined>(undefined)

function AuthProvider({children}: { children: ReactNode }) {
    const [state, dispatch] = useReducer(authReducer, AuthService.isAuth);

    return (
        <AuthStateContext.Provider value={state}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
}

function useAuthState() {
    const context = useContext(AuthStateContext)
    if (context === undefined) {
        throw new Error('useAuthState must be used within a CountProvider')
    }
    return context
}

function useAuthDispatch() {
    const context = useContext(AuthDispatchContext)
    if (context === undefined) {
        throw new Error('useAuthDispatch must be used within a CountProvider')
    }
    return context
}

function useAuth(): [State, Dispatch] {
    return [useAuthState(), useAuthDispatch()]
}

export {AuthProvider, useAuth};