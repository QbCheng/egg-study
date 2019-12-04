'use strict';

module.exports = app => {
  const Sequelize = app.Sequelize;

  const RoleHaspermission = app.model.define('RoleHasPermission', {
    roleId: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      // 增加外键
      references: {
        model: 'role',
        key: 'id',
      },
      field: 'roleId',
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
    permissionId: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      // 增加外键
      references: {
        model: 'permissions',
        key: 'id',
      },
      field: 'permissionId',
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
  }, {
    timestamps: false,
    tableName: 'role_has_permissions', // 该字段可以主动的去定义table表的名字
  });

  return RoleHaspermission;
};
