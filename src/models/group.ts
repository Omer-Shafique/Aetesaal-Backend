// Import necessary modules and types
import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from './sequelize';

// Define the attributes interface for the Group model
interface IGroupAttributes {
  id: number;
  // Add other properties here
  createdAt: Date;
  updatedAt: Date;
}

// Define the Group model
class Group extends Model<IGroupAttributes> implements IGroupAttributes {
  public id!: number;
  // Add other properties here

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the Group model
Group.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  // Add other properties here
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  }
}, {
  sequelize,
  modelName: 'Group',
});

// Export the Group model
export { Group };

// Define the function to define the Group model
export function define(_Database: Sequelize): typeof Group {
  return Group;
}

// Define the interface for the Group instance
export interface IGroupInstance extends Group {}
