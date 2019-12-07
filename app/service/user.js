'use strict';

const Service = require('egg').Service;

class UserService extends Service {

  // 获得与redis相关的配置文件
  getUserConfig() {
    const obj = {};
    return obj;
  }

  // 用户登录
  async login(parameter) {
    const { ctx, app } = this;
    // 获取必要参数
    const { username, password } = parameter;

    // findByPk : 通过主键去查询
    const userInfo = await ctx.model.User.findOne({
      where: {
        account: username,
        password,
      },
      raw: true,
    });
    console.log(userInfo);
    let token = null;
    if (userInfo) {
      // 生成 token 的方式
      token = app.jwt.sign(userInfo, app.config.jwt.secret);
    } else {
      return ctx.helper.formatInternalMsg(-1, 'account or password error', {});
    }
    return ctx.helper.formatInternalMsg(0, 'succ', { token });
  }

  // 获得用户的信息
  async getUserInfo() {
    const { ctx } = this;
    const userId = ctx.state.user.id;
    // findByPk : 通过主键去查询
    const userInfo = await ctx.model.User.findByPk(userId, {
      attributes: [ 'name', 'introduction', 'avatar' ],
      include: [{
        model: ctx.model.ModelHasClientRouter,
        as: 'ClientRouter',
        attributes: [ 'name' ],
      }],
    });
    return ctx.helper.formatInternalMsg(0, 'succ', { userInfo });
  }

}

module.exports = UserService;