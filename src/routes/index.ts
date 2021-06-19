import * as express from 'express';
import sampleApiController from '../controllers/sample';
const router: express.Router = express.Router();

/** All routes */
router.get('/sample', sampleApiController.getApi);

export default router;
