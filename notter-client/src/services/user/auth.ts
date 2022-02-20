import { userStorage } from '../storage';

class Auth {
    get isAuth() {
        return !!userStorage.get('isAuth')
    }
}

export const AuthService = new Auth();