const {
  Model,
  DataTypes,
} = require('sequelize');

module.exports = class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      picture: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    }, {
      sequelize,
      underscored: true,
    });
  }

  // static associate(models) {
  //   // define association here
  // }
};
