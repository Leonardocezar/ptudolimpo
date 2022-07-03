const { Model, DataTypes } = require("sequelize");
class Team extends Model {
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

    this.hasMany(models.Booking, {
      foreignKey: "team_id",
      as: "team",
    });
  }
}

module.exports = Team;
