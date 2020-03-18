/**
 * Created by Tridu33 on 2020/2/24.
 */
/**
 *数据库操作辅助类,定义对象、数据操作方法都在这里定义
 */
//数据库名称
var dbName = 'shopping';

// 打开数据库
var DBOpenRequest = window.indexedDB.open(dbName, 1);
var db; //最重要的db变量，后面所有的数据库操作都离不开它

var tableName = 'IOForms';

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
 * 新建数据库里面的表单
 * tableName:表单名
 *
 */


//数据库打开失败后
DBOpenRequest.onerror = function(event) {
    console.log('数据库打开报错');
};
// 数据库打开成功后
// 数据库数据结果
DBOpenRequest.onsuccess = function(event) {
    db = DBOpenRequest.result;
    console.log('数据库打开成功');
};



// 下面执行于：数据库首次创建版本，或者window.indexedDB.open传递的新版本（版本数值要比现在的高）
// 通常对主键，字段等进行重定义
DBOpenRequest.onupgradeneeded = function(event) {
    db = event.target.result;
    // 创建一个数据库存储对象,先检查是否有这个表格，有就不新建
    if (!db.objectStoreNames.contains(tableName)) {
        //不常变化的数据表格tableName，业务主键'tableName', { keyPath: 'id' }，如果想要逻辑主键'tableName id', { autoIncrement: true }
        // 创建一个数据库存储对象
        var objectStore = db.createObjectStore(tableName, {
                keyPath: 'id',
                autoIncrement: true
            })
            //.createIndex(indexName, keyPath, objectParameters，即：索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值）
            // 定义存储对象的数据项
        objectStore.createIndex('id', 'id', {
            unique: true
        });

        objectStore.createIndex('IOTIME', 'IOTIME');
        objectStore.createIndex('CID', 'CID');
        objectStore.createIndex('IOMONEY', 'IOMONEY');
        objectStore.createIndex('GID', 'GID');
        objectStore.createIndex('GCOUNT', 'GCOUNT');
        objectStore.createIndex('remark', 'remark');


        if (!db.objectStoreNames.contains(sSupplier)) {
            //不常变化的数据表格tableName，业务主键'tableName', { keyPath: 'id' }，如果想要逻辑主键'tableName id', { autoIncrement: true }
            // 创建一个数据库存储对象
            var objectStore = db.createObjectStore(sSupplier, {
                    keyPath: 'id',
                    autoIncrement: true
                })
                //.createIndex(indexName, keyPath, objectParameters，即：索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值）
                // 定义存储对象的数据项
            objectStore.createIndex('id', 'id', {
                unique: true
            });
            objectStore.createIndex('SID', 'SID');
            objectStore.createIndex('SNAME', 'SNAME');
            objectStore.createIndex('SLOC', 'SLOC');
            objectStore.createIndex('GID', 'GID');
        };

        if (!db.objectStoreNames.contains(sGOODS)) {
            //不常变化的数据表格tableName，业务主键'tableName', { keyPath: 'id' }，如果想要逻辑主键'tableName id', { autoIncrement: true }
            // 创建一个数据库存储对象
            var objectStore = db.createObjectStore(sGOODS, {
                    keyPath: 'id',
                    autoIncrement: true
                })
                //.createIndex(indexName, keyPath, objectParameters，即：索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值）
                // 定义存储对象的数据项
            objectStore.createIndex('id', 'id', {
                unique: true
            });
            objectStore.createIndex('GID', 'GID');
            objectStore.createIndex('DNAME', 'DNAME');
            objectStore.createIndex('GPRICE', 'GPRICE');
            objectStore.createIndex('GTYPE', 'GTYPE');
            objectStore.createIndex('GCOUNT', 'GCOUNT');
        };

        if (!db.objectStoreNames.contains(sGathering)) {
            //不常变化的数据表格tableName，业务主键'tableName', { keyPath: 'id' }，如果想要逻辑主键'tableName id', { autoIncrement: true }
            // 创建一个数据库存储对象
            var objectStore = db.createObjectStore(sGathering, {
                    keyPath: 'id',
                    autoIncrement: true
                })
                //.createIndex(indexName, keyPath, objectParameters，即：索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值）
                // 定义存储对象的数据项
            objectStore.createIndex('id', 'id', {
                unique: true
            });
            objectStore.createIndex('RID', 'RID');
            objectStore.createIndex('RTIME', 'RTIME');
            objectStore.createIndex('GID', 'GID');
            objectStore.createIndex('RMONEY', 'RMONEY');
        };

        if (!db.objectStoreNames.contains(sRefund)) {
            //不常变化的数据表格tableName，业务主键'tableName', { keyPath: 'id' }，如果想要逻辑主键'tableName id', { autoIncrement: true }
            // 创建一个数据库存储对象
            var objectStore = db.createObjectStore(sRefund, {
                    keyPath: 'id',
                    autoIncrement: true
                })
                //.createIndex(indexName, keyPath, objectParameters，即：索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值）
                // 定义存储对象的数据项
            objectStore.createIndex('id', 'id', {
                unique: true
            });
            objectStore.createIndex('REFID', 'REFID');
            objectStore.createIndex('REFTIME', 'REFTIME');
            objectStore.createIndex('GID', 'GID');
            objectStore.createIndex('REFMONEY', 'REFMONEY');
        };

        if (!db.objectStoreNames.contains(sCustomer)) {
            //不常变化的数据表格tableName，业务主键'tableName', { keyPath: 'id' }，如果想要逻辑主键'tableName id', { autoIncrement: true }
            // 创建一个数据库存储对象
            var objectStore = db.createObjectStore(sCustomer, {
                    keyPath: 'id',
                    autoIncrement: true
                })
                //.createIndex(indexName, keyPath, objectParameters，即：索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值）
                // 定义存储对象的数据项
            objectStore.createIndex('id', 'id', {
                unique: true
            });
            objectStore.createIndex('CID', 'CID');
            objectStore.createIndex('CNAME', 'CNAME');
            objectStore.createIndex('CCARD', 'CCARD');
            objectStore.createIndex('CTYPE', 'CTYPE');
            objectStore.createIndex('CCOUNT', 'CCOUNT');
            objectStore.createIndex('GID', 'GID');
            objectStore.createIndex('CTIME', 'CTIME');
            objectStore.createIndex('CMONEY', 'CMONEY');

        };

    };
};



