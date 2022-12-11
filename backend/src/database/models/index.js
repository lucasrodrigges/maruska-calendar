const fs = require('fs');
const path = require('path');

const Sequelize = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config);

const models = fs.readdirSync(__dirname)
  .filter((file) => file.endsWith('.js') && file !== path.basename(__filename))
  .reduce((arr, file) => {
    const modelPath = path.join(__dirname, '../models', file);
    return [...arr, require(modelPath)];
  }, []);

models.forEach((model) => model.init(sequelize));
models.forEach((model) => model.associate && model.associate(sequelize.models));

module.exports = sequelize;
