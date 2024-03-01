import { Context } from 'koa';
import * as officeLocationService from '../services/office-location';

export const getAll = async (ctx: Context) => {
  ctx.state.data = await officeLocationService.getAll();
};

export const saveOfficeLocation = async (ctx: Context) => {
  const payload = ctx.request.body;
  ctx.state.data = await officeLocationService.saveOfficeLocation(payload);
};

export const deleteOfficeLocation = async (ctx: Context) => {
  const id: number = +ctx.params.id;
  ctx.state.data = await officeLocationService.deleteOfficeLocation(id);
};
