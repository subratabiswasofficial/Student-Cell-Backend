import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import logging from '../config/logging';
import { AuthRequest, jwtPayload } from '../interfaces';

const NAMESPACE: string = 'Middleware';

const student = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token: string = req.headers['x-auth-token'] as string;
        const user: jwtPayload = jwt.verify(String(token), String(process.env.JWT_KEY)) as jwtPayload;
        req.user = user;
        next();
    } catch (error) {
        logging.error(NAMESPACE, `Auth error`);
        return res.status(401).send('not authorised');
    }
};

export default {
    student
    // cashier,
    // admin
};
