/**
 * Created by Tridu33 on 2020/2/24.
 */
/**
 *数据库操作辅助类,定义对象、数据操作方法都在这里定义
 */
var dbname = 'Shopping_websql'; /*数据库名*/
var version = '1.0'; /*数据库版本*/
var dbdesc = '超市数据库'; /*数据库描述*/
var dbsize = 4 * 1024 * 1024; /*数据库大小*/
var dataBase = null; /*暂存数据库对象*/
/*数据库中表的名*/
var sSupplier = "Supplier";
var sCustomer = "Cutomer";
var sGOODS = "GOODS";
var sGathering = "Gathering";
var sIOForms = "IOForms";
var sRefund = "Refund";

/**
 * 打开数据库
 * dataBase:打开成功   null:打开失败
 */
function websqlOpenDB() {
    /*数据库有就打开 没有就创建*/
    dataBase = window.openDatabase(dbname, version, dbdesc, dbsize, function() {});
    if (dataBase) {
        alert("数据库创建/打开成功!");
    } else {
        alert("数据库创建/打开失败！");
    }
    return dataBase;
}
/*
删除一个表格，因为websql删除比较麻烦，多次运行调试就需要手动删除数据库的信息

*/
function dropTable(tableName) {
    var dropTableSQL = 'DROP TABLE ' + tableName;
    dataBase.transaction(function(ctx, result) {
        ctx.executeSql(dropTableSQL, [], function(ctx, result) {
            alert("DROP表成功 " + tableName);
        }, function(tx, error) {
            alert('DROP表失败:' + tableName + error.message);
        });
    });
}
/**
 * 新建数据库里面的表单
 * tableName:表单名
 *
 */
function websqlCreatTable() {
    var creatTableSQL = 'CREATE TABLE IF  NOT EXISTS Supplier (SID text,GID text,SLOC text,SNAME text)';
    dataBase.transaction(function(ctx, result) {
        ctx.executeSql(creatTableSQL, [], function(ctx, result) {
            console.log("Supplier表创建成功 ");
        }, function(tx, error) {
            alert('创建表失败:' + error.message);
        });
    });
    dataBase.transaction(function(ctx, result) {
        ctx.executeSql('CREATE TABLE IF  NOT EXISTS GOODS (GID text,DNAME text,GPRICE text,GTYPE text,GCOUNT text)', [], function(ctx, result) {
            console.log("GOODS表创建成功 ");
        }, function(tx, error) {
            alert('创建表失败:' + error.message);
        });
    });
    dataBase.transaction(function(ctx, result) {
        ctx.executeSql('CREATE TABLE IF  NOT EXISTS Gathering ( RID text,RTIME text,GID text, RMONEY text)', [], function(ctx, result) {
                console.log("Gathering表创建成功");
            },
            function(tx, error) {
                alert('创建表失败:' + error.message);
            });
    });
    dataBase.transaction(function(ctx, result) {
        ctx.executeSql('CREATE TABLE IF  NOT EXISTS Cutomer (CID text,CNAME text,CCARD text,CTYPE text,CCOUNT text,GID text, CTIME text, CMONEY text)', [], function(ctx, result) {
                console.log("Cutomer表创建成功");
            },
            function(tx, error) {
                alert('创建表失败:' + error.message);
            });
    });
    dataBase.transaction(function(ctx, result) {
        ctx.executeSql('CREATE TABLE IF  NOT EXISTS Refund (REFID text,REFTIME text,GID text,REFMONEY text)', [], function(ctx, result) {
            console.log("Refund表创建成功");
        }, function(tx, error) {
            alert('创建表失败:' + error.message);
        });
    });
    dataBase.transaction(function(ctx, result) {
        ctx.executeSql('CREATE TABLE IF  NOT EXISTS IOForms (IOID text,IOTIME text,IOTYPE text,IOCOUNT text,GID text,CID text,IOMONEY text)', [], function(ctx, result) {
            console.log("IOForms表创建成功");
        }, function(tx, error) {
            alert('创建表失败:' + error.message);
        });
    });
}


