// middleware/authorization.ts
import { Context, Next } from 'koa';
import { forbidden } from 'boom';
import _ from 'lodash';

import config from '../config/index';

const authorization = (isPublic: boolean = true, allowedRoles: string[] = []) => {
  return async (ctx: Context, next: Next) => { // Update the types of parameters
    if (isPublic) {
      const accessKey = ctx.header['access-key'];
      if (!accessKey || accessKey !== config.apiAccessKeys.app) {
        throw forbidden('error.api_forbidden');
      }
    } else {
      const currentLoggedInUserRole: string[] = ctx.state.user?.roles || [];
      // if any role match from allowedRole then allow else reject the request
      if (_.difference(allowedRoles, currentLoggedInUserRole).length === allowedRoles.length) {
        throw forbidden('error.api_forbidden');
      }
    }
    await next();
  };
};

export default authorization;
