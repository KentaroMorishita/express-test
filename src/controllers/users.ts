import * as express from 'express';
import { db, sequelize } from '../models';

/**
 * ユーザーコントローラー
 * 
 * @class Users
 */
class Users {

    /**
     * 一覧
     * 
     * @static
     * @type {express.RequestHandler}
     * @memberOf Users
     */
    public static index: express.RequestHandler = (req, res, next) => {
        db.User.findAll()
            .then(data => res.send(data))
            .catch(err => next(err));
    }

}

/**
 * ルーティング
 */
const router = express.Router();
router.get('/', Users.index);

export const users = router;