/**
 * 往表单里面插入数据
 */

/** 
 * * 往Supplier表单里面插入数据 
 * * SID:供应商ID 
 * * SNAME:供应商名 
 * * SLOC:供应商地址 
 * * GID:商品ID 
 * */
function websqlInsterData2TableSupplier(Supplier,
    SID, GID, SLOC, SNAME) {
    var insterTableSQL = 'INSERT INTO ' + Supplier + ' (SID,GID,SLOC,SNAME) VALUES (?,?,?,?)';
    dataBase.transaction(function(ctx) {
        ctx.executeSql(insterTableSQL, [SID, GID, SLOC, SNAME], function(ctx, result) {
            console.log("插入" +
                Supplier + SNAME + "成功");
        }, function(tx, error) {
            alert('插入失败: ' + error.message);
        });
    });
}

/** * 往GOOD表单里面插入数据 * GID: * DNAME: * GPRICE: * GCOUNT: */
function websqlInsterData2TableGOODS(GOODS, GID, DNAME, GPRICE, GTYPE, GCOUNT) {
    var insterTableSQL = 'INSERT INTO ' + GOODS + ' (GID,DNAME,GPRICE,GTYPE,GCOUNT) VALUES (?,?,?,?,?)';
    dataBase.transaction(function(ctx) {
        ctx.executeSql(insterTableSQL, [GID, DNAME, GPRICE, GTYPE, GCOUNT], function(ctx, result) {
            console.log("插入" + GOODS + DNAME + "成功");
        }, function(tx, error) {
            alert('插入失败: ' + error.message);
        });
    });
}

/** * 往 Gathering表单里面插入数据 * RID: * RTIME: * GID: * RMONEY: */
function websqlInsterData2TableGathering(Gathering, RID, RTIME, GID, RMONEY) {
    var insterTableSQL = 'INSERT INTO ' + Gathering +
        ' (RID,RTIME,GID,RMONEY) VALUES (?,?,?,?)';
    dataBase.transaction(function(ctx) {
        ctx.executeSql(insterTableSQL, [RID, RTIME, GID, RMONEY], function(ctx, result) {
            console.log("插入" + Gathering + RTIME + "成功");
        }, function(tx, error) {
            alert('插入失败: ' +
                error.message);
        });
    });
}

/** * 往Refund表单里面插入数据 * : * : * : */
function websqlInsterData2TableRefund(Refund, REFID, REFTIME, GID, REFMONEY) {
    var insterTableSQL = 'INSERT INTO ' + Refund + ' (REFID,REFTIME,GID,REFMONEY) VALUES (?,?,?,?)';
    dataBase.transaction(function(ctx) {
        ctx.executeSql(insterTableSQL, [REFID, REFTIME, GID, REFMONEY], function(ctx, result) {
            console.log("插入" + Refund + REFID + "成功");
        }, function(tx, error) {
            alert('插入失败: ' + error.message);
        });
    });
}

/** * 往 Customer表单里面插入数据 * : * : * : */
function websqlInsterData2TableCustomer(Customer,
    CID, CNAME, CCARD, CTYPE, CCOUNT, GID, CTIME, CMONEY) {
    var insterTableSQL = 'INSERT INTO ' + Customer + ' (CID,CNAME,CCARD,CTYPE,CCOUNT,GID,CTIME,CMONEY) VALUES (?,?,?,?,?,?,?,?)';
    dataBase.transaction(function(ctx) {
        ctx.executeSql(insterTableSQL, [CID,
            CNAME, CCARD, CTYPE, CCOUNT, GID, CTIME, CMONEY
        ], function(ctx, result) {
            console.log("插入" + Customer + CNAME + "成功");
        }, function(tx, error) {
            alert('插入失败: ' + error.message);
        });
    });
}


