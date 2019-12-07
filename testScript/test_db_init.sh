#用来创建数据库，填充数据库，主要是在测试环境下使用
npx sequelize db:drop egg
npx sequelize db:create egg
npx sequelize db:migrate
npx sequelize db:seed:all