import * as boom from 'boom';
import * as jwt from 'jsonwebtoken';
import { Context, Middleware } from 'koa'; // Import Koa's Context and Middleware types
import * as config from '../config';
import * as userRepo from '../repositories/user';

const authentication: Middleware = async (ctx: Context, next: () => Promise<void>) => {
  const token = ctx.header.authorization;
  const platform = ctx.header.platform;
  const appVersionHeader = ctx.header.appversion;
  const appVersion = typeof appVersionHeader === 'string' ? parseFloat(appVersionHeader) : undefined;

  if (!token) {
    throw boom.unauthorized();
  } else {
    try {
      if (!platform || !appVersion) {
        throw boom.forbidden('Newer version of application is available please contact administrator');
      } else if (platform === 'android' && config.default.appVersion > appVersion) {
        throw boom.forbidden('Newer version of application is available please contact administrator');
      }

      const decoded: any = jwt.verify(token, config.default.tokenSecret);
      const savedUser = await userRepo.findById(decoded.id);
      let dbUser = {};
      if (savedUser) {
        dbUser = savedUser.get({ plain: true });
      }
      ctx.state.user = {
        userId: decoded.id,
        roles: decoded.roles,
        ...dbUser
      };
    } catch (e) {
      throw boom.unauthorized();
    }
  }
  await next();
};

export default authentication;
