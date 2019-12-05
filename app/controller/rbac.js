'use strict';

const Controller = require('egg').Controller;

class RbacController extends Controller {
  // 获得权限列表
  async permissionList() {
    const { ctx, service } = this;
    const parameterRet = await ctx.helper.getRequestParameter();
    if (parameterRet.code !== 0) {
      return ctx.helper.formatMsg(parameterRet);
    }
    // 取非文件数据参数
    const parameter = parameterRet.data.commonData;
    // 判断是否需要做参数效验
    if (parameterRet.data.validate) {
      const rule = {
        mark: { type: 'integer', required: true, min: 0 },
        interval: { type: 'integer', required: true, min: 0 },
      };
      ctx.validate(rule, parameter);
    }
    const result = await service.rbac.permissionList(parameter);
    return ctx.helper.formatMsg(result);
  }
  // 创建权限
  async createPermission() {
    const { ctx, service } = this;
    const parameterRet = await ctx.helper.getRequestParameter();
    if (parameterRet.code !== 0) {
      return ctx.helper.formatMsg(parameterRet);
    }

    // 取非文件数据参数
    const parameter = parameterRet.data.commonData;
    // 判断是否需要做参数效验
    if (parameterRet.data.validate) {
      const rule = {
        name: 'string',
      };
      ctx.validate(rule, parameter);
    }
    const result = await service.rbac.createPermission(parameter);
    return ctx.helper.formatMsg(result);
  }

  // 删除权限 :支持多个同时删除 "DELETE FROM `roles` WHERE `id` IN (1, 2, 3, 4, 5)"
  async delPermission() {
    const { ctx, service } = this;
    const parameterRet = await ctx.helper.getRequestParameter();
    if (parameterRet.code !== 0) {
      return ctx.helper.formatMsg(parameterRet);
    }

    // 取非文件数据参数
    const parameter = parameterRet.data.commonData;
    // 判断是否需要做参数效验
    if (parameterRet.data.validate) {
      const rule = {
        id: 'array',
      };
      ctx.validate(rule, parameter);
    }
    const result = await service.rbac.delPermission(parameter);
    return ctx.helper.formatMsg(result);
  }

  // 更新权限
  async updatePermission() {
    const { ctx, service } = this;
    const parameterRet = await ctx.helper.getRequestParameter();
    if (parameterRet.code !== 0) {
      return ctx.helper.formatMsg(parameterRet);
    }
    // 取非文件数据参数
    const parameter = parameterRet.data.commonData;
    if (parameterRet.data.validate) {
      const rule = {
        name: 'string',
        id: { type: 'integer', required: true, min: 0 },
      };
      ctx.validate(rule, parameter);
    }
    const result = await service.rbac.updatePermission(parameter);
    return ctx.helper.formatMsg(result);
  }

