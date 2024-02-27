import { Model, Optional, DataTypes, Sequelize, ModelCtor } from 'sequelize';

export interface ILookupAttributes {
    id: number;
    name: string;
    type: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
}

export interface ILookupCreationAttributes extends Optional<ILookupAttributes, 'id'> {}

export interface ILookupInstance extends Model<ILookupAttributes, ILookupCreationAttributes>, ILookupAttributes {}

export interface ILookupModel extends ModelCtor<ILookupInstance> {}

export const define: (sequelize: Sequelize) => ILookupModel = (sequelize: Sequelize) => {
    const Lookup = sequelize.define<ILookupInstance>('lookup', {
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
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        createdBy: {
            type: DataTypes.UUID, // Assuming createdBy is a UUID
            allowNull: true // Assuming createdBy can be null
        }
    }, {
        freezeTableName: true
    });

    return Lookup;
};
