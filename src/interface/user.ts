import { Sequelize, Model, UUIDV4, DataTypes, ModelCtor } from 'sequelize';
import { IUserRoleInstance } from '../models/user-role';

export interface IUserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
  password: string;
  contactNo: string;
  pictureUrl: string;
  gender: string;
  managerId: string;
  departmentId: number;
  officeLocationId: number;
  timezone: string;
  isApproved: boolean;
  isActive: boolean;
  deviceId: string;
  createdAt: Date;
  deletedAt: Date;
  deletedBy: string;
}

export interface IUserInstance extends Model<IUserAttributes>, IUserAttributes {
  userRoles: IUserRoleInstance[]; // Corrected interface to use IUserRoleInstance instead of IUserRoleAttributes
}

export interface IUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
  password: string;
  contactNo: string;
  pictureUrl: string;
  gender: string;
  managerId: string;
  departmentId: number;
  officeLocationId: number;
  timezone: string;
  isApproved: boolean;
  isActive: boolean;
  deviceId: string;
  // Add other properties as needed for request payload
}

export const define = (sequelize: Sequelize): ModelCtor<IUserInstance> => {
  const User = sequelize.define<IUserInstance>(
    'User', // Corrected model name to 'User'
    {
      id: {
        type: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contactNo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pictureUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      timezone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      managerId: {
        type: UUIDV4,
        allowNull: true,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      departmentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Department',
          key: 'id'
        }
      },
      officeLocationId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'OfficeLocation',
          key: 'id'
        }
      },
      isApproved: DataTypes.BOOLEAN,
      isActive: DataTypes.BOOLEAN,
      deviceId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
      deletedBy: DataTypes.UUID,
    },
    {
      freezeTableName: true,
      timestamps: true
    },
  ) as ModelCtor<IUserInstance>;

  (User as any).associate = (models: any) => {
    User.hasMany(models.UserRole);
    // Define other associations here...
  };

  return User;
};