/**
 * 往表单里面插入数据
 */

function indexDBInsterDataToTable() {
    indexDBInsterData2TableSupplier(sSupplier, "1", "11", "GZ", "A");
    indexDBInsterData2TableSupplier(sSupplier, "2", "12", "XJ", "B");
    indexDBInsterData2TableSupplier(sSupplier, "3", "13", "XH", "C");
    indexDBInsterData2TableSupplier(sSupplier, "4", "14", "TM", "D");
    indexDBInsterData2TableSupplier(sSupplier, "5", "15", "YL", "E"); 

    indexDBInsterData2TableGOODS(sGOODS, "11", "huangsSheng", "12", "21", "0");
    indexDBInsterData2TableGOODS(sGOODS, "12", "zhima", "18", "22", "0");
    indexDBInsterData2TableGOODS(sGOODS, "13", "lvdou", "9", "23", "0");
    indexDBInsterData2TableGOODS(sGOODS, "14", "shiliu", "23", "24", "0");
    indexDBInsterData2TableGOODS(sGOODS, "15", "yaoguo", "19", "25", "0");   

    indexDBInsterData2TableGathering(sGathering, "1234501", "2020-2-1", "11", "1200.00");
    indexDBInsterData2TableGathering(sGathering, "1234502", "2020-2-2", "12", "1800.00");
    indexDBInsterData2TableGathering(sGathering, "1234503", "2020-2-3", "13", "900.00");
    indexDBInsterData2TableGathering(sGathering, "1234504", "2020-2-4", "14", "2300.00");
    indexDBInsterData2TableGathering(sGathering, "1234505", "2020-2-5", "15", "1900.00");

    indexDBInsterData2TableRefund(sRefund, "86760110", "2020-2-27", "11", "12");
    indexDBInsterData2TableRefund(sRefund, "86770110", "2020-2-27", "12", "18");
    indexDBInsterData2TableRefund(sRefund, "86780110", "2020-2-28", "13", "9");

    indexDBInsterData2TableCustomer(sCustomer, "1234501", "da_a", "0", "21", "1", "11", "2020-2-21", "12");
    indexDBInsterData2TableCustomer(sCustomer, "1234502", "da_b", "1", "22", "1", "12", "2020-2-22", "18");
    indexDBInsterData2TableCustomer(sCustomer, "1234503", "da_c", "0", "23", "1", "13", "2020-2-23", "9");
    indexDBInsterData2TableCustomer(sCustomer, "1234504", "da_d", "0", "24", "1", "14", "2020-2-24", "23");
    indexDBInsterData2TableCustomer(sCustomer, "1234505", "da_e", "1", "25", "1", "15", "2020-2-25", "19");

    indexDBInsterData2TableIOForms(sIOForms, "2020-2-1", "21", "1111101", "1200", "100", "11", "");
    indexDBInsterData2TableIOForms(sIOForms, "2020-2-2", "22", "1111102", "1800", "100", "12", "");
    indexDBInsterData2TableIOForms(sIOForms, "2020-2-3", "23", "1111103", "900", "100", "13", "");
    indexDBInsterData2TableIOForms(sIOForms, "2020-2-4", "24", "1111104", "2300", "100", "14", "");
    indexDBInsterData2TableIOForms(sIOForms, "2020-2-5", "25", "1111105", "1900", "100", "15", "");
    indexDBInsterData2TableIOForms(sIOForms, "2020-2-21", "21", "1234501", "11", "1", "11", "");
    indexDBInsterData2TableIOForms(sIOForms, "2020-2-22", "22", "1234502", "12", "1", "12", "");
    indexDBInsterData2TableIOForms(sIOForms, "2020-2-23", "23", "1234503", "13", "1", "13", "");
    indexDBInsterData2TableIOForms(sIOForms, "2020-2-24", "24", "1234504", "14", "1", "14", "");
    indexDBInsterData2TableIOForms(sIOForms, "2020-2-25", "25", "1234505", "15", "1", "15", "");
    indexDBInsterData2TableIOForms(sIOForms, "2020-2-27", "21", "86760110", "-12", "1", "11", "");
    indexDBInsterData2TableIOForms(sIOForms, "2020-2-27", "22", "86770110", "-18", "1", "12", "");
    indexDBInsterData2TableIOForms(sIOForms, "2020-2-28", "23", "86780110", "-9", "1", "13", ""); 
}
/** 
 * * 往Supplier表单里面插入数据 
 * * SID:供应商ID 
 * * SNAME:供应商名 
 * * SLOC:供应商地址 
 * * GID:商品ID 
 * Supplier,SID, GID, SLOC, SNAME
 * */
