import { Context } from 'koa';
import * as userLocationTrailService from '../services/user-location-trail';

export const getAll = async (ctx: Context, next: () => void) => {
  const userId: number = parseInt(ctx.request.query.userId as string); // Parse userId to number
  const startDate: Date = new Date(ctx.request.query.startDate as string); // Parse startDate to Date
  const endDate: Date = new Date(ctx.request.query.endDate as string); // Parse endDate to Date
  ctx.state.data = await userLocationTrailService.getAll(userId, startDate, endDate);
  await next();
};

export const saveUserLocationTrail = async (ctx: Context, next: () => void) => {
  const payload = ctx.request.body;
  ctx.state.data = await userLocationTrailService.saveOfficeLocation(payload);
  await next();
};
