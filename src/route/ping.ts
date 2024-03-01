import Router from 'koa-router';
import * as ctrl from '../controller/ping';
import { Context, Next } from 'koa';

const router = new Router({
  prefix: `/api`
});

interface GeneratePasswordRequest {
  length?: number;
  uppercase?: boolean;
  lowercase?: boolean;
  numbers?: boolean;
  specialCharacters?: boolean;
}

const pingMiddleware = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    ctx.log.error(err);
    ctx.status = 500;
  }
};

const generatePasswordMiddleware = async (ctx: Context, next: Next) => {
  const request = ctx.request.query as GeneratePasswordRequest;

  if (!request.length) {
    ctx.status = 400;
    ctx.body = {
      error: 'length is required'
    };
    return;
  }

  if (request.length < 4) {
    ctx.status = 400;
    ctx.body = {
      error: 'length must be at least 4'
    };
    return;
  }

  if (request.uppercase !== undefined && !request.lowercase) {
    ctx.status = 400;
    ctx.body = {
      error: 'if uppercase is specified, lowercase must also be specified'
    };
    return;
  }

  if (request.lowercase !== undefined && !request.uppercase) {
    ctx.status = 400;
    ctx.body = {
      error: 'if lowercase is specified, uppercase must also be specified'
    };
    return;
  }

  ctx.state.generatePasswordRequest = request;

  await next();
};

router.get('/ping', pingMiddleware, async (ctx: Context, next: Next) => {
  await ctrl.ping(ctx, next);
});

router.get('/generate-password', generatePasswordMiddleware, async (ctx: Context, next: Next) => {
  await ctrl.generatePassword(ctx, next);
});

export default router.routes();