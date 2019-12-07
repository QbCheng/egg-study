'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 创建一个权限表
    await queryInterface.createTable('permissions',
      {
        id: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING(100),
        },
        // Timestamps
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      {
        engine: 'InnoDB', // default: 'InnoDB'
        comment: '权限表', // comment for table
      }
    );

    // 创建一个角色表
    await queryInterface.createTable('roles',
      {
        id: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING(100),
        },
        // Timestamps
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      {
        engine: 'InnoDB', // default: 'InnoDB'
        comment: '角色表', // comment for table
      }
    );

    // 角色权限关系表
    await queryInterface.createTable('role_has_permissions',
      {
        roleId: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          // 增加外键
          references: {
            model: {
              tableName: 'roles',
            },
            key: 'id',
          },
          onUpdate: 'cascade',
          onDelete: 'cascade',
        },
        permissionId: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          // 增加外键
          references: {
            model: {
              tableName: 'permissions',
            },
            key: 'id',
          },
          onUpdate: 'cascade',
          onDelete: 'cascade',
        },
        // // Timestamps
        // created_at: Sequelize.DATE,
        // updated_at: Sequelize.DATE,
      },
      {
        engine: 'InnoDB', // default: 'InnoDB'
        comment: '角色权限关系表', // comment for table
      }
    );

    // 模型角色关系表
    await queryInterface.createTable('model_has_roles',
      {
        roleId: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          // 增加外键
          references: {
            model: {
              tableName: 'roles',
            },
            key: 'id',
          },
          onUpdate: 'cascade',
          onDelete: 'cascade',
        },
        modelId: {
          type: Sequelize.BIGINT,
          primaryKey: true,
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
        // // Timestamps
        // created_at: Sequelize.DATE,
        // updated_at: Sequelize.DATE,
      },
      {
        engine: 'InnoDB', // default: 'InnoDB'
        comment: '模型角色关系表', // comment for table
      }
    );

    // 模型权限关系表
    await queryInterface.createTable('model_has_permissions',
      {
        permissionId: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          // 增加外键
          references: {
            model: {
              tableName: 'permissions',
            },
            key: 'id',
          },
          onUpdate: 'cascade',
          onDelete: 'cascade',
        },
        modelId: {
          type: Sequelize.BIGINT,
          primaryKey: true,
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
        // // Timestamps
        // created_at: Sequelize.DATE,
        // updated_at: Sequelize.DATE,
      },
      {
        engine: 'InnoDB', // default: 'InnoDB'
        comment: '模型权限关系表', // comment for table
      }
    );
  },

  down: async queryInterface => {
    await queryInterface.dropTable('permissions');
    await queryInterface.dropTable('roles');
    await queryInterface.dropTable('role_has_permissions');
    await queryInterface.dropTable('model_has_roles');
    await queryInterface.dropTable('model_has_permissions');
  },
};
