import { Sequelize, Model, DataTypes, ModelCtor } from 'sequelize';

export interface IListOfValueAttributes {
    id: number;
    key: string;
    value: string;
    isActive?: boolean;
}

export interface IListOfValueInstance extends Model<IListOfValueAttributes>, IListOfValueAttributes { }

export const define = (sequelize: Sequelize): ModelCtor<IListOfValueInstance> => {
    const model = sequelize.define<IListOfValueInstance>('listOfValue', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        key: {
            type: DataTypes.STRING,
            allowNull: false
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN
        }
    }, {
        freezeTableName: true
    });

    return model;
};

export default define;
