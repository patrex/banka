import pg from 'pg';

const connectionString = process.env.DBURL;
const { Pool } = pg;

const pool = new Pool({
  connectionString,
});

export default pool;
