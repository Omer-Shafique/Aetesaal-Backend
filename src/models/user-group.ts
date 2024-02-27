import { Sequelize, Model, DataTypes, ModelCtor } from 'sequelize';
import { IModelFactory } from './index';

export interface IUserGroupAttributes {
    id?: number;
    groupId?: number;
    userId: string;
    isActive: boolean;
}

export interface IUserGroupInstance extends Model<IUserGroupAttributes>, IUserGroupAttributes {}

export interface IUserGroupModel extends ModelCtor<IUserGroupInstance> {
    associate: (models: IModelFactory) => void;
}

export const define = (sequelize: Sequelize): IUserGroupModel => {
    const UserGroup = sequelize.define<IUserGroupInstance>('userGroup', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        groupId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.STRING, // Changed to STRING as UUID might not be supported
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        freezeTableName: true
    }) as IUserGroupModel;

    // Define associations separately
    UserGroup.associate = (models: IModelFactory) => {
        UserGroup.belongsTo(models.User as unknown as ModelCtor<Model<any, any>>);
        UserGroup.belongsTo(models.Group as ModelCtor<Model<any, any>>);
    };
    return UserGroup;
};
