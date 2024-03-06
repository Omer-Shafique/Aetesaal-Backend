import Router, { IMiddleware } from 'koa-router';
import * as ctrl from '../controller/user-location-trail';
import authentication from '../middleware/authentication';
import authorization from '../middleware/authorization';
import { Role } from '../enum/role';
import { Context, DefaultContext, DefaultState, Middleware, Next, ParameterizedContext } from 'koa';

interface MyContext extends Context {
  preresponse: any;
  token: any;
  accessToken: any;
  pagination: any;
  state: DefaultState;
}

const router = new Router<MyContext>({
  prefix: `/api/user-location-trail`,
});

const authMiddleware: Middleware<MyContext> = async (ctx: ParameterizedContext<DefaultState, DefaultContext, MyContext>, next: Next) => {
  await authentication(ctx, () => next());
};

router.use(authMiddleware);
const authorizedGetAll: Middleware<MyContext> = async (ctx: any , next: Next) => {
  await authorization(true, [Role.SUPER_ADMIN])(ctx, () => next());
  await ctrl.getAll(ctx, () => {});
};

router.get('/', authorizedGetAll);

router.post('/', (ctx: any, next: Next) => ctrl.saveUserLocationTrail(ctx, next));

export default router.routes();
