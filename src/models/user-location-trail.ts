import { DataTypes, Model, Sequelize } from 'sequelize';
import { IModelFactory } from './index';

export interface IUserLocationTrailAttributes {
    id: number;
    userId: string;
    latitude: number;
    longitude: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserLocationTrailInstance extends Model<IUserLocationTrailAttributes>, IUserLocationTrailAttributes {}

export interface IUserLocationTrailModel extends Model<IUserLocationTrailInstance, IUserLocationTrailAttributes> {
    insertOrUpdate: any;
    findOne: any;
    findAll(arg0: { where: any; attributes: string[]; order: string[][]; }): unknown;
}

export const define = (sequelize: Sequelize): IUserLocationTrailModel => {
    const model = sequelize.define<IUserLocationTrailInstance>('userLocationTrail', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false // Assuming userId cannot be null
        },
        latitude: {
          type: DataTypes.FLOAT,
          allowNull: false
        },
        longitude: {
          type: DataTypes.FLOAT,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
    }, {
        freezeTableName: true
    });

    // Assuming you want to associate with other models
    (model as any).associate = (models: IModelFactory) => {
        (model as any).belongsTo(models.User);
    };

    return model as unknown as IUserLocationTrailModel;
};

export function defineUserLocationTrail(database: Sequelize): any {
  const UserLocationTrail = define(database);

  // Assuming you want to associate with other models
  (UserLocationTrail as any).associate = (models: any) => {
    (UserLocationTrail as any).belongsTo(models.User);
  };

  return UserLocationTrail;
}
