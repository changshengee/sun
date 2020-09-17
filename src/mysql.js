const mysql = require('mysql2/promise');
const logger = require('./log')
// create the connection to database
const pool = mysql.createPool({
    host: '47.100.166.125',
    user: 'root',
    database: 'sun',
    password: '111!aaaA',
    charset: 'utf8', //应该设置编码（省略在某些情况下会有错误）
    //以下选项均为默认值（如果不需要变动可省略）
    connectTimeout: 10000, //获取连接的毫秒
    waitForConnections: true, //为true时，连接排队等待可用连接。为false将立即抛出错误
    connectionLimit: 20, //单次可创建最大连接数
    queueLimit: 0 //连接池的最大请求数，从getConnection方法前依次排队。设置为0将没有限制
});

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

