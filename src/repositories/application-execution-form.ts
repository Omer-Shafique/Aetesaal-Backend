import * as Sequelize from 'sequelize';
import { Models } from '../models/index';
import {
    IApplicationExecutionFormInstance,
    IApplicationExecutionFormAttributes,
    IApplicationExecutionFormModel // Make sure this interface includes findAll and findOne properties
} from '../models/application-execution-form';
import { Database } from '../bootstrap/database';

export const getByApplicationExecutionId = async (applicationExecutionId: string) => {
    return Models.ApplicationExecutionForm.findAll({
        attributes: ['id', 'applicationExecutionId', 'applicationFormFieldId', 'value', 'createdAt', 'updatedAt'],
        where: {
            isActive: true,
            applicationExecutionId
        },
        include: [{
            model: Models.ApplicationFormField,
            where: {
                isActive: true
            }
        }]
    });
};

export const findByIds = async (ids: string[]) => {
    return Models.ApplicationExecutionForm.findAll({ where: { id: { [Sequelize.Op.in]: ids } } });
};

export const saveApplicationExecutionForm = async (applicationExecutionForm: IApplicationExecutionFormAttributes) => {
    return Models.ApplicationExecutionForm.upsert(applicationExecutionForm, { returning: true })
        .then((res: [IApplicationExecutionFormInstance, boolean | null]) => res[0]); // Explicitly typing res
};

export const deleteApplicationExecutionForm = async (id: string) => {
    return Models.ApplicationExecutionForm.update({ isActive: false }, { where: { id } });
};

export function getByApplicationExecutionIdAndFieldId(_id: string, _fieldId: string) {
    throw new Error('Function not implemented.');
}
export function getExecutionIdsByStartEndDate(_applicationId: string, _startDate: string, _endDate: string, _status: string) {
    throw new Error('Function not implemented.');
}

