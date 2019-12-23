'use strict';
const moment = require('moment');

module.exports = {
  up: async queryInterface => {
    const temp = [];
    const temp2 = [];
    for (let i = 0; i < 50; i++) {
      temp.push({
        name: 'permission_' + i,
        created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      });
      temp2.push({
        name: 'role_' + i,
        created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      });
    }
    await queryInterface.bulkInsert('permissions',
      temp,
      {});
    await queryInterface.bulkInsert('roles',
      temp2,
      {});
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('permissions', null, {});
    await queryInterface.bulkDelete('roles', null, {});
  },
};
