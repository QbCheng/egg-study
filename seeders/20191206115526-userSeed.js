'use strict';
const moment = require('moment');

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('users',
      [{
        account: 'test1',
        password: 'test1',
        introduction: '',
        avatar: '',
        name: '陈膑',
        created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        account: 'test2',
        password: 'test2',
        introduction: '',
        avatar: '',
        name: 'test2',
        created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      }],
      {});
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
