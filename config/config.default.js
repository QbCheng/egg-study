/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1574756224845_4620';

  // add your middleware config here
  config.middleware = [
  ];

  // 使用onerror组件
  config.onerror = {
    // TODO 当前讲所有的异常返回都截短，没有按照类型来划分，思路可以看看这个相应声明的异常类类型来判断，但是感觉又会特别慢
    all(err, ctx) {
      // 在此处定义针对所有响应类型的错误处理方法
      // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
      ctx.body = { code: 0, error: err.message, info: [] };
      ctx.status = 200;
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // sequelize配置
  config.sequelize = {
    delegate: 'model',
    baseDir: 'model',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    benchmark: true,
    database: 'egg',
    // -TODO: 修改suquelize时区问题
    typeCast(field, next) { // for reading from database
      if (field.type === 'DATETIME') {
        return field.string();
      }
      return next();
    },
    timezone: '+08:00', // for writing to database
    define: {
      freezeTableName: false, // 如果freezeTableName为真，sequelize将不会尝试更改模型名称以获得表名称。否则，模型名称将是复数形式
      underscored: true, // 向所有属性添加下划线字段，包括用户定义的属性、时间戳和外键。不会影响属性与显式设置字段选项
      timestamps: true, // `timestamps` 字段指定是否将创建 `createdAt` 和 `updatedAt` 字段.
      charset: 'utf8mb4',
      dialectOptions: {
        collate: 'utf8mb4_general_ci',
      },
    },
  };

  // 设置安全组件
  config.security = {
    // 关闭csrf
    csrf: {
      enable: false,
    },
  };

  // egg-validate配置 -TODO: 具体配置作用,看parameter官网
  config.validate = {
    // convert: false,
    // validateRoot: false,
  };

  // 增加一个egg-multipart配置，详细配置看官网，
  config.multipart = {
    mode: 'stream',
    // 增加白名单的内容
    fileExtensions: [
      'text',
    ],
  };

  // 多客户端配置，也可以使用集群配置
  config.redis = {
    clients: {
      user: { // instanceName. See below
        port: 6379, // Redis port
        host: '127.0.0.1', // Redis host
        password: '',
        db: 0,
      },
      cache: {
        port: 6379,
        host: '127.0.0.1',
        password: '',
        db: 1,
      },
      extra: {
        port: 6379,
        host: '127.0.0.1',
        password: '',
        db: 2,
      },
    },
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // {app_root}/config/plugin.js
  // 服务器鉴权组件
  config.passport = {
    enable: true,
    package: 'egg-passport',
  };

  // 服务器鉴权组件 -本地登录组件
  config.passportLocal = {
    enable: true,
    package: 'egg-passport-local',
  };

  // jwt组件配置
  config.jwt = {
    secret: '123456',
  };

  return {
    ...config,
    ...userConfig,
  };


};
