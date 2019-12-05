'use strict';

const Service = require('egg').Service;

class RbacService extends Service {

  // 获得权限列表
  async permissionList(parameter) {
    const { ctx } = this;
    // 获取必要参数
    const { mark, interval } = parameter;
    const permissionList = await ctx.model.Permission.Permission.findAll(
      {
        attributes: [ 'name', 'id' ],
        offset: mark * interval,
        limit: interval,
      }
    );

    const totalNum = await ctx.model.Permission.Permission.count({});

    const ret = {
      list: permissionList,
      length: permissionList.length,
      totalNum,
    };

    console.log(permissionList);
    return ctx.helper.formatInternalMsg(0, 'succ', ret);
  }


  async createPermission(parameter) {
    const { ctx } = this;
    // 获取必要参数
    const { name } = parameter;
    await ctx.model.Permission.Permission.create({
      name,
    }, {
      // -TODO: 一般都会带操作参数，随便举个比方(这些配置，在生成suquelize实例就已经配置过来好像)
      silent: false, // 如果为真，则不会更新updatedAt时间戳。默认是false
    });
    return ctx.helper.formatInternalMsg(0, 'succ', {});
  }

  // 删除某个权限
  async delPermission(parameter) {
    const { ctx } = this;
    // 获取必要参数
    const { id } = parameter;
    const delRet = await ctx.model.Permission.Permission.destroy({
      where: {
        id,
      },
    });
    if (delRet === 0) {
      return ctx.helper.formatInternalMsg(-1, 'Nonexistent permission', {});
    }
    return ctx.helper.formatInternalMsg(0, 'succ', {});
  }

  // 更新权限数据
  async updatePermission(parameter) {
    const { ctx } = this;
    // 获取必要参数
    const { id, name } = parameter;
    const saveRet = await ctx.model.Permission.Permission.update(
      { name },
      {
        where: {
          id,
        },
      }
    );
    if (saveRet === 0) {
      return ctx.helper.formatInternalMsg(-1, 'Nonexistent permission', {});
    }
    return ctx.helper.formatInternalMsg(0, 'succ', {});
  }

  // 获得角色列表
  async roleList(parameter) {
    const { ctx } = this;
    // 获取必要参数
    const { mark, interval } = parameter;
    const list = await ctx.model.Permission.Role.findAll(
      {
        attributes: [ 'name', 'id' ],
        offset: mark * interval,
        limit: interval,
        raw: true,
      }
    );

    const totalNum = await ctx.model.Permission.Permission.count({});

    const ret = {
      list,
      length: list.length,
      totalNum,
    };

    console.log(list);
    return ctx.helper.formatInternalMsg(0, 'succ', ret);
  }

  // 删除角色
  async delRole(parameter) {
    const { ctx } = this;
    // 获取必要参数
    const { id } = parameter;
    const delRet = await ctx.model.Permission.Role.destroy({
      where: {
        id,
      },
    });
    if (delRet === 0) {
      return ctx.helper.formatInternalMsg(-1, 'Nonexistent role', {});
    }
    return ctx.helper.formatInternalMsg(0, 'succ', {});
  }

  // 增加角色
  async createRole(parameter) {
    const { ctx } = this;
    // 获取必要参数
    const { name } = parameter;
    const createRet = await ctx.model.Permission.Role.create({
      name,
    }, {
      // -TODO: 一般都会带操作参数，随便举个比方(这些配置，在生成suquelize实例就已经配置过来好像)
      silent: false, // 如果为真，则不会更新updatedAt时间戳。默认是false
    });
    if (createRet === 0) {
      return ctx.helper.formatInternalMsg(-1, 'create role failed', {});
    }
    return ctx.helper.formatInternalMsg(0, 'succ', {});
  }

  // 更新角色数据
  async updateRole(parameter) {
    const { ctx } = this;
    // 获取必要参数
    const { id, name } = parameter;
    const saveRet = await ctx.model.Permission.Role.update(
      { name },
      {
        where: {
          id,
        },
      }
    );
    if (saveRet === 0) {
      return ctx.helper.formatInternalMsg(-1, 'Nonexistent Role', {});
    }
    return ctx.helper.formatInternalMsg(0, 'succ', {});
  }

  // 给角色分配权限
  async roleAssignPermission(parameter) {
    const { ctx } = this;
    // 获取必要参数
    const { roleId, permissionIdList } = parameter;

    // findByPk : 通过主键去查询
    const roleModel = await ctx.model.Permission.Role.findByPk(roleId, {});
    if (!roleModel) {
      return ctx.helper.formatInternalMsg(-1, 'Nonexistent role', {});
    }
    // -TODO: 插入成功返回对象的数组
    const addRet = await roleModel.addPermissions(permissionIdList);
    console.log(addRet);
    if (!addRet) {
      return ctx.helper.formatInternalMsg(-1, 'permission exist', {});
    }
    return ctx.helper.formatInternalMsg(0, 'succ', {});
  }

  async roleUnassignPermission(parameter) {
    const { ctx } = this;
    // 获取必要参数
    const { roleId, permissionIdList } = parameter;

    // findByPk : 通过主键去查询
    const roleModel = await ctx.model.Permission.Role.findByPk(roleId, {});
    if (!roleModel) {
      return ctx.helper.formatInternalMsg(-1, 'Nonexistent role', {});
    }
    const removeRet = await roleModel.removePermissions(permissionIdList);
    console.log(removeRet);
    if (removeRet === 0) {
      return ctx.helper.formatInternalMsg(-1, 'Permissions remove failed', {});
    }
    return ctx.helper.formatInternalMsg(0, 'succ', {});
  }

