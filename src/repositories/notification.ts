import { Model, DataTypes } from 'sequelize';
import sequelize from '../models/sequelize';

// Define the interface for Notification attributes
export interface INotificationAttributes {
  id: number;
  title: string;
  body: string;
  isRead: boolean;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  // Add other properties as needed
}

// Define the instance interface for Notification
export interface INotificationInstance extends Model<INotificationAttributes>, INotificationAttributes {}

// Define the Notification model
const Notification = sequelize.define<INotificationInstance>('Notification', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  }
  // Define other properties as needed
});

// Export the Notification model
export default Notification;
