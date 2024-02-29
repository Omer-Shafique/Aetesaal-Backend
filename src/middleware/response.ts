import { Context } from 'koa';
import * as fs from 'fs';
import * as path from 'path';
import compose from 'koa-compose';
import { IResponse, IResponseObject } from '../interface/response';

const handler = async (ctx: Context, next: () => void) => {
  if (ctx.state.data) {
    // Define the structure of ctx.body
    const responseBody: IResponse = {
      meta: {
        status: ctx.status,
        message: ctx.state.message || 'success',
      },
      // Include the data property
      data: ctx.state.data,
      body (): IResponseObject {
        throw new Error('Function not implemented.');
      }
    };
    // If ctx.pagination exists and method is GET, include pagination information
    if (ctx.pagination && ctx.method === 'GET') {
      responseBody.meta.limit = ctx.pagination.limit;
      responseBody.meta.offset = ctx.pagination.offset;
      responseBody.meta.totalCount = ctx.pagination.totalCount; // Assuming totalCount is a property of ctx.pagination
    }
    ctx.body = responseBody;
  } else {
    ctx.type = 'html';
    const toSend = path.join(__dirname, '../../web/index.html');
    ctx.body = fs.createReadStream(toSend);
  }

  await next();
};

export default () => compose([handler]);
