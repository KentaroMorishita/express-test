import * as Sequelize from 'sequelize';

export namespace ModelUser {

    export interface Attributes {
        id?: number;
        name?: string;
        email?: string;
    }

    export interface Instance extends Sequelize.Instance<Attributes>, Attributes { }

    export interface Model extends Sequelize.Model<Instance, Attributes> { }

    export function define(sequelize: Sequelize.Sequelize) {
        const Model: Model = sequelize.define<Instance, Attributes>('users',
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
        return Model;
    }

}

export default ModelUser;