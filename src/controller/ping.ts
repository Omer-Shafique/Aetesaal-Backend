import { Context, Next } from 'koa'; // Import Context and Next types
import * as config from '../config';
import * as encryption from '../utils/encryption';

export const ping = async (ctx: Context, next: Next) => {
  ctx.log.warn('inside ping');
  ctx.state.data = `pong! hi api is working`;
  await next();
};

export const generatePassword = async (ctx: Context, next: Next) => {
  if (config.default.env === 'local') {
    const password: string = ctx.request.query.p as string; // Use type assertion to treat ctx.request.query.p as a string
    ctx.state.data = encryption.saltHashPassword(password);
  }
  await next();
};
