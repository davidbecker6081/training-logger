import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:password@localhost:5432/training_logger'); // Update credentials

export default sequelize;