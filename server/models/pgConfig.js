import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connectionString;

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TESTDBURL;
} else {
  connectionString = process.env.DBURL;
}

const { Pool } = pg;

const pool = new Pool({
  connectionString,
});

export default pool;
