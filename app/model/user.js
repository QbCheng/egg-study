'use strict';

module.exports = app => {
  const Sequelize = app.Sequelize;

  const User = app.model.define('user', {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
    },
    account: {
      type: Sequelize.STRING(30),
      field: 'account',
    },
    password: {
      type: Sequelize.STRING(30),
      field: 'password',
    },
  }, {
    timestamps: true,
    tablename: 'users',
  });

  User.associate = () => {
    User.belongsToMany(app.model.Permission.Role, {
      // 中间表的model
      through: {
        model: app.model.Permission.ModelHasRole, // 用于连接N: M关联两边的模型,
      },
      // 指定中间表的外键关联
      foreignKey: 'modelId',
      // 进行关联查询时，关联表查出来的数据模型的alias
      as: 'Roles',
      onUpdate: 'CASCADE', // default: 'SET NULL|CASCADE'
      onDelete: 'CASCADE', // default: 'CASCADE'
      // 外键上应该启用on update和on delete约束。
      constraints: true,
    });

    User.belongsToMany(app.model.Permission.Permission, {
      // 中间表的model
      through: {
        model: app.model.Permission.ModelHasPermission, // 用于连接N: M关联两边的模型,
      },
      // 指定中间表的外键关联
      foreignKey: 'modelId',
      // 进行关联查询时，关联表查出来的数据模型的alias
      as: 'Permissions',
      onUpdate: 'CASCADE', // default: 'SET NULL|CASCADE'
      onDelete: 'CASCADE', // default: 'CASCADE'
      // 外键上应该启用on update和on delete约束。
      constraints: true,
    });
  };

  return User;
};
