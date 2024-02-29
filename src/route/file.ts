import Router from 'koa-router';
import { Context, Next } from 'koa';
import authentication from '../middleware/authentication';
import * as ctrl from '../controller/file';

const router = new Router({
  prefix: `/api/file`,
});

// Middleware function
const authorizeFileAccess = async (ctx: Context, next: Next): Promise<void> => {
  // Your authorization logic here
  // For example, checking if the user has permission to access the file
  if (!ctx.state.user || !ctx.state.user.hasPermission) {
    ctx.throw(403, 'Unauthorized');
    return;
  }

  // If authorized, proceed to the next middleware or route handler
  await next();
};

router.use(authentication); // Apply authentication middleware

// Apply authorization middleware for specific routes
router.post('/picture', authorizeFileAccess, ctrl.saveProfilePicture);
router.post('/execution', authorizeFileAccess, ctrl.saveExecutionFile);

export default router.routes();