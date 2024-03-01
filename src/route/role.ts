import Router from 'koa-router';
import * as ctrl from '../controller/user-location-trail';
import authentication from '../middleware/authentication';
import { Context, Next } from 'koa';
import { Role } from '../enum/role';

interface IAuthorizationContext extends Context {
  userRole: Role;
}

const router = new Router({
  prefix: '/api/user-location-trail',
});

const authorizationMiddleware = (allowGuest: boolean, allowedRoles: Role[]): any => {
  return async (ctx: IAuthorizationContext, next: Next) => {
    if (!allowGuest && !ctx.state.user) {
      return ctx.unauthorized();
    }

    if (allowedRoles.length > 0 && allowedRoles.indexOf(ctx.state.user.role) === -1) {
      return ctx.forbidden();
    }

    await next();
  };
};

router.get('/', authorizationMiddleware(false, [Role.SUPER_ADMIN]), async (ctx, next) => {
  // Your route handler logic here
});

router.post('/', async (ctx, next) => {
  // Your route handler logic here
});

export default router.routes();