const dbConfig = require("../config/db.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.js")(sequelize, Sequelize);
db.product = require("./product.js")(sequelize, Sequelize);
db.transaction = require("./transaction.js")(sequelize, Sequelize);
db.transactiondetail = require("./transactiondetail.js")(sequelize, Sequelize);

db.user.hasMany(db.transaction, { as: "transaction" });
db.transaction.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});


db.transaction.hasMany(db.transactiondetail, { as: "transactiondetail" });
db.transactiondetail.belongsTo(db.transaction, {
  foreignKey: "transactionId",
  as: "transaction",
});

db.product.hasMany(db.transactiondetail, { as: "transactiondetail" });
db.transactiondetail.belongsTo(db.product, {
  foreignKey: "productId",
  as: "product",
});



module.exports = db;