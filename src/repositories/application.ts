import { Sequelize, Op } from 'sequelize';
import { IApplicationAttributes } from '../models/application';
import { Models } from '../models';

type ApplicationUpsertAttributes = Omit<IApplicationAttributes, 'id'>;

export const getAllApplications = async (userId: string) => {
    return Models.Application.findAll({
        where: {
            isActive: true,
            deletedAt: null,
            [Op.or]: {
                canAllStart: true,
                createdBy: userId,
                userIds: {
                    [Op.like]: `%${userId}%`
                }
            },
        },
        order: [['createdAt', 'DESC']]
    });
};

export const getCount = async () => {
    return Models.Application.count({
        where: {
            isActive: true
        }
    });
};

export const findById = async (id: string) => {
    return Models.Application.findOne({ where: { id } });
};

export const saveApplication = async (application: ApplicationUpsertAttributes) => {
    return Models.Application.upsert(application, { returning: true })
        .then((res: any) => res[0]); // Adjusted type usage
};

export const publishApplication = async (
    id: string, editableUserIds: string,
    canAllEdits: boolean, subject: string) => {
    return Models.Application.update({ isPublished: true, editableUserIds, canAllEdits, subject }, { where: { id } })
        .then((res: any) => res[0]); // Adjusted type usage
};

export const deleteApplication = async (id: string, deletedAt: Date, deletedBy: string) => {
    return Models.Application.update({ isActive: false, deletedAt, deletedBy }, { where: { id } });
};
