'use strict';

module.exports = app => {
  const Sequelize = app.Sequelize;

  const ModelHasRole = app.model.define('ModelHasRole', {
    roleId: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: false,
      field: 'roleId',
    },
    modelId: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      field: 'modelId',
    },
  }, {
    timestamps: false,
  });

  return ModelHasRole;
};
