import * as Sequelize from 'sequelize';
import { Database } from './../bootstrap/database';
import * as Role from './role'; // Import Role module from role.ts
import * as User from './user';
import * as Department from './department';
import * as OfficeLocation from './office-location';
import * as Group from './group';
import * as UserGroup from './user-group';
import * as ApplicationWorkflow from './application-workflow';
import * as ApplicationFormSection from './application-form-section';
import * as ApplicationFormField from './application-form-field';
import * as ApplicationWorkflowPermission from './application-workflow-permission';
import * as ApplicationWorkflowFieldPermission from './application-workflow-field-permission';
import * as ApplicationExecution from './application-execution';
import * as ApplicationExecutionForm from './application-execution-form';
import * as ApplicationExecutionWorkflow from './application-execution-workflow';
import * as Notification from './notification';
import * as UserLocationTrail from './user-location-trail';

// Define the IModelFactory interface including Role model
export interface IModelFactory {
  Lookup: any;
  UserRole: ModelStatic<Model<any, any>>;
  Role: Role.IRoleModel;
  User: User.IUserModel;
  Department: Department.IDepartmentModel;
  OfficeLocation: OfficeLocation.IOfficeLocationModel;
  Group: Group.IGroupModel;
  UserGroup: UserGroup.IUserGroupModel;
  Application: Sequelize.ModelCtor<any>;
  ApplicationWorkflow: ApplicationWorkflow.IApplicationWorkflowModel;
  ApplicationFormSection: Sequelize.ModelCtor<ApplicationFormSection.ApplicationFormSectionInstance>;
  ApplicationFormField: ApplicationFormField.IApplicationFormFieldModel;
  ApplicationWorkflowPermission: ApplicationWorkflowPermission.IApplicationWorkflowPermissionModel;
  ApplicationWorkflowFieldPermission: ApplicationWorkflowFieldPermission.IApplicationWorkflowFieldPermissionModel;
  ApplicationExecution: Sequelize.ModelCtor<ApplicationExecution.IApplicationExecutionInstance>;
  ApplicationExecutionForm: ApplicationExecutionForm.IApplicationExecutionFormModel;
  ApplicationExecutionWorkflow: ApplicationExecutionWorkflow.IApplicationExecutionWorkflowModel;
  Notification: Notification.INotificationModel;
  UserLocationTrail: UserLocationTrail.IUserLocationTrailModel;
  ListOfValue: any;
  LookupData: any;
}

// Define the models object including Role model
const models: IModelFactory = {
  Role: Role.define(Database),
  User: User.define(Database),
  Department: Department.define(Database),
  OfficeLocation: OfficeLocation.define(Database),
  Group: Group.define(Database),
  UserGroup: UserGroup.define(Database),
  Application: defineApplicationModel(Database),
  ApplicationWorkflow: ApplicationWorkflow.define(Database),
  ApplicationFormSection: ApplicationFormSection.define(Database),
  ApplicationFormField: ApplicationFormField.define(Database),
  ApplicationWorkflowPermission: ApplicationWorkflowPermission.define(Database),
  ApplicationWorkflowFieldPermission: ApplicationWorkflowFieldPermission.define(Database),
  ApplicationExecution: ApplicationExecution.define(Database),
  ApplicationExecutionForm: ApplicationExecutionForm.define(Database),
  ApplicationExecutionWorkflow: ApplicationExecutionWorkflow.define(Database),
  Notification: Notification.define(Database),
  UserLocationTrail: UserLocationTrail.define(Database),
  ListOfValue: {}, // Placeholder initialization for ListOfValue interface
  LookupData: {}, // Placeholder initialization for LookupData interface
};

// Associate models if needed
Object.keys(models).forEach((key: keyof IModelFactory) => {
  const model = models[key];

  if ('associate' in model) {
    model.associate(models);
  }
});

// Export the models object
export const Models: IModelFactory = models;

// Function to define the application model
function defineApplicationModel(database: Sequelize.Sequelize): Sequelize.ModelCtor<any> {
  // Define your application model here
  // Example:
  const Application = database.define('Application', {
    // Define your application model attributes here
  });

  // Define any associations or methods here

  return Application;
}
