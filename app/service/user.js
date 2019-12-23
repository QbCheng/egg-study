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

  // 获得用户的信息
  async list(parameter) {
    const { ctx } = this;
    // 获取必要参数
    const { page, limit, account, name } = parameter;
    const opt1 = {
      where: {},
      offset: (page - 1) * limit,
      limit,
      order: [[ 'created_at', 'DESC' ]],
    };
    const opt2 = { where: {} };
    if (!ctx.helper.isEmpty(account)) {
      opt1.where.account = account;
      opt2.where.account = account;
    }

    if (!ctx.helper.isEmpty(name)) {
      opt1.where.name = name;
      opt2.where.name = name;
    }
    const list = await ctx.model.User.findAll(
      opt1
    );

    const totalNum = await ctx.model.User.count(
      opt2
    );

    const ret = {
      list,
      length: list.length,
      totalNum,
    };
    return ctx.helper.formatInternalMsg(0, 'succ', ret);
  }

  // 删除
  async delete(parameter) {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    // 获取必要参数
    const { account } = parameter;
    const data = [];
    console.log(account);
    if (account && account.length > 0) {
      account.forEach(element => {
        data.push({ account: element });
      });
    }
    const opt = {
      where: {
        [Op.or]: data,
      },
    };
    const delRet = await ctx.model.User.destroy(opt);
    if (delRet === 0) {
      return ctx.helper.formatInternalMsg(-1, 'Nonexistent User', {});
    }
    return ctx.helper.formatInternalMsg(0, 'succ', {});
  }

  // 创建
  async create(parameter) {
    const { ctx } = this;
    console.log(parameter);
    const createRet = await ctx.model.User.create(parameter,
      {});
    if (createRet === 0) {
      return ctx.helper.formatInternalMsg(-1, 'create User failed', {});
    }
    return ctx.helper.formatInternalMsg(0, 'succ', {});
  }

  // 更新角色数据
  async update(parameter) {
    const { ctx } = this;
    // 获取必要参数
    console.log(parameter);
    const { account, password, introduction, avatar, name } = parameter;
    const saveRet = await ctx.model.User.update(
      { account, password, introduction, avatar, name },
      {
        where: {
          account,
        },
      }
    );
    if (saveRet === 0) {
      return ctx.helper.formatInternalMsg(-1, 'Nonexistent User', {});
    }
    return ctx.helper.formatInternalMsg(0, 'succ', {});
  }

}

module.exports = UserService;

