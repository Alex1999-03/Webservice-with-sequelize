const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const Detail = require("./detail.model");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    salePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    purchasePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "products",
    timestamps: false,
  }
);

Product.hasMany(Detail, {foreignKey: 'productId', sourceKey: 'id'});
Detail.belongsTo(Product, {foreignKey: 'productId', sourceKey: 'id'});

module.exports = Product;
