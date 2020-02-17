/**
 * op埋点sdk
 * 接口文档：https://km.glodon.com/pages/viewpage.action?pageId=57293929
 *
 * v1.0
 * 1. _init：初始化函数，sdk初始化前的埋点可通过队列在初始化之后一并处理
 * 2. track：发送http请求，内部包含validate：数据校验
 * 3. defineCom: 存储埋点基础参数，不用在每一次上报中都让用户可以传递
 * 4. defaluts: 基础配置，包括校验规则，必填字段，可初始化的公共字段
 * 5. log: 日志
 * 6. getUUId: 生成埋点记录唯一标识
 * 7. listen: 注册监听事件，包括：error事件
 *
 *
 */

(function(window, undefined) {
  var defaults = {
    url: {
      test: "http://aecore-collector-test.glodon.com",
      prod: "https://aecore-collector.glodon.com"
    },
    trackCom: {},
    validate: {
      _isString: function(val) {
        return typeof val === "string";
      },
      _isStringRequired: function(val) {
        return typeof val === "string" && val.trim() !== "";
      },
      _isBoolean: function(val) {
        return typeof val === "boolean";
      },
      pcode: {
        desc: "产品编码",
        validate: function(val) {
          return defaults.validate._isStringRequired(val);
        }
      },
      fncode: {
        desc: "功能编码",
        validate: function(val) {
          return defaults.validate._isStringRequired(val);
        }
      },
      fnname: {
        desc: "功能名称",
        validate: function(val) {
          return defaults.validate._isStringRequired(val);
        }
      },
      fngroup: {
        desc: "功能分组",
        validate: function(val) {
          return defaults.validate._isStringRequired(val);
        }
      },
      ver: {
        desc: "版本号",
        validate: function(val) {
          return defaults.validate._isStringRequired(val);
        }
      },
      gid: {
        desc: "广联达云账号id",
        validate: function(val) {
          return defaults.validate._isStringRequired(val);
        }
      },
      sessionid: {
        desc: "会话id",
        validate: function(val) {
          return defaults.validate._isStringRequired(val);
        }
      },
      trigertime: {
        desc:
          "事件触发事件 格式：'yyyy/MM/dd HH:mm:ss SSS' 2012/10/15 18:47:46 203",
        validate: function(val) {
          return defaults.validate._isStringRequired(val);
        }
      },
      dognum: {
        desc: "加密锁号",
        validate: function(val) {
          return defaults.validate._isString(val);
        }
      },
      hardwareid: {
        desc: "硬件id",
        validate: function(val) {
          return defaults.validate._isString(val);
        }
      },
      iskeypath: {
        desc: "是否是关键路径功能点",
        validate: function(val) {
          return defaults.validate._isBoolean(val);
        }
      },
      utype: {
        desc: "各产品自定义的用户类型",
        validate: function(val) {
          return defaults.validate._isString(val);
        }
      },
      vername: {
        desc: "版本名称",
        validate: function(val) {
          return defaults.validate._isString(val);
        }
      },
      ver2: {
        desc: "内核版本号",
        validate: function(val) {
          return defaults.validate._isString(val);
        }
      },
      usetype: {
        desc: "使用模式",
        validate: function(val) {
          return defaults.validate._isString(val);
        }
      },
      keyword: {
        desc: "搜索关键字",
        validate: function(val) {
          return defaults.validate._isString(val);
        }
      },
      projectid: {
        desc: "工程id",
        validate: function(val) {
          return defaults.validate._isString(val);
        }
      },
      prjname: {
        desc: "工程名称",
        validate: function(val) {
          return defaults.validate._isString(val);
        }
      },
      prjfullpath: {
        desc: "工程全路径",
        validate: function(val) {
          return defaults.validate._isString(val);
        }
      },
      prjcost: {
        desc: "工程造价",
        validate: function(val) {
          return defaults.validate._isString(val);
        }
      },
      prjedocnt: {
        desc: "工程图元数",
        validate: function(val) {
          return defaults.validate._isString(val);
        }
      },
      prjsize: {
        desc: "工程文件大小",
        validate: function(val) {
          return defaults.validate._isString(val);
        }
      },
      major: {
        desc: "专业",
        validate: function(val) {
          return defaults.validate._isString(val);
        }
      },
      regionrule: {
        desc: "地区规则",
        validate: function(val) {
          return defaults.validate._isString(val);
        }
      },
      duration: {
        desc: "使用时长",
        validate: function(val) {
          return defaults.validate._isString(val);
        }
      },
      platform: {
        desc: "产品类型",
        validate: function(val) {
          return defaults.validate._isString(val);
        }
      },
      mac: {
        desc: "mac地址",
        validate: function(val) {
          return defaults.validate._isString(val);
        }
      },
      sys: {
        desc:
          "操作系统类型：1:android,2:ios,3:window,4:mac,5:linux,6:unix,7:sunOS,0:其他 （Web可以没有）",
        validate: function(val) {
          return defaults.validate._isString(val);
        }
      },
      sysver: {
        desc: "操作系统版本",
        validate: function(val) {
          return defaults.validate._isString(val);
        }
      },
      query: {
        desc: "自定义数据（json格式）",
        validate: function(val) {
          if (defaults.validate._isString(val)) {
            try {
              return typeof JSON.parse(val) === "object";
            } catch (error) {
              return false;
            }
          } else {
            return false;
          }
        }
      }
    },
    // 必填字段
    trackRequired: [
      "pcode",
      "fncode",
      "fnname",
      "fngroup",
      "ver",
      "gid",
      "sessionid"
    ],
    // 公共字段
    commonField: [
      "pcode",
      "ver",
      "gid",
      "sessionid",
      "dognum",
      "hardwareid",
      "vername",
      "ver2",
      "platform",
      "mac",
      "sys",
      "sysver"
    ],
    logCode: {
      VALIDATE_ERROR: 1
    }
  };

  /**
   * 接口数据校验，并且自动补全一些字段，包括：trigertime和已经初始化的defaults.trackCom基础数据
   * @param {*} obj
   *   上报接口数据对象
   */
  var validate = function(obj) {
    if (typeof obj !== "object") {
      window.Report.onError({
        code: defaults.logCode.VALIDATE_ERROR,
        msg: "传递对象形式的埋点数据"
      });
      return false;
    }
    // defaults.trackCom基础数据自动补全，前提是埋点数据不包含这个属性
    for (var key in defaults.trackCom) {
      if (!obj[key]) {
        obj[key] = defaults.trackCom[key];
      }
    }
    // sdk自动补全字段：trigertime
    obj.trigertime = dateFormat("yyyy/MM/dd hh:mm:ss S", new Date());
    // sdk检验必填字段是否全部填写
    for (var i = 0, len = defaults.trackRequired.length; i < len; i++) {
      if (typeof obj[defaults.trackRequired[i]] === "undefined") {
        window.Report.onError({
          code: defaults.logCode.VALIDATE_ERROR,
          msg:
            "缺少必填字段：" +
            defaults.trackRequired[i] +
            "（" +
            defaults.validate[defaults.trackRequired[i]].desc +
            "）"
        });
        return false;
      }
    }
    // sdk校验字段的合法性
    for (var key in obj) {
      if (
        defaults.validate[key] &&
        !defaults.validate[key].validate(obj[key])
      ) {
        window.Report.onError({
          code: defaults.logCode.VALIDATE_ERROR,
          msg:
            "字段：" + key + "（" + defaults.validate[key].desc + "）未通过校验"
        });
        return false;
      }
    }
    return true;
  };

  /**
   * 时间格式化
   * @param {*} fmt
   *   时间格式
   * @param {*} date
   *   时间，Date格式
   */
  var dateFormat = function(fmt, date) {
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
    return fmt;
  };

  /**
   * 空函数
   */
  var emptyfn = function() {
    console.log("空方法");
  };

  var Report = function() {
    // sdk异步加载，部分方法可能在加载完成之前就已经被调用，所以需要先记录在队列中，等sdk加载完毕之后调用，
    // 前提一定是_init方法被调用
    for (
      var report = window.Report || [], pos = 0, _this = this;
      pos < report.length;
      pos++
    ) {
      // 如果事件队列的首个节点是_init初始化，才对事件队列进行处理
      if ("_init" === report[pos][0]) {
        // _init的参数
        var initFunParams = report.shift();
        // _init方法名
        var initFunName = initFunParams.shift();
        initFunParams.push(function() {
          // 事件队列除了_init其他的事件都需要在_init之后被一一触发
          for (; report && report.length > 0; ) {
            // 事件参数
            var funParams = report.shift(),
              // 事件名
              funName = funParams.shift();
            _this[funName] && _this[funName].apply(_this, funParams);
          }
        });
        _this[initFunName] && _this[initFunName].apply(_this, initFunParams);
        break;
      }
    }
    return;
  };

  /**
   * 初始化
   * @params
   *  opts: 配置参数
   *   debug: 测试环境，默认false
   *  eventFuc: 事件队列，在sdk没初始化之前提前触发的事件都会加入事件队列，在sdk初始化之后，立即执行。
   */
  Report.prototype._init = function(opts, eventFuc) {
    var params = opts || {};
    this.url = params.debug ? defaults.url.test : defaults.url.prod;
    eventFuc && eventFuc();
    // console.log(this);
  };

  /**
   * 初始化埋点基础参数，不用在每一次上报中都让用户可以传递
   * 具体参考commonField
   * 需要校验通过才能进行初始化
   *
   */
  Report.prototype.defineCom = function(opts) {
    if (typeof opts !== "object") {
      return false;
    }
    // defaults.trackCom
    for (var key in opts) {
      // 传递参数是公共参数，并且通过校验，才进行初始化
      if (
        defaults.commonField.indexOf(key) > -1 &&
        defaults.validate[key].validate(opts[key])
      ) {
        defaults.trackCom[key] = opts[key];
      }
    }
    return true;
  };

  /**
   * 获取埋点基础参数
   * 注意是个clone对象，防止defaults.trackCom被随意改动
   *
   */
  Report.prototype.getCom = function() {
    // return defaults.trackCom;
    return Object.assign({}, defaults.trackCom);
  };

  /**
   * 注册监听函数，支持监听错误事件
   */
  Report.prototype.listen = function(options) {
    this.onError = options.onError || emptyfn; //抛出异常
  };

  /**
   * 发送请求，需要进行数据校验
   */
  Report.prototype.track = function(obj) {
    if (validate(obj)) {
      console.log("reprot track:", obj);
      fetch(this.url + "/receive", {
        method: "post",
        // mode: "no-cors",
        // mode: "cors",
        body: JSON.stringify(obj),
        headers: {
          // Accept: "application/x-www-form-urlencoded",
          "Content-Type": "application/json"
        }
      }).then(function(data) {
        console.log(data);
      });
    }
  };

  // define your namespace Report
  window.Report = new Report();
})(window);
