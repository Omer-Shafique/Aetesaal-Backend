import Router from 'koa-router';
import * as ctrl from '../controller/department';
import authentication from '../middleware/authentication';

const router = new Router({
  prefix: `/api/department`,
});

router.use(authentication);

router.get('/', async (ctx, next) => {
  // Your route handler logic here
  console.log(ctx.request.query); // Accessing query parameters
  await next(); // Calling the next middleware
});

router.post('/', async (ctx, next) => {
  // Your route handler logic here
  console.log(ctx.request.body); // Accessing request body
  await next(); // Calling the next middleware
});

router.delete('/:id', async (ctx, next) => {
  // Your route handler logic here
  const departmentId = ctx.params.id; // Accessing URL parameters
  console.log(`Deleting department with ID: ${departmentId}`);
  await next(); // Calling the next middleware
});

export default router.routes();