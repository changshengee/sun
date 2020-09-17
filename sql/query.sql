-- 查询已爬取城市数据 count(*) 查总数; * 查数据
select count(*)
from city t
where t.level <= 3
  and t.status = 1;

-- 查询未爬取城市数据
select count(*)
from city t
where t.level <= 3
  and t.status = 0;

-- 查询导出数据总数
select count(*)
from sun;

-- 查询数 带有城市名
select c.name, s.*
from sun s
         left join
     city c on s.code = c.code
