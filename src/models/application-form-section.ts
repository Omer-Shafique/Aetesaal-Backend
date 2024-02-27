import { Sequelize, Model, DataTypes, ModelCtor, Optional } from 'sequelize';
import { IApplicationFormFieldInstance } from './application-form-field';

// Define the attributes interface
interface ApplicationFormSectionAttributes {
    id: string;
    applicationId: string;
    name: string;
    helpText: string;
    type: string;
    order: number;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

// Define the instance interface with optional attributes
export interface ApplicationFormSectionCreationAttributes extends Optional<ApplicationFormSectionAttributes, 'id'> {}

export interface ApplicationFormSectionInstance extends Model<ApplicationFormSectionAttributes, ApplicationFormSectionCreationAttributes>, ApplicationFormSectionAttributes {}

export const define = (sequelize: Sequelize): ModelCtor<ApplicationFormSectionInstance> => {
    // Define the model
    const ApplicationFormSection = sequelize.define<ApplicationFormSectionInstance>('ApplicationFormSection', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        applicationId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        helpText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        freezeTableName: true,
        timestamps: true,
    });

    // Define associations
    const associate = (models: { [key: string]: ModelCtor<any> }) => {
        ApplicationFormSection.belongsTo(models.Application, { foreignKey: 'applicationId', as: 'application' });
        ApplicationFormSection.hasMany(models.ApplicationFormField, { foreignKey: 'applicationFormSectionId', as: 'fields' });
    };

    // Add associations to the model
    associate(sequelize.models);

    return ApplicationFormSection;
};
