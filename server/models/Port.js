module.exports = (sequelize, DataTypes) => {
  const Port = sequelize.define("Port", {
    port_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Port.associate = (models) => {
    Port.hasMany(models.Shipment, {
      foreignKey: "PortId"
    });
  };

  return Port;
};