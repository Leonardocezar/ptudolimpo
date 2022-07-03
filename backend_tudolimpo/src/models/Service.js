const { Model, DataTypes } = require("sequelize");
class Service extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Department, {
      foreignKey: "department_id",
      as: "department",
    });
  }
}

module.exports = Service;
