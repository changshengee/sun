const axios = require('axios');
const cheerio = require('cheerio')
const {pool} = require('./mysql')
const logger = require('./log')

const baseUrl = "https://www.esrl.noaa.gov/gmd/grad/solcalc/table.php";

const parseData = ($, sunrise, year) => {
    const trs = $(sunrise).find('tr')
    const sunData = {};
    for (let i = 1; i < trs.length; i++) {
        const tds = $(trs[i]).find('td');
        const day = tds[0];
        for (let j = 1; j < tds.length; j++) {
            const key = year + '-' + String(j).padStart(2, '0') + '-' + $(day).text().trim().padStart(2, '0');
            sunData[key] = $(tds[j]).text();
        }
    }
    return sunData;
}

const saveData = async (code, year, sunData) => {
    const sql1 = 'select code from city  where code = ? and year = ? for update';
    const sql2 = 'insert into sun (time,code,sunrise,solar_noon,sunset) values ?';
    const sql3 = 'update city  set status = 1 where code = ? and year = ? '
    const conn = await pool.getConnection();
    await conn.release();
    await conn.beginTransaction();
    const res1 = await conn.query(sql1, [code, year]);
    logger.debug(res1)
    const res2 = await conn.query(sql2, [sunData]);
    logger.debug(res2)
    const res3 = await conn.query(sql3, [code, year]);
    logger.debug(res3)
    await conn.commit();
}

const fetchData = async (year, code, latitude, longitude) => {
    const url = baseUrl +
        '?lat=' + latitude +
        '&lon=' + longitude +
        '&year=' + year
    logger.info(url)
    const r = await axios.get(url);
    const body = r.data;
    const $ = cheerio.load(body);
    const data = $('tbody');
    const sunrise = data[0];
    const solarNoon = data[1];
    const sunset = data[2];
    const sunriseData = parseData($, sunrise, year);
    const solarNoonData = parseData($, solarNoon, year);
    const sunsetData = parseData($, sunset, year);
    const sunData = [];
    for (let key of Object.keys(sunriseData)) {
        sunData.push([key, code, sunriseData[key], solarNoonData[key], sunsetData[key]])
    }
    saveData(code, year, sunData).catch(e => logger.error(e));
}

module.exports = fetchData
