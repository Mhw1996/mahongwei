-- #创建一张新闻表，
-- 1：表名 xz_news
-- 2：几列 4列
-- 3：列名    id  / title / img_url / ctime / point/content
-- 4：类型    int varchar(255)  varchar(255)  /datatime / int /varchar(2000)
-- 5：添加20条  
CREATE TABLE xz_news(
  id INT AUTO_INCREMENT PRIMARY KEY ,
  title VARCHAR(255),
  img_url VARCHAR(255),
  ctime DATATIME,
  point Int,
  content VARCHAR(2000)
)