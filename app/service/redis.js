'use strict';

const Service = require('egg').Service;

class RedisService extends Service {

  // 获得与redis相关的配置文件
  getRedisUserConfig() {
    const obj = {
      // REDIS客户端索引配置
      redisClientIndex: {
        user: 'user',
        cache: 'cache',
        extra: 'extra',
      },

      redisKeyPrefix: {
        rabcCache: 'rabcCache',
      },
    };
    return obj;
  }

  // 在多redis客户端模式下获取redis的实例
  getRabcCacheRedisKey(userId) {
    const redisconfig = this.getRedisUserConfig();
    return redisconfig.redisKeyPrefix.rabcCache + '___' + userId;
  }

  // 在多redis客户端模式下获取redis的实例
  async getRedisInstanceInMultiClent(instanceName) {
    if (!instanceName) {
      return null;
    }
    const { app } = this;
    const redisInstance = await app.redis.get(instanceName);
    if (!redisInstance) {
      return null;
    }
    return redisInstance;
  }

}

module.exports = RedisService;
