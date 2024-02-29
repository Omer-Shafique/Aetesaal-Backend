// custom-middleware.ts

import { Context } from 'koa';
import { IMiddleware } from 'koa-router';

export type CustomMiddleware = IMiddleware<Context, any>;
