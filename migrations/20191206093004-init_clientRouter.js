'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 用户拥有的客户端路由权限表
    await queryInterface.createTable('model_has_client_router',
      {
        id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true, comment: '主键索引' },
        userId: {
          type: Sequelize.BIGINT,
          index: true,
          // 增加外键
          references: {
            model: {
              tableName: 'users',
            },
            key: 'id',
          },
          onUpdate: 'cascade',
          onDelete: 'cascade',
        },
        name: {
          type: Sequelize.STRING(30),
          comment: '权限名',
        },
      },
      {
        engine: 'InnoDB', // default: 'InnoDB'
        comment: '用户拥有的客户端路由权限表', // comment for table
      }
    );
  },

  down: async queryInterface => {
    await queryInterface.dropTable('model_has_client_router');
  },
};
