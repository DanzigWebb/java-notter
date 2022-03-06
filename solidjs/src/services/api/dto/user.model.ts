export interface UserDto {
    id: number;
    email: string;
    name: string;
}

export interface SignupDto {
    name: string;
    password: string;
    email: string;
}

export interface SigninDto {
    login: string;
    password: string;
}

export interface SigninResponseDto {
    token: string;
    user: UserDto;
}
