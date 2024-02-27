import { Model, DataTypes, Sequelize } from 'sequelize';

// Define the interface for user role attributes
export interface IUserRoleAttributes {
  id?: number;
  roleId?: number;
  userId: string;
  isActive: boolean;
  // Include any additional attributes here
}

// Define the interface for user role instance extending sequelize Model
export interface IUserRoleInstance extends Model<IUserRoleAttributes>, IUserRoleAttributes {
  // Add any custom methods or properties here
}

// Define the user role model
export const UserRole = (sequelize: Sequelize): void => {
  // Define the model attributes
  sequelize.define<IUserRoleInstance>('UserRole', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Role',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    // Define additional model options
    freezeTableName: true
  });
};