/** * 往 IOForms表单里面插入数据 * : * : * : */
function websqlInsterData2TableIOForms(IOForms,
    IOID, IOTIME, IOTYPE, IOCOUNT, GID, CID, IOMONEY) {
    var insterTableSQL = 'INSERT INTO ' + IOForms + ' (IOID,IOTIME,IOTYPE,IOCOUNT,GID,CID,IOMONEY) VALUES (?,?,?,?,?,?,?)';
    dataBase.transaction(function(ctx) {
        ctx.executeSql(insterTableSQL, [IOID, IOTIME, IOTYPE,
            IOCOUNT, GID, CID, IOMONEY
        ], function(ctx, result) {
            console.log("插入" + IOForms + IOID + "成功");
        }, function(tx, error) {
            alert('插入失败: ' + error.message);
        });
    });
}

function websqlInsterDataToTable() {
    websqlInsterData2TableSupplier(sSupplier, "1", "11", "GZ", "A");
    websqlInsterData2TableSupplier(sSupplier, "2", "12", "XJ", "B");
    websqlInsterData2TableSupplier(sSupplier, "3", "13", "XH", "C");
    websqlInsterData2TableSupplier(sSupplier, "4", "14", "TM", "D");
    websqlInsterData2TableSupplier(sSupplier, "5", "15", "YL", "E"); 

    websqlInsterData2TableGOODS(sGOODS, "11", "huangsSheng", "12", "21", "0");
    websqlInsterData2TableGOODS(sGOODS, "12", "zhima", "18", "22", "0");
    websqlInsterData2TableGOODS(sGOODS, "13", "lvdou", "9", "23", "0");
    websqlInsterData2TableGOODS(sGOODS, "14", "shiliu", "23", "24", "0");
    websqlInsterData2TableGOODS(sGOODS, "15", "yaoguo", "19", "25", "0");   

    websqlInsterData2TableGathering(sGathering, "1234501", "2020-2-1", "11", "1200.00");
    websqlInsterData2TableGathering(sGathering, "1234502", "2020-2-2", "12", "1800.00");
    websqlInsterData2TableGathering(sGathering, "1234503", "2020-2-3", "13", "900.00");
    websqlInsterData2TableGathering(sGathering, "1234504", "2020-2-4", "14", "2300.00");
    websqlInsterData2TableGathering(sGathering, "1234505", "2020-2-5", "15", "1900.00");

    websqlInsterData2TableRefund(sRefund, "86760110", "2020-2-27", "11", "12");
    websqlInsterData2TableRefund(sRefund, "86770110", "2020-2-27", "12", "18");
    websqlInsterData2TableRefund(sRefund, "86780110", "2020-2-28", "13", "9");

    websqlInsterData2TableCustomer(sCustomer, "1234501", "da_a", "0", "21", "1", "11", "2020-2-21", "12");
    websqlInsterData2TableCustomer(sCustomer, "1234502", "da_b", "1", "22", "1", "12", "2020-2-22", "18");
    websqlInsterData2TableCustomer(sCustomer, "1234503", "da_c", "0", "23", "1", "13", "2020-2-23", "9");
    websqlInsterData2TableCustomer(sCustomer, "1234504", "da_d", "0", "24", "1", "14", "2020-2-24", "23");
    websqlInsterData2TableCustomer(sCustomer, "1234505", "da_e", "1", "25", "1", "15", "2020-2-25", "19");
    //IOForms,IOID, IOTIME, IOTYPE, IOCOUNT, GID, CID, IOMONEY
    websqlInsterData2TableIOForms(sIOForms, "2020-2-1", "21", "100", "11", "1111101", "1200");
    websqlInsterData2TableIOForms(sIOForms, "2020-2-2", "22", "100", "12", "1111102", "1800");
    websqlInsterData2TableIOForms(sIOForms, "2020-2-3", "23", "100", "13", "1111103", "900");
    websqlInsterData2TableIOForms(sIOForms, "2020-2-4", "24", "100", "14", "1111104", "2300");
    websqlInsterData2TableIOForms(sIOForms, "2020-2-5", "25", "100", "15", "1111105", "1900");
    websqlInsterData2TableIOForms(sIOForms, "2020-2-21", "21", "1", "11", "1234501", "11");
    websqlInsterData2TableIOForms(sIOForms, "2020-2-22", "22", "1", "12", "1234502", "12");
    websqlInsterData2TableIOForms(sIOForms, "2020-2-23", "23", "1", "13", "1234503", "13");
    websqlInsterData2TableIOForms(sIOForms, "2020-2-24", "24", "1", "14", "1234504", "14");
    websqlInsterData2TableIOForms(sIOForms, "2020-2-25", "25", "1", "15", "1234505", "15");
    websqlInsterData2TableIOForms(sIOForms, "2020-2-27", "21", "-1", "11", "86760110", "12");
    websqlInsterData2TableIOForms(sIOForms, "2020-2-27", "22", "-1", "12", "86770110", "18");
    websqlInsterData2TableIOForms(sIOForms, "2020-2-28", "23", "-1", "13", "86780110", "9"); 

}
/**
 * 获取数据库表单里面的所有数据
 * tableName:表单名
 * 返回数据集合
 */