function indexDBInsterData2TableSupplier(iSupplier, iSID, iGID, iSLOC, iSNAME) {
    var request = db.transaction([iSupplier], 'readwrite')
        .objectStore(iSupplier)
        .add({ SID: iSID, GID: iGID, SLOC: iSLOC, SNAME: iSNAME });
    request.onsuccess = function(event) {
        console.log('数据写入成功');
    };

    request.onerror = function(event) {
        console.log('数据写入失败');
    }
}



/** * 往GOOD表单里面插入数据 * GID: * DNAME: * GPRICE: * GCOUNT: */
function indexDBInsterData2TableGOODS(iGOODS, iGID, iDNAME, iGPRICE, iGTYPE, iGCOUNT) {
    var request = db.transaction([iGOODS], 'readwrite')
        .objectStore(iGOODS)
        .add({ GID: iGID, DNAME: iDNAME, GPRICE: iGPRICE, GTYPE: iGTYPE, GCOUNT: iGCOUNT });
    request.onsuccess = function(event) {
        console.log('数据写入成功');
    };

    request.onerror = function(event) {
        console.log('数据写入失败');
    }
}

/** * 往 Gathering表单里面插入数据 * RID: * RTIME: * GID: * RMONEY: */
function indexDBInsterData2TableGathering(iGathering, iRID, iRTIME, iGID, iRMONEY) {
    var request = db.transaction([iGathering], 'readwrite')
        .objectStore(iGathering)
        .add({ RID: iRID, RTIME: iRTIME, GID: iGID, RMONEY: iRMONEY });
    request.onsuccess = function(event) {
        console.log('数据写入成功');
    };

    request.onerror = function(event) {
        console.log('数据写入失败');
    }
}

/** * 往Refund表单里面插入数据 * : * : * : */
function indexDBInsterData2TableRefund(iRefund, iREFID, iREFTIME, iGID, iREFMONEY) {
    var request = db.transaction([iRefund], 'readwrite')
        .objectStore(iRefund)
        .add({ REFID: iREFID, REFTIME: iREFTIME, GID: iGID, REFMONEY: iREFMONEY });
    request.onsuccess = function(event) {
        console.log('数据写入成功');
    };
    request.onerror = function(event) {
        console.log('数据写入失败');
    }
}

