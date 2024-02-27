import { DataTypes, Model, Sequelize, ModelCtor } from 'sequelize';
import { IModelFactory } from './index';
import { IApplicationFormFieldInstance } from './application-form-field';

export interface IApplicationWorkflowFieldPermissionAttributes {
    id?: string;
    applicationId?: string;
    applicationWorkflowId?: string;
    applicationFormSectionId?: string;
    applicationFormFieldId?: string;
    permission?: string;
    type?: string;
    conditions?: any;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IApplicationWorkflowFieldPermissionInstance extends Model<IApplicationWorkflowFieldPermissionAttributes>, IApplicationWorkflowFieldPermissionAttributes {}

export interface IApplicationWorkflowFieldPermissionModel extends Model<IApplicationWorkflowFieldPermissionInstance, IApplicationWorkflowFieldPermissionAttributes> {
    upsert: any;
    findAll: any;
    findOne: any;
    associate(models: IModelFactory): void;
}

export const define = (sequelize: Sequelize): ModelCtor<IApplicationWorkflowFieldPermissionInstance> & IApplicationWorkflowFieldPermissionModel => {
    const model = sequelize.define<IApplicationWorkflowFieldPermissionInstance>('applicationWorkflowFieldPermission', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.literal('uuid_generate_v4()') // Assuming you are using UUIDs
        },
        applicationId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'application',
                key: 'id'
            }
        },
        applicationWorkflowId: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'applicationWorkflow',
                key: 'id'
            }
        },
        applicationFormSectionId: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'applicationFormSection',
                key: 'id'
            }
        },
        applicationFormFieldId: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'applicationFormField',
                key: 'id'
            }
        },
        permission: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        conditions: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        freezeTableName: true
    }) as ModelCtor<IApplicationWorkflowFieldPermissionInstance> & IApplicationWorkflowFieldPermissionModel;

    model.associate = (models: IModelFactory) => {
        model.belongsTo(models.Application);
        model.belongsTo(models.ApplicationFormSection);
        model.belongsTo(models.ApplicationFormField as unknown as ModelCtor<IApplicationFormFieldInstance> & { associate: (models: IModelFactory) => void });
    };

    return model;
};

export default define;
