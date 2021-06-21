import { Response, Request } from 'express';

const getApi = async (req: Request, res: Response) => {
    return res.status(200).json({ message: 'update test Wroking' });
};

export default {
    getApi
};
