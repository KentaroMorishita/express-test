import * as Sequelize from 'sequelize';
import ModelUser from './user';
import ModelPost from './post';

export const sequelize = new Sequelize(
    process.env.DB_NAME || 'express_db',
    process.env.DB_USER || 'root',
    process.env.DB_PASS || 'mysql', {
        host: '172.17.8.101',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    }
);

export const db = {
    User: ModelUser.define(sequelize),
    Post: ModelPost.define(sequelize)
};
