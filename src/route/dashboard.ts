import Router from 'koa-router';
import { Context, Next } from 'koa';
import * as ctrl from '../controller/dashboard';
import authentication from '../middleware/authentication';
import { Role } from '../enum/role';

// Define your authorization middleware
const authorization = (roles: Role[]) => {
    return async (ctx: Context, next: Next) => {
        // Logic to check if the user has one of the required roles
        // For example:
        const userRoles: Role[] = ctx.state.user.roles;
        const authorized = roles.some(role => userRoles.includes(role));

        if (!authorized) {
            ctx.throw(403, 'Unauthorized');
            return;
        }

        await next();
    };
};

const router = new Router({
    prefix: `/api/dashboard`,
});

// Apply authentication middleware
router.use(authentication);

// Define your routes
router.get('/admin/statistics', authorization([Role.SUPER_ADMIN]), async (ctx: Context, next: Next) => {
    await ctrl.getAdminDashboardStatistics(ctx, next);
});

export default router.routes();