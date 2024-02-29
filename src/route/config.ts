import { Context } from 'koa';
import Router from '@koa/router';
import * as ctrl from '../controller/config';

const router = new Router({
  prefix: '/api/config',
});

router.get('/', async (ctx: Context, next: () => Promise<any>) => {
  try {
    await ctrl.getConfig(ctx);
    await next(); // Assuming you don't need any other middleware after getConfig
  } catch (error) {
    // Handle errors if any
    console.error('Error:', error);
    ctx.status = error.status || 500;
    ctx.body = {
      error: {
        message: error.message || 'Internal Server Error',
      },
    };
  }
});

export default router.routes();
