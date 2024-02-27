import { Models } from '../models/index';
import {
    IApplicationWorkflowFieldPermissionInstance,
    IApplicationWorkflowFieldPermissionAttributes
} from '../models/application-workflow-field-permission';

export const findById = async (id: string) => {
    return Models.ApplicationWorkflowFieldPermission.findOne({ where: { id } });
};

export const findByIds = async (ids: string[]) => {
    return Models.ApplicationWorkflowFieldPermission.findAll({ where: { id: ids } });
};

export const getByApplicationId = async (applicationId: string) => {
    return Models.ApplicationWorkflowFieldPermission.findAll({ where: { applicationId } });
};

export const saveApplicationWorkflowFieldPermission =
    async (applicationWorkflowFieldPermission: IApplicationWorkflowFieldPermissionAttributes) => {
        return Models.ApplicationWorkflowFieldPermission.upsert(applicationWorkflowFieldPermission, { returning: true })
            .then((res: IApplicationWorkflowFieldPermissionInstance[]) => res[0]);
    };

export const deleteApplicationWorkflowFieldPermission = async (id: string) => {
    const permission = await Models.ApplicationWorkflowFieldPermission.findOne({ where: { id } });
    return permission ? permission.destroy() : null;
};

export const hardDeleteApplicationWorkflowFieldPermission = async (applicationId: string) => {
    const permissions = await Models.ApplicationWorkflowFieldPermission.findAll({ where: { applicationId } });
    return permissions.length > 0 ? Promise.all(permissions.map((permission: { destroy: () => any; }) => permission.destroy())) : null;
};
