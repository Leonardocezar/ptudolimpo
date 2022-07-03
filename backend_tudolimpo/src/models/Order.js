const { Model, DataTypes } = require("sequelize");
class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        reference: DataTypes.STRING,
        city: DataTypes.STRING,
        street: DataTypes.STRING,
        number: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        date: DataTypes.DATE,
        is_approved: DataTypes.BOOLEAN,
        is_rejected: DataTypes.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Service, {
      foreignKey: "service_id",
      as: "service",
    });
  }
}

module.exports = Order;
