const {
  Model,
  DataTypes,
  QueryTypes,
} = require('sequelize');

class Event extends Model {
  static init(sequelize) {
    super.init({
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      when: DataTypes.DATE,
    }, {
      sequelize,
      underscored: true,
    });
  }

  static async getFiltered() {
    return this.sequelize.query(`
      SELECT e.* ,
      m.id AS 'musicians.id', m.name AS 'musicians.name', m.instrument AS 'musicians.instrument' 
      FROM maruska.events AS e 
        LEFT OUTER JOIN ( events_musicians AS em 
          INNER JOIN musicians AS m ON m.id = em.musician_id) 
            ON e.id = em.event_id
      WHERE e.when > NOW()
      ORDER BY e.when ASC`, {
      type: QueryTypes.SELECT,
      nest: true,
    });
  }

  static associate({ EventMusician }) {
    this.hasMany(EventMusician, {
      foreignKey: 'event_id',
    });
  }
}

module.exports = Event;
