'use strict';

module.exports = app => {
  const Sequelize = app.Sequelize;

  const ModelHasPermission = app.model.define('ModelHasPermission', {
    permissionId: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: false,
      field: 'permissionId',
    },
    modelId: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      field: 'modelId',
    },
  }, {
    timestamps: false,
  });

  return ModelHasPermission;
};
