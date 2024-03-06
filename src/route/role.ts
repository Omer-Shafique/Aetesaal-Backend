import Router from 'koa-router';
import { Context, Next } from 'koa';
import * as userCtrl from '../controller/user';
import authentication from '../middleware/authentication';
import authorization from '../middleware/authorization';
import { Role } from '../enum/role';

const router = new Router({
  prefix: `/api/user`,
});

router.use(authentication); // Apply authentication middleware to all routes in this router

router.get('/', async (ctx: any, next: Next) => {
  await authorization(false, [Role.ADMIN])(ctx, next); // Only allow admin role to access this route
  await userCtrl.getAll(ctx, next);
});

router.get('/me', async (ctx: any, next: Next) => {
  await userCtrl.getUser(ctx, next);
});

router.get('/:userId', async (ctx: any, next: Next) => {
  await userCtrl.getUserById(ctx, next);
});

router.get('/department/:departmentId', async (ctx: any, next: Next) => {
  await userCtrl.getUserByDepartmentId(ctx, next);
});

router.post('/', async (ctx: any, next: Next) => {
  await userCtrl.saveUser(ctx, next);
});

router.put('/change-password', async (ctx: any, next: Next) => {
  await userCtrl.changePassword(ctx, next);
});

router.delete('/:userId/delete', async (ctx: any, next: Next) => {
  await userCtrl.deleteUser(ctx, next);
});

export default router.routes();

// import Router from 'koa-router';
// import { Context, Next } from 'koa';
// import * as userCtrl from '../controller/user';
// import authentication from '../middleware/authentication';
// import authorization from '../middleware/authorization';
// import { Role } from '../enum/role';

// const router = new Router({
//   prefix: `/api/user`,
// });

// router.use(authentication); // Apply authentication middleware to all routes in this router

// router.get('/', async (ctx: Context, next: Next) => {
//   await authorization(false, [Role.ADMIN])(ctx, next); // Only allow admin role to access this route
//   await userCtrl.getAll(ctx, next);
// });

// router.get('/me', async (ctx: Context, next: Next) => {
//   await userCtrl.getUser(ctx, next);
// });

// router.get('/:userId', async (ctx: Context, next: Next) => {
//   await userCtrl.getUserById(ctx, next);
// });

// router.get('/department/:departmentId', async (ctx: Context, next: Next) => {
//   await userCtrl.getUserByDepartmentId(ctx, next);
// });

// router.post('/', async (ctx: Context, next: Next) => {
//   await userCtrl.saveUser(ctx, next);
// });

// router.put('/change-password', async (ctx: Context, next: Next) => {
//   await userCtrl.changePassword(ctx, next);
// });

// router.delete('/:userId/delete', async (ctx: Context, next: Next) => {
//   await userCtrl.deleteUser(ctx, next);
// });

// export default router.routes();