/** * 往 Customer表单里面插入数据 * : * : * : */
function indexDBInsterData2TableCustomer(iCustomer, iCID, iCNAME, iCCARD, iCTYPE, iCCOUNT, iGID, iCTIME, iCMONEY) {
    var request = db.transaction([iCustomer], 'readwrite')
        .objectStore(iCustomer)
        .add({ CID: iCID, CNAME: iCNAME, CCARD: iCCARD, CTYPE: iCTYPE, CCOUNT: iCCOUNT, GID: iGID, CTIME: iCTIME, CMONEY: iCMONEY });
    request.onsuccess = function(event) {
        console.log('数据写入成功');
    };

    request.onerror = function(event) {
        console.log('数据写入失败');
    }
}


/** * 往 IOForms表单里面插入数据 * : * : * : */
function indexDBInsterData2TableIOForms(iIOForms, iIOTIME, iIOTYPE, iCID, iIOMONEY, iGCOUNT, iGID, iremark) {
    var request = db.transaction([iIOForms], 'readwrite')
        .objectStore(iIOForms)
        .add({ IOTIME: iIOTIME, IOTYPE: iIOTYPE, IOMONEY: iIOMONEY, CID: iCID, GCOUNT: iGCOUNT, GID: iGID, remark: iremark });
    request.onsuccess = function(event) {
        console.log('数据写入成功');
    };

    request.onerror = function(event) {
        console.log('数据写入失败');
    }
}

/**
 * 获取数据库表单里面的所有数据
 * table_input:表单名
 * 返回数据集合
 */
function indexDBGetAllData(table_input) {
    var transaction = db.transaction([table_input]);
    var objectStore = transaction.objectStore(table_input);
    objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;

        if (cursor) {
            indexDBGetAData(table_input, cursor.key)
            cursor.continue();
        } else {
            console.log('没有更多数据了！');
        }
    };
}
/**
 * 获取数据库一个表单里面的部分数据
 * table_input:表单名
 * param:参数
 * request=db.transaction([sSupplier]).objectStore(sSupplier).get(1);
 * console.log(request.result.SID);
 */
function indexDBGetAData(table_input, param) {
    var transaction = db.transaction([table_input]);
    var objectStore = transaction.objectStore(table_input);
    var request = objectStore.get(param);

    request.onerror = function(event) {
        console.log('事务失败');
    };

    request.onsuccess = function(event) {
        if (request.result) {
            //console.log(request.result);
            if (table_input == sSupplier) {
                console.log(" SID=" + request.result.SID);
                console.log(" GID=" + request.result.GID);
                console.log(" SLOC=" + request.result.SLOC);
                console.log(" SNAME=" + request.result.SNAME);
                console.log("-------- 我是分割线 -------");
            };
            if (table_input == sGOODS) {
                console.log("GID =" + request.result.GID);
                console.log("AGE =" + request.result.DNAME);
                console.log("GPRICE =" + request.result.GPRICE);
                console.log("GTYPE =" + request.result.GTPE);
                console.log("GCOUNT =" + request.result.GCOUNT);
                console.log("-------- 我是分割线 -------");
            };
            if (table_input == sGathering) {
                console.log(" RID=" + request.result.RID);
                console.log(" RTIME=" + request.result.RTIME);
                console.log(" GID=" + request.result.GID);
                console.log(" RMONEY=" + request.result.RMONEY);
                console.log("-------- 我是分割线 -------");
            };
            if (table_input == sRefund) {
                console.log(" REFID=" + request.result.REFID);
                console.log(" REFTIME=" + request.result.REFTIME);
                console.log(" GID=" + request.result.GID);
                console.log(" REFMONEY=" + request.result.REFMONEY);
                console.log("-------- 我是分割线 -------");
            };
            if (tableName == sCustomer) {
                console.log(" CID=" + request.result.CID);
                console.log(" CNAME=" + request.result.CNAME);
                console.log(" CCARD=" + request.result.CCARD);
                console.log(" CTYPE=" + request.result.CTYPE);
                console.log(" CCOUNT=" + request.result.CCOUNT);
                console.log(" GID=" + request.result.GID);
                console.log(" CTIME=" + request.result.CTIME);
                console.log(" CMONEY=" + request.result.CMONEY);
                console.log("-------- 我是分割线 -------");
            };
            if (table_input == sIOForms) {
                console.log(" IOID=" + request.result.IOID);
                console.log(" IOTIME=" + request.result.IOTIME);
                console.log(" IOTYPE=" + request.result.IOTYPE);
                console.log(" IOCOUNT=" + request.result.IOCOUNT);
                console.log(" GID=" + request.result.GID);
                console.log(" CID=" + request.result.CID);
                console.log(" IOMONEY=" + request.result.IOMONEY);
                console.log("-------- 我是分割线 -------");
            }
        } else {
            console.log('未获得数据记录');
        }
    };
}
/**
 * 删除表单里的全部数据
 * table_input:表单名
 */
