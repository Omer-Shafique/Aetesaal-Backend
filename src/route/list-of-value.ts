import Router, { Context, Middleware } from 'koa-router'; // Import Context and Middleware
import authentication from '../middleware/authentication';
import * as ctrl from '../controller/list-of-value';

const router = new Router({
  prefix: `/api/list-of-value`
});

// Adjust middleware signature to match the Context type from Koa
const authMiddleware: Middleware = async (ctx: Context, next: () => Promise<void>) => {
  // Your authentication logic here
  await authentication(ctx, next); // Assuming your authentication middleware accepts ctx and next
};

router.use(authMiddleware); // Use the correct middleware

router.get('/', async (ctx: Context) => {
  await ctrl.findByKeys(ctx); // Pass ctx to findByKeys function
});

export default router.routes();