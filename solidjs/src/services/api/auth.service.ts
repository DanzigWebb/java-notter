import { userStorage, UserStorageState } from '../storage';
import httpClient from '../http/httpClient';
import { AxiosError } from 'axios';
import { SigninDto, SigninResponseDto } from './dto';

class AuthService {
    private _isAuth: boolean | undefined;

    get isAuth() {
        if (this._isAuth === undefined) {
            this.checkIsAuth();
        }
        return !!this._isAuth;
    }

    get user() {
        return userStorage.get('user');
    }

    get token() {
        return userStorage.get('token');
    }

    constructor() {
    }

    async login(loginDto: SigninDto) {
        return httpClient.post<SigninResponseDto>('/auth/sign-in', loginDto)
            .then((res) => {
                const {token, user} = res.data;
                const state: UserStorageState = {isAuth: true, token, user};
                userStorage.setState(state);
                return res;
            })
            .catch((e: AxiosError) => {
                console.error(e);
                throw new Error(e.message);
            });
    }

    private checkIsAuth() {
        this._isAuth = !!userStorage.get('isAuth');
    }
}

export const authService = new AuthService();