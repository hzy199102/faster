var basic = [
  {
    name: "pcode",
    type: "String",
    desc: "产品编码",
    value: "10010",
    required: true
  },
  {
    name: "fncode",
    type: "String",
    desc: "功能编码",
    value: "1001010",
    required: true
  },
  {
    name: "fnname",
    type: "String",
    desc: "功能名称",
    value: "登录",
    required: true
  },
  {
    name: "fngroup",
    type: "String",
    desc: "功能分组",
    value: "10010",
    required: true
  },
  {
    name: "ver",
    type: "String",
    desc: "版本号",
    value: "v1.0.0",
    required: true
  },
  {
    name: "gid",
    type: "String",
    desc: "广联达云账号id",
    value: "123213213213",
    required: true
  },
  {
    name: "sessionid",
    type: "String",
    desc: "会话id",
    value: "555555555",
    required: true
  },
  {
    name: "trigertime",
    type: "String",
    desc:
      "事件触发事件 格式：'yyyy/MM/dd HH:mm:ss SSS' 2012/10/15 18:47:46 203",
    value: Date.now(),
    required: true
  },
  {
    name: "dognum",
    type: "String",
    desc: "加密锁号"
  },
  {
    name: "hardwareid",
    type: "String",
    desc: "硬件id"
  },
  {
    name: "iskeypath",
    type: "boolean",
    desc: "是否是关键路径功能点"
  },
  {
    name: "utype",
    type: "String",
    desc: "各产品自定义的用户类型"
  },
  {
    name: "vername",
    type: "String",
    desc: "版本名称"
  },
  {
    name: "ver2",
    type: "String",
    desc: "内核版本号"
  },
  {
    name: "usetype",
    type: "String",
    desc: "使用模式"
  },
  {
    name: "keyword",
    type: "String",
    desc: "搜索关键字"
  },
  {
    name: "projectid",
    type: "String",
    desc: "工程id"
  },
  {
    name: "prjname",
    type: "String",
    desc: "工程名称"
  },
  {
    name: "prjfullpath",
    type: "String",
    desc: "工程全路径"
  },
  {
    name: "prjcost",
    type: "String",
    desc: "工程造价"
  },
  {
    name: "prjedocnt",
    type: "String",
    desc: "工程图元数"
  },
  {
    name: "prjsize",
    type: "String",
    desc: "工程文件大小"
  },
  {
    name: "major",
    type: "String",
    desc: "专业"
  },
  {
    name: "regionrule",
    type: "String",
    desc: "地区规则"
  },
  {
    name: "duration",
    type: "String",
    desc: "使用时长"
  },
  {
    name: "platform",
    type: "String",
    desc: "产品类型"
  },
  {
    name: "mac",
    type: "String",
    desc: "mac地址"
  },
  {
    name: "sys",
    type: "String",
    desc:
      "操作系统类型：1:android,2:ios,3:window,4:mac,5:linux,6:unix,7:sunOS,0:其他 （Web可以没有）"
  },
  {
    name: "sysver",
    type: "String",
    desc: "操作系统版本"
  },
  {
    name: "query",
    type: "String",
    desc: "自定义数据（json格式）"
  }
];
