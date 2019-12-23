'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {

  // 用户登录
  async login() {
    const { ctx, service } = this;
    const parameterRet = await ctx.helper.getRequestParameter();
    if (parameterRet.code !== 0) {
      return ctx.helper.formatMsg(parameterRet);
    }
    // 取非文件数据参数
    const parameter = parameterRet.data.commonData;

    if (parameterRet.data.validate) {
      const rule = {
        username: 'string',
        password: 'string',
      };
      ctx.validate(rule, parameter);
    }

    const result = await service.user.login(parameter);
    return ctx.helper.formatMsg(result);
  }

  // 获得用户数据
  async getUserInfo() {
    const { ctx, service } = this;
    const result = await service.user.getUserInfo();
    return ctx.helper.formatMsg(result);
  }

  // 获得用户数据
  async list() {
    const { ctx, service } = this;
    const parameterRet = await ctx.helper.getRequestParameter();
    if (parameterRet.code !== 0) {
      return ctx.helper.formatMsg(parameterRet);
    }
    // 取非文件数据参数
    const parameter = parameterRet.data.commonData;
    console.log(parameter);
    // 判断是否需要做参数效验
    if (parameterRet.data.validate) {
      const rule = {
        page: { type: 'integer', required: false, min: 1, default: 1 },
        limit: { type: 'integer', required: false, min: 0, default: 15 },
      };
      ctx.validate(rule, parameter);
    }
    const result = await service.user.list(parameter);
    return ctx.helper.formatMsg(result);
  }

  // 创建用户数据
  async create() {
    const { ctx, service } = this;
    const parameterRet = await ctx.helper.getRequestParameter();
    if (parameterRet.code !== 0) {
      return ctx.helper.formatMsg(parameterRet);
    }
    // 取非文件数据参数
    const parameter = parameterRet.data.commonData;
    const result = await service.user.create(parameter);
    return ctx.helper.formatMsg(result);
  }

  // 获得用户数据
  async update() {
    const { ctx, service } = this;
    const parameterRet = await ctx.helper.getRequestParameter();
    if (parameterRet.code !== 0) {
      return ctx.helper.formatMsg(parameterRet);
    }
    // 取非文件数据参数
    const parameter = parameterRet.data.commonData;
    const result = await service.user.update(parameter);
    return ctx.helper.formatMsg(result);
  }

  // 删除
  async delete() {
    const { ctx, service } = this;
    const parameterRet = await ctx.helper.getRequestParameter();
    if (parameterRet.code !== 0) {
      return ctx.helper.formatMsg(parameterRet);
    }
    // 取非文件数据参数
    const parameter = parameterRet.data.commonData;
    const result = await service.user.delete(parameter);
    return ctx.helper.formatMsg(result);
  }
}

module.exports = UserController;
