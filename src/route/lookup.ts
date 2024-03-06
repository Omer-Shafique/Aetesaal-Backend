import Router from 'koa-router';
import { Context, ParameterizedContext } from 'koa';
import * as ctrl from '../controller/lookup';
import authentication from '../middleware/authentication';
import authorization from '../middleware/authorization';
import { Role } from '../enum/role';

const router = new Router<ParameterizedContext, Context>();

// Apply authentication middleware to all routes
router.use(authentication);

// Define routes
router.get('/', async (ctx: Context) => {
  await ctrl.getAll(ctx);
});

router.get('/:lookupId/data', async (ctx: Context) => {
  await ctrl.findByLookupId(ctx);
});

router.get('/lookup-data/:lookupDataId', async (ctx: Context) => {
  await ctrl.findLookupDataById(ctx);
});

router.post('/', async (ctx: Context) => {
  await authorization(false, [Role.SUPER_ADMIN])(ctx, async () => {
    await ctrl.saveLookup(ctx);
  });
});

router.post('/:lookupId/data', async (ctx: Context) => {
  await authorization(false, [Role.SUPER_ADMIN])(ctx, async () => {
    await ctrl.saveLookupData(ctx);
  });
});

router.delete('/:id', async (ctx: Context) => {
  await authorization(false, [Role.SUPER_ADMIN])(ctx, async () => {
    await ctrl.deleteLookup(ctx);
  });
});

router.delete('/:lookupId/data/:id', async (ctx: Context) => {
  await authorization(false, [Role.SUPER_ADMIN])(ctx, async () => {
    await ctrl.deleteLookupData(ctx);
  });
});

export default router.routes();
