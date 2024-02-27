import { DataTypes, Model, Sequelize, ModelCtor } from 'sequelize';
import { IModelFactory } from './index';
import { IApplicationWorkflowInstance } from './application-workflow';

export interface IApplicationWorkflowPermissionAttributes {
    id?: string;
    applicationWorkflowId: string;
    userId: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IApplicationWorkflowPermissionInstance extends Model<IApplicationWorkflowPermissionAttributes>, IApplicationWorkflowPermissionAttributes {}

export interface IApplicationWorkflowPermissionModel extends ModelCtor<IApplicationWorkflowPermissionInstance> {
    associate(models: IModelFactory): void;
}

export const define = (sequelize: Sequelize): IApplicationWorkflowPermissionModel => {
    const model = sequelize.define<IApplicationWorkflowPermissionInstance>('applicationWorkflowPermission', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal('uuid_generate_v4()') // Assuming you are using UUIDs
      },
      applicationWorkflowId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'applicationWorkflow',
          key: 'id'
        }
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'user', // Assuming you have a 'user' model
          key: 'id'
        }
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
        freezeTableName: true,
        timestamps: true // Assuming you want timestamps
    });

    (model as IApplicationWorkflowPermissionModel).associate = (models: IModelFactory) => {
      model.belongsTo(models.ApplicationWorkflow, { foreignKey: 'applicationWorkflowId', as: 'workflow' });
      // Add more associations if needed
    };

    return model as IApplicationWorkflowPermissionModel;
};

export default define;
