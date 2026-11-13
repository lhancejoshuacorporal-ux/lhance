module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define("Customer", {
    customerID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  Customer.associate = (models) => {
    Customer.hasMany(models.Booking, {
      foreignKey: "CustomerId",
      sourceKey: "customerID"
    });
  };

  return Customer;
};