import { Document } from 'mongoose';
import { Request } from 'express';

interface IUser extends Document {
    uuid: string;
    type: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: number;
    address: string;
    password: string;
    avatar?: {
        location: string;
        key: string;
    };
}

interface ILogin {
    email: string;
    password: string;
}

interface IRegister {
    type?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: number;
    address?: string;
    password: string;
}

interface jwtPayload {
    id: string;
    type: string;
    uuid: string;
}

interface AuthRequest extends Request {
    user?: {
        id: string;
        uuid: string;
        type: string;
    };
}

export { IUser, ILogin, IRegister, AuthRequest, jwtPayload };
