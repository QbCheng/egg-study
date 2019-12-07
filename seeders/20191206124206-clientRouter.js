'use strict';

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('model_has_client_router',
      [{
        userId: '1',
        name: 'admin',
      },
      {
        userId: '1',
        name: 'sys',
      }],
      {});
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('model_has_client_router', null, {});
  },
};
