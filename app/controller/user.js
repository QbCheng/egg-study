'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async testModel() {
    const { ctx } = this;
    ctx.body = await ctx.model.User.testModel();
  }
}

module.exports = UserController;
