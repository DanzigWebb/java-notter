class Auth {
    get isAuth() {
        return !!localStorage.getItem('isAuth');
    }
}

export const AuthService = new Auth();