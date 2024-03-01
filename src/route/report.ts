import Router from 'koa-router';
import { Context, Next } from 'koa';
import * as ctrl from '../controller/report';
import authentication from '../middleware/authentication';
import authorization from '../middleware/authorization';
import { Role } from '../route/role'; 

const router = new Router({
  prefix: `/api/report`,
});

// Apply global middleware if needed
// router.use(async (ctx: Context, next: Next) => {
//   // Your middleware logic here
//   await next();
// });

// Apply authentication middleware
router.use(authentication);

// Apply authorization middleware with specific roles
router.use(authorization(false, [Role.SUPER_ADMIN, Role.ANOTHER_ROLE]));

// Route for getting application execution time report
router.get('/application/:applicationId/time', async (ctx: Context, next: Next) => {
  try {
    await ctrl.getApplicationExecutionTimeReport(ctx, next);
  } catch (err) {
    // Handle errors
    console.error(err);
    ctx.throw(500, 'Internal Server Error');
  }
});

// Route for getting total executions count report
router.get('/application/:applicationId/metrics', async (ctx: Context, next: Next) => {
  try {
    await ctrl.getTotalExecutionsCountReport(ctx, next);
  } catch (err) {
    // Handle errors
    console.error(err);
    ctx.throw(500, 'Internal Server Error');
  }
});

// Route for getting total executions count graph
router.get('/application/:applicationId/metrics/graph', async (ctx: Context, next: Next) => {
  try {
    await ctrl.getTotalExecutionsCountGraph(ctx, next);
  } catch (err) {
    // Handle errors
    console.error(err);
    ctx.throw(500, 'Internal Server Error');
  }
});

// Route for getting application execution location report
router.get('/application/:applicationId/location', async (ctx: Context, next: Next) => {
  try {
    await ctrl.getApplicationExecutionLocationReport(ctx, next);
  } catch (err) {
    // Handle errors
    console.error(err);
    ctx.throw(500, 'Internal Server Error');
  }
});

export default router.routes();