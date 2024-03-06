import { DataTypes, Model, Sequelize } from 'sequelize';
import { IModelFactory } from '../models/index';
import { IApplicationWorkflowAttributes } from '../models/application-workflow';
import { ApplicationExecutionStatus } from '../enum/application';

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

export interface IApplicationExecutionWorkflowModel extends Model<IApplicationExecutionWorkflowInstance, IApplicationExecutionWorkflowAttributes> {
    belongsTo: any;
    findByPk(id: string): Promise<IApplicationExecutionWorkflowInstance | null>;
    findAll(options?: object): Promise<IApplicationExecutionWorkflowInstance[]>;
    create(values: object, options?: object): Promise<IApplicationExecutionWorkflowInstance>;
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
            allowNull: false // This line indicates that applicationExecutionId is required, as indicated by the error
        },
        applicationWorkflowId: {
            type: DataTypes.UUID,
            allowNull: true // You can adjust this based on your requirements
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
            allowNull: true
        },
        userPermissionId: {
            type: DataTypes.UUID,
            allowNull: true
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
            allowNull: true
        },
        updatedBy: {
            type: DataTypes.UUID,
            allowNull: true
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deletedBy: {
            type: DataTypes.UUID,
            allowNull: true
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
export function saveApplicationExecutionWorkflow(_payload: IApplicationExecutionWorkflowAttributes) {
    throw new Error('Function not implemented.');
}

export function findById(_id: string) {
    throw new Error('Function not implemented.');
}

export function updateStatusById(_WITHDRAW: ApplicationExecutionStatus, _executionWorkflowId: string) {
    throw new Error('Function not implemented.');
}

export function findByExecutionAndWorkflowId(_executionId: string, _workflowId: string) {
    throw new Error('Function not implemented.');
}

