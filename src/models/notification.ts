import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { IUserModel } from './user';

interface NotificationAttributes {
  id: number;
  userId: number;
  code: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

interface NotificationCreationAttributes extends Optional<NotificationAttributes, 'id'> {}

class NotificationModel extends Model<NotificationAttributes, NotificationCreationAttributes> implements NotificationAttributes {
  public id!: number;
  public userId!: number;
  public code!: string;
  public message!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const sequelize = new Sequelize('sqlite::memory:');

NotificationModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Notification',
  }
);

export { NotificationModel };
