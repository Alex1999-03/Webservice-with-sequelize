const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const Detail = require("./detail.model");

const Sale = sequelize.define(
  "Sale",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    dateSale: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "sales",
    timestamps: false,
  }
);

Sale.hasMany(Detail, {foreignKey: 'saleId', sourceKey: 'id'});
Detail.belongsTo(Sale, {foreignKey: 'saleId', sourceKey: 'id'});

module.exports = Sale;