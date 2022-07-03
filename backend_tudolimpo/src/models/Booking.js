const { Model, DataTypes } = require("sequelize");
class Booking extends Model {
  static init(sequelize) {
    super.init(
      {
        description: DataTypes.STRING,
        status: DataTypes.STRING,
        start: DataTypes.DATE,
        end: DataTypes.DATE,
        team_id: DataTypes.INTEGER,
        service_id: DataTypes.INTEGER,
        customer_id: DataTypes.INTEGER,
        updated_by: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Team, {
      foreignKey: "team_id",
      as: "team",
    });
    this.belongsTo(models.Service, {
      foreignKey: "service_id",
      as: "service",
    });
    this.belongsTo(models.Customer, {
      foreignKey: "customer_id",
      as: "customer",
    });
    this.belongsTo(models.User, {
      foreignKey: "created_by",
      as: "created",
    });
    this.belongsTo(models.User, {
      foreignKey: "updated_by",
      as: "updated",
    });
  }
}

module.exports = Booking;
