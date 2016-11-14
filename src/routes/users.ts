import * as express from 'express';
import * as mysql from 'mysql';

const connection = mysql.createConnection({
  host: process.env.DB_HOST || '172.17.8.101',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'mysql',
  database: process.env.DB_NAME || 'express_db'
});

const router = express.Router();

/* GET users listing. */
router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {

  connection.query("select * from users where email LIKE ?", ["%gmail%"],
    (err, rows) => {
      console.log(rows);
      res.send(rows);
    });

});

export const users = router;
