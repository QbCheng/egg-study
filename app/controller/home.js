'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    ctx.body = 'hi, egg';
  }

  // 验证登录并且生成 token
  async login() {
    const { ctx, app, service } = this;

    // 获取用户端传递过来的参数
    const data = ctx.request.body;
    // 做数据效验
    // .....

    // 进行验证 data 数据 登录是否成功
    const loginRet = await service.login.login();
    ctx.logger.error(loginRet);
    if (loginRet.code !== 0) {
      return ctx.helper.formatMsg(ctx, loginRet);
    }
    ctx.logger.error(loginRet);
    // 生成 token 的方式
    const token = app.jwt.sign(loginRet.data.user, app.config.jwt.secret);

    // 返回 token 到前端
    ctx.helper.formatMsg(ctx, ctx.helper.formatInternalMsg(0, '', { token }));
  }

  async testJwt() {
    const { ctx } = this;
    await ctx.service.user.getUserClientRouter();
    /*
    * 打印内容为：{ username : 'admin', iat: 1560346903 }
    * iat 为过期时间，可以单独写中间件验证，这里不做细究
    * 除了 iat 之后，其余的为当时存储的数据
    **/
    ctx.body = { code: 0, msg: '验证成功' };
  }
}

module.exports = HomeController;