function indexDBDeleteAllDataFromTable(table_input) {
    var transaction = db.transaction([table_input], 'readwrite');
    var objectStore = transaction.objectStore(table_input);
    objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            indexDBDeleteADataFromTable(table_input, cursor.key)
            cursor.continue();
        } else {
            console.log('没有更多数据了！');
        }
    };

}
/**
 * 根据param删除数据
 * table_input:表单名
 * param:参数主键
 */


function indexDBDeleteADataFromTable(table_input, id) {
    var request = db.transaction([table_input], 'readwrite')
        .objectStore(table_input)
        .delete(id);

    request.onerror = function(event) {
        console.log('事务失败');
    };

    request.onsuccess = function(event) {
        console.log('数据删除成功');
    };
}
/**
 * 根据name修改数据
 * table_input:表单名
 * id:匹配主键
 * attribute:要变的属性
 * value:要变的属性值
 */
function indexDBUpdateAData(table_input, id, data) {
    indexDBGetAData(table_input, id);
    var transaction = db.transaction([table_input], 'readwrite');
    var objectStore = transaction.objectStore(table_input);
    // 获取存储的对应键的存储对象
    var request = objectStore.get(id);
    //    id为1的数据更新为：  举例传入data={SID: "1", GID: "11", SLOC: "GZ", SNAME: "更新名字"}
    //data={SID: "1", GID: "11", SLOC: "GZ",attribute: "更新名字"}，属性错了都行。
    // 获取成功后替换当前数据
    request.onsuccess = function(event) {
        // 当前数据
        var myRecord = request.result;
        // 遍历替换
        for (var key in data) {
            if (typeof myRecord[key] != 'undefined') {
                myRecord[key] = data[key];
            }
        }
        // 更新数据库存储数据                
        objectStore.put(myRecord);
    };
    request.onerror = function(event) {
        console.log('数据更新失败');
    };
    indexDBGetAData(table_input, id);
};


/*
 *使用索引
 */
function useIndex() {
    var transaction = db.transaction(['Supplier'], 'readonly');
    var store = transaction.objectStore('Supplier');
    var index = store.index('SNAME');
    var request = index.get('D');

    request.onsuccess = function(event) {
        var result = event.target.result;
        if (result) {
            console.log("使用索引查询SNAME==数据的id");
            console.log(result.id);
            console.log("有了id意味着前面的什么操作都能用了");
            // ...
        } else {
            // ...
            console.log("事务失败");
        }
    }
}
/*-----------------------------------------------IOForms-输入输出------------------------------------------------------------*/

//定义一堆方法供后续调用
var method = {
    add: function(newItem) {
        //数据库的操作都是基于事务（transaction）来进行，于是，无论是添加编辑还是删除数据库，都要先建立一个事务（transaction），然后才能继续下面的操作
        var transaction = db.transaction([tableName], 'readwrite');
        // 打开已经存储的数据对象
        var objectStore = transaction.objectStore(tableName);
        // 添加到数据对象中
        var objectStoreRequest = objectStore.add(newItem);
        objectStoreRequest.onsuccess = function(event) {
            method.show();
        };
    },
    edit: function(id, data) {
        // 编辑数据
        var transaction = db.transaction([tableName], 'readwrite');
        // 打开已经存储的数据对象
        var objectStore = transaction.objectStore(tableName);
        // 获取存储的对应键的存储对象
        var objectStoreRequest = objectStore.get(id);
        // 获取成功后替换当前数据
        objectStoreRequest.onsuccess = function(event) {
            // 当前数据
            var myRecord = objectStoreRequest.result;
            // 遍历替换
            for (var key in data) {
                if (typeof myRecord[key] != 'undefined') {
                    myRecord[key] = data[key];
                }
            }
            // 更新数据库存储数据                
            objectStore.put(myRecord);
        };
    },
    del: function(id) {
        // 打开已经存储的数据对象
        var objectStore = db.transaction([tableName], 'readwrite').objectStore(tableName);
        // 直接删除            
        var objectStoreRequest = objectStore.delete(id);
        // 删除成功后
        objectStoreRequest.onsuccess = function() {
            method.show();
        };
    },
    show: function() {
        // 最终要展示的HTML数据
        var htmlProjectList = '';
        // 打开对象存储，获得游标列表
        var objectStore = db.transaction(tableName).objectStore(tableName);
        objectStore.openCursor().onsuccess = function(event) {
            var cursor = event.target.result;
            // 如果游标没有遍历完，继续下面的逻辑
            if (cursor) {
                htmlProjectList = htmlProjectList + strTplList.temp(cursor.value);
                // 继续下一个游标项
                cursor.continue();
                // 如果全部遍历完毕
            } else {
                logInfo('');
                eleTbody.innerHTML = htmlProjectList;

                if (htmlProjectList == '') {
                    logInfo('暂无数据');
                }
            }
        }
    }
};


