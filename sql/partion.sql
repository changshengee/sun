-- 1997-2018  22年
-- 3380 城市
-- 总 74360次爬取
-- 一次爬取 365*3 条
-- 查询已爬取城市数据 count(*) 查总数; * 查数据
select sum(if(t.status = 0, 1, 0)) "未爬",
       sum(if(t.status = 1, 1, 0)) "已爬"
from city t
where t.level <= 3;

select 73292 * 365
-- 查询未爬取城市数据
select count(*)
from city t
group by t.code;

-- 查询导出数据总数
select count(*)
from sun;

select *
from sun
limit 10 offset 686340

-- 查询数 带有城市名
select c.name, s.*
from sun s
         left join
     city c on s.code = c.code

explain
select *
from city
where code = 140300
  and year = 1997

-- 半小时
select 392460 - 296484;
-- 一小时爬取
select 95976 * 2;
-- 剩余爬取天数
select 26751580 / (95976 * 2) / 24;

-- 查看分区支持
show variables like '%partition%';
show plugins;
SELECT VERSION();

-- 按照时间分区
ALTER TABLE sun PARTITION BY RANGE COLUMNS (time)
    (
    PARTITION p1997 VALUES LESS THAN ('1998-01-01'),
    PARTITION p1998 VALUES LESS THAN ('1999-01-01'),
    PARTITION p1999 VALUES LESS THAN ('2000-01-01'),
    PARTITION p2000 VALUES LESS THAN ('2001-01-01'),
    PARTITION p2001 VALUES LESS THAN ('2002-01-01'),
    PARTITION p2002 VALUES LESS THAN ('2003-01-01'),
    PARTITION p2003 VALUES LESS THAN ('2004-01-01'),
    PARTITION p2004 VALUES LESS THAN ('2005-01-01'),
    PARTITION p2005 VALUES LESS THAN ('2006-01-01'),
    PARTITION p2006 VALUES LESS THAN ('2007-01-01'),
    PARTITION p2007 VALUES LESS THAN ('2008-01-01'),
    PARTITION p2008 VALUES LESS THAN ('2009-01-01'),
    PARTITION p2009 VALUES LESS THAN ('2010-01-01'),
    PARTITION p2010 VALUES LESS THAN ('2011-01-01'),
    PARTITION p2011 VALUES LESS THAN ('2012-01-01'),
    PARTITION p2012 VALUES LESS THAN ('2013-01-01'),
    PARTITION p2013 VALUES LESS THAN ('2014-01-01'),
    PARTITION p2014 VALUES LESS THAN ('2015-01-01'),
    PARTITION p2015 VALUES LESS THAN ('2016-01-01'),
    PARTITION p2016 VALUES LESS THAN ('2017-01-01'),
    PARTITION p2017 VALUES LESS THAN ('2018-01-01'),
    PARTITION p2018 VALUES LESS THAN ('2019-01-01')
    )
