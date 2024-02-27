import { Sequelize, Model, DataTypes, ModelCtor } from 'sequelize';
import { IApplicationFormFieldModel } from './application-form-field';

export interface IApplicationExecutionFormAttributes {
    id: string;
    applicationExecutionId: string;
    applicationFormFieldId: string;
    fieldId: string;
    value: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
    deletedAt?: Date;
    deletedBy?: string;
}

export interface IApplicationExecutionFormInstance extends Model<IApplicationExecutionFormAttributes>, IApplicationExecutionFormAttributes {}

export interface IApplicationExecutionFormModel extends ModelCtor<IApplicationExecutionFormInstance> {
    associate: (models: any) => void;
    // Add any additional properties and methods here
}

export const define = (sequelize: Sequelize): IApplicationExecutionFormModel => {
    const model = sequelize.define<IApplicationExecutionFormInstance>('applicationExecutionForm', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        applicationExecutionId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'applicationExecution',
                key: 'id'
            }
        },
        applicationFormFieldId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'applicationFormField',
                key: 'id'
            }
        },
        fieldId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        value: {
            type: DataTypes.STRING(1000),
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
                model: 'user',
                key: 'id'
            }
        },
        updatedBy: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'user',
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
                model: 'user',
                key: 'id'
            }
        }
    }, {
        freezeTableName: true,
        timestamps: true,
    }) as unknown as IApplicationExecutionFormModel;

    model.associate = (models: any) => {
        model.belongsTo(models.ApplicationExecution, { foreignKey: 'applicationExecutionId', as: 'ApplicationExecution' });
        model.belongsTo(models.ApplicationFormField, { foreignKey: 'applicationFormFieldId', as: 'ApplicationFormField' });
        // Add other associations as needed
    };

    return model;
};
