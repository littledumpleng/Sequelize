// this file double checks the environment we're in. don't touch it!

import Sequelize from "sequelize";

import configOptions from "./config.js";
import modelList from "../models/index.js";

const { DataTypes } = Sequelize;

const env = process.env.NODE_ENV || "development";
const config = configOptions[env];

// if you're doing development use the development database out of the three databases
// (all three databases listed in config.js)
let sequelizeDB;
if (config.use_env_variable) {
  sequelizeDB = new Sequelize(process.env[config.use_env_variable], config);
}
// otherwise, defines a new sequelize object off of our import, sequelize
else {
  sequelizeDB = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// reducer is an array method that sets each model as a key on the database object
// returns it back out of this initializer as an Object of models
const db = Object.keys(modelList).reduce((collection, modelName) => {
  if (!collection[modelName]) {
    // eslint-disable-next-line no-param-reassign
    collection[modelName] = modelList[modelName](sequelizeDB, DataTypes);
  }
  return collection;
}, {});

// const models = sequelizeDB.models;
// Object.keys(models).map((modelKey) => models[modelKey])
//   .filter((model) => model.associate !== undefined)
//   .forEach((model) => model.associate(models));

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelizeDB = sequelizeDB;
db.Sequelize = Sequelize;

export default db;