function websqlGetAllData(tableName) {
    var selectALLSQL = 'SELECT * FROM ' + tableName;
    dataBase.transaction(function(ctx) {
        ctx.executeSql('SELECT * FROM GOODS', [], function(ctx, result) {
                alert('查询成功: ' + tableName + result.rows.length);
                var len = result.rows.length;
                if (tableName == sSupplier) {
                    for (var i = 0; i < len; i++) {
                        console.log(" SID= " + result.rows.item(i).SID);
                        console.log(" GID= " + result.rows.item(i).GID);
                        console.log(" SLOC= " + result.rows.item(i).SLOC);
                        console.log(" SNAME= " + result.rows.item(i).SNAME);
                        console.log("-------- 我是分割线 -------");
                    }
                };
                if (tableName == sGOODS) {
                    for (var i = 0; i < len; i++) {
                        console.log("GID = " + result.rows.item(i).GID);
                        console.log("AGE = " + result.rows.item(i).DNAME);
                        console.log("GPRICE = " + result.rows.item(i).GPRICE);
                        console.log("GTYPE = " + result.rows.item(i).GTPE);
                        console.log("GCOUNT = " + result.rows.item(i).GCOUNT);
                        console.log("-------- 我是分割线 -------");
                    }
                };
                if (tableName == sGathering) {
                    for (var i = 0; i < len; i++) {
                        console.log(" RID= " + result.rows.item(i).RID);
                        console.log(" RTIME= " + result.rows.item(i).RTIME);
                        console.log(" GID= " + result.rows.item(i).GID);
                        console.log(" RMONEY= " + result.rows.item(i).RMONEY);
                        console.log("-------- 我是分割线 -------");
                    }
                };
                if (tableName == sRefund) {
                    for (var i = 0; i < len; i++) {
                        console.log(" REFID= " + result.rows.item(i).REFID);
                        console.log(" REFTIME= " + result.rows.item(i).REFTIME);
                        console.log(" GID= " + result.rows.item(i).GID);
                        console.log(" REFMONEY= " + result.rows.item(i).REFMONEY);
                        console.log("-------- 我是分割线 -------");
                    }
                };
                if (tableName == sCustomer) {
                    for (var i = 0; i < len; i++) {
                        console.log(" CID= " + result.rows.item(i).CID);
                        console.log(" CNAME= " + result.rows.item(i).CNAME);
                        console.log(" CCARD= " + result.rows.item(i).CCARD);
                        console.log(" CTYPE= " + result.rows.item(i).CTYPE);
                        console.log(" CCOUNT= " + result.rows.item(i).CCOUNT);
                        console.log(" GID= " + result.rows.item(i).GID);
                        console.log(" CTIME= " + result.rows.item(i).CTIME);
                        console.log(" CMONEY= " + result.rows.item(i).CMONEY);
                        console.log("-------- 我是分割线 -------");
                    }
                };
                if (tableName == sIOForms) {
                    for (var i = 0; i < len; i++) {
                        console.log(" IOID= " + result.rows.item(i).IOID);
                        console.log(" IOTIME= " + result.rows.item(i).IOTIME);
                        console.log(" IOTYPE= " + result.rows.item(i).IOTYPE);
                        console.log(" IOCOUNT= " + result.rows.item(i).IOCOUNT);
                        console.log(" GID= " + result.rows.item(i).GID);
                        console.log(" CID= " + result.rows.item(i).CID);
                        console.log(" IOMONEY= " + result.rows.item(i).IOMONEY);
                        console.log("-------- 我是分割线 -------");
                    }
                };
            },
            function(tx, error) {
                alert('查询失败: ' + error.message);
            });
    });
}
/**
 * 获取数据库一个表单里面的部分数据
 * tableName:表单名
 * param:参数
 */
