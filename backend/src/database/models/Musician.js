const {
  Model,
  DataTypes,
} = require('sequelize');

module.exports = class Musician extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      instrument: DataTypes.STRING,
      picture: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      createdAt: {
        defaultValue: DataTypes.NOW,
        type: DataTypes.DATE,
      },
      updatedAt: {
        defaultValue: DataTypes.NOW,
        type: DataTypes.DATE,
      },
    }, {
      sequelize,
      modelName: 'Musician',
      underscored: true,
    });
  }

  // static associate(models) {
  //   // define association here
  // }
};
