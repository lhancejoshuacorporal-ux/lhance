module.exports = (sequelize, DataTypes) => {
  const Ship = sequelize.define("Ship", {
    ship_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ship_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Ship.associate = (models) => {
    Ship.hasMany(models.Shipment, {
      foreignKey: "ShipId"
    });
  };

  return Ship;
};