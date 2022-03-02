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

export interface LoginDto {
    login: string;
    password: string;
}

export interface LoginResponseDto {
    token: string;
    user: UserDto;
}
