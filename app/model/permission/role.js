'use strict';

module.exports = app => {
  const Sequelize = app.Sequelize;

  const Role = app.model.define('role', {
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
    tablename: 'roles',
  });

  // 定义关联关系
  Role.associate = () => {

    // 定义多对多关联
    Role.belongsToMany(app.model.Permission.Permission, {
      // 中间表的model
      through: {
        model: app.model.Permission.RoleHasPermission, // 用于连接N: M关联两边的模型,
      },
      // 指定中间表的外键关联
      foreignKey: 'roleId',
      // 进行关联查询时，关联表查出来的数据模型的alias
      as: 'Permissions',
      onUpdate: 'CASCADE', // default: 'SET NULL|CASCADE'
      onDelete: 'CASCADE', // default: 'CASCADE'
      // 外键上应该启用on update和on delete约束。
      constraints: true,
    });

    // TODO: 因为不知道suquelize是如何通过字符串渲染一个类的实例的，所以当前没有使用type类型，只是单纯的支持user用户分配权限
    // 定义多对多关联 模型拥有的权限
    Role.belongsToMany(app.model.User, {
      // 中间表的model
      through: {
        model: app.model.Permission.ModelHasRole, // 用于连接N: M关联两边的模型,
      },
      // 指定中间表的外键关联
      foreignKey: 'roleId',
      // as重名名之后,要注意,get,set,add函数对应的函数名,均发生变化.
      as: 'Users',
      onUpdate: 'CASCADE', // default: 'SET NULL|CASCADE'
      onDelete: 'CASCADE', // default: 'CASCADE'
      // 外键上应该启用on update和on delete约束。
      constraints: true,
    });
  };

  return Role;
};
