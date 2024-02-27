import { Sequelize, DataTypes, Model } from 'sequelize';
import { IUserRoleInstance } from './user-role';

// Define the interface for office location attributes
export interface IOfficeLocationAttributes {
  id: number;
  name: string;
  userId: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the interface for office location instance extending sequelize Model
export interface IOfficeLocationInstance extends Model<IOfficeLocationAttributes>, IOfficeLocationAttributes {
  // Add any custom methods or properties here
}

// Define the office location model
export const OfficeLocation = (sequelize: Sequelize) => {
  // Define the model attributes
  return sequelize.define<IOfficeLocationInstance>('OfficeLocation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
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

// Define the return type of the define function
export function define(_Database: Sequelize): Model<IOfficeLocationInstance, IOfficeLocationAttributes> {
  throw new Error('Function not implemented.');
}