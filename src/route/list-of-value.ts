import Router from 'koa-router';
import authentication from '../middleware/authentication';
import * as ctrl from '../controller/list-of-value';
import { Next } from 'koa';

const router = new Router({
  prefix: `/api/list-of-value`
});

// Define authentication middleware with correct typing
const authMiddleware = async (ctx: Router.IRouterContext, next: Next) => {
  // Your authentication logic here
  await authentication(ctx, next); // Assuming your authentication middleware accepts ctx and next
};

router.use(authMiddleware); // Apply authMiddleware globally to all routes

router.get('/', async (ctx: Router.IRouterContext) => {
  await ctrl.findByKeys(ctx);
});

export default router.routes();