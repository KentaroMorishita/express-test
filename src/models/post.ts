import * as Sequelize from 'sequelize';

export namespace ModelPost {

    export interface Attributes {
        id?: number;
        title?: string;
        body?: string;
    }

    export interface Instance extends Sequelize.Instance<Attributes>, Attributes { }

    export interface Model extends Sequelize.Model<Instance, Attributes> { }

    export function define(sequelize: Sequelize.Sequelize) {
        const Model: Model = sequelize.define<Instance, Attributes>('posts',
            {
                id: {
                    type: Sequelize.UUID,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true
                },
                title: Sequelize.STRING(255),
                body: Sequelize.TEXT
            },
            {
                tableName: 'posts',
                timestamps: true,
                createdAt: "created_at",
                updatedAt: "updated_at"
            }
        );
        return Model;
    }

}

export default ModelPost;