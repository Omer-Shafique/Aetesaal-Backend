import Router from 'koa-router';
import { Context, Next } from 'koa';
import * as ctrl from '../controller/office-location';
import authentication from '../middleware/authentication'; // Import authentication middleware
import authorization from '../middleware/authorization'; // Import authorization middleware
import { Role } from '../enum/role';

const router = new Router({
  prefix: `/api/office-location`,
});

router.use(authentication);

router.get('/', authorization(true, [Role.SUPER_ADMIN]), async (ctx: Context, _next: Next) => {
  await ctrl.getAll(ctx);
});

router.post('/', authorization(true, [Role.SUPER_ADMIN]), async (ctx: Context, _next: Next) => {
  const payload = ctx.request.body;
  await ctrl.saveOfficeLocation(payload);
});

router.delete('/:id', authorization(true, [Role.SUPER_ADMIN]), async (ctx: Context, _next: Next) => {
  const id: string = ctx.params.id; // Extract id as string
  await ctrl.deleteOfficeLocation(ctx);
});

export default router.routes();
