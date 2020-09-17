## 爬取日升日落数据

## 环境

- node v8.4.0以上

## 数据源

- ### 城市数据源
[](./sql/sun_city.sql)

- ### 爬取日升日落数据源

```
https://www.esrl.noaa.gov/gmd/grad/solcalc/table.php
```

### sun 表

time        日期
code        区县编码
sunrise     日升时间
solar_moon  正午时间
sunset      日落时间

### city 表

区县编码经纬度表

## 配置

[./config/config.js](./config/config.js)

配置mysql库连接地址

## 运行

### 安装依赖

```
npm i
```

### 运行项目

```
npm run start
```

