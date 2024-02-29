import { Sequelize, DataTypes, Model, ModelStatic } from 'sequelize';

// Define the attributes interface for the Role model
export interface IRoleAttributes {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
}

// Define the Role model interface
export interface IRoleInstance extends Model<IRoleAttributes>, IRoleAttributes {}

// Define the Role model factory function
export const RoleFactory = (sequelize: Sequelize): ModelStatic<IRoleInstance> => {
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
    }) as ModelStatic<IRoleInstance>;

    // Define associations if needed
    (Role as any).associate = (_models: any) => {
        // Define associations here
    };

    return Role;
};

// Export the Role model factory function and the Role model interface
export { RoleFactory as define, IRoleInstance as IRoleModel };
