'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/', controller.home.index);
  router.get('/test', jwt, controller.home.testJwt);

  // 用户登录(返回登录令牌)
  router.post('/user/login', controller.user.login);

  /*
  * 这里的第二个对象不再是控制器，而是 jwt 验证对象，第三个地方才是控制器
  * 只有在需要验证 token 的路由才需要第二个 是 jwt 否则第二个对象为控制器
  **/
  router.post('/home/testJwt', jwt, controller.home.testJwt);

  const RBACRouter = router.namespace('/rbac', jwt);
  // 获取权限列表
  RBACRouter.post('/permissionList', controller.rbac.permissionList);
  // 增加权限
  RBACRouter.post('/createPermission', controller.rbac.createPermission);
  // 删除权限
  RBACRouter.post('/delPermission', controller.rbac.delPermission);
  // 更新权限
  RBACRouter.post('/updatePermission', controller.rbac.updatePermission);
  // 获得角色列表
  RBACRouter.post('/roleList', controller.rbac.roleList);
  // 删除角色
  RBACRouter.post('/delRole', controller.rbac.delRole);
  // 增加角色
  RBACRouter.post('/createRole', controller.rbac.createRole);
  // 更新角色
  RBACRouter.post('/updateRole', controller.rbac.updateRole);
  // 给角色挂载权限
  RBACRouter.post('/roleAssignPermission', controller.rbac.roleAssignPermission);
  // 给角色卸载权限
  RBACRouter.post('/roleUnassignPermission', controller.rbac.roleUnassignPermission);
  // 给用户挂载权限
  RBACRouter.post('/userAssignPermission', controller.rbac.userAssignPermission);
  // 给用户挂载角色
  RBACRouter.post('/userAssignRole', controller.rbac.userAssignRole);
  // 给用户卸载角色
  RBACRouter.post('/userUnassignRole', controller.rbac.userUnassignRole);
  // 用户拥有的权限
  RBACRouter.post('/userHasPermission', controller.rbac.userHasPermission);
  // 用户拥有的角色
  RBACRouter.post('/userHasRole', controller.rbac.userHasRole);
  // 用户拥有的所有权限
  RBACRouter.post('/userHasAllPermission', controller.rbac.userHasAllPermission);
  // 角色拥有的权限
  RBACRouter.post('/roleHasPermission', controller.rbac.roleHasPermission);

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // 与用户有关的路由
  const UserRouter = router.namespace('/user', jwt);
  // 单用户操作
  UserRouter.post('/getUserInfo', controller.user.getUserInfo);

  // 用户列表
  UserRouter.post('/list', controller.user.list);
  // 更新用户
  UserRouter.post('/update', controller.user.update);
  // 删除用户
  UserRouter.post('/delete', controller.user.delete);
  // 创建用户
  UserRouter.post('/create', controller.user.create);

};
