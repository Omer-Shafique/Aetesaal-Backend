import { Model, DataTypes, Sequelize } from 'sequelize';

export interface IUserRoleAttributes {
  id?: number;
  roleId?: number;
  userId: string;
  isActive: boolean;
}

export interface IUserRoleInstance extends Model<IUserRoleAttributes>, IUserRoleAttributes {}

export const UserRole = (sequelize: Sequelize): void => {
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
    freezeTableName: true
  });
};
