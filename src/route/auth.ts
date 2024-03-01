import Router from 'koa-router';
import { Context, Next } from 'koa';

import * as ctrl from '../controller/auth';

const router = new Router({
  prefix: '/api/auth',
});

router.post('/login', async (ctx: any, next: Next) => {
  try {
    await ctrl.login(ctx, next);
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'An error occurred during login' };
  }
});

router.post('/sign-up', async (ctx: any, next: Next) => {
  try {
    await ctrl.signUp(ctx, next);
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'An error occurred during sign-up' };
  }
});

router.post('/forgot-password', async (ctx: any, next: Next) => {
  try {
    await ctrl.forgotPassword(ctx, next);
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'An error occurred during forgot password' };
  }
});

router.post('/verify-hash', async (ctx: any, next: Next) => {
  try {
    await ctrl.verifyHash(ctx, next);
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'An error occurred during hash verification' };
  }
});

router.post('/reset-password', async (ctx: any, next: Next) => {
  try {
    await ctrl.resetPassword(ctx, next);
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'An error occurred during password reset' };
  }
});

export default router;


















// import Router from 'koa-router';
// import { Context, Next } from 'koa';

// import * as ctrl from '../controller/auth';

// const router = new Router({
//   prefix: '/api/auth',
// });

// router.post('/login', async (ctx: Context, next: Next) => {
//   try {
//     await ctrl.login(ctx, next);
//   } catch (error) {
//     ctx.status = 500;
//     ctx.body = { error: 'An error occurred during login' };
//   }
// });

// router.post('/sign-up', async (ctx: Context, next: Next) => {
//   try {
//     await ctrl.signUp(ctx, next);
//   } catch (error) {
//     ctx.status = 500;
//     ctx.body = { error: 'An error occurred during sign-up' };
//   }
// });

// router.post('/forgot-password', async (ctx: Context, next: Next) => {
//   try {
//     await ctrl.forgotPassword(ctx, next);
//   } catch (error) {
//     ctx.status = 500;
//     ctx.body = { error: 'An error occurred during forgot password' };
//   }
// });

// router.post('/verify-hash', async (ctx: Context, next: Next) => {
//   try {
//     await ctrl.verifyHash(ctx, next);
//   } catch (error) {
//     ctx.status = 500;
//     ctx.body = { error: 'An error occurred during hash verification' };
//   }
// });

// router.post('/reset-password', async (ctx: Context, next: Next) => {
//   try {
//     await ctrl.resetPassword(ctx, next);
//   } catch (error) {
//     ctx.status = 500;
//     ctx.body = { error: 'An error occurred during password reset' };
//   }
// });

// export default router;