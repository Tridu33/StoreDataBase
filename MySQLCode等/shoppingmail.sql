/*
 * Company :      JLU
 * Project :      小型商城.DM1
 * Author :       Tridu33
 *
 * Target DBMS : Microsoft SQL Server 2005
 */

/* 
 * TABLE: Customer 
 */
CREATE TABLE Customer(
    CID       char(18)          NOT NULL,
    CNAME     char(18)          NULL,
    CCARD     char(18)          NULL,
    CTYPE     numeric(10, 2)    NULL,
    CCOUNT    numeric(4, 0)     NULL DEFAULT 0,
    GID       char(18)          NOT NULL,
    CTIME     datetime          NOT NULL,
    CMONEY    numeric(10, 2)    NOT NULL,
    CONSTRAINT PK7 PRIMARY KEY NONCLUSTERED (CID)
);
/* 
 * TABLE: Gathering 
 */

CREATE TABLE Gathering(
    RID       char(18)          NOT NULL,
    RTIME     datetime          NOT NULL,
    GID       char(18)          NOT NULL,
    RMONEY    numeric(10, 2)    NOT NULL,
    CONSTRAINT PK5 PRIMARY KEY NONCLUSTERED (RID)
);
/* 
 * TABLE: GOODS 
 */
CREATE TABLE GOODS(
    GID       char(18)          NOT NULL,
    DNAME     varchar(15)       NOT NULL,
    GPRICE    numeric(8, 2)     NOT NULL,
    GTYPE     numeric(10, 0)    NULL,
    GCOUNT    INT               NULL DEFAULT 0,
    CONSTRAINT PK4 PRIMARY KEY NONCLUSTERED (GID)
);
/* 
 * TABLE: Refund 
 */
CREATE TABLE Refund(
    REFID       char(10)          NOT NULL,
    REFTIME     datetime          NOT NULL,
    GID         char(18)          NOT NULL,
    REFMONEY    numeric(10, 2)    NOT NULL,
    CONSTRAINT PK6 PRIMARY KEY NONCLUSTERED (REFID)
);
/* 
 * TABLE: Supplier 
 */
CREATE TABLE Supplier(
    SID      char(6)        NOT NULL,
    GID      char(18)       NOT NULL,
    SLOC     varchar(15)    NULL,
    SNAME    varchar(15)    NOT NULL,
    CONSTRAINT PK3 PRIMARY KEY NONCLUSTERED (SID)
);
/* 
 * TABLE: SupplierGOODS
 */
CREATE TABLE SupplierGOODS(
    SID    char(6)     NOT NULL,
    GID    char(18)    NOT NULL,
    CONSTRAINT PK9 PRIMARY KEY NONCLUSTERED (SID, GID)
);
/* 
 * TABLE: [出入库表] Inbound and Outbound Forms,IOID序列自增AUTO_INCREMENT=5432100,
 */
CREATE TABLE IOForms(
    IOID       char(18)          NOT NULL,
    GID        char(18)          NOT NULL,
    CID       char(18)          NOT NULL,
    IOTIME     datetime          NOT NULL,
    IOTYPE     numeric(10, 2)    NOT NULL,
    IOCOUNT    numeric(4, 0)     NULL,
    IOMONEY    numeric(10, 2)    NULL,
    CONSTRAINT PK8 PRIMARY KEY NONCLUSTERED (IOID, GID)
);
/* can not add foreign key constraint.
 * TABLE: SupplierGOODS 
 */
ALTER TABLE SupplierGOODS ADD CONSTRAINT RefGOODS5 
    FOREIGN KEY (GID)
    REFERENCES GOODS(GID);
/* 
 * TABLE: [出入库表] 
 */