function websqlGetAData(tableName, param) {
    if (tableName == sSupplier) {
        var selectSQL = 'SELECT * FROM ' + tableName + ' WHERE SID = ?'
    };
    if (tableName == sGOODS) {
        var selectSQL = 'SELECT * FROM ' + tableName + ' WHERE GID = ?'
    };
    if (tableName == sGathering) {
        var selectSQL = 'SELECT * FROM ' + tableName + ' WHERE RID = ?'
    };
    if (tableName == sRefund) {
        var selectSQL = 'SELECT * FROM ' + tableName + ' WHERE REFID = ?'
    };
    if (tableName == sCustomer) {
        var selectSQL = 'SELECT * FROM ' + tableName + ' WHERE CID = ?'
    };
    if (tableName == sIOForms) {
        var selectSQL = 'SELECT * FROM ' + tableName + ' WHERE IOID = ?'
    };
    dataBase.transaction(function(ctx) {
        ctx.executeSql(selectSQL, [param], function(ctx, result) {
                alert('查询成功: ' + tableName + result.rows.length);
                var len = result.rows.length;
                if (tableName == sSupplier) {
                    for (var i = 0; i < len; i++) {
                        console.log(" SID= " + result.rows.item(i).SID);
                        console.log(" GID= " + result.rows.item(i).GID);
                        console.log(" SLOC= " + result.rows.item(i).SLOC);
                        console.log(" SNAME= " + result.rows.item(i).SNAME);
                        console.log("-------- 我是分割线 -------");
                    }
                };
                if (tableName == sGOODS) {
                    for (var i = 0; i < len; i++) {
                        console.log("GID = " + result.rows.item(i).GID);
                        console.log("AGE = " + result.rows.item(i).DNAME);
                        console.log("GPRICE = " + result.rows.item(i).GPRICE);
                        console.log("GTYPE = " + result.rows.item(i).GTPE);
                        console.log("GCOUNT = " + result.rows.item(i).GCOUNT);
                        console.log("-------- 我是分割线 -------");
                    }
                };
                if (tableName == sGathering) {
                    for (var i = 0; i < len; i++) {
                        console.log(" RID= " + result.rows.item(i).RID);
                        console.log(" RTIME= " + result.rows.item(i).RTIME);
                        console.log(" GID= " + result.rows.item(i).GID);
                        console.log(" RMONEY= " + result.rows.item(i).RMONEY);
                        console.log("-------- 我是分割线 -------");
                    }
                };
                if (tableName == sRefund) {
                    for (var i = 0; i < len; i++) {
                        console.log(" REFID= " + result.rows.item(i).REFID);
                        console.log(" REFTIME= " + result.rows.item(i).REFTIME);
                        console.log(" GID= " + result.rows.item(i).GID);
                        console.log(" REFMONEY= " + result.rows.item(i).REFMONEY);
                        console.log("-------- 我是分割线 -------");
                    }
                };
                if (tableName == sCustomer) {
                    for (var i = 0; i < len; i++) {
                        console.log(" CID= " + result.rows.item(i).CID);
                        console.log(" CNAME= " + result.rows.item(i).CNAME);
                        console.log(" CCARD= " + result.rows.item(i).CCARD);
                        console.log(" CTYPE= " + result.rows.item(i).CTYPE);
                        console.log(" CCOUNT= " + result.rows.item(i).CCOUNT);
                        console.log(" GID= " + result.rows.item(i).GID);
                        console.log(" CTIME= " + result.rows.item(i).CTIME);
                        console.log(" CMONEY= " + result.rows.item(i).CMONEY);
                        console.log("-------- 我是分割线 -------");
                    }
                };
                if (tableName == sIOForms) {
                    for (var i = 0; i < len; i++) {
                        console.log(" IOID= " + result.rows.item(i).IOID);
                        console.log(" IOTIME= " + result.rows.item(i).IOTIME);
                        console.log(" IOTYPE= " + result.rows.item(i).IOTYPE);
                        console.log(" IOCOUNT= " + result.rows.item(i).IOCOUNT);
                        console.log(" GID= " + result.rows.item(i).GID);
                        console.log(" CID= " + result.rows.item(i).CID);
                        console.log(" IOMONEY= " + result.rows.item(i).IOMONEY);
                        console.log("-------- 我是分割线 -------");
                    }
                };
            },
            function(tx, error) {
                alert('查询失败: ' + error.message);
            });
    });
}
/**
 * 删除表单里的全部数据
 * tableName:表单名
 */
