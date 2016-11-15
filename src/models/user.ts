import * as Sequelize from 'sequelize';

export namespace ModelUser {

    export interface UserAttributes {
        id?: number;
        name?: string;
        email?: string;
    }

    export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes { }

    export interface UserModel extends Sequelize.Model<UserInstance, UserAttributes> { }

    export function define(sequelize: Sequelize.Sequelize) {
        const User: UserModel = sequelize.define<UserInstance, UserAttributes>('User',
            {
                id: {
                    type: Sequelize.UUID,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true
                },
                name: Sequelize.STRING(255),
                email: Sequelize.STRING(255)
            },
            {
                tableName: 'users',
                timestamps: true,
                createdAt: "created_at",
                updatedAt: "updated_at"
            }
        );
        return <UserModel>User;
    }

}

export default ModelUser;