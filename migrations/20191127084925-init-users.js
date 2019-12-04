'use strict';
// npx sequelize migration:generate --name=init-users 创建指令
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('users',
      {
        id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true, comment: '主键索引' },
        account: { type: Sequelize.STRING(30), comment: '账号', unique: true },
        password: { type: Sequelize.STRING(30), comment: '密码' },
        // Timestamps
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      {
        engine: 'InnoDB', // default: 'InnoDB',
        comment: '用户表', // comment for table
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};
