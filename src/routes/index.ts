import * as express from 'express';
const router: express.Router = express.Router();

import controllers from '../controllers';
import auth from '../middleware';

/** common routes */
router.get('/sample', auth.student, controllers.sampleApi.getApi);
router.post('/auth/login', controllers.auth.login);
router.post('/auth/register', controllers.auth.register);
router.post('/auth/delete', auth.student, controllers.auth.deleteAccount);

export default router;