  async roleList() {
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
        mark: { type: 'integer', required: true, min: 0 },
        interval: { type: 'integer', required: true, min: 0 },
      };
      ctx.validate(rule, parameter);
    }
    const result = await service.rbac.roleList(parameter);
    return ctx.helper.formatMsg(result);
  }

  async delRole() {
    const { ctx, service } = this;
    const parameterRet = await ctx.helper.getRequestParameter();
    if (parameterRet.code !== 0) {
      return ctx.helper.formatMsg(parameterRet);
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
      return ctx.helper.formatMsg(parameterRet);
    }
    // 取非文件数据参数
    const parameter = parameterRet.data.commonData;

    if (parameterRet.data.validate) {
      const rule = {
        name: 'string',
      };
      ctx.validate(rule, parameter);
    }

    const result = await service.rbac.createRole(parameter);
    return ctx.helper.formatMsg(result);
  }

  async updateRole() {
    const { ctx, service } = this;
    const parameterRet = await ctx.helper.getRequestParameter();
    if (parameterRet.code !== 0) {
      return ctx.helper.formatMsg(parameterRet);
    }
    // 取非文件数据参数
    const parameter = parameterRet.data.commonData;
    if (parameterRet.data.validate) {
      const rule = {
        name: 'string',
        id: { type: 'integer', required: true, min: 0 },
      };
      ctx.validate(rule, parameter);
    }
    const result = await service.rbac.updateRole(parameter);
    return ctx.helper.formatMsg(result);
  }

  // 给角色分配权限
  async roleAssignPermission() {
    const { ctx, service } = this;
    const parameterRet = await ctx.helper.getRequestParameter();
    if (parameterRet.code !== 0) {
      return ctx.helper.formatMsg(parameterRet);
    }
    // 取非文件数据参数
    const parameter = parameterRet.data.commonData;
    if (parameterRet.data.validate) {
      const rule = {
        roleId: { type: 'integer', required: true, min: 0 },
        permissionIdList: 'array',
      };
      ctx.validate(rule, parameter);
    }
    const result = await service.rbac.roleAssignPermission(parameter);
    return ctx.helper.formatMsg(result);
  }

  // 给角色卸载权限
  async roleUnassignPermission() {
    const { ctx, service } = this;
    const parameterRet = await ctx.helper.getRequestParameter();
    if (parameterRet.code !== 0) {
      return ctx.helper.formatMsg(parameterRet);
    }
    // 取非文件数据参数
    const parameter = parameterRet.data.commonData;
    if (parameterRet.data.validate) {
      const rule = {
        roleId: { type: 'integer', required: true, min: 0 },
        permissionIdList: 'array',
      };
      ctx.validate(rule, parameter);
    }
    const result = await service.rbac.roleUnassignPermission(parameter);
    return ctx.helper.formatMsg(result);
  }

  async userAssignPermission() {
    const { ctx, service } = this;
    const parameterRet = await ctx.helper.getRequestParameter();
    if (parameterRet.code !== 0) {
      return ctx.helper.formatMsg(parameterRet);
    }
    // 取非文件数据参数
    const parameter = parameterRet.data.commonData;
    if (parameterRet.data.validate) {
      const rule = {
        userId: { type: 'integer', required: true, min: 0 },
        permissionIdList: 'array',
      };
      ctx.validate(rule, parameter);
    }
    const result = await service.rbac.userAssignPermission(parameter);
    return ctx.helper.formatMsg(result);
  }

  // 给用户分配角色
  async userAssignRole() {
    const { ctx, service } = this;
    const parameterRet = await ctx.helper.getRequestParameter();
    if (parameterRet.code !== 0) {
      return ctx.helper.formatMsg(parameterRet);
    }
    // 取非文件数据参数
    const parameter = parameterRet.data.commonData;
    if (parameterRet.data.validate) {
      const rule = {
        userId: { type: 'integer', required: true, min: 0 },
        roleIdList: 'array',
      };
      ctx.validate(rule, parameter);
    }
    const result = await service.rbac.userAssignRole(parameter);
    return ctx.helper.formatMsg(result);
  }

  // 给用户卸载角色
  async userUnassignRole() {
    const { ctx, service } = this;
    const parameterRet = await ctx.helper.getRequestParameter();
    if (parameterRet.code !== 0) {
      return ctx.helper.formatMsg(parameterRet);
    }
    // 取非文件数据参数
    const parameter = parameterRet.data.commonData;
    if (parameterRet.data.validate) {
      const rule = {
        userId: { type: 'integer', required: true, min: 0 },
        roleIdList: 'array',
      };
      ctx.validate(rule, parameter);
    }
    const result = await service.rbac.userUnassignRole(parameter);
    return ctx.helper.formatMsg(result);
  }

  // 用户拥有的单权限
  async userHasPermission() {
    const { ctx, service } = this;
    const parameterRet = await ctx.helper.getRequestParameter();
    if (parameterRet.code !== 0) {
      return ctx.helper.formatMsg(parameterRet);
    }
    // 取非文件数据参数
    const parameter = parameterRet.data.commonData;
    if (parameterRet.data.validate) {
      const rule = {};
      ctx.validate(rule, parameter);
    }
    const result = await service.rbac.userHasPermission();
    return ctx.helper.formatMsg(result);
  }

  // 用户拥有的角色
  async userHasRole() {
    const { ctx, service } = this;
    const parameterRet = await ctx.helper.getRequestParameter();
    if (parameterRet.code !== 0) {
      return ctx.helper.formatMsg(parameterRet);
    }
    // 取非文件数据参数
    const parameter = parameterRet.data.commonData;
    if (parameterRet.data.validate) {
      const rule = {};
      ctx.validate(rule, parameter);
    }
    const result = await service.rbac.userHasRole();
    return ctx.helper.formatMsg(result);
  }

  // 用户拥有的权限
  async userHasAllPermission() {
    const { ctx, service } = this;
    const parameterRet = await ctx.helper.getRequestParameter();
    if (parameterRet.code !== 0) {
      return ctx.helper.formatMsg(parameterRet);
    }
    // 取非文件数据参数
    const parameter = parameterRet.data.commonData;
    if (parameterRet.data.validate) {
      const rule = {};
      ctx.validate(rule, parameter);
    }
    const result = await service.rbac.userHasAllPermission();
    return ctx.helper.formatMsg(result);
  }

  // 角色拥有的权限
  async roleHasPermission() {
    const { ctx, service } = this;
    const parameterRet = await ctx.helper.getRequestParameter();
    if (parameterRet.code !== 0) {
      return ctx.helper.formatMsg(parameterRet);
    }
    // 取非文件数据参数
    const parameter = parameterRet.data.commonData;
    if (parameterRet.data.validate) {
      const rule = {
        roleId: { type: 'integer', required: true, min: 0 },
      };
      ctx.validate(rule, parameter);
    }
    const result = await service.rbac.roleHasPermission(parameter);
    return ctx.helper.formatMsg(result);
  }


}

module.exports = RbacController;
