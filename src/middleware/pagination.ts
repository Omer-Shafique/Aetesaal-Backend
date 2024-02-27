import * as boom from 'boom';
import * as Joi from 'joi';
import { Context } from 'koa';
import { validate } from '../validations/index';
import { IPaginationOpts } from '../interface/request';
import PaginationDefaults from '../constants/pagination';

export default async (ctx: Context, next: () => void) => {
  const pagination: IPaginationOpts = {
    limit: typeof ctx.query.limit === 'string' ? parseInt(ctx.query.limit, 10) : PaginationDefaults.limit,
    offset: typeof ctx.query.offset === 'string' ? parseInt(ctx.query.offset, 10) : PaginationDefaults.offset,
    sortBy: typeof ctx.query.sortBy === 'string' ? ctx.query.sortBy : PaginationDefaults.sortBy,
    sortOrder: typeof ctx.query.sortOrder === 'string' ? ctx.query.sortOrder : PaginationDefaults.sortOrder
  };

  const schema: Joi.SchemaMap = {
    limit: Joi.alternatives()
      .try(Joi.number().integer(), Joi.any())
      .default(PaginationDefaults.limit),
    offset: Joi.alternatives()
      .try(Joi.number().integer(), Joi.any())
      .default(PaginationDefaults.offset),
    sortBy: Joi.string()
      .trim()
      .allow('')
      .default(PaginationDefaults.sortBy),
    sortOrder: Joi.string()
      .trim()
      .allow('')
      .default(PaginationDefaults.sortOrder)
  };

  ctx.pagination = await validate(pagination, schema);

  ctx.pagination.all = ctx.pagination.limit < 0;

  if (ctx.pagination.sortOrder && ctx.pagination.sortOrder !== 'asc' && ctx.pagination.sortOrder !== 'desc') {
    ctx.pagination.sortOrder = 'asc';
  }

  if (ctx.pagination.all) {
    ctx.pagination.limit = -1;
    ctx.pagination.offset = 0;
  }

  if (ctx.pagination.offset < 0) {
    ctx.pagination.offset = 0;
  }
  await next();
};
