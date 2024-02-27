// Import necessary modules and types
import * as Sequelize from 'sequelize';
import { Database } from './../bootstrap/database';
import { define as defineRole, IRoleInstance } from './role'; 
import { define as defineUser, IUserInstance } from './user';
import { define as defineGroup, Group } from './group';
import { NotificationModel } from './notification';
import { define as defineDepartment, IDepartmentInstance } from './department'; // Updated import
import { define as defineUserGroup, IUserGroupInstance } from './user-group'; // Updated import
import { define as defineApplicationWorkflow, IApplicationWorkflowInstance } from './application-workflow'; // Updated import
import { define as defineApplicationFormSection, ApplicationFormSectionInstance } from './application-form-section'; // Updated import
import { define as defineApplicationFormField, IApplicationFormFieldInstance } from './application-form-field';
import { define as defineApplicationWorkflowPermission, IApplicationWorkflowPermissionInstance } from './application-workflow-permission';
import { define as defineApplicationWorkflowFieldPermission, IApplicationWorkflowFieldPermissionInstance } from './application-workflow-field-permission';
import { define as defineApplicationExecution, IApplicationExecutionInstance } from './application-execution';
import { define as defineApplicationExecutionForm, IApplicationExecutionFormInstance } from './application-execution-form';
import { define as defineApplicationExecutionWorkflow, IApplicationExecutionWorkflowInstance } from './application-execution-workflow';
import { define as defineUserLocationTrail, IUserLocationTrailInstance } from './user-location-trail';
import { UserRole } from './user-role';

// Define the IModelFactory interface including Role model
export interface IModelFactory {
  Lookup: any;
  UserRole: Sequelize.ModelStatic<IRoleInstance>;
  Role: Sequelize.ModelStatic<IRoleInstance>;
  User: Sequelize.ModelStatic<IUserInstance>;
  Department: Sequelize.ModelStatic<IDepartmentInstance>;
  OfficeLocation: any; // Updated with correct type
  Group: Sequelize.ModelStatic<Group>;
  UserGroup: Sequelize.ModelStatic<IUserGroupInstance>;
  Application: Sequelize.ModelStatic<any>;
  ApplicationWorkflow: Sequelize.ModelStatic<IApplicationWorkflowInstance>;
  ApplicationFormSection: Sequelize.ModelStatic<ApplicationFormSectionInstance>; // Updated type
  ApplicationFormField: Sequelize.ModelStatic<IApplicationFormFieldInstance>;
  ApplicationWorkflowPermission: Sequelize.ModelStatic<IApplicationWorkflowPermissionInstance>;
  ApplicationWorkflowFieldPermission: Sequelize.ModelStatic<IApplicationWorkflowFieldPermissionInstance>;
  ApplicationExecution: Sequelize.ModelStatic<IApplicationExecutionInstance>;
  ApplicationExecutionForm: Sequelize.ModelStatic<IApplicationExecutionFormInstance>;
  ApplicationExecutionWorkflow: Sequelize.ModelStatic<IApplicationExecutionWorkflowInstance>;
  Notification: typeof NotificationModel;
  UserLocationTrail: Sequelize.ModelStatic<IUserLocationTrailInstance>; // Updated type
  ListOfValue: any;
  LookupData: any;
}

// Define the models object including Role model
const models: IModelFactory = {
  Role: defineRole(Database),
  User: defineUser(Database),
  Department: defineDepartment(Database),
  OfficeLocation: {}, // Updated with correct initialization
  Group: defineGroup(Database),
  UserGroup: defineUserGroup(Database),
  Application: defineApplicationModel(Database),
  ApplicationWorkflow: defineApplicationWorkflow(Database),
  ApplicationFormSection: defineApplicationFormSection(Database),
  ApplicationFormField: defineApplicationFormField(Database),
  ApplicationWorkflowPermission: defineApplicationWorkflowPermission(Database),
  ApplicationWorkflowFieldPermission: defineApplicationWorkflowFieldPermission(Database),
  ApplicationExecution: defineApplicationExecution(Database),
  ApplicationExecutionForm: defineApplicationExecutionForm(Database),
  ApplicationExecutionWorkflow: defineApplicationExecutionWorkflow(Database),
  Notification: NotificationModel,
  UserLocationTrail: defineUserLocationTrail(Database) as unknown as Sequelize.ModelStatic<IUserLocationTrailInstance>,
  ListOfValue: {}, 
  LookupData: {},
  Lookup: undefined,
  UserRole: UserRole(Database) as unknown as Sequelize.ModelStatic<IRoleInstance>

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
function defineApplicationModel(database: Sequelize.Sequelize): Sequelize.ModelStatic<any> {
  // Define your application model here
  // Example:
  const Application = database.define('Application', {
    // Define your application model attributes here
  });

  // Define any associations or methods here

  return Application;
}