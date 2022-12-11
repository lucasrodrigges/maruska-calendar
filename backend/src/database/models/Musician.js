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
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    }, {
      sequelize,
      underscored: true,
    });
  }

  static associate({ EventMusician }) {
    this.hasMany(EventMusician, {
      foreignKey: 'musician_id',
    });
  }
};
