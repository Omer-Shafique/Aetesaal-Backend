import { Context } from 'koa';
import * as reportService from '../services/report';
import { ITimeApplicationReport } from '../interface/application';

export const getApplicationExecutionTimeReport = async (ctx: Context, next: () => Promise<void>) => {
  const user: string = ctx.state.user;
  const payload: ITimeApplicationReport = {
    applicationId: ctx.params.applicationId,
    startDate: ctx.query.startDate || '', 
    endDate: ctx.query.endDate || ''      
  };
  ctx.state.data = await reportService.getApplicationExecutionTimeReport(payload);
  await next();
};

export const getTotalExecutionsCountReport = async (ctx: Context, next: () => Promise<void>) => {
  const user: string = ctx.state.user;
  const payload: ITimeApplicationReport = {
    applicationId: ctx.params.applicationId,
    startDate: ctx.query.startDate || '', // Ensure it's a string, providing a default value if undefined
    endDate: ctx.query.endDate || ''      // Ensure it's a string, providing a default value if undefined
  };
  ctx.state.data = await reportService.getTotalExecutionsCountReport(payload);
  await next();
};

export const getTotalExecutionsCountGraph = async (ctx: Context, next: () => Promise<void>) => {
  const user: string = ctx.state.user;
  const payload: ITimeApplicationReport = {
    applicationId: ctx.params.applicationId,
    startDate: ctx.query.startDate || '', // Ensure it's a string, providing a default value if undefined
    endDate: ctx.query.endDate || ''      // Ensure it's a string, providing a default value if undefined
  };
  ctx.state.data = await reportService.getTotalExecutionsCountGraph(payload);
  await next();
};

export const getApplicationExecutionLocationReport = async (ctx: Context, next: () => Promise<void>) => {
  const user: string = ctx.state.user;
  const payload: ITimeApplicationReport = {
    applicationId: ctx.params.applicationId,
    startDate: ctx.query.startDate || '', // Ensure it's a string, providing a default value if undefined
    endDate: ctx.query.endDate || ''      // Ensure it's a string, providing a default value if undefined
  };
  ctx.state.data = await reportService.getApplicationExecutionLocationReport(payload);
  await next();
};
