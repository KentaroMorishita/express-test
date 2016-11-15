import * as Sequelize from 'sequelize';

export namespace ModelPost {

    export interface PostAttributes {
        id?: number;
        title?: string;
        body?: string;
    }

    export interface PostInstance extends Sequelize.Instance<PostAttributes>, PostAttributes { }

    export interface PostModel extends Sequelize.Model<PostInstance, PostAttributes> { }

    export function define(sequelize: Sequelize.Sequelize) {
        const Post: PostModel = sequelize.define<PostInstance, PostAttributes>('posts',
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
        return <PostModel>Post;
    }

}

export default ModelPost;