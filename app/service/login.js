'use strict';

const Service = require('egg').Service;

class LoginService extends Service {

  // 登录
  async login() {
    const { ctx } = this;
    const data = ctx.request.body;
    ctx.logger.error('data', data);
    const user = await ctx.model.User.findOne({
      where: {
        account: data.account,
        password: data.password,
      },
      raw: true, // 默认返回的是内部一个Instance, dataValues字段是查找到的值， raw:true，则会直接返回数据
    });
    ctx.logger.error(user);
    if (user) {
      return ctx.helper.formatInternalMsg(0, '', { user });
    }
    return ctx.helper.formatInternalMsg(-1, 'User not exist', {});
  }
}

module.exports = LoginService;
