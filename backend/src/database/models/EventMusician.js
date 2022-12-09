const {
  Model,
} = require('sequelize');

class EventMusician extends Model {
  static init(sequelize) {
    super.init({}, {
      sequelize,
      tableName: 'events_musicians',
      underscored: true,
    });
  }

  static associate({ Event, Musician }) {
    Event.belongsToMany(Musician, {
      as: 'musicians',
      through: this,
      foreignKey: 'event_id',
      otherKey: 'musician_id',
    });

    Musician.belongsToMany(Event, {
      as: 'events',
      through: this,
      foreignKey: 'musician_id',
      otherKey: 'event_id',
    });
  }
}

module.exports = EventMusician;
