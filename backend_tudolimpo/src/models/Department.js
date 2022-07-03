const { Model, DataTypes } = require("sequelize");
class Department extends Model {
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
    this.hasMany(models.Team, {
      foreignKey: "department_id",
      as: "teams",
    });
  }
}

module.exports = Department;
