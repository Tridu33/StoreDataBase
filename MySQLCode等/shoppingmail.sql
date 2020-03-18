/*
 * Company :      JLU
 * Project :      С���̳�.DM1
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
 * TABLE: [������] Inbound and Outbound Forms,IOID��������AUTO_INCREMENT=5432100,
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
 * TABLE: [������] 
 */
ALTER TABLE IOForms ADD CONSTRAINT RefGOODS13 FOREIGN KEY (GID) REFERENCES GOODS(GID);
/*
* ������Ʒ��������
*Supplier Cutomer GOODS Gathering�ջ� IOForms Refund 
*/
INSERT INTO Supplier (SID,GID,SLOC,SNAME) VALUES (1,11,'GZ','A'),(2,12,'XJ','B'),(3,13,'XH','C'),(4,14,'TM','D'),(5,15,'YL','E');
INSERT INTO GOODS (GID,DNAME,GPRICE,GTYPE)VALUES (11,'huangsheng',12,21),(12,'zhima',18,22),(13,'lvdou',9,23),(14,'shiliu',23,24),(15,'yaoguo',19,25);
INSERT INTO Gathering (RID,RTIME,GID,RMONEY) VALUES (1234501,'2020-2-1',11,1200.00),(1234502,'2020-2-2',12,1800.00),(1234503,'2020-2-3',13,900.00),(1234504,'2020-2-4',14,2300.00),(1234505,'2020-2-5',15,1900.00);
--�ջ���ʱ����⣬GOODS��GCOUNT=GCOUNT+IOCOUNT,����IOCOUNT�����ʱ����������������ÿ����Ʒ�������100���Ϳ���������ÿ�ζ� �̵��棡
--��д��GCOUNT=GCOUNT + IOCOUNT��ԭ���ǣ���֪�������ϴεĿ����û�г�������ʵ������ɨ��ǹ��app����Щ����������ȫ���Է�װ��GUI����ʵ�֣������Ͳ���Ҫһ����д
--������Ϊ�Ҿٵ�����5����Ʒ����100����д��UPDATE GOODS SET GCOUNT=100�������һ���Ҫд��������ļ��б�ʾ�����ԡ�
--GOODS��GCOUNT���ǿ��,Ҳ���ԼӸ���������ֻҪ����ͼ�һ�������Ƶ�����Ļ������Ҹо�һ����һ���̵������������ʿ����������������Ŀ��Լ�Trigger��д��GCOUNT=GCOUNT + IOCOUNT�������Ҿ���û��Ҫ���ѡ�

UPDATE GOODS SET GCOUNT=100 WHERE GID=11;
UPDATE GOODS SET GCOUNT=100 WHERE GID=12;
UPDATE GOODS SET GCOUNT=100 WHERE GID=13;
UPDATE GOODS SET GCOUNT=100 WHERE GID=14;
UPDATE GOODS SET GCOUNT=100 WHERE GID=15;

INSERT INTO Refund (REFID,REFTIME,GID,REFMONEY) VALUES(86760110,'2020-2-27',11,12),(86770110,'2020-2-27',12,18),(86780110,'2020-2-28',13,9);
INSERT INTO Customer (CID,CNAME,CCARD,CTYPE,CCOUNT,GID,CTIME,CMONEY) VALUES(1234501,'da_a',0,21,1,11,'2020-2-21',12),(1234502,'da_b',1,22,1,12,'2020-2-22',18),(1234503,'da_c',0,23,1,13,'2020-2-23',9),(1234504,'da_d',0,24,1,14,'2020-2-24',23),(1234505,'da_e',1,25,1,15,'2020-2-25',19);

/*
*����
*/
CREATE INDEX Index_Name ON Customer(CID);
--��������
SELECT * FROM Customer;
--DROP INDEX Customer.Index_Nameɾ������
/*
*view
*/
CREATE VIEW SID_SupplierBigger3 AS
SELECT SID,SLOC,SNAME
FROM Supplier
WHERE SID>3;
SELECT * FROM SID_SupplierBigger3;
/*SQL Server����
alter table table_name drop primary key;--delete��������
ALTER TABLE insect
ADD id INT UNSIGNED NOT NULL AUTO_INCREMENT FIRST,
ADD PRIMARY KEY (id);
*/

--����MySQL�汾
/*����mysql����sequence������Ҫ
��д�Ĵ���һ�Ŵ���sequence�ı�(emp_seq)��
Ȼ���ֶ�����һ������ ��
����Զ���һ������������Ҫ������ֵ��
*/
create table seq (
	name varchar(50) not null primary key,
	start_value int not null,
	increment_value int not null default 1
);

insert into seq values('seq_no',5432100,1);--��ʼֵ5432100������1

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
--����IOForms����
/*
�洢����
ǰ�ü�飺��ƷID���˿�ID�Ƿ���ڣ������Ʒ����>0��IF IOCOUNT_in<0�˻�ʱ�򣬸ù˿��Ƿ��Ѿ����������Ʒ
ִ�в���������Ʒ��IOCOUNT_in<0�˻�ʱ��GOODS������GCOUNT=GCOUNT+1���ù˿�Customer���ѹ�����Ʒ��CCOUNT=CCOUNT-1��
               ��IOCOUNT_in>0����ʱ��GOODS������GCOUNT=GCOUNT-1���ù˿�Customer���ѹ�����Ʒ��CCOUNT=CCOUNT+1��
               (��ʼֵ0)�����˻�����¼���������Կ�����ִ���˻�����ִ�й��������������ҪΪ����������Ӵ��롣
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
--DELIMITER;����
SET @GID_in=13;
SET @CID_in=1234503;
SET @IOTYPE_in=22.0,@IOCOUNT_in=-1.0,@GID_price=9.0;
SELECT @GID_in,@CID_in,@IOTYPE_in,@IOCOUNT_in,@GID_price;

CALL sell_refund(@GID_in,@CID_in,@IOTYPE_in,@IOCOUNT_in,@GID_price);











