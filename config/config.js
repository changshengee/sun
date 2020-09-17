const mysqlConfig = {
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
}

const fetchConfig = {
    baseUrl: 'https://www.esrl.noaa.gov/gmd/grad/solcalc/table.php',
    sleepTime: 2000, //两次相隔请求之间的间隔，避免爬取服务器奔溃
}

const logConfig = {
    level: 'info'
}

module.exports = {
    mysqlConfig: mysqlConfig,
    fetchConfig: fetchConfig,
    logConfig: logConfig
}
