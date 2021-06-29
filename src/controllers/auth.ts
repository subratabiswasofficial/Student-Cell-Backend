import { Response, Request } from 'express';
import errors from '../constants/errors';
import userModel from '../model/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser, ILogin, IRegister, jwtPayload, AuthRequest } from '../interfaces';
import { v4 as uuidv4 } from 'uuid';

const NAMESPACE: string = 'Auth';
const JWT_KEY: string = String(process.env.JWT_KEY);
const LOGIN_EXPIRE: number = 300000;
const SALT_ROUNDS: number = 10;

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
        const payload: jwtPayload = {
            id: foundUser._id,
            type: foundUser.type,
            uuid: foundUser.uuid
        };
        const token: string = jwt.sign(payload, JWT_KEY, { expiresIn: LOGIN_EXPIRE });
        return res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        return res.status(500).json(errors.SERVER_ERROR);
    }
};

const register = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password, phoneNumber, type }: IRegister = req.body;
        const isEmailExists = await userModel.findOne({ email });
        if (isEmailExists) {
            return res.status(400).json(errors.USER_EXISTS);
        }
        const user = new userModel({
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            type,
            uuid: uuidv4()
        });
        const salt: string = await bcrypt.genSalt(SALT_ROUNDS);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const payload: jwtPayload = {
            id: user._id,
            type: user.type,
            uuid: user.uuid
        };
        const token: string = jwt.sign(payload, JWT_KEY, { expiresIn: LOGIN_EXPIRE });
        return res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        return res.status(500).json(errors.SERVER_ERROR);
    }
};

const deleteAccount = async (req: AuthRequest, res: Response) => {
    try {
        const { password }: ILogin = req.body;
        if (password == null) {
            return res.status(401).json(errors.USER_PASSWORD_UNMATCHED);
        }
        const foundUser: IUser | null = await userModel.findOne({ _id: req.user?.id, uuid: req.user?.uuid });
        if (foundUser == null) {
            return res.status(401).json(errors.USER_NOT_VALID);
        }
        const isPasswordMatched = await bcrypt.compare(password, foundUser.password);
        if (!isPasswordMatched) {
            return res.status(401).json(errors.USER_PASSWORD_UNMATCHED);
        }
        await foundUser.remove();
        return res.status(200).json({ message: 'suxxes' });
    } catch (error) {
        console.log(error);
        return res.status(500).json(errors.SERVER_ERROR);
    }
};

export default {
    login,
    register,
    deleteAccount
};
