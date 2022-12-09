const {
  Model,
  DataTypes,
} = require('sequelize');

class Event extends Model {
  static init(sequelize) {
    super.init({
      title: DataTypes.STRING,
      description: DataTypes.DATE,
      location: DataTypes.STRING,
      when: DataTypes.DATE,
    }, {
      sequelize,
      underscored: true,
    });
  }

  static associate({ EventMusician }) {
    this.hasMany(EventMusician, {
      foreignKey: 'event_id',
    });
  }
}

module.exports = Event;