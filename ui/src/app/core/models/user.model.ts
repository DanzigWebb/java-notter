export interface SignupDto {
  name: string;
  password: string;
  email: string;
}

export interface LoginDto {
  login: string;
  password: string;
}

export interface LoginDtoResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  }
}
