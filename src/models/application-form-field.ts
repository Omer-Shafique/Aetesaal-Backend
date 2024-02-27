import { DataTypes, Model, ModelCtor, Sequelize } from 'sequelize';

export interface IApplicationFormFieldAttributes {
    id?: string;
    applicationFormSectionId?: string;
    name: string;
    helpText: string;
    fieldId: string;
    key: string;
    type: string;
    defaultValue: string;
    icon: string;
    templateName: string;
    templateOptions: any;
    lookupId: number;
    order: number;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    permission?: string; // custom
}

export interface IApplicationFormFieldInstance extends Model<IApplicationFormFieldAttributes>, IApplicationFormFieldAttributes {}

export interface IApplicationFormFieldModel extends ModelCtor<IApplicationFormFieldInstance> {
    associate: (models: any) => void;
    belongsTo: any;
    hasMany: any;
    // Add any additional properties and methods here
}

export const define = (sequelize: Sequelize): IApplicationFormFieldModel => {
    const model = sequelize.define<IApplicationFormFieldInstance>('applicationFormField', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        applicationFormSectionId: {
            type: DataTypes.UUID,
            references: {
                model: 'applicationFormSection',
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        helpText: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
        fieldId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        key: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        defaultValue: {
            type: DataTypes.STRING,
            allowNull: true
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: true
        },
        templateName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        templateOptions: {
            type: DataTypes.JSONB,
            allowNull: true
        },
        lookupId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
    }, {
        freezeTableName: true,
        timestamps: true
    }) as unknown as IApplicationFormFieldModel; // Cast the model to the correct type

    model.associate = (models: any) => {
        model.belongsTo(models.ApplicationFormSection, { foreignKey: 'applicationFormSectionId', as: 'formSection' });
        // model.belongsTo(models.Lookup);

        model.hasMany(models.ApplicationWorkflowFieldPermission, { foreignKey: 'applicationFormFieldId', as: 'workflowFieldPermissions' });
    };

    return model;
};
