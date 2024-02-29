import { Sequelize, Model, DataTypes, ModelStatic } from 'sequelize';
import { IModelFactory } from './index';
import { IUserInstance } from './user'; // Import the IUserInstance interface
import { IGroupInstance } from './group'; // Import the IGroupInstance interface

export interface IUserGroupAttributes {
    id?: number;
    groupId?: number;
    userId: string;
    isActive: boolean;
}

export interface IUserGroupInstance extends Model<IUserGroupAttributes>, IUserGroupAttributes {}

export interface IUserGroupModel extends ModelStatic<IUserGroupInstance> {
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
            type: DataTypes.STRING,
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
        // Ensure the correct types are used for the associations
        UserGroup.belongsTo(models.User as unknown as ModelStatic<IUserInstance>);
        UserGroup.belongsTo(models.Group as unknown as ModelStatic<IGroupInstance>);
    };
    return UserGroup;
};
