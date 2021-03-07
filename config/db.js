const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const UserModel = require('../models/user'); 

module.exports = db = {};

initialize();

async function initialize() {

    // get all the DB info from .env

    const DB_INFO = {
        "host": process.env.HOST,
        "port": process.env.DB_PORT,
        "user": 'root',
        "password": process.env.PASSWORD,
        "database": process.env.DATABASE,
    }

    const { host, user, password,  database, port } = DB_INFO;



    // create connection
    const connection = await mysql.createConnection({ host, port, user, password });


    // create db if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db using sequelize
    const sequelize = new Sequelize(database, user, password, {dialect: 'mysql'});

    // init models and add them to exported db object
    db.User = UserModel(sequelize);

    // sync all models with database
    await sequelize.sync();
}