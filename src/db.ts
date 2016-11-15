import * as mysql from 'mysql';

export const connection = mysql.createConnection({
  host: process.env.DB_HOST || '172.17.8.101',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'mysql',
  database: process.env.DB_NAME || 'express_db'
});