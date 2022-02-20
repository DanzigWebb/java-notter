export interface UserDto {
    id: number;
    name: string;
    email: string;
}

export interface LoginRequestDto {
    login: string;
    password: string;
}

export interface LoginResponseDto {
    token: string;
    user: UserDto;
}