var ProtoBuf = require("protobufjs");
var proto = require("./proto").proto;
var builder = ProtoBuf.loadJson(proto);
/**
 * cmd_1: 心跳
 * cmd_301: 登录信息
 * cmd_304: 拉取会话
 * cmd_303: 发送消息请求
 */
var tool = {
  // 心跳
  cmd_1: function(req) {
    var res = {
      cmd: 2
    };
    return res;
  },
  // 登录信息
  cmd_301: function(req) {
    var PbImLoginRequest = builder.build("PbImLoginRequest");
    var pbImLoginRequest = PbImLoginRequest.decode(req.msgBody);
    // console.log(pbImLoginRequest);
    var PbImLoginResponse = builder.build("PbImLoginResponse");
    var pbImLoginResponse = new PbImLoginResponse();
    pbImLoginResponse.setErrorCode(0);
    var res = {
      cmd: 400,
      seqid: req.seqid,
      msgBody: Array.apply(
        [],
        new Uint8Array(pbImLoginResponse.toArrayBuffer())
      )
    };
    return res;
  },
  // 拉取会话
  cmd_304: function(req) {
    var PbImGetSessionRequest = builder.build("PbImGetSessionRequest");
    var pbImGetSessionRequest = PbImGetSessionRequest.decode(req.msgBody);
    // console.log(pbImGetSessionRequest);
    var PbImGetSessionResponse = builder.build("PbImGetSessionResponse");
    var pbImGetSessionResponse = new PbImGetSessionResponse();
    pbImGetSessionResponse.setErrorCode(0);
    pbImGetSessionResponse.setSessionList([]);
    var res = {
      cmd: 404,
      seqid: req.seqid,
      msgBody: Array.apply(
        [],
        new Uint8Array(pbImGetSessionResponse.toArrayBuffer())
      )
    };
    return res;
  },
  // 发送消息请求
  cmd_303: function(req) {
    var PbImMsg = builder.build("PbImMsg");
    var pbImMsg = PbImMsg.decode(req.msgBody);
    // console.log(pbImMsg);
    var PbImMsgResponse = builder.build("PbImMsgResponse");
    var pbImMsgResponse = new PbImMsgResponse();
    pbImMsgResponse.setErrorCode(0);
    pbImMsgResponse.setMsgId(pbImMsg.MsgId);
    var res = {
      cmd: 403,
      seqid: req.seqid,
      msgBody: Array.apply([], new Uint8Array(pbImMsgResponse.toArrayBuffer()))
    };
    return res;
  }
};
module.exports = {
  tool
};
