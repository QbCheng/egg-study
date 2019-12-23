'use strict';

const Service = require('egg').Service;

class RbacService extends Service {

  // 获得与RBAC系统相关的配置
  getRbacUserConfig() {

    const obj = {
      rbacCacheTime: 86400,
    };

    return obj;
  }

  // 获得权限列表
  async permissionList(parameter) {
    const { ctx } = this;
    // 获取必要参数
    const { page, limit, id, name } = parameter;
    const opt1 = {
      where: {},
      offset: (page - 1) * limit,
      limit,
      order: [[ 'created_at', 'DESC' ]],
    };
    const opt2 = { where: {} };
    if (!ctx.helper.isEmpty(id)) {
      opt1.where.id = id;
      opt2.where.id = id;
    }

    if (!ctx.helper.isEmpty(name)) {
      opt1.where.name = name;
      opt2.where.name = name;
    }
    const permissionList = await ctx.model.Permission.Permission.findAll(
      opt1
    );

    const totalNum = await ctx.model.Permission.Permission.count(opt2);

    const ret = {
      list: permissionList,
      length: permissionList.length,
      totalNum,
    };
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
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    // 获取必要参数
    const { id } = parameter;
    const data = [];
    if (id && id.length > 0) {
      id.forEach(element => {
        data.push({ id: element });
      });
    }
    const opt = {
      where: {
        [Op.or]: data,
      },
    };
    const delRet = await ctx.model.Permission.Permission.destroy(opt);
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
    const { page, limit, id, name } = parameter;
    const opt1 = {
      where: {},
      offset: (page - 1) * limit,
      limit,
      order: [[ 'created_at', 'DESC' ]],
    };
    const opt2 = { where: {} };
    if (!ctx.helper.isEmpty(id)) {
      opt1.where.id = id;
      opt2.where.id = id;
    }

    if (!ctx.helper.isEmpty(name)) {
      opt1.where.name = name;
      opt2.where.name = name;
    }
    const list = await ctx.model.Permission.Role.findAll(
      opt1
    );

    const totalNum = await ctx.model.Permission.Role.count(opt2);

    const ret = {
      list,
      length: list.length,
      totalNum,
    };
    return ctx.helper.formatInternalMsg(0, 'succ', ret);
  }

  // 删除角色
  async delRole(parameter) {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    // 获取必要参数
    const { id } = parameter;
    const data = [];
    if (id && id.length > 0) {
      id.forEach(element => {
        data.push({ id: element });
      });
    }
    const opt = {
      where: {
        [Op.or]: data,
      },
    };
    const delRet = await ctx.model.Permission.Role.destroy(opt);
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
    const cacheRet = await this.setUserPermissionCache(permissionList);
    if (cacheRet) {
      console.log('cacheRet succ');
    } else {
      console.log('cacheRet failed');
    }
    const ret = {
      permissionList,
    };
    return ctx.helper.formatInternalMsg(0, 'succ', ret);
  }

  // 角色拥有的权限
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
    if (!permissionList) {
      return ctx.helper.formatInternalMsg(-1, 'Nonexistent Role', {});
    }
    const ret = {
      permissionList,
    };
    return ctx.helper.formatInternalMsg(0, 'succ', ret);
  }

  // 将用户权限缓存
  async setUserPermissionCache(cacheData) {
    const data = {};
    // 处理一下数据
    for (const key in cacheData) {
      data[key] = JSON.stringify(cacheData[key]);
    }
    const { ctx } = this;
    const userId = ctx.state.user.id;
    const redisConfig = ctx.service.redis.getRedisUserConfig();
    // 获取redis客户端实例
    const redisInstance = await ctx.service.redis.getRedisInstanceInMultiClent(redisConfig.redisClientIndex.cache);
    const key = ctx.service.redis.getRabcCacheRedisKey(userId);
    console.log(userId);
    console.log(key);
    const rbacConfig = this.getRbacUserConfig();
    // 设置数据
    const hmsetRet = await redisInstance.hmset(key, data);
    // 设置数据过期时间
    const expierRet = await redisInstance.expire(key, rbacConfig.rbacCacheTime);
    return true;
  }
}
module.exports = RbacService;
