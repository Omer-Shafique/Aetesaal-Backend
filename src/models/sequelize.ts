import { Sequelize } from 'sequelize';
const sequelize = new Sequelize({

  dialect: 'mysql',
  database: 'your_database',
  username: 'your_username',
  password: 'your_password',
});

export default sequelize;
