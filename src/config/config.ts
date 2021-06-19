import dotevn from 'dotenv';

dotevn.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || '4000';
const SERVER_MODE = process.env.NODE_ENV || 'development';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    env: SERVER_MODE
};

const config = {
    server: SERVER
};

export default config;
