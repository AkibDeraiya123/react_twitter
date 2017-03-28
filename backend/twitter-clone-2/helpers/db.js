const PoolCon = require('pg-pool');
const squel = require('squel').useFlavour('postgres');

// Set squel options
squel.cls.DefaultQueryBuilderOptions.autoQuoteFieldNames = true;
squel.cls.DefaultQueryBuilderOptions.autoQuoteTableNames = true;
squel.cls.DefaultQueryBuilderOptions.autoQuoteAliasNames = true;
squel.cls.DefaultQueryBuilderOptions.nameQuoteCharacter = '"';
squel.cls.DefaultQueryBuilderOptions.tableAliasQuoteCharacter = '"';
squel.cls.DefaultQueryBuilderOptions.fieldAliasQuoteCharacter = '"';

// Database Connection
const config = {
  host: process.env.PGDB_TCP_HOST,
  user: process.env.PGDB_USER,
  database: process.env.PGDB_DB,
  password: process.env.PGDB_PASS,
  port: process.env.PGDB_TCP_PORT,
  max: 5, // max number of clients in the pool
  min: 1, // set min pool size to 1
  idleTimeoutMillis: 1000, // how long a client is allowed to remain idle before being closed
};

const pool = new PoolCon(config);

// Export
module.exports = {
  executeQuery(query, callback) {
    return pool.query(query.text, query.values, callback);
  },
  builder() {
    return squel;
  },
};
