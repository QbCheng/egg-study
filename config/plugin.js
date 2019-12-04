'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // 使用egg-sequelize组件
  sequelize: {
    enable: true, // 是否开启
    package: 'egg-sequelize',
  },

  jwt: {
    enable: true,
    package: 'egg-jwt',
  },

  // 使用 egg-router-plus组件，增加统一的路由前缀和中间件，但是不支持路由重定向
  routerPlus: {
    enable: true,
    package: 'egg-router-plus',
  },

  // egg-validate egg-validate是基于parameter的。
  validate: {
    enable: true,
    package: 'egg-validate',
  },

};