ALTER TABLE IOForms ADD CONSTRAINT RefGOODS13 FOREIGN KEY (GID) REFERENCES GOODS(GID);
/*
* 增加商品表格的数据
*Supplier Cutomer GOODS Gathering收货 IOForms Refund 
*/
INSERT INTO Supplier (SID,GID,SLOC,SNAME) VALUES (1,11,'GZ','A'),(2,12,'XJ','B'),(3,13,'XH','C'),(4,14,'TM','D'),(5,15,'YL','E');
INSERT INTO GOODS (GID,DNAME,GPRICE,GTYPE)VALUES (11,'huangsheng',12,21),(12,'zhima',18,22),(13,'lvdou',9,23),(14,'shiliu',23,24),(15,'yaoguo',19,25);
INSERT INTO Gathering (RID,RTIME,GID,RMONEY) VALUES (1234501,'2020-2-1',11,1200.00),(1234502,'2020-2-2',12,1800.00),(1234503,'2020-2-3',13,900.00),(1234504,'2020-2-4',14,2300.00),(1234505,'2020-2-5',15,1900.00);
--收货的时候，入库，GOODS的GCOUNT=GCOUNT+IOCOUNT,这里IOCOUNT是入库时的数量，比如这里每件商品数量变成100，就可以在入库的每次都 盘点库存！
--不写成GCOUNT=GCOUNT + IOCOUNT的原因是，天知道销售上次的库存有没有出错？而且实际上有扫码枪和app，这些插入命令完全可以封装在GUI界面实现，这样就不需要一行行写
--这里因为我举得例子5件商品都是100可以写成UPDATE GOODS SET GCOUNT=100，但是我还是要写出来下面的几行表示普适性。
--GOODS的GCOUNT就是库存,也可以加个触发器，只要插入就加一，如果是频繁入库的话，但我感觉一个月一次盘点入库合理，如果是士多那种面包天天入库的可以加Trigger，写成GCOUNT=GCOUNT + IOCOUNT。这里我觉得没必要而已。

UPDATE GOODS SET GCOUNT=100 WHERE GID=11;
UPDATE GOODS SET GCOUNT=100 WHERE GID=12;
UPDATE GOODS SET GCOUNT=100 WHERE GID=13;
UPDATE GOODS SET GCOUNT=100 WHERE GID=14;
UPDATE GOODS SET GCOUNT=100 WHERE GID=15;

INSERT INTO Refund (REFID,REFTIME,GID,REFMONEY) VALUES(86760110,'2020-2-27',11,12),(86770110,'2020-2-27',12,18),(86780110,'2020-2-28',13,9);
INSERT INTO Customer (CID,CNAME,CCARD,CTYPE,CCOUNT,GID,CTIME,CMONEY) VALUES(1234501,'da_a',0,21,1,11,'2020-2-21',12),(1234502,'da_b',1,22,1,12,'2020-2-22',18),(1234503,'da_c',0,23,1,13,'2020-2-23',9),(1234504,'da_d',0,24,1,14,'2020-2-24',23),(1234505,'da_e',1,25,1,15,'2020-2-25',19);

/*
*索引
*/
CREATE INDEX Index_Name ON Customer(CID);
--建立索引
SELECT * FROM Customer;
--DROP INDEX Customer.Index_Name删除索引
/*
*view
*/
CREATE VIEW SID_SupplierBigger3 AS
SELECT SID,SLOC,SNAME
FROM Supplier
WHERE SID>3;
SELECT * FROM SID_SupplierBigger3;
/*SQL Server序列
alter table table_name drop primary key;--delete已有主键
ALTER TABLE insect
ADD id INT UNSIGNED NOT NULL AUTO_INCREMENT FIRST,
ADD PRIMARY KEY (id);
*/

--序列MySQL版本
/*由于mysql不带sequence，所以要
手写的创建一张储存sequence的表(emp_seq)，
然后手动插入一条数据 ，
最后自定义一个函数来处理要增长的值。
*/
create table seq (
	name varchar(50) not null primary key,
	start_value int not null,
	increment_value int not null default 1
);

insert into seq values('seq_no',5432100,1);--初始值5432100，步长1

DELIMITER //
create function nextval(str varchar(50)) returns integer
begin
	declare i int;
	set i=(select start_value from seq where name=str);
	update seq set start_value=i+increment_value where name=str;
