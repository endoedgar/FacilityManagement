export class User {
    _id?: string;
    name?: string;
    username: string;
    password: string;
    email?: string;
    groups?: Array<string>;
    token?: string;
    bio?: string;
}