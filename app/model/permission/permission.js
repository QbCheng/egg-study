'use strict';

module.exports = app => {
  const Sequelize = app.Sequelize;
  const Permission = app.model.define('permission', {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
    },
    name: {
      type: Sequelize.STRING(100),
      field: 'name',
    },
  }, {
    timestamps: true,
    tablename: 'permissions',
  });

  // 定义关联关系;
  Permission.associate = () => {
    Permission.belongsToMany(app.model.Permission.Role, {
      through: {
        model: app.model.Permission.RoleHasPermission, // 用于连接N: M关联两边的模型,
      },
      as: 'Roles',
      foreignKey: 'permissionId',
      constraints: true,
    });
    Permission.belongsToMany(app.model.User, {
      through: {
        model: app.model.Permission.ModelHasPermission, // 用于连接N: M关联两边的模型,
      },
      as: 'Users',
      foreignKey: 'permissionId',
      constraints: true,
    });
  };

  return Permission;
};
