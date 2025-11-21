export interface IUser{
    id: number;
    username: string;
    fullname: string;
    role: string;
}
export interface IUserMessage{
    message: string;
    statusCode: number;
    data: IUser[] | IUser;
}