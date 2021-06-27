import { Document } from 'mongoose';

interface IUser extends Document {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: number;
    address: string;
    password: string;
    avatar: {
        location: string;
        key: string;
    };
}

interface ILogin {
    email: string;
    password: string;
}

interface IRegister {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: number;
    address: string;
    password: string;
}

export { IUser, ILogin, IRegister };
