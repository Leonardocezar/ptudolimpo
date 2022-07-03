const { Model, DataTypes } = require("sequelize");
class Customer extends Model {
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
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

module.exports = Customer;