return i;
end;
//
--DELIMITER ;
/*test:
SELECT nextval('seq_no') from dual;
use:
INSERT INTO  IOForms (IOID,IOTIME,IOTYPE,IOCOUNT,GID,CID,IOMONEY) VALUES(nextval('seq_no'),'2020-2-1',21,100,11,1234501,1200)
*/
INSERT INTO  IOForms (IOID,IOTIME,IOTYPE,IOCOUNT,GID,CID,IOMONEY) VALUES(nextval('seq_no'),'2020-2-1',21,100,11,1111101,1200);
INSERT INTO  IOForms (IOID,IOTIME,IOTYPE,IOCOUNT,GID,CID,IOMONEY) VALUES(nextval('seq_no'),'2020-2-2',22,100,12,1111102,1800),(nextval('seq_no'),'2020-2-3',23,100,13,1111103,900);
INSERT INTO  IOForms (IOID,IOTIME,IOTYPE,IOCOUNT,GID,CID,IOMONEY) VALUES(nextval('seq_no'),'2020-2-4',24,100,14,1111104,2300),(nextval('seq_no'),'2020-2-5',25,100,15,1111105,1900),(nextval('seq_no'),'2020-2-21',21,1,11,1234501,11),(nextval('seq_no'),'2020-2-22',22,1,12,1234502,12),(nextval('seq_no'),'2020-2-23',23,1,13,1234503,13),(nextval('seq_no'),'2020-2-24',24,1,14,1234504,14),(nextval('seq_no'),'2020-2-25',25,1,15,1234505,15),(nextval('seq_no'),'2020-2-27',21,-1,11,86760110,12),(nextval('seq_no'),'2020-2-27',22,-1,12,86770110,18),(nextval('seq_no'),'2020-2-28',23,-1,13,86780110,9);
--插入IOForms数据
/*
存储过程
前置检查：商品ID，顾客ID是否存在；库存商品数量>0；IF IOCOUNT_in<0退货时候，该顾客是否已经购买过该商品
执行操作：该商品当IOCOUNT_in<0退货时，GOODS出库数GCOUNT=GCOUNT+1；该顾客Customer表已购该商品数CCOUNT=CCOUNT-1；
               当IOCOUNT_in>0购物时，GOODS出库数GCOUNT=GCOUNT-1；该顾客Customer表已购该商品数CCOUNT=CCOUNT+1；
               (初始值0)增加退换货记录，换货可以看作先执行退货，再执行购物的两步，不需要为换货另外添加代码。
*/ 
DELIMITER //
  CREATE PROCEDURE sell_refund(IN GID_in int,IN CID_in int,IN IOTYPE_in numeric(10, 2),IN IOCOUNT_in numeric(4, 0),IN GID_price numeric(8, 2))
  BEGIN
      SELECT * FROM GOODS;
      SELECT * FROM Customer;
      SELECT * FROM IOForms;
      IF (EXISTS(SELECT * FROM GOODS WHERE GID=GID_in) AND EXISTS(SELECT * FROM Customer WHERE CID=CID_in)) THEN
        IF (IOCOUNT_in<0) THEN
            IF EXISTS(SELECT * FROM IOForms WHERE CID=CID_in AND GID=GID_in) THEN
              UPDATE GOODS SET GCOUNT=GCOUNT+1 WHERE GID=GID_in;
              UPDATE Customer SET CCOUNT=CCOUNT-1 WHERE CID=CID_in;             
              INSERT INTO  IOForms (IOID,IOTIME,IOTYPE,IOCOUNT,GID,CID,IOMONEY) VALUES(nextval('seq_no'),CURRENT_DATE(),IOTYPE_in,IOCOUNT_in,GID_in,CID_in,IOCOUNT_in*GID_price);
            END IF;
        ELSE
            IF EXISTS(SELECT * FROM IOForms WHERE CID=CID_in AND GID=GID_in) THEN
            UPDATE GOODS SET GCOUNT=GCOUNT-1 WHERE GID=GID_in;
            UPDATE Customer SET CCOUNT=CCOUNT+1 WHERE CID=CID_in;            
            INSERT INTO  IOForms (IOID,IOTIME,IOTYPE,IOCOUNT,GID,CID,IOMONEY) VALUES(nextval('seq_no'),CURRENT_DATE(),IOTYPE_in,IOCOUNT_in,GID_in,CID_in,IOCOUNT_in*GID_price);
            END IF;
        END IF;
      END IF;
      SELECT * FROM GOODS;
      SELECT * FROM Customer;
      SELECT * FROM IOForms;
  END;
  //
--DELIMITER;调用
SET @GID_in=13;
SET @CID_in=1234503;
SET @IOTYPE_in=22.0,@IOCOUNT_in=-1.0,@GID_price=9.0;
SELECT @GID_in,@CID_in,@IOTYPE_in,@IOCOUNT_in,@GID_price;

CALL sell_refund(@GID_in,@CID_in,@IOTYPE_in,@IOCOUNT_in,@GID_price);











