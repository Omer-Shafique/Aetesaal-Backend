import { Context } from 'koa';
import * as lovService from '../services/list-of-value';

export const findByKeys = async (ctx: Context, next: () => void) => {
  let key: string | undefined;

  if (typeof ctx.request.query.keys === 'string') {
    // If keys is a string, use it directly
    key = ctx.request.query.keys;
  } else if (Array.isArray(ctx.request.query.keys)) {
    // If keys is an array of strings, join them into a single string
    key = ctx.request.query.keys.join(',');
  }

  // Ensure that key is always defined as a string before passing it to the function
  ctx.state.data = await lovService.findByKeys(key || '');

  await next();
};
