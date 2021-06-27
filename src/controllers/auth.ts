import { Response, Request } from 'express';
import errors from '../constants/errors';
import userModel from '../model/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser, ILogin, IRegister } from '../interfaces';
import { Model } from 'mongoose';

const NAMESPACE: string = 'Auth';
const JWT_KEY: string = String(process.env.JWT_KEY);
const LOGIN_EXPIRE = 300000;

const login = async (req: Request, res: Response) => {
    try {
        const { email, password }: ILogin = req.body;

        if (email == null || password == null) {
            return res.status(401).json(errors.USER_NOT_VALID);
        }
        const foundUser: IUser | null = await userModel.findOne({ email });
        if (foundUser == null) {
            return res.status(401).json(errors.USER_NOT_VALID);
        }
        const isPasswordMatched = await bcrypt.compare(password, foundUser.password);
        if (!isPasswordMatched) {
            return res.status(401).json(errors.USER_NOT_VALID);
        }
        const payload: object = {
            id: foundUser._id,
            email: foundUser.email
        };
        const token: string = jwt.sign(payload, JWT_KEY, { expiresIn: LOGIN_EXPIRE });
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json(errors.SERVER_ERROR);
    }
};

const register = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password, phoneNumber }: IRegister = req.body;
        const isEmailExists = await userModel.findOne({ email });
        if (isEmailExists) {
            return res.status(400).json(errors.USER_EXISTS);
        }
        const user = new userModel({
            firstName,
            lastName,
            email,
            password,
            phoneNumber
        });
        const salt: string = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const payload: object = {
            id: user._id,
            email: user.email
        };
        const token: string = jwt.sign(payload, JWT_KEY, { expiresIn: LOGIN_EXPIRE });
        return res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        return res.status(500).json(errors.SERVER_ERROR);
    }
};

export default {
    login,
    register
};
