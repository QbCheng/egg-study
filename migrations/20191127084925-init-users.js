'use strict';
// npx sequelize migration:generate --name=init-users 创建指令
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('users',
      {
        id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true, comment: '主键索引' },
        account: { type: Sequelize.STRING(30), comment: '账号', unique: true },
        password: { type: Sequelize.STRING(30), comment: '密码' },
        introduction: { type: Sequelize.STRING(250), comment: '用户简介' },
        avatar: { type: Sequelize.STRING(200), comment: '头像地址' },
        name: { type: Sequelize.STRING(30), comment: '姓名' },
        // Timestamps
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      {
        engine: 'InnoDB', // default: 'InnoDB',
        comment: '用户表', // comment for table
      }
    );
    // 增加索引
    await queryInterface.addIndex('users', [ 'account', 'password' ], {
      fields: [ 'account', 'password' ],
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};
