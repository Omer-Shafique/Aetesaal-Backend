import Router, { Middleware } from 'koa-router';
import * as ctrl from '../controller/user-location-trail';
import authentication from '../middleware/authentication';
import authorization from '../middleware/authorization';
import { Role } from '../enum/role';
import { Context, DefaultContext, DefaultState, Next, ParameterizedContext } from 'koa';

// Define MyContext by adding custom properties to Context
interface MyContext extends Context {
  // Add any custom properties here
  preresponse?: any;
  token?: any;
  accessToken?: any;
  pagination?: any;
}

const router = new Router<MyContext>({
  prefix: `/api/user-location-trail`,
});

// Middleware function using MyContext
const authMiddleware: Middleware<MyContext> = async (ctx: ParameterizedContext<DefaultState, DefaultContext, MyContext>, next: Next) => {
  await authentication(ctx, next);
};

router.use(authMiddleware); // Apply authentication middleware

const authorizedGetAll: Middleware<MyContext> = async (ctx : any, next: any) => {
  await authorization(false, [Role.SUPER_ADMIN])(ctx, next); // Assuming authorization returns a function to handle the next middleware
  await ctrl.getAll(ctx, next);
};

router.get('/', authorizedGetAll);
router.post('/', ctrl.saveUserLocationTrail); 

export default router.routes();