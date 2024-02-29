import Router from 'koa-router';
import authentication from '../middleware/authentication';
import * as ctrl from '../controller/list-of-value';
import { Next } from 'koa';

const router = new Router({
  prefix: `/api/list-of-value`
});

const authMiddleware = async (ctx: Router.IRouterContext, next: Next) => {
  // Type assertion to treat IRouterContext as Context
  const ctxWithAllProps = ctx as Router.IRouterContext & { preresponse: any; token: any; accessToken: any; pagination: any };
  
  // Your authentication logic here
  await authentication(ctxWithAllProps, next); 
};

router.use(authMiddleware);

router.get('/', async (ctx: Router.IRouterContext, next: Next) => {
  // Type assertion to treat IRouterContext as Context
  const ctxWithAllProps = ctx as Router.IRouterContext & { preresponse: any; token: any; accessToken: any; pagination: any };
  
  await ctrl.findByKeys(ctxWithAllProps, next); 
});

export default router.routes();

























// import Router, { Context } from 'koa-router';
// import authentication from '../middleware/authentication';
// import * as ctrl from '../controller/list-of-value';
// import { Next } from 'koa';

// // Define a custom interface extending both Router.IRouterContext and Context
// interface CustomContext extends Router.IRouterContext, Context {}

// const router = new Router<CustomContext>({
//   prefix: `/api/list-of-value`
// });

// const authMiddleware = async (ctx: CustomContext, next: Next) => {
//   // Your authentication logic here
//   await authentication(ctx, next); 
// };

// router.use(authMiddleware);

// router.get('/', async (ctx: CustomContext, next: Next) => {
//   await ctrl.findByKeys(ctx, next); 
// });

// export default router.routes();