function websqlDeleteAllDataFromTable(tableName) {
    var deleteTableSQL = 'DELETE FROM ' + tableName;
    localStorage.removeItem(tableName);
    dataBase.transaction(function(ctx, result) {
        ctx.executeSql(deleteTableSQL, [], function(ctx, result) {
            console.log("删除表成功 " + tableName);
        }, function(tx, error) {
            alert('删除表失败:' + tableName + error.message);
        });
    });
}
/**
 * 根据param删除数据
 * tableName:表单名
 * param:参数主键
 */
function websqlDeleteADataFromTable(tableName, param) {
    if (tableName == sSupplier) {
        var deleteDataSQL = 'DELETE FROM ' + tableName + ' WHERE SID = ?'
    };
    if (tableName == sGOODS) {
        var deleteDataSQL = 'DELETE FROM ' + tableName + ' WHERE GID = ?'
    };
    if (tableName == sGathering) {
        var deleteDataSQL = 'DELETE FROM ' + tableName + ' WHERE RID = ?'
    };
    if (tableName == sRefund) {
        var deleteDataSQL = 'DELETE FROM ' + tableName + ' WHERE REFID = ?'
    };
    if (tableName == sCustomer) {
        var deleteDataSQL = 'DELETE FROM ' + tableName + ' WHERE CID = ?'
    };
    if (tableName == sIOForms) {
        var deleteDataSQL = 'DELETE FROM ' + tableName + ' WHERE IOID = ?'
    };
    localStorage.removeItem(tableName);
    dataBase.transaction(function(ctx, result) {
        ctx.executeSql(deleteDataSQL, [param], function(ctx, result) {
            alert("删除成功 " + tableName + param);
        }, function(tx, error) {
            alert('删除失败:' + tableName + param + error.message);
        });
    });
}
/**
 * 根据name修改数据
 * tableName:表单名
 * id:匹配主键
 * attribute:要变的属性
 * value:要变的属性值
 */
function websqlUpdateAData(tableName, idName, id, attribute, value) {
    var updateDataSQL = 'UPDATE ' + tableName + ' SET ' + attribute + ' = ? WHERE ' + idName + ' = ?';
    dataBase.transaction(function(ctx, result) {
        ctx.executeSql(updateDataSQL, [value, id], function(ctx, result) {
            alert("更新成功 " + tableName + id);
        }, function(tx, error) {
            alert('更新失败:' + tableName + id + error.message);
        });
    });
}