const logger = require('./log')
const fetchData = require('./fetch')
const os = require("os")
const {query, queryOne} = require('./mysql')
const {fetchConfig} = require('../config/config')

function sleep(milliSeconds) {
    const startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds) {
    }
}

const countCity = async () => {
    const sql = 'select count(*) total from city t where t.level <= 3 and t.status = 0 ';
    const res = await queryOne(sql);
    return res ? res.total : 0;
}

const queryCity = async (limit, offset) => {
    logger.info(`query-city offset ${offset}`)
    const sql = 'select code,latitude, longitude, year from city t where t.level <= ? and t.status = ? limit ? offset ?';
    const cities = await query(sql, [3, 0, limit, offset]);
    logger.info(`cities length ${cities.length}`)
    return cities;
}

const process = async () => {
    const cpus = os.cpus().length
    for (let i = 0; i < cpus; i++) {
        setImmediate(async () => {
            const total = await countCity();
            const limit = Number((total / cpus).toFixed(0));
            const cities = await queryCity(limit, i * limit)
            while (cities && cities.length > 0) {
                const city = cities.shift();
                await fetchData(city.year, city.code, city.latitude, city.longitude)
                sleep(fetchConfig.sleepTime)
            }
        })
    }
}

module.exports = process
