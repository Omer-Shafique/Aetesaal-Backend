import Router from 'koa-router';
import * as ctrl from '../controller/report';
import authentication from '../middleware/authentication';
import authorization from '../middleware/authorization';
import { Role } from '../enum/role';

const router = new Router({
  prefix: `/api/report`,
});

// Define the middleware function
const myMiddleware = async (ctx: any, next: any) => {
  try {
    // Add your authorization logic here
    await authorization(false, [Role.SUPER_ADMIN])(ctx, next);
  } catch (error) {
    ctx.throw(403, 'Forbidden');
  }
};

router.use(authentication);
router.use(myMiddleware);

router.get('/my-item', async (ctx: any, next) => {
  await ctrl.getMyItemReport(ctx , next);
});

router.get('/workload/:userId', async (ctx: any, next) => {
  await ctrl.getUserWorkloadReport(ctx, next);
});

router.get('/application/:applicationId/time', async (ctx: any, next) => {
  await ctrl.getApplicationExecutionTimeReport(ctx, next);
});

router.get('/application/:applicationId/metrics', async (ctx: any, next) => {
  await ctrl.getTotalExecutionsCountReport(ctx, next);
});

router.get('/application/:applicationId/metrics/graph', async (ctx: any, next) => {
  await ctrl.getTotalExecutionsCountGraph(ctx, next);
});

router.get('/application/:applicationId/location', async (ctx: any, next) => {
  await ctrl.getApplicationExecutionLocationReport(ctx, next);
});

export default router.routes();

// import Router from 'koa-router';
// import * as ctrl from '../controller/report';
// import authentication from '../middleware/authentication';
// import authorization from '../middleware/authorization';
// import { Context, Next, ParameterizedContext } from 'koa';  // Import the necessary types

// enum Role {  // Define the Role enum if it's missing
//   SUPER_ADMIN,
//   // Add other roles as needed
// }

// const router = new Router({
//   prefix: `/api/report`,
// });

// // Define the middleware function
// const myMiddleware = async (ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>>, next: Next): Promise<void> => {
//   try {
//     // Add your authorization logic here
//     await authorization(false, [Role.SUPER_ADMIN])(ctx, next);
//   } catch (error) {
//     ctx.throw(403, 'Forbidden');
//   }
// };

// router.use(authentication);
// router.use(myMiddleware);

// router.get('/my-item', async (ctx: Context, next: Next) => {
//   await ctrl.getMyItemReport(ctx, next);
// });

// router.get('/workload/:userId', async (ctx: Context, next: Next) => {
//   await ctrl.getUserWorkloadReport(ctx, next);
// });

// router.get('/application/:applicationId/time', async (ctx: Context, next: Next) => {
//   await ctrl.getApplicationExecutionTimeReport(ctx, next);
// });

// router.get('/application/:applicationId/metrics', async (ctx: Context, next: Next) => {
//   await ctrl.getTotalExecutionsCountReport(ctx, next);
// });

// router.get('/application/:applicationId/metrics/graph', async (ctx: Context, next: Next) => {
//   await ctrl.getTotalExecutionsCountGraph(ctx, next);
// });

// router.get('/application/:applicationId/location', async (ctx: Context, next: Next) => {
//   await ctrl.getApplicationExecutionLocationReport(ctx, next);
// });

// export default router.routes();
