export interface IUser{
    id: string;
    username: string;
    fullName: string;
    role: string;
}
export interface IUserMessage{
    message: string;
    statusCode: number;
    data: IUser[] | IUser;
}