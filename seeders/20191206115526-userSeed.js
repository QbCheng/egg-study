'use strict';

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('users',
      [{
        account: 'test1',
        password: 'test1',
        introduction: '',
        avatar: '',
        name: '陈膑',
      },
      {
        account: 'test2',
        password: 'test2',
        introduction: '',
        avatar: '',
        name: 'test2',
      }],
      {});
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
