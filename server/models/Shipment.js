module.exports = (sequelize, DataTypes) => {
  const Shipment = sequelize.define("Shipment", {
    cargo_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false
    },
    departure_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    arrival_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  });

  Shipment.associate = (models) => {
    Shipment.belongsTo(models.Booking, {
      foreignKey: "BookingId"
    });

    Shipment.belongsTo(models.Ship, {
      foreignKey: "ShipId"
    });

    Shipment.belongsTo(models.Port, {
      foreignKey: "PortId"
    });
  };

  return Shipment;
};