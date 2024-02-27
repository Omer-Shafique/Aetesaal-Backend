import { DataTypes, Model, Sequelize, ModelStatic } from 'sequelize';
import { IUserAttributes } from './user';

export interface IAppAttributes {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    createdBy: string;
    updatedBy: string;
    deletedAt: Date;
    deletedBy: string;
    createdByUser?: IUserAttributes;
}

export interface IApplicationAttributes extends IAppAttributes {}

export interface IApplicationInstance extends Model<IAppAttributes>, IAppAttributes {}

const define = (sequelize: Sequelize): ModelStatic<IApplicationInstance> => {
    const Application = sequelize.define<IApplicationInstance>(
        'Application',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            createdBy: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'User',
                    key: 'id'
                }
            },
            updatedBy: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'User',
                    key: 'id'
                }
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            deletedBy: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'User',
                    key: 'id'
                }
            }
        },
        {
            freezeTableName: true,
            timestamps: true
        }
    );

    return Application;
};

export default define;
