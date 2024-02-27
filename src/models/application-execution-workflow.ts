import { DataTypes, Model, ModelCtor, Sequelize } from 'sequelize';
import { IModelFactory } from './index';
import { IApplicationWorkflowAttributes } from './application-workflow';

export interface IApplicationExecutionWorkflowAttributes {
    id?: string;
    applicationExecutionId: string;
    applicationWorkflowId?: string;
    comments?: any;
    rejectionDetails?: any;
    clarificationDetails?: any;
    clarificationUserId?: string;
    userPermissionId?: string;
    status?: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
    deletedAt?: Date;
    deletedBy?: string;
    applicationWorkflow?: IApplicationWorkflowAttributes;
}

export interface IApplicationExecutionWorkflowInstance extends Model<IApplicationExecutionWorkflowAttributes>, IApplicationExecutionWorkflowAttributes {}

export interface IApplicationExecutionWorkflowModel extends ModelCtor<IApplicationExecutionWorkflowInstance> {
    belongsTo: any; // Add this line to include the belongsTo method
    associate(models: IModelFactory): void;
}

export const define = (sequelize: Sequelize): IApplicationExecutionWorkflowModel => {
    const model = sequelize.define<IApplicationExecutionWorkflowInstance>('applicationExecutionWorkflow', {
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
        applicationWorkflowId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'applicationWorkflow',
                key: 'id'
            }
        },
        comments: {
            type: DataTypes.JSONB,
            allowNull: true
        },
        rejectionDetails: {
            type: DataTypes.JSONB,
            allowNull: true
        },
        clarificationDetails: {
            type: DataTypes.JSONB,
            allowNull: true
        },
        clarificationUserId: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        userPermissionId: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: false
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
        timestamps: true
    }) as unknown as IApplicationExecutionWorkflowModel;

    model.associate = (models: IModelFactory) => {
        model.belongsTo(models.ApplicationExecution, { foreignKey: 'applicationExecutionId' });
        model.belongsTo(models.ApplicationWorkflow, { foreignKey: 'applicationWorkflowId', as: 'applicationWorkflow' });
    };

    return model;
};
