import * as express from 'express';
import {connection} from '../db';

const router = express.Router();

/* GET users listing. */
router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {

    connection.query("select * from users where email LIKE ?",
        ["%gmail%"],
        (err, rows) => {
            console.log(rows);
            res.send(rows);
        });

});

export const users = router;
