import Mongoose from 'mongoose';
import logging from './logging';

const MONGODB_URL: string = String(process.env.MONGODB_URL);
const NAMESPACE: string = 'MongoDb';

const connect = async () => {
    try {
        await Mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        logging.info(NAMESPACE, `Mongodb connection succeful`);
    } catch (error) {
        logging.error(NAMESPACE, `Mongodb connection error`, error.message);
    }
};

export default {
    connect
};
