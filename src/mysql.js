const mysql = require('mysql2/promise');
const logger = require('./log')
const {mysqlConfig} = require('../config/config')

// create the connection to database
const pool = mysql.createPool(mysqlConfig);

const queryOne = async (sql, prepare) => {
    const [rows] = await pool.query(sql, prepare);
    return rows ? rows[0] : [];
}

const query = async (sql, prepare) => {
    const [rows] = await pool.query(sql, prepare);
    return rows;
}

const insert = async (sql, prepare) => {
    const [rows] = await pool.execute(sql, prepare);
    return rows;
}

const update = async (sql, prepare) => {
    const [rows] = await pool.execute(sql, prepare);
    return rows;
}


// test connection
const test = async () => {
    return await queryOne('SELECT now() as now')
}
test().then(r => logger.info("Mysql connected at:[%s]", r.now)).catch(err => logger.debug(err));

module.exports = {
    insert: insert,
    update: update,
    query: query,
    queryOne: queryOne,
    pool: pool
};

