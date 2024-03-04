import Router from 'koa-router';
import * as ctrl from '../controller/auth';
import * as userCtrl from '../controller/user';
import { Context, Next } from 'koa';

// Define the authentication middleware with the correct signature
async function authenticationMiddleware(_ctx: any, next: Next): Promise<void> {
    // Your authentication logic here
    await next();
}

// Define the authorization middleware with the correct signature
async function authorizationMiddleware(_ctx: any, next: Next): Promise<void> {
    // Your authorization logic here
    await next();
}

const router = new Router({
  prefix: `/api/user`,
});

// Use the authentication middleware for all routes defined after this line
router.use(authenticationMiddleware);

router.get('/', authorizationMiddleware, async (ctx: Context, next: Next) => {
    await userCtrl.getAll(ctx, next);
});

router.get('/me', async (ctx: any, next: Next) => {
    await userCtrl.getUser(ctx, next);
});

router.get('/:userId', authorizationMiddleware, async (ctx: Context, next: Next) => {
    await userCtrl.getUserById(ctx, next);
});

router.get('/department/:departmentId', authorizationMiddleware, async (ctx: Context, next: Next) => {
    await userCtrl.getUserByDepartmentId(ctx, next);
});

router.post('/', authorizationMiddleware, async (ctx: Context, next: Next) => {
    await userCtrl.saveUser(ctx, next);
});

router.put('/change-password', async (ctx: any, next: Next) => {
    await ctrl.changePassword(ctx, next);
});

router.delete('/:userId/delete', authorizationMiddleware, async (ctx: Context, next: Next) => {
    await userCtrl.deleteUser(ctx, next);
});

export default router.routes();






















// import Router from 'koa-router';
// import * as ctrl from '../controller/auth';
// import * as userCtrl from '../controller/user';
// import authentication from '../middleware/authentication';
// import authorization from '../middleware/authorization';
// import { Role } from '../enum/role';
// import { Context, Next } from 'koa';

// // Define the authentication middleware with the correct signature
// async function authenticationMiddleware(ctx: Context, next: Next): Promise<void> {
//     // Your authentication logic here
//     await next();
// }

// // Define the authorization middleware with the correct signature
// async function authorizationMiddleware(ctx: Context, next: Next): Promise<void> {
//     // Your authorization logic here
//     await next();
// }

// const router = new Router({
//   prefix: `/api/user`,
// });

// // Use the authentication middleware for all routes defined after this line
// router.use(authenticationMiddleware);

// router.get('/', authorizationMiddleware, async (ctx: Context, next: Next) => {
//     await userCtrl.getAll(ctx, next);
// });

// router.get('/me', async (ctx: Context, next: Next) => {
//     await userCtrl.getUser(ctx, next);
// });

// router.get('/:userId', authorizationMiddleware, async (ctx: Context, next: Next) => {
//     await userCtrl.getUserById(ctx, next);
// });

// router.get('/department/:departmentId', authorizationMiddleware, async (ctx: Context, next: Next) => {
//     await userCtrl.getUserByDepartmentId(ctx, next);
// });

// router.post('/', authorizationMiddleware, async (ctx: Context, next: Next) => {
//     await userCtrl.saveUser(ctx, next);
// });

// router.put('/change-password', async (ctx: Context, next: Next) => {
//     await ctrl.changePassword(ctx, next);
// });

// router.delete('/:userId/delete', authorizationMiddleware, async (ctx: Context, next: Next) => {
//     await userCtrl.deleteUser(ctx, next);
// });

// export default router.routes();
