import Router from 'koa-router';
import { Context, Next } from 'koa'; 

import * as ctrl from '../controller/auth';

const router = new Router({
  prefix: `/api/auth`,
});

router.post('/login', async (ctx: Context, next: Next) => {
  await ctrl.login(ctx, next); 
});

router.post('/sign-up', async (ctx: Context, next: Next) => {
  await ctrl.signUp(ctx, next); 
});

router.post('/forgot-password', async (ctx: Context, next: Next) => {
  await ctrl.forgotPassword(ctx, next); 
});

router.post('/verify-hash', async (ctx: Context, next: Next) => {
  await ctrl.verifyHash(ctx, next); 
});

router.post('/reset-password', async (ctx: Context, next: Next) => {
  await ctrl.resetPassword(ctx, next); // Pass Context and Next to the controller function
});

export default router.routes();