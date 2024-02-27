import { DataTypes, Model, ModelCtor, Sequelize } from 'sequelize';

import { IModelFactory } from './index';
import { IUserModel } from './user';

export interface IDepartmentAttributes {
    id: number;
    name: string;
    userId: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IDepartmentInstance extends Model<IDepartmentAttributes>, IDepartmentAttributes {}

export interface IDepartmentModel extends ModelCtor<IDepartmentInstance> {
    insertOrUpdate: any;
    associate: (models: IModelFactory) => void;
}

export const define = (sequelize: Sequelize): IDepartmentModel => {
    const model = sequelize.define<IDepartmentInstance>('department', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        isActive: DataTypes.BOOLEAN,
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        freezeTableName: true
    }) as IDepartmentModel;

    model.associate = (models: IModelFactory) => {
        model.belongsTo(models.User as unknown as ModelCtor<any>);
    };

    return model;
};
