const { Pool } = require('pg');

const PG_URI = 'postgres://nopyulan:WKLiI-Qx46dvnkVPu-YRJjbKuBBi9oJp@fanny.db.elephantsql.com/nopyulan'

const pool = new Pool({connectionString: PG_URI});

module.exports = {
    query: (text, params, callback) => {
      console.log('Executed Query', text);
      return pool.query(text, params, callback);
    }
};
