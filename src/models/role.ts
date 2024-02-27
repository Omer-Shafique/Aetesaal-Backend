import { Sequelize, DataTypes, Model, ModelCtor, Optional } from 'sequelize';

// Define the attributes interface for the Role model
export interface IRoleAttributes {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
}

// Define the Role model interface
export interface IRoleInstance extends Model<IRoleAttributes>, IRoleAttributes {}

// Define the Role model factory interface
export interface IRoleFactory {
    createModel(sequelize: Sequelize): ModelCtor<IRoleInstance>;
}

// Define the Role model factory function
export const RoleFactory: IRoleFactory = {
    createModel: (sequelize: Sequelize) => {
        // Define the Role model
        const Role = sequelize.define<IRoleInstance>('Role', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
        }, {
            freezeTableName: true
        }) as ModelCtor<IRoleInstance>;

        // Define associations if needed
        (Role as any).associate = (_models: any) => {
            // Define associations here
        };

        return Role;
    }
};
