import { userStorage, UserStorageState } from '../storage';
import httpClient from '../http/httpClient';
import { LoginRequestDto, LoginResponseDto } from '../api/dto/user.model';
import { AxiosError } from 'axios';

class Auth {
    get isAuth() {
        return !!userStorage.get('isAuth');
    }

    get user() {
        return userStorage.get('user');
    }

    get token() {
        return userStorage.get('token');
    }

    async login(loginDto: LoginRequestDto) {
        return httpClient.post<LoginResponseDto>('/auth/sign-in', loginDto)
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
}

export const AuthService = new Auth();