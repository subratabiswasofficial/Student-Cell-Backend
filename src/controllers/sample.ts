import { Response, Request } from 'express';
import { AuthRequest } from '../interfaces';

const getApi = async (req: AuthRequest, res: Response) => {
    return res.status(200).json({ message: 'push test working' });
};

export default {
    getApi
};
