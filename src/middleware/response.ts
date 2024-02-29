import * as fs from 'fs';
import * as path from 'path';
import { Context } from 'koa';
import compose from 'koa-compose';
import { IResponse, IResponseObject } from '../interface/response';

const responseHandler = async (ctx: Context, next: () => Promise<void>) => {
  if (ctx.state.data) {
    const responseBody: IResponse = {
      meta: {
        status: ctx.status,
        message: ctx.state.message || 'success',
      },
      data: ctx.state.data,
      body: function (_status: number): IResponseObject {
        throw new Error('Function not implemented.');
      }
    };
    
    if (ctx.pagination && ctx.method === 'GET') {
      responseBody.meta.limit = ctx.pagination.limit;
      responseBody.meta.offset = ctx.pagination.offset;
      responseBody.meta.totalCount = ctx.pagination.totalCount || 0; // Ensure totalCount is set or default to 0
    }
    ctx.body = responseBody;
  } else {
    ctx.type = 'html';
    const toSend = path.join(__dirname, '../../web/index.html');
    ctx.body = fs.createReadStream(toSend);
  }

  await next();
};

export default () => compose([responseHandler]);
