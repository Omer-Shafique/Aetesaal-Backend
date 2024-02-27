import { Sequelize, Model, UUIDV4, DataTypes, ModelStatic } from 'sequelize';
import { IUserRoleInstance } from './user-role';

// Define the attributes interface for the User model
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

// Define the User model interface
export interface IUserInstance extends Model<IUserAttributes>, IUserAttributes {
  userRoles: IUserRoleInstance[]; // Assuming this association exists
}

// Define the function to create the User model
export const define = (sequelize: Sequelize): ModelStatic<IUserInstance> => {
  const User = sequelize.define<IUserInstance>(
    'User',
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
  ) as ModelStatic<IUserInstance>;

  // Define associations if needed
  (User as any).associate = (models: any) => {
    User.hasMany(models.UserRole);
  };

  return User;
};