export interface Ilogin{
    username: string;
    password: string;
    deviceId: string;
    rememberMe: boolean;
}
export interface ILoginReponse{
    accessToken: string;
    refreshToken: string;
}
export interface ILoginResult {
  ok: boolean;
  status: number;
  data?: any;
}
export interface IRegister{
    username: string;
    password: string;
}