// 元素们
var eleForm = document.querySelector('#IOform');
var eleTbody = document.querySelector('#IOresult tbody');
var eleStatus = document.getElementById('IOstatus');
// 列表数据模板字符内容
var strTplList = document.getElementById('IOtplList').innerHTML;

var logError = function(error) {
        eleStatus.style.display = 'block';
        eleStatus.innerHTML = '<span class="error">' + error + '</span>';
    },
    logInfo = function(info) {
        eleStatus.style.display = 'block';
        eleStatus.innerHTML = '<span class="info">' + info + '</span>';
    };

// 简易模板方法
String.prototype.temp = function(obj) {
    return this.replace(/\$\w+\$/gi, function(matchs) {
        return obj[matchs.replace(/\$/g, "")] || '';
    });
};
// 新增数据事件监听，表单提交新增数据，交互
eleForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var formData = {};

    [].slice.call(this.querySelectorAll('input,textarea')).forEach(function(ele) {
        if (ele.name) {
            formData[ele.name] = ele.value;
        }
    });
    // 添加新的数据，其中formData的格式就是长这个亚子
    //本质是这句：db.transaction(tableName, "readwrite").objectStore(tableName).add(newItem);
    method.add(formData);

    this.reset();
});

// 编辑事件,通过下面语句调用示例
eleTbody.addEventListener('focusout', function(event) {
    var eleTd = event.target;
    // 获取id，也就是获得主键
    var id = eleTd && eleTd.getAttribute('data-id');
    if (!id || !/td/.test(eleTd.tagName)) { return; }

    // 这是要替换的数据
    var data = {
        id: id * 1
    };
    // 获得现在的数据
    [].slice.call(eleTd.parentElement.querySelectorAll('td[data-key]')).forEach(function(td) {
        var key = td.getAttribute('data-key');
        var value = td.innerText || td.textContent || '';

        data[key] = value;
    });

    // 更新本地数据库调用方法
    method.edit(id, data);
    /*
    method.edit(1, {
    remark: '编辑更改的注释'
    });
    */
});
// 删除事件
eleTbody.addEventListener('click', function(event) {
    var eleBtn = event.target,
        id = '';
    if (eleBtn && eleBtn.classList.contains('jsListDel') && (id = eleBtn.getAttribute('data-id'))) {
        method.del(id * 1); //删除时间的console调用方法
        event.preventDefault();
    }
});

//调用函数时，是在函数后面写上括号和实参的，由于操作符的优先级，函数本身也需要用括号 
//(function($){...}(param))就是一个匿名函数，jQuery更多操作 
//主要利用函数内的变量作用域，避免产生全局变量，影响整体页面环境，增加代码的兼容性。
//也可以通过函数调用实现相同功能，好处是还能复用内部函数,比如shoppingindexDB.method.show;
//主要利用函数内的变量作用域，避免产生全局变量，影响整体页面环境，增加代码的兼容性。
//也可以通过函数调用实现相同功能，好处是还能复用内部函数,比如shoppingindexDB.method.show;
//也可以通过函数调用实现相同功能，好处是还能复用内部函数,比如shoppingindexDB.method.show;
//也可以通过函数调用实现相同功能，好处是还能复用内部函数,比如shoppingindexDB.method.show;
//也可以通过函数调用实现相同功能，好处是还能复用内部函数,比如shoppingindexDB.method.show;