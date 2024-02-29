import Router from 'koa-router';
import { Context, Next } from 'koa';

import * as ctrl from '../controller/auth';

const router = new Router({
  prefix: '/api/auth',
});

router.post('/login', (ctx: Context, next: Next) => {
  return ctrl.login(ctx, next);
});

router.post('/sign-up', (ctx: Context, next: Next) => {
  return ctrl.signUp(ctx, next);
});

router.post('/forgot-password', (ctx: Context, next: Next) => {
  return ctrl.forgotPassword(ctx, next);
});

router.post('/verify-hash', (ctx: Context, next: Next) => {
  return ctrl.verifyHash(ctx, next);
});

router.post('/reset-password', (ctx: Context, next: Next) => {
  return ctrl.resetPassword(ctx, next);
});

export default router;