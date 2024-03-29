import * as Sequelize from 'sequelize';
import { Models } from '../models/index';

export const authenticate = async (email: string, password: string) => {
    const where: any = {
        email,
        deletedAt: {
            [Sequelize.Op.is]: null
        }
    };
    if (password) {
        where.password = password;
    }
    return Models.User.findOne({
        where,
        include: [{
            model: Models.UserRole,
            include: [{
                model: Models.Role,
                attributes: ['id', 'name']
            }],
            attributes: ['id', 'userId', 'roleId']
        }]
    });
};

export const getActiveUserCount = async () => {
    return Models.User.count({
        where: {
            isActive: true
        }
    });
};

export const getInActiveUserCount = async () => {
    return Models.User.count({
        where: {
            isActive: false
        }
    });
};

export const getAll = async () => {
    return Models.User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'email', 'contactNo', 'gender', 'pictureUrl',
            'managerId', 'departmentId', 'officeLocationId', 'isActive', 'createdAt', 'updatedAt'],
        include: [{
            model: Models.UserRole,
            include: [Models.Role]
        }],
        where: {
            deletedAt: {
                [Sequelize.Op.is]: null as any // Cast null as any to resolve type issue
            }
        },
    });
};

export const getByDepartmentId = async (departmentId: number, loggedInUserId: string) => {
    return Models.User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'email', 'contactNo', 'gender', 'pictureUrl',
            'managerId', 'departmentId', 'officeLocationId', 'isActive', 'createdAt', 'updatedAt'],
        include: [{
            model: Models.UserRole,
            required: true, // Ensure the association is required for the query
            where: {
                userId: loggedInUserId // Filter by userId in UserRole
            }
        }],
        where: {
            deletedAt: {
                [Sequelize.Op.is]: null as any
            },
            departmentId // Short for departmentId: departmentId
        },
    });
};

export const findById = async (id: string) => {
    return Models.User.findOne({
        attributes: ['id', 'firstName', 'lastName', 'email', 'contactNo', 'gender', 'pictureUrl',
             'managerId', 'departmentId', 'officeLocationId', 'isActive', 'createdAt', 'updatedAt'],
        include: [{
            model: Models.UserRole,
            include: [Models.Role]
        }],
        where: {
            id,
            deletedAt: {
                [Sequelize.Op.is]: null as any // Cast null as any to resolve type issue
            }
        },
    });
};

export const findByIds = async (id: string[]) => {
    return Models.User.findAll({
        where: {
            id: {
                [Sequelize.Op.in]: id
            }
        },
    });
};

export const findByEmail = async (email: string) => {
    return Models.User.findOne({
        where: {
            email
        },
    });
};

export const saveUser = async (user: any) => {
    return Models.User.create(user);
};

export const upsertUser = async (user: any) => {
    return Models.User.upsert(user, { returning: true });
};

export const saveUserRoles = async (userRoles: any) => {
    return Models.UserRole.bulkCreate(userRoles);
};

export const updateUser = async (id: string, user: any) => {
    return Models.User.update(user, { where: { id }});
};

// export const deleteUserRoles = async (userId: string) => {
//     return Models.UserRole.destroy({ where: { userId: userId } });
// };

export const deleteUser = async (loggedInUserId: string, userId: string) => {
    return Models.User.update({ deletedAt: new Date(), deletedBy: loggedInUserId }, { where: { id: userId }});
};
