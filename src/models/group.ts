// Import necessary modules and types
import { Sequelize, Model, DataTypes } from 'sequelize';

// Define your models
interface IUser {
  id: number;
  username: string;
  email: string;
  // Add other properties as needed
}

interface IRole {
  id: number;
  name: string;
  // Add other properties as needed
}

// Define your Sequelize instance
const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'mysql',
});

// Define your User and Role models
class User extends Model implements IUser {
  public id!: number;
  public username!: string;
  public email!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

class Role extends Model implements IRole {
  public id!: number;
  public name!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize your models
User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
});

Role.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Role',
});

// Export your models
export { User, Role };
