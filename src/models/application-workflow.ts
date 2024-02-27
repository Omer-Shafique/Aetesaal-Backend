import { DataTypes, Model, Sequelize, ModelStatic } from 'sequelize';
import { IModelFactory } from './index';
import { IUserAttributes, IUserInstance } from './user';
import { IApplicationExecutionWorkflowAttributes, IApplicationExecutionWorkflowInstance } from './application-execution-workflow';

export interface IApplicationWorkflowAttributes {
    id: string;
    applicationId: string;
    name: string;
    type?: string;
    order: number;
    stepId: string;
    showMap: boolean;
    assignTo?: string | null;
    groupId?: number | null;
    canWithdraw?: boolean;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
    deletedAt?: Date;
    deletedBy?: string;
    applicationExecutionWorkflows?: IApplicationExecutionWorkflowAttributes[];
    userIds?: string[];
}

export interface IApplicationWorkflowInstance extends Model<IApplicationWorkflowAttributes>, IApplicationWorkflowAttributes {}

export interface IApplicationWorkflowModel extends ModelStatic<IApplicationWorkflowInstance> {
    associate(models: IModelFactory): void;
}

export const define = (sequelize: Sequelize): IApplicationWorkflowModel => {
    const model: IApplicationWorkflowModel = sequelize.define('applicationWorkflow', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      applicationId: {
        type: DataTypes.UUID,
        references: {
            model: 'application',
            key: 'id'
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      assignTo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'group',
          key: 'id'
        }
      },
      canWithdraw: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      stepId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'applicationWorkflow',
          key: 'id'
        }
      },
      showMap: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
    }) as IApplicationWorkflowModel;

    model.associate = (models: IModelFactory) => {
        model.belongsTo(models.Application);
        model.hasMany(models.ApplicationWorkflow, { foreignKey: 'stepId', as: 'step' });
        model.hasMany(models.ApplicationExecutionWorkflow as unknown as ModelStatic<Model<any, any>>); // Adjust type here
    };

    return model;
};
