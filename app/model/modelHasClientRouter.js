'use strict';

module.exports = app => {
  const Sequelize = app.Sequelize;

  const ModelHasClientRouter = app.model.define('ModelHasClientRouter', {
    id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true, comment: '主键索引' },
    userId: {
      type: Sequelize.BIGINT,
      index: true,
      field: 'userId',
    },
    name: {
      type: Sequelize.BIGINT,
      field: 'name',
    },
  }, {
    timestamps: false,
    tableName: 'model_has_client_router', // 该字段可以主动的去定义table表的名字
  });

  return ModelHasClientRouter;
};
