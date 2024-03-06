import { DataTypes, Model, Sequelize, ModelDefined } from 'sequelize';
import { IUserInstance } from '../models/user';

// Define the attributes interface for ApplicationExecution
export interface IApplicationExecutionAttributes {
  [x: string]: any;
  applicationId?: string;
  startedAt?: Date;
  status?: string;
  title?: string;
  latitude?: number;
  longitude?: number;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
}

// Define the instance interface for ApplicationExecution, extending Model
export interface IApplicationExecutionInstance extends Model<IApplicationExecutionAttributes>, IApplicationExecutionAttributes {
  // Your interface methods or properties here
}

// Define the model function
export const define = (sequelize: Sequelize): ModelDefined<IApplicationExecutionInstance, IApplicationExecutionAttributes> => {
  const ApplicationExecution = sequelize.define<IApplicationExecutionInstance>(
    'ApplicationExecution',
    {
      applicationId: {
        type: DataTypes.UUID,
        allowNull: true, // Allow null if needed
        references: {
          model: 'Application',
          key: 'id'
        }
      },
      startedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      longitude: {
        type: DataTypes.FLOAT,
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
        allowNull: true
      },
      deletedBy: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'User',
          key: 'id'
        }
      }
    }
  ) as ModelDefined<IApplicationExecutionInstance, IApplicationExecutionAttributes>;

  // ApplicationExecution.belongsTo<IUserInstance>(sequelize.models.User, { foreignKey: 'createdBy', as: 'createdByUser' });

  return ApplicationExecution;
};
