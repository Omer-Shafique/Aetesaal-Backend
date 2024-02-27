import { Sequelize, Model, DataTypes, ModelCtor } from 'sequelize';

export interface ILookupDataAttributes {
    id: number;
    lookupId: number;
    display: string;
    value: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
}

export interface ILookupDataInstance extends Model<ILookupDataAttributes>, ILookupDataAttributes { }

export const define = (sequelize: Sequelize): ModelCtor<ILookupDataInstance> => {
    const LookupData = sequelize.define<ILookupDataInstance>(
        'lookupData',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            lookupId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'lookup',
                    key: 'id'
                }
            },
            display: {
                type: DataTypes.STRING,
                allowNull: false
            },
            value: {
                type: DataTypes.STRING,
                allowNull: false
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
            },
            createdBy: {
                type: DataTypes.UUID,
                references: {
                    model: 'user',
                    key: 'id'
                }
            }
        },
        {
            freezeTableName: true
        }
    );

    // Define associations outside of the model definition
    // We'll define associations separately from the model definition
    // Because the 'associate' method is not recognized on ModelCtor
    return LookupData;
};

// Define associations separately
export const defineLookupDataAssociations = (LookupData: ModelCtor<ILookupDataInstance>, models: any) => {
    LookupData.belongsTo(models.Lookup);
};
