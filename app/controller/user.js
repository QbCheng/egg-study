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
}

module.exports = UserController;
