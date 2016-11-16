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
    public static index: express.RequestHandler = async (req, res, next) => {
        try {
            res.send(await db.User.findAll());
        } catch (err) {
            next(err);
        }
    };

    /**
     * 新規登録
     * 
     * @static
     * @type {express.RequestHandler}
     * @memberOf Users
     */
    public static new: express.RequestHandler = async (req, res, next) => {
        const t = await sequelize.transaction();
        try {
            const data = await db.User.create(req.params, { transaction: t });
            t.commit();
            res.send(data);
        } catch (err) {
            t.rollback();
            next(err);
        }
    };

}

/**
 * ルーティング
 */
const router = express.Router();
router.get('/', Users.index);
router.get('/new/:name/:email', Users.new);

export const users = router;
