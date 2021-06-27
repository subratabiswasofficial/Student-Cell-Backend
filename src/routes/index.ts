import * as express from 'express';
const router: express.Router = express.Router();

import controllers from '../controllers';
import auth from '../middleware';

/** common routes */
router.get('/sample', auth.student, controllers.sampleApi.getApi);
router.post('/login', controllers.auth.login);
router.post('/register', controllers.auth.register);

export default router;
