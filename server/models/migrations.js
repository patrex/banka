import pool from './pgConfig';

const drop = async () => {
  const sql = `
        DROP TABLE IF EXISTS transactions, accounts, users;
    `;
  try {
    await pool.query(sql);
    console.log('> All tables dropped');
  } catch (err) {
    console.log(err);
  }
};

const create = async () => {
  const sql = `
        CREATE TABLE IF NOT EXISTS users(
            id serial primary key,
            email varchar(128) unique,
            firstname varchar(128) not null,
            lastname varchar(128) not null,
            password varchar(216) not null,
            type varchar(128) not null,
            isadmin boolean not null
        );

        CREATE TABLE IF NOT EXISTS accounts (
            id serial NOT NULL PRIMARY KEY,
            createdon timestamptz not null,
            type varchar(512) not null,
            accountNumber serial not null unique,
            owner int not null,
            status varchar(128) not null,
            balance numeric not null,
            foreign key (owner) references public.users(id)
        );

        CREATE TABLE IF NOT EXISTS transactions (
            id serial PRIMARY KEY,
            createdOn timestamptz not null,
            type varchar(1028) not null,
            accountNumber int not null,
            cashier integer not null,
            amount numeric not null,
            oldBalance numeric not null,
            newBalance numeric not null,
            foreign key (accountNumber) references accounts(accountNumber),
            foreign key (cashier) references public.users(id)
        );
    `;

  try {
    await pool.query(sql);
    console.log('> All tables up');
  } catch (err) {
    console.log(err);
  }
};

const doMigrations = async () => {
  console.log('>>>>>>>>> Migrations Started! <<<<<<<<<<<<<<');

  await drop();
  await create();

  console.log('>>>>>>>>> Migrations Complete! <<<<<<<<<<<<<<');
  console.log();
};

doMigrations();
