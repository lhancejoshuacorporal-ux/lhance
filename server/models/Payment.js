module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define("Payment", {
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    payment_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    payment_status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Payment.associate = (models) => {
    Payment.belongsTo(models.Booking, {
      foreignKey: "BookingId"
    });
  };

  return Payment;
};