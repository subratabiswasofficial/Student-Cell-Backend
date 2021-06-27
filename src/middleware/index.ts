import { Response, Request, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import logging from '../config/logging';

const NAMESPACE: string = 'Middleware';

const student = async (req: Request, res: Response, next: NextFunction) => {
    const token: string | string[] | undefined = req.headers['x-auth-token'];
    try {
        const decoded: string | jwt.JwtPayload = jwt.verify(String(token), String(process.env.JWT_KEY));
        console.log(decoded);
        console.log(token);
    } catch (error) {
        logging.error(NAMESPACE, `Auth error`);
        return res.status(401).send('not authorised');
    }
    // next();
    return res.send('middleware working');
};

// const cashier = async (req: Request, res: Response, next: NextFunction) => {
//     const token: string | string[] | undefined = req.headers['x-auth-token'];
//     if (token != null) {
//         return res.status(401).send('not authorised');
//     }
//     const decoded: string | jwt.JwtPayload = jwt.verify(String(token), String(process.env.JWT_PRIVATE_KEY));
//     console.log(decoded);
//     console.log(token);
//     next();
// };

// const admin = async (req: Request, res: Response, next: NextFunction) => {
//     const token: string | string[] | undefined = req.headers['x-auth-token'];
//     if (token != null) {
//         return res.status(401).send('not authorised');
//     }
//     const decoded: string | jwt.JwtPayload = jwt.verify(String(token), String(process.env.JWT_PRIVATE_KEY));
//     console.log(decoded);
//     console.log(token);
//     next();
// };

export default {
    student
    // cashier,
    // admin
};
