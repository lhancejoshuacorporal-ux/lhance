module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define("Booking", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    booking_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Booking.associate = (models) => {
    Booking.belongsTo(models.Customer, {
      foreignKey: "CustomerId",
      targetKey: "customerID"
    });

    Booking.hasOne(models.Shipment, {
      foreignKey: "BookingId"
    });

    Booking.hasOne(models.Payment, {
      foreignKey: "BookingId"
    });
  };

  return Booking;
};