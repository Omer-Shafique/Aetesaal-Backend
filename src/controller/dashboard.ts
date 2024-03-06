import { Context, Next } from 'koa';
import * as dashboardService from '../services/dashboard';

export const getAdminDashboardStatistics = async (ctx: Context, next: Next) => { // Corrected the type of next parameter
  ctx.state.data = await dashboardService.getAdminDashboardStatistics();
  await next();
};
