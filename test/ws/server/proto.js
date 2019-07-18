var proto = {
    "package": null,
    "options": {
        "java_package": "com.grandsoft.gcc.gccserver.protobuf"
    },
    "messages": [
        {
            "name": "PbImMsg",
            "fields": [
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "AppId",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "MsgId",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "MsgType",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "MsgBody",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "SenderId",
                    "id": 5
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "SenderName",
                    "id": 6
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "SenderRemark",
                    "id": 7
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "SenderAvatar",
                    "id": 8
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "GroupId",
                    "id": 9
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "GroupType",
                    "id": 10
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "GroupName",
                    "id": 11
                },
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "SendTime",
                    "id": 12
                },
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "MsgSeqId",
                    "id": 13
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "NeedAck",
                    "id": 14
                },
                {
                    "rule": "optional",
                    "type": "PbImMsgFile",
                    "name": "File",
                    "id": 15
                },
                {
                    "rule": "optional",
                    "type": "PbImMsgImage",
                    "name": "Image",
                    "id": 16
                },
                {
                    "rule": "optional",
                    "type": "PbImMsgVoice",
                    "name": "Voice",
                    "id": 17
                },
                {
                    "rule": "optional",
                    "type": "PbImMsgVideo",
                    "name": "Video",
                    "id": 18
                },
                {
                    "rule": "optional",
                    "type": "PbImMsgLocation",
                    "name": "Location",
                    "id": 19
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "AtUserId",
                    "id": 20
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "ToAllMember",
                    "id": 21
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "MsgExt",
                    "id": 22
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "AddFriend",
                    "id": 23
                },
                {
                    "rule": "optional",
                    "type": "PbImMsgCall",
                    "name": "Call",
                    "id": 24
                }
            ]
        },
        {
            "name": "PbImMsgFile",
            "fields": [
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "FileId",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "FileName",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "FileType",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "FileUrl",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "FileSize",
                    "id": 5
                },
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "FileUploadtime",
                    "id": 6
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "FileDesc",
                    "id": 7
                }
            ]
        },
        {
            "name": "PbImMsgImage",
            "fields": [
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "ImageId",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "ImageName",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "ImageType",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "ImageUrl",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "ImageSize",
                    "id": 5
                },
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "AttachUploadtime",
                    "id": 6
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "ImageW",
                    "id": 7
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "ImageH",
                    "id": 8
                }
            ]
        },
        {
            "name": "PbImMsgVoice",
            "fields": [
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "VoiceId",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "VoiceName",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "VoiceUrl",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "VoiceDurition",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "VoiceSize",
                    "id": 5
                },
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "AttachUploadtime",
                    "id": 6
                }
            ]
        },
        {
            "name": "PbImMsgVideo",
            "fields": [
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "VideoId",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "VideoName",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "VideoUrl",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "VideoDurition",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "VideoSize",
                    "id": 5
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "ImageId",
                    "id": 6
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "ImageName",
                    "id": 7
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "ImageUrl",
                    "id": 8
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "ImageSize",
                    "id": 9
                },
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "AttachUploadtime",
                    "id": 10
                }
            ]
        },
        {
            "name": "PbImMsgLocation",
            "fields": [
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "AddressName",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "double",
                    "name": "Latitude",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "double",
                    "name": "Longitude",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "LocationImageID",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "LocationImageUrl",
                    "id": 5
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "LocationImageSize",
                    "id": 6
                },
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "AttachUploadtime",
                    "id": 7
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "Range",
                    "id": 8
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "Channel",
                    "id": 9
                }
            ]
        },
        {
            "name": "PbImMsgCall",
            "fields": [
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "State",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "Duration",
                    "id": 2
                }
            ]
        },
        {
            "name": "PbUser",
            "fields": [
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "AppId",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "UserId",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "double",
                    "name": "Latitude",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "double",
                    "name": "Longitude",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "LastTime",
                    "id": 5
                }
            ]
        },
        {
            "name": "PbImLoginRequest",
            "fields": [
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "AppCode",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "UserCode",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "UserPwd",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "Type",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "Token",
                    "id": 5
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "Anonymous",
                    "id": 6
                }
            ]
        },
        {
            "name": "PbImLoginResponse",
            "fields": [
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "ErrorCode",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "ErrorMsg",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "AppID",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "Uin",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "Count",
                    "id": 5
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "token",
                    "id": 6
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "VerNum",
                    "id": 7
                }
            ]
        },
        {
            "name": "PbImLogoutRequest",
            "fields": [
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "AppCode",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "UserCode",
                    "id": 2
                }
            ]
        },
        {
            "name": "PbImLogoutResponse",
            "fields": [
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "ErrorCode",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "ErrorMsg",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "AppCode",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "UserCode",
                    "id": 4
                }
            ]
        },
        {
            "name": "PbImMsgResponse",
            "fields": [
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "ErrorCode",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "ErrorMsg",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "MsgId",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "Seq",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "LastTime",
                    "id": 5
                }
            ]
        },
        {
            "name": "PbImGetMsgRequest",
            "fields": [
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "AppCode",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "UserCode",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "GroupID",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "seqid",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "count",
                    "id": 5
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "initSeq",
                    "id": 6
                }
            ]
        },
        {
            "name": "PbImGetMsgResponse",
            "fields": [
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "ErrorCode",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "ErrorMsg",
                    "id": 2
                },
                {
                    "rule": "repeated",
                    "type": "PbImMsg",
                    "name": "MsgList",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "GroupID",
                    "id": 4
                }
            ]
        },
        {
            "name": "PbImGetSessionRequest",
            "fields": [
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "AppCode",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "UserCode",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "SessionCode",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "RecentDays",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "NullSession",
                    "id": 5
                }
            ]
        },
        {
            "name": "PbImGetSessionResponse",
            "fields": [
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "ErrorCode",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "ErrorMsg",
                    "id": 2
                },
                {
                    "rule": "repeated",
                    "type": "PbImGroupItem",
                    "name": "SessionList",
                    "id": 3
                }
            ]
        },
        {
            "name": "PbImPostReadSeqRequest",
            "fields": [
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "AppCode",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "UserCode",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "GroupID",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "seqid",
                    "id": 4
                }
            ]
        },
        {
            "name": "PbImPostReadSeqResponse",
            "fields": [
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "ErrorCode",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "ErrorMsg",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "GroupID",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "seqid",
                    "id": 4
                }
            ]
        },
        {
            "name": "PbImPostReadConfirmRequest",
            "fields": [
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "AppCode",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "UserCode",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "GroupID",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "MsgID",
                    "id": 4
                }
            ]
        },
        {
            "name": "PbImPostReadConfirmResponse",
            "fields": [
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "ErrorCode",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "ErrorMsg",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "GroupID",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "MsgID",
                    "id": 4
                }
            ]
        },
        {
            "name": "PbImGetNearPersonRequest",
            "fields": [
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "AppCode",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "UserCode",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "double",
                    "name": "Latitude",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "double",
                    "name": "Longitude",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "Range",
                    "id": 5
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "Channel",
                    "id": 6
                }
            ]
        },
        {
            "name": "PbImGetNearPersonResponse",
            "fields": [
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "ErrorCode",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "ErrorMsg",
                    "id": 2
                },
                {
                    "rule": "repeated",
                    "type": "PbUser",
                    "name": "PersonList",
                    "id": 3
                }
            ]
        },
        {
            "name": "PbImPostGPSRequest",
            "fields": [
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "AppCode",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "UserCode",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "double",
                    "name": "Latitude",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "double",
                    "name": "Longitude",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "Channel",
                    "id": 5
                }
            ]
        },
        {
            "name": "PbImPostGPSResponse",
            "fields": [
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "ErrorCode",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "ErrorMsg",
                    "id": 2
                }
            ]
        },
        {
            "name": "PbImGetOfflineAckRequest",
            "fields": [
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "AppCode",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "GroupID",
                    "id": 2
                },
                {
                    "rule": "repeated",
                    "type": "string",
                    "name": "MsgID",
                    "id": 3
                }
            ]
        },
        {
            "name": "PbImGetOfflineAckResponse",
            "fields": [
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "ErrorCode",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "ErrorMsg",
                    "id": 2
                },
                {
                    "rule": "repeated",
                    "type": "PbImMsg",
                    "name": "MsgList",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "GroupID",
                    "id": 4
                }
            ]
        },
        {
            "name": "PbImGetLocationMsgRequest",
            "fields": [
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "AppCode",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "UserCode",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "Channel",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "double",
                    "name": "Latitude",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "double",
                    "name": "Longitude",
                    "id": 5
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "count",
                    "id": 6
                },
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "LastTime",
                    "id": 7
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "Range",
                    "id": 8
                }
            ]
        },
        {
            "name": "PbImGetLocationMsgResponse",
            "fields": [
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "ErrorCode",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "ErrorMsg",
                    "id": 2
                },
                {
                    "rule": "repeated",
                    "type": "PbImMsg",
                    "name": "MsgList",
                    "id": 3
                }
            ]
        },
        {
            "name": "PbImPostMsgRevokeRequest",
            "fields": [
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "AppCode",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "UserCode",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "GroupType",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "GroupID",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "MsgID",
                    "id": 5
                },
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "MsgSeqId",
                    "id": 6
                },
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "MsgSendTime",
                    "id": 7
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "MaxMinute",
                    "id": 8
                }
            ]
        },
        {
            "name": "PbImPostMsgRevokeResponse",
            "fields": [
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "ErrorCode",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "ErrorMsg",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "GroupID",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "MsgID",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "MsgSeqId",
                    "id": 5
                }
            ]
        },
        {
            "name": "PbImRouteMsgResponse",
            "fields": [
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "ErrorCode",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "ErrorMsg",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "AppCode",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "GroupID",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "MsgID",
                    "id": 5
                }
            ]
        },
        {
            "name": "PbImGroupItem",
            "fields": [
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "GroupId",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "GroupName",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "GroupType",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "Seq",
                    "id": 5
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "LastMsg",
                    "id": 6
                },
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "LastMsgTime",
                    "id": 7
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "LastMsgType",
                    "id": 8
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "LastSenderId",
                    "id": 9
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "LastSenderName",
                    "id": 10
                },
                {
                    "rule": "repeated",
                    "type": "string",
                    "name": "Avatar",
                    "id": 11
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "IsScreen",
                    "id": 12
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "IsRemind",
                    "id": 13
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "Remark",
                    "id": 14
                },
                {
                    "rule": "optional",
                    "type": "int32",
                    "name": "MemberCount",
                    "id": 15
                },
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "InitSeqid",
                    "id": 16
                },
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "ReadSeqid",
                    "id": 17
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "CreatorId",
                    "id": 18
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "AtSenderId",
                    "id": 19
                },
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "AtSeqid",
                    "id": 20
                }
            ]
        },
        {
            "name": "PbProtocolTransferMsg",
            "fields": [
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "AppId",
                    "id": 1
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "MsgId",
                    "id": 2
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "Cmd",
                    "id": 3
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "MsgBody",
                    "id": 4
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "SenderId",
                    "id": 5
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "SenderName",
                    "id": 6
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "SenderRemark",
                    "id": 7
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "GroupId",
                    "id": 8
                },
                {
                    "rule": "optional",
                    "type": "uint32",
                    "name": "GroupType",
                    "id": 9
                },
                {
                    "rule": "optional",
                    "type": "string",
                    "name": "GroupName",
                    "id": 10
                },
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "SendTime",
                    "id": 11
                },
                {
                    "rule": "optional",
                    "type": "int64",
                    "name": "MsgSeqId",
                    "id": 12
                }
            ]
        }
    ]
}
module.exports = {
  proto
};
// export {proto} ;
