import * as express from 'express';
import { db, sequelize } from '../models';

const router = express.Router();

/* GET users listing. */
router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {

    db.User.findAll({}).done(data => res.send(data));

});

export const users = router;
