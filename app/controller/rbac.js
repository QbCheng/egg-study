'use strict';

const Controller = require('egg').Controller;

class RbacController extends Controller {
  async permissionList() {
    const { ctx } = this;
    console.log(ctx.state.user);
    /*
    * 打印内容为：{ username : 'admin', iat: 1560346903 }
    * iat 为过期时间，可以单独写中间件验证，这里不做细究
    * 除了 iat 之后，其余的为当时存储的数据
    **/
    ctx.body = { code: 0, msg: '验证成功' };
  }

  // 创建权限
  async createPermission() {
    const { ctx, service } = this;
    // 效验规则
    const rule = {
      name: 'string', // 简写 {type: 'string', required: true, allowEmpty: false} 相当
    };
    ctx.validate(rule);
    // 组装参数
    const data = ctx.request.body;

    const result = await service.rbac.createPermission(data);
    return ctx.helper.formatMsg(result);
  }

  // 删除权限 :支持多个同时删除 "DELETE FROM `roles` WHERE `id` IN (1, 2, 3, 4, 5)"
  async delPermission() {
    const { ctx, service } = this;
    const parameterRet = await ctx.helper.getRequestParameter();
    if (parameterRet.code !== 0) {
      return parameterRet;
    }

    // 取非文件数据参数
    const parameter = parameterRet.data.commonData;
    let rule = {
    };
    // 判断是否需要做参数效验
    if (parameterRet.data.validate) {
      rule = {
        id: 'array',
      };
    }
    ctx.validate(rule, parameter);
    const result = await service.rbac.delPermission(parameter);
    return ctx.helper.formatMsg(result);
  }

  // 更新权限
  async updatePermission() {
    const { ctx, service } = this;
    const parameterRet = await ctx.helper.getRequestParameter();
    if (parameterRet.code !== 0) {
      return parameterRet;
    }
    // 取非文件数据参数
    const parameter = parameterRet.data.commonData;
    if (parameterRet.data.validate) {

      const rule = {
        name: 'string',
        id: 'int',
      };
      ctx.validate(rule, parameter);
    }
    console.log('当前的参数 : ' + JSON.stringify(parameter));
    const result = await service.rbac.updatePermission(parameter);
    return ctx.helper.formatMsg(result);
  }

  async roleList() {
    const { ctx } = this;
    return ctx.helper.formatInternalMsg(0, 'succ', {});
  }

  async delRole() {
    const { ctx, service } = this;
    const parameterRet = await ctx.helper.getRequestParameter();
    if (parameterRet.code !== 0) {
      return parameterRet;
    }

    // 取非文件数据参数
    const parameter = parameterRet.data.commonData;
    if (parameterRet.data.validate) {

      const rule = {
        id: 'array',
      };
      ctx.validate(rule, parameter);
    }
    const result = await service.rbac.delRole(parameter);
    return ctx.helper.formatMsg(result);
  }

  // 创建角色
  async createRole() {
    const { ctx, service } = this;
    const parameterRet = await ctx.helper.getRequestParameter();
    if (parameterRet.code !== 0) {
      return parameterRet;
    }
    // 取非文件数据参数
    const parameter = parameterRet.data.commonData;
    const rule = {
      name: 'string',
    };

    console.log('当前的参数 : ' + JSON.stringify(parameter));
    ctx.validate(rule, parameter);

    const result = await service.rbac.createRole(parameter);
    return ctx.helper.formatMsg(result);
  }

  async updateRole() {
    const { ctx, service } = this;
    const parameterRet = await ctx.helper.getRequestParameter();
    if (parameterRet.code !== 0) {
      return parameterRet;
    }
    // 取非文件数据参数
    const parameter = parameterRet.data.commonData;
    if (parameterRet.data.validate) {

      const rule = {
        name: 'string',
        id: 'int',
      };
      ctx.validate(rule, parameter);
    }
    console.log('当前的参数 : ' + JSON.stringify(parameter));
    const result = await service.rbac.updateRole(parameter);
    return ctx.helper.formatMsg(result);
  }

  // 给角色分配权限
  async roleAssignPermission() {
    const { ctx, service } = this;
    const parameterRet = await ctx.helper.getRequestParameter();
    if (parameterRet.code !== 0) {
      return parameterRet;
    }
    // 取非文件数据参数
    const parameter = parameterRet.data.commonData;
    if (parameterRet.data.validate) {

      const rule = {
        roleId: 'int',
        permissionIdList: 'array',
      };
      ctx.validate(rule, parameter);
    }
    console.log('当前的参数 : ' + JSON.stringify(parameter));
    const result = await service.rbac.roleAssignPermission(parameter);
    return ctx.helper.formatMsg(result);
  }

  // 给角色卸载权限
  async roleUnassignPermission() {
    const { ctx, service } = this;
    const parameterRet = await ctx.helper.getRequestParameter();
    if (parameterRet.code !== 0) {
      return parameterRet;
    }
    // 取非文件数据参数
    const parameter = parameterRet.data.commonData;
    if (parameterRet.data.validate) {

      const rule = {
        roleId: 'int',
        permissionIdList: 'array',
      };
      ctx.validate(rule, parameter);
    }
    console.log('当前的参数 : ' + JSON.stringify(parameter));
    const result = await service.rbac.roleUnassignPermission(parameter);
    return ctx.helper.formatMsg(result);
  }

  async userAssignPermission() {
    const { ctx, service } = this;
    const parameterRet = await ctx.helper.getRequestParameter();
    if (parameterRet.code !== 0) {
      return parameterRet;
    }
    // 取非文件数据参数
    const parameter = parameterRet.data.commonData;
    if (parameterRet.data.validate) {

      const rule = {
        userId: 'int',
        permissionIdList: 'array',
      };
      ctx.validate(rule, parameter);
    }
    console.log('当前的参数 : ' + JSON.stringify(parameter));
    const result = await service.rbac.userAssignPermission(parameter);
    return ctx.helper.formatMsg(result);
  }

  // 给用户分配角色
  async userAssignRole() {
    const { ctx, service } = this;
    const parameterRet = await ctx.helper.getRequestParameter();
    if (parameterRet.code !== 0) {
      return parameterRet;
    }
    // 取非文件数据参数
    const parameter = parameterRet.data.commonData;
    if (parameterRet.data.validate) {

      const rule = {
        userId: 'int',
        roleIdList: 'array',
      };
      ctx.validate(rule, parameter);
    }
    console.log('当前的参数 : ' + JSON.stringify(parameter));
    const result = await service.rbac.userAssignRole(parameter);
    return ctx.helper.formatMsg(result);
  }

  // 给用户卸载角色
  async userUnassignRole() {
    const { ctx, service } = this;
    const parameterRet = await ctx.helper.getRequestParameter();
    if (parameterRet.code !== 0) {
      return parameterRet;
    }
    // 取非文件数据参数
    const parameter = parameterRet.data.commonData;
    if (parameterRet.data.validate) {

      const rule = {
        userId: 'int',
        roleIdList: 'array',
      };
      ctx.validate(rule, parameter);
    }
    console.log('当前的参数 : ' + JSON.stringify(parameter));
    const result = await service.rbac.userUnassignRole(parameter);
    return ctx.helper.formatMsg(result);
  }
}

module.exports = RbacController;