  // 给用户分配权限
  async userAssignPermission(parameter) {
    const { ctx } = this;
    // 获取必要参数
    const { userId, permissionIdList } = parameter;

    // findByPk : 通过主键去查询
    const UserModel = await ctx.model.User.findByPk(userId, {});
    if (!UserModel) {
      return ctx.helper.formatInternalMsg(-1, 'Nonexistent user', {});
    }
    const addRet = await UserModel.addPermissions(permissionIdList);
    console.log(addRet);
    if (!addRet) {
      return ctx.helper.formatInternalMsg(-1, 'Permissions add failed', {});
    }
    return ctx.helper.formatInternalMsg(0, 'succ', {});
  }

  // 给用户分配角色
  async userAssignRole(parameter) {
    const { ctx } = this;
    // 获取必要参数
    const { userId, roleIdList } = parameter;

    // findByPk : 通过主键去查询
    const UserModel = await ctx.model.User.findByPk(userId, {});
    if (!UserModel) {
      return ctx.helper.formatInternalMsg(-1, 'Nonexistent user', {});
    }
    const addRet = await UserModel.addRoles(roleIdList);
    if (!addRet) {
      return ctx.helper.formatInternalMsg(-1, 'Role add failed', {});
    }
    return ctx.helper.formatInternalMsg(0, 'succ', {});
  }

  // 给用户卸载角色
  async userUnassignRole(parameter) {
    const { ctx } = this;
    // 获取必要参数
    const { userId, roleIdList } = parameter;

    // findByPk : 通过主键去查询
    const UserModel = await ctx.model.User.findByPk(userId, {});
    if (!UserModel) {
      return ctx.helper.formatInternalMsg(-1, 'Nonexistent user', {});
    }
    const removeRet = await UserModel.removeRoles(roleIdList);
    if (removeRet === 0) {
      return ctx.helper.formatInternalMsg(-1, 'Role remove failed', {});
    }
    return ctx.helper.formatInternalMsg(0, 'succ', {});
  }

  // 用户拥有的单权限
  async userHasPermission() {
    const { ctx } = this;
    const userId = ctx.state.user.id;
    // -TODO: 使用关联查询时，定义关联时，使用来as，则此处必须显式写出as的别名
    const permissionList = await ctx.model.User.findByPk(userId, {
      include: [{
        model: ctx.model.Permission.Permission,
        as: 'Permissions',
      }],
    });

    if (!permissionList) {
      return ctx.helper.formatInternalMsg(-1, 'Nonexistent user', {});
    }
    const ret = {
      permissionList,
    };
    return ctx.helper.formatInternalMsg(0, 'succ', ret);
  }

  // 用户拥有的角色
  async userHasRole() {
    const { ctx } = this;
    const userId = ctx.state.user.id;
    // -TODO: 使用关联查询时，定义关联时，使用来as，则此处必须显式写出as的别名
    const roleList = await ctx.model.User.findByPk(userId, {
      include: [{
        model: ctx.model.Permission.Role,
        as: 'Roles',
      }],
    });
    if (!roleList) {
      return ctx.helper.formatInternalMsg(-1, 'Nonexistent user', {});
    }
    const ret = {
      roleList,
    };
    return ctx.helper.formatInternalMsg(0, 'succ', ret);
  }

  // 获得用户所有的权限
  async userHasAllPermission() {
    const { ctx } = this;
    const userId = ctx.state.user.id;
    // -TODO: 使用关联查询时，定义关联时，使用来as，则此处必须显式写出as的别名
    const retData = await ctx.model.User.findByPk(userId, {
      include: [
        {
          model: ctx.model.Permission.Role,
          attributes: [ 'id' ], // 设置返回的属性
          as: 'Roles',
          include: [{
            attributes: [ 'id', 'name' ], // 设置返回的属性
            model: ctx.model.Permission.Permission,
            as: 'Permissions',
          },
          ],
        },
        {
          attributes: [ 'id', 'name' ], // 设置返回的属性
          model: ctx.model.Permission.Permission,
          as: 'Permissions',
        },
      ],
    });
    if (!retData) {
      return ctx.helper.formatInternalMsg(-1, 'Nonexistent user', {});
    }
    // 权限汇总
    const data = retData.dataValues;
    // 权限汇总结果保持
    const permissionList = {};
    // 将用户拥有的角色的权限汇总
    if (data.Roles && data.Roles.length > 0) {
      data.Roles.forEach(value => {
        if (value.Permissions && value.Permissions.length > 0) {
          value.Permissions.forEach(value => {
            if (permissionList[value.id]) {
              return;
            }
            permissionList[value.id] = {
              id: value.id,
              name: value.name,
            };
          });
        }
      });
    }
    // 将用户拥有的单权限汇总
    if (data.Permissions && data.Permissions.length > 0) {
      data.Permissions.forEach(value => {
        if (permissionList[value.id]) {
          return;
        }
        permissionList[value.id] = {
          id: value.id,
          name: value.name,
        };
      });
    }
    const ret = {
      permissionList,
    };
    return ctx.helper.formatInternalMsg(0, 'succ', ret);
  }

  async roleHasPermission(parameter) {
    const { ctx } = this;
    // 获取必要参数
    const { roleId } = parameter;

    // findByPk : 通过主键去查询
    const permissionList = await ctx.model.Permission.Role.findByPk(roleId, {
      include: [{
        model: ctx.model.Permission.Permission,
        as: 'Permissions',
      }],
    });
    console.log(permissionList.dataValues);
    if (!permissionList) {
      return ctx.helper.formatInternalMsg(-1, 'Nonexistent Role', {});
    }
    const ret = {
      permissionList,
    };
    return ctx.helper.formatInternalMsg(0, 'succ', ret);
  }
}

module.exports = RbacService;
