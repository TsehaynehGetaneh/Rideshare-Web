export interface Credentials {
  username: string;
  password: string;
}
export interface Token {
  message: string;
  accessToken: string;
  refreshToken: string;
}
export interface LoginResponse {
  success: boolean;
  message: string;
  value: Token;
  errors: string[];
}
