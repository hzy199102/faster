window._zhugeSdk = function(t) {
    function e(i) {
        if (n[i]) return n[i].exports;
        var r = n[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return t[i].call(r.exports, r, r.exports, e), r.l = !0, r.exports
    }
    var n = {};
    return e.m = t, e.c = n, e.i = function(t) {
        return t
    }, e.d = function(t, n, i) {
        e.o(t, n) || Object.defineProperty(t, n, {
            configurable: !1,
            enumerable: !0,
            get: i
        })
    }, e.n = function(t) {
        var n = t && t.__esModule ? function() {
            return t['default']
        } : function() {
            return t
        };
        return e.d(n, "a", n), n
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, e.p = "", e(e.s = 70)
}({
    0: function(t, e) {
        var n = window.navigator,
            i = window.document,
            r = n.userAgent,
            o = Array.prototype,
            a = Object.prototype,
            s = a.toString,
            c = o.forEach,
            u = Array.isArray,
            f = o.slice,
            d = a.hasOwnProperty,
            l = {},
            p = {
                each: function(t, e, n) {
                    if (null != t)
                        if (c && t.forEach === c) t.forEach(e, n);
                        else if (t.length === +t.length) {
                        for (var i = 0, r = t.length; i < r; i++)
                            if (i in t && e.call(n, t[i], i, t) === l) return
                    } else
                        for (var o in t)
                            if (d.call(t, o) && e.call(n, t[o], o, t) === l) return
                },
                extend: function(t) {
                    return p.each(f.call(arguments, 1), function(e) {
                        for (var n in e) void 0 !== e[n] && (t[n] = e[n])
                    }), t
                },
                isUndefined: function(t) {
                    return void 0 === t
                },
                isString: function(t) {
                    return "[object String]" == s.call(t)
                },
                isArray: u || function(t) {
                    return "[object Array]" === s.call(t)
                },
                isFunction: function(t) {
                    return "[object Function]" === s.call(t)
                },
                isObject: function(t) {
                    return "[object Object]" === s.call(t) && void 0 !== t
                },
                hasMobileSdk: function() {
                    var t = !!(window.zhugeTracker || window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.zhugeTracker);
                    return {
                        flag: t,
                        track: function(e, n) {
                            t && (window.zhugeTracker ? window.zhugeTracker.trackProperty(e, p.JSONEncode(n)) : window.webkit.messageHandlers.zhugeTracker.postMessage({
                                type: "track",
                                name: e,
                                prop: n
                            }))
                        },
                        identify: function(e, n) {
                            t && (window.zhugeTracker ? window.zhugeTracker.identifyProperty(e, p.JSONEncode(n)) : window.webkit.messageHandlers.zhugeTracker.postMessage({
                                type: "identify",
                                name: e,
                                prop: n
                            }))
                        }
                    }
                },
                includes: function(t, e) {
                    return -1 !== t.indexOf(e)
                },
                encode: function(t) {
                    var e = {};
                    for (var n in t) e["_" + n] = t[n];
                    return e
                },
                truncate: function(t, e) {
                    var n;
                    return "string" == typeof t ? n = t.slice(0, e) : p.isArray(t) ? (n = [], p.each(t, function(t) {
                        n.push(p.truncate(t, e))
                    })) : p.isObject(t) ? (n = {}, p.each(t, function(t, i) {
                        n[i] = p.truncate(t, e)
                    })) : n = t, n
                },
                strip_empty_properties: function(t) {
                    var e = {};
                    return p.each(t, function(t, n) {
                        p.isString(t) && t.length > 0 && (e[n] = t)
                    }), e
                },
                trim: function(t) {
                    return (t || "").replace(/\s+/g, " ").replace(/^\s+/, "").replace(/\s+$/, "")
                },
                random: function(t, e) {
                    return Math.round(Math.random() * (e - t)) + t
                },
                jsonp: function(t, e, n) {
                    var r = "cb" + Math.random().toString().split(".")[1],
                        o = i.createElement("script");
                    o.src = t + "?callback=" + r, window[r] = function(t) {
                        e(t)
                    }, o.onerror = function() {
                        n()
                    }, i.head.appendChild(o)
                },
                JSONEncode: function() {
                    return function(t) {
                        var e = t,
                            n = function(t) {
                                var e = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                                    n = {
                                        "\b": "\\b",
                                        "\t": "\\t",
                                        "\n": "\\n",
                                        "\f": "\\f",
                                        "\r": "\\r",
                                        '"': '\\"',
                                        "\\": "\\\\"
                                    };
                                return e.lastIndex = 0, e.test(t) ? '"' + t.replace(e, function(t) {
                                    var e = n[t];
                                    return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
                                }) + '"' : '"' + t + '"'
                            },
                            i = function(t, e) {
                                var r = "",
                                    o = 0,
                                    a = "",
                                    c = "",
                                    u = 0,
                                    f = r,
                                    l = [],
                                    p = e[t];
                                switch (p && "object" == typeof p && "function" == typeof p.toJSON && (p = p.toJSON(t)), typeof p) {
                                    case "string":
                                        return n(p);
                                    case "number":
                                        return isFinite(p) ? String(p) : "null";
                                    case "boolean":
                                    case "null":
                                        return String(p);
                                    case "object":
                                        if (!p) return "null";
                                        if (r += "    ", l = [], "[object Array]" === s.apply(p)) {
                                            for (u = p.length, o = 0; o < u; o += 1) l[o] = i(o, p) || "null";
                                            return c = 0 === l.length ? "[]" : r ? "[\n" + r + l.join(",\n" + r) + "\n" + f + "]" : "[" + l.join(",") + "]", r = f, c
                                        }
                                        for (a in p) d.call(p, a) && (c = i(a, p)) && l.push(n(a) + (r ? ": " : ":") + c);
                                        return c = 0 === l.length ? "{}" : r ? "{" + l.join(",") + f + "}" : "{" + l.join(",") + "}", r = f, c
                                }
                            };
                        return i("", {
                            "": e
                        })
                    }
                }(),
                JSONDecode: function() {
                    var t, e, n, i, r = {
                            '"': '"',
                            "\\": "\\",
                            "/": "/",
                            b: "\b",
                            f: "\f",
                            n: "\n",
                            r: "\r",
                            t: "\t"
                        },
                        o = function(e) {
                            throw {
                                name: "SyntaxError",
                                message: e,
                                at: t,
                                text: n
                            }
                        },
                        a = function(i) {
                            return i && i !== e && o("Expected '" + i + "' instead of '" + e + "'"), e = n.charAt(t), t += 1, e
                        },
                        s = function() {
                            var t, n = "";
                            for ("-" === e && (n = "-", a("-")); e >= "0" && e <= "9";) n += e, a();
                            if ("." === e)
                                for (n += "."; a() && e >= "0" && e <= "9";) n += e;
                            if ("e" === e || "E" === e)
                                for (n += e, a(), "-" !== e && "+" !== e || (n += e, a()); e >= "0" && e <= "9";) n += e, a();
                            if (t = +n, isFinite(t)) return t;
                            o("Bad number")
                        },
                        c = function() {
                            var t, n, i, s = "";
                            if ('"' === e)
                                for (; a();) {
                                    if ('"' === e) return a(), s;
                                    if ("\\" === e)
                                        if (a(), "u" === e) {
                                            for (i = 0, n = 0; n < 4 && (t = parseInt(a(), 16), isFinite(t)); n += 1) i = 16 * i + t;
                                            s += String.fromCharCode(i)
                                        } else {
                                            if ("string" != typeof r[e]) break;
                                            s += r[e]
                                        } else s += e
                                }
                            o("Bad string")
                        },
                        u = function() {
                            for (; e && e <= " ";) a()
                        },
                        f = function() {
                            switch (e) {
                                case "t":
                                    return a("t"), a("r"), a("u"), a("e"), !0;
                                case "f":
                                    return a("f"), a("a"), a("l"), a("s"), a("e"), !1;
                                case "n":
                                    return a("n"), a("u"), a("l"), a("l"), null
                            }
                            o("Unexpected '" + e + "'")
                        },
                        d = function() {
                            var t = [];
                            if ("[" === e) {
                                if (a("["), u(), "]" === e) return a("]"), t;
                                for (; e;) {
                                    if (t.push(i()), u(), "]" === e) return a("]"), t;
                                    a(","), u()
                                }
                            }
                            o("Bad array")
                        },
                        l = function() {
                            var t, n = {};
                            if ("{" === e) {
                                if (a("{"), u(), "}" === e) return a("}"), n;
                                for (; e;) {
                                    if (t = c(), u(), a(":"), Object.hasOwnProperty.call(n, t) && o('Duplicate key "' + t + '"'), n[t] = i(), u(), "}" === e) return a("}"), n;
                                    a(","), u()
                                }
                            }
                            o("Bad object")
                        };
                    return i = function() {
                            switch (u(), e) {
                                case "{":
                                    return l();
                                case "[":
                                    return d();
                                case '"':
                                    return c();
                                case "-":
                                    return s();
                                default:
                                    return e >= "0" && e <= "9" ? s() : f()
                            }
                        },
                        function(r) {
                            var a;
                            return n = r, t = 0, e = " ", a = i(), u(), e && o("Syntax error"), a
                        }
                }(),
                HTTPBuildQuery: function(t, e) {
                    var n, i, r = [];
                    return void 0 === e && (e = "&"), p.each(t, function(t, e) {
                        n = encodeURIComponent(t.toString()), i = encodeURIComponent(e), r[r.length] = i + "=" + n
                    }), r.join(e)
                },
                getQueryParam: function(t, e) {
                    e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                    var n = "[\\?&#]" + e + "=([^&#]*)",
                        i = new RegExp(n),
                        r = i.exec(t);
                    if (null === r || r && "string" != typeof r[1] && r[1].length) return "";
                    var o = r[1];
                    try {
                        o = decodeURIComponent(decodeURIComponent(o)).replace(/\+/g, " ")
                    } catch (t) {}
                    return o
                },
                getDomain: function(t) {
                    var e = t.match(/\/\/\S*?\//);
                    return e && e.length ? e[0].replace(/\//g, "") : ""
                },
                register_event: function() {
                    function t(t, n, i) {
                        return function(r) {
                            if (r = r || e(window.event)) {
                                var o, a, s = !0;
                                return p.isFunction(i) && (o = i(r)), a = n.call(t, r), !1 !== o && !1 !== a || (s = !1), s
                            }
                        }
                    }

                    function e(t) {
                        return t && (t.preventDefault = e.preventDefault, t.stopPropagation = e.stopPropagation), t
                    }
                    var n = function(e, n, i, r) {
                        if (!e) return void(console && console.error("No valid element provided to register_event"));
                        if (e.addEventListener && !r) e.addEventListener(n, i, !1);
                        else {
                            var o = "on" + n,
                                a = e[o];
                            e[o] = t(e, i, a)
                        }
                    };
                    return e.preventDefault = function() {
                        this.returnValue = !1
                    }, e.stopPropagation = function() {
                        this.cancelBubble = !0
                    }, n
                }(),
                cookie: {
                    get: function(t) {
                        for (var e = t + "=", n = i.cookie.split(";"), r = 0; r < n.length; r++) {
                            for (var o = n[r];
                                " " == o.charAt(0);) o = o.substring(1, o.length);
                            if (0 == o.indexOf(e)) return decodeURIComponent(o.substring(e.length, o.length))
                        }
                        return null
                    },
                    parse: function(t) {
                        var e;
                        try {
                            e = p.JSONDecode(p.cookie.get(t)) || {}
                        } catch (t) {}
                        return e
                    },
                    set: function(t, e, n, r, o) {
                        var a = "",
                            s = "",
                            c = "";
                        if (r) {
                            var u = i.location.hostname.match(/[a-z0-9][a-z0-9\-]+\.[a-z\.]{2,6}$/i),
                                f = u ? u[0] : "";
                            a = f ? "; domain=." + f : ""
                        }
                        if (n) {
                            var d = new Date;
                            d.setTime(d.getTime() + 24 * n * 60 * 60 * 1e3), s = "; expires=" + d.toGMTString()
                        }
                        o && (c = "; secure"), i.cookie = t + "=" + encodeURIComponent(e) + s + "; path=/" + a + c
                    },
                    remove: function(t) {
                        var e = i.location.hostname.match(/[a-z0-9][a-z0-9\-]+\.[a-z\.]{2,6}$/i),
                            n = e ? e[0] : "";
                        p.cookie.set(t, "", -1, "." + n)
                    }
                },
                info: {
                    campaignParams: function(t) {
                        t || (t = "{}"), p.isString(t) && (t = p.JSONDecode(t));
                        var e = "utm_source utm_medium utm_campaign utm_content utm_term".split(" "),
                            n = "",
                            r = {};
                        return p.each(e, function(e) {
                            n = p.getQueryParam(i.URL, e), (n.length || t[e]) && (r["$" + e] = t[e] || n)
                        }), r
                    },
                    searchEngine: function(t) {
                        return 0 === t.search("https?://(.*)google.([^/?]*)") ? "google" : 0 === t.search("https?://(.*)baidu.com") ? "baidu" : 0 === t.search("https?://(.*)sogou.com") ? "sogou" : 0 === t.search("https?://(.*)haosou.com") ? "haosou" : null
                    },
                    searchKeyword: function(t) {
                        var e = p.info.searchEngine(t);
                        return "google" == e ? p.getQueryParam(t, "q") : "baidu" == e ? p.getQueryParam(t, "wd") : "sogou" == e ? p.getQueryParam(t, "query") : "haosou" == e ? p.getQueryParam(t, "q") : null
                    },
                    referringDomain: function(t) {
                        var e = t.split("/");
                        return e.length >= 3 ? e[2] : ""
                    },
                    browser: function(t, e, n) {
                        var e = e || "";
                        return n ? p.includes(t, "Mini") ? "Opera Mini" : "Opera" : /(BlackBerry|PlayBook|BB10)/i.test(t) ? "BlackBerry" : p.includes(t, "FBIOS") ? "Facebook Mobile" : p.includes(t, "Chrome") ? "Chrome" : p.includes(t, "CriOS") ? "Chrome iOS" : p.includes(e, "Apple") ? p.includes(t, "Mobile") ? "Mobile Safari" : "Safari" : p.includes(t, "Android") ? "Android Mobile" : p.includes(t, "Konqueror") ? "Konqueror" : p.includes(t, "Firefox") ? "Firefox" : p.includes(t, "MSIE") || p.includes(t, "Trident/") ? "Internet Explorer" : p.includes(t, "Gecko") ? "Mozilla" : ""
                    },
                    os: function() {
                        var t = r;
                        return /Windows/i.test(t) ? /Phone/.test(t) ? "Windows Mobile" : "Windows" : /(iPhone|iPad|iPod)/.test(t) ? "iOS" : /Android/.test(t) ? "Android" : /(BlackBerry|PlayBook|BB10)/i.test(t) ? "BlackBerry" : /Mac/i.test(t) ? "Mac OS X" : /Linux/.test(t) ? "Linux" : ""
                    },
                    device: function(t) {
                        return /iPad/.test(t) ? "iPad" : /iPod/.test(t) ? "iPod Touch" : /iPhone/.test(t) ? "iPhone" : /(BlackBerry|PlayBook|BB10)/i.test(t) ? "BlackBerry" : /Windows Phone/i.test(t) ? "Windows Phone" : /Android/.test(t) ? "Android" : ""
                    },
                    resolution: function() {
                        return screen.width + "*" + screen.height
                    }
                },
                UUID: function() {
                    var t = function() {
                            for (var t = 1 * new Date, e = 0; t == 1 * new Date;) e++;
                            return t.toString(16) + e.toString(16)
                        },
                        e = function() {
                            return Math.random().toString(16).replace(".", "")
                        },
                        n = function(t) {
                            function e(t, e) {
                                var n, i = 0;
                                for (n = 0; n < e.length; n++) i |= a[n] << 8 * n;
                                return t ^ i
                            }
                            var n, i, o = r,
                                a = [],
                                s = 0;
                            for (n = 0; n < o.length; n++) i = o.charCodeAt(n), a.unshift(255 & i), a.length >= 4 && (s = e(s, a), a = []);
                            return a.length > 0 && (s = e(s, a)), s.toString(16)
                        };
                    return function() {
                        var i = (screen.height * screen.width).toString(16);
                        return t() + "-" + e() + "-" + n() + "-" + i + "-" + t()
                    }
                }()
            };
        t.exports = p
    },
    13: function(t, e, n) {
        var i = t.exports.json = !1;
        t.exports.url = {
            checkLogin: i ? "http://iofx.glodon.com//json/checkLogin.json" : "http://iofx.glodon.com/user/checkAuthorization.jsp",
            eventList: i ? "http://iofx.glodon.com//json/eventList.json" : "http://iofx.glodon.com/data/datalist.jsp",
            loadEnvData: i ? "http://iofx.glodon.com//json/envData.json" : "http://iofx.glodon.com/appusergroup/getEventEnvData.jsp",
            loadUserPropData: i ? "http://iofx.glodon.com//json/userProps.json" : "http://iofx.glodon.com/appusergroup/getUserPropMeta.jsp"
        }, t.exports.analysis = {
            sessionStorageKey: "zhugeAnalysisQueryParam"
        }
    },
    31: function(t, e, n) {
        var i = n(0),
            r = n(62),
            o = n(68),
            a = n(5),
            s = n(69),
            c = [],
            u = ["identify", "track", "page"],
            f = function(t) {
                this.config = {}, i.extend(this.config, t), this.idle = 0, this.last_activity = new Date
            };
        f.prototype._init = function(t, e, n) {
            if (this._key = t, this._jsc = function() {}, i.isObject(e)) {
                i.extend(this.config, e);
                for (var r in this.config) i.isObject(this.config[r]) && (this.config[r] = i.JSONEncode(this.config[r]))
            }
            var o = this,
                a = function(t, e) {
                    o._initDid(t), o.cookie = new s("zg_" + o._key, o.config);
                    var n = i.cookie.get("_zg");
                    n && o.config.inherit_user_data ? (o.cookie.register_once(i.JSONDecode(n), ""), i.cookie.remove("_zg")) : o.cookie.register_once({
                        sid: 0,
                        updated: 0,
                        info: 0,
                        superProperty: o.config.superProperty,
                        platform: o.config.platform
                    }, ""), o.cookie.register({
                        superProperty: o.config.superProperty,
                        platform: o.config.platform
                    }), o._session(e), o._info(), o._startPing(), o._initAutoTrack()
                };
            this.config.adTrack ? (o._wrapTrackerFunction(), i.jsonp("https://u.zhugeapi.com/v2/adtrack/header", function(t) {
                a(t.zg_adver_did, t.zg_adver_sid), n(), o._doTrackerQueue()
            }, function() {
                a(), n(), o._doTrackerQueue()
            })) : (a(), n())
        }, f.prototype._wrapTrackerFunction = function() {
            var t = this,
                e = {},
                n = "",
                r = 0;
            for (r = 0; r < u.length; r++) n = u[r], e[n] = f.prototype[n], f.prototype[n] = function(n) {
                return function() {
                    t.cookie ? i.isFunction(e[n]) && e[n].apply(t, arguments) : c.push([e[n], arguments])
                }
            }(n)
        }, f.prototype._doTrackerQueue = function() {
            var t = this,
                e = 0,
                n = null;
            for (e = 0; e < c.length; e++) n = c[e] || [], i.isFunction(n[0]) && n[0].apply(t, n[1] || []);
            c = []
        }, f.prototype._initAutoTrack = function() {
            var t = !0,
                e = new o(this, {
                    open: this.config.visualizer,
                    stopTrack: function() {
                        t = !1
                    }
                }),
                n = new r(this, {
                    open: this.config.autoTrack,
                    isClickAble: this.config.isClickAble,
                    singlePage: this.config.singlePage
                }),
                s = this,
                c = function(r) {
                    if (t) {
                        var o = a.isClickAble(r.target, s.config.isClickAble);
                        if (o.flag) {
                            var c = [];
                            if (s.config.autoTrack && !i.hasMobileSdk().flag && c.push(n.getEvent(o)), s.config.visualizer && (c = e.getEvent(o).concat(c)), o.form) {
                                var u = a.getAttr(o.form, "target");
                                if ((!u || "_self" === u) && s.config.redirectAfterTrack) return s.batchTrack(c, function() {
                                    o.form.submit()
                                }), !1
                            }
                            if (o.isValidLink) {
                                var f = a.getAttr(o.target, "href"),
                                    u = a.getAttr(o.target, "target");
                                if ((!u || "_self" === u) && s.config.redirectAfterTrack) return s.batchTrack(c, function() {
                                    location.href = f
                                }), !1
                            }
                            c.length && s.batchTrack(c)
                        }
                    }
                };
            a.ready(function() {
                a.bind(a.body, "click", c)
            }, this)
        }, f.prototype._session = function(t) {
            var e = this.cookie.props.updated,
                n = this.cookie.props.sid,
                r = 1 * new Date,
                o = new Date;
            if (0 == n || r > e + 60 * this.config.session_interval_mins * 1e3) {
                if (n > 0 && e > 0) {
                    var a = {
                        dt: "se",
                        pr: {}
                    };
                    a.pr.$ct = o.getTime(), a.pr.$tz = 6e4 * -o.getTimezoneOffset(), a.pr.$dru = e - n, a.pr.$sid = n, a.pr.$cuid = this.cookie.props.cuid, this._batchTrack(a)
                }
                n = t || r, n *= 1;
                var s = {
                        dt: "ss",
                        pr: {}
                    },
                    c = i.info.campaignParams(this.config.utm);
                s.pr = i.extend(s.pr, c), this.cookie.register({
                    utm: i.JSONEncode(c)
                }, ""), s.pr.$ct = o.getTime(), s.pr.$sid = n, s.pr.$cuid = this.cookie.props.cuid, s.pr.$cn = this.config.app_channel, s.pr.$vn = this.config.app_version, s.pr.$tz = 6e4 * -o.getTimezoneOffset(), s.pr.$url = location.href, s.pr.$ref = document.referrer;
                var u = i.getDomain(document.referrer);
                s.pr.$referrer_domain = u, this.cookie.register({
                    referrerDomain: u
                }, ""), this._batchTrack(s), this.cookie.register({
                    sid: n
                }, "")
            }
            this.cookie.register({
                updated: r
            }, "")
        }, f.prototype._info = function() {
            var t = this.cookie.props.info,
                e = 1 * new Date;
            if (e > t + 24 * this.config.info_upload_interval_days * 60 * 60 * 1e3) {
                var n = {
                        dt: "pl",
                        pr: {
                            $rs: i.info.resolution()
                        }
                    },
                    r = new Date;
                n.pr.$tz = 6e4 * -r.getTimezoneOffset(), n.pr.$ct = r.getTime(), n.pr.$cuid = this.cookie.props.cuid, n.pr = i.extend(n.pr, i.encode(i.JSONDecode(this.cookie.props.platform))), this._batchTrack(n), this.cookie.register({
                    info: e
                }, "")
            }
        }, f.prototype.debug = function(t) {
            this.config.debug = t
        }, f.prototype.identify = function(t, e, n) {
            t += "";
            var r = i.isObject(e) ? e : {},
                o = i.isObject(e) ? n : e;
            this.cookie.register({
                cuid: t
            }, ""), this._session();
            var a = i.hasMobileSdk();
            if (a.flag) a.identify(t, r), i.isFunction(o) && o();
            else {
                var s = {
                        dt: "usr",
                        pr: {}
                    },
                    c = new Date;
                s.pr.$ct = c.getTime(), s.pr.$tz = 6e4 * -c.getTimezoneOffset(), s.pr.$cuid = t, s.pr.$sid = this.cookie.props.sid, s.pr.$url = location.href, s.pr.$ref = document.referrer, s.pr = i.extend(s.pr, i.encode(r)), this._batchTrack(s, o)
            }
        }, f.prototype.setUserProperties = function(t, e) {
            this.identify(this.cookie.props.cuid, t, e)
        }, f.prototype.page = function(t, e) {
            this._session();
            var n = document.location.href,
                i = {};
            i.et = "pg", i.pid = n, i.pn = void 0 === t ? n : t, i.tl = document.title, i.ref = document.referrer, i.sid = this.cookie.props.sid, this._batchTrack(i, e)
        }, f.prototype.track = function(t, e, n) {
            var r = i.isObject(e) ? e : {},
                o = i.isObject(e) ? n : e,
                a = i.hasMobileSdk();
            a.flag ? (a.track(t, r), i.isFunction(o) && o()) : this.batchTrack([{
                dt: "evt",
                eid: t,
                param: r
            }], o)
        }, f.prototype.batchTrack = function(t, e) {
            this._session();
            for (var n = [], r = new Date, o = this.cookie.props.utm ? i.JSONDecode(this.cookie.props.utm) : {}, a = 0, s = t.length; a < s; a++) {
                var c = t[a],
                    u = {
                        dt: c.dt,
                        pr: {}
                    };
                u.pr.$ct = r.getTime(), u.pr.$tz = 6e4 * -r.getTimezoneOffset(), u.pr.$cuid = this.cookie.props.cuid, u.pr.$sid = this.cookie.props.sid, u.pr.$url = document.URL, u.pr.$ref = document.referrer, u.pr.$referrer_domain = this.cookie.props.referrerDomain, u.pr.$eid = c.eid;
                for (var f in o) u.pr[f] = o[f];
                "evt" === c.dt ? u.pr = i.extend(u.pr, i.encode(c.param)) : u.pr = i.extend(u.pr, c.param), u.pr = i.extend(u.pr, i.encode(i.JSONDecode(this.cookie.props.superProperty))), n.push(u)
            }
            this._batchTrack(n, e)
        }, f.prototype._moved = function(t) {
            this.last_activity = new Date, this.idle = 0
        }, f.prototype._startPing = function() {
            var t = this;
            i.register_event(window, "mousemove", function() {
                t._moved.apply(t, arguments)
            }), void 0 === this.pingInterval && (this.pingInterval = window.setInterval(function() {
                t._ping()
            }, this.config.ping_interval))
        }, f.prototype._stopPing = function() {
            void 0 !== this.pingInterval && (window.clearInterval(this.pingInterval), delete this.pingInterval)
        }, f.prototype._ping = function() {
            if (this.config.ping && this.idle < this.config.idle_timeout) {
                var t = {};
                t.type = "ping", t.sdk = "web", t.sdkv = "2.0", t.ak = this._key, t.did = this.did.props.did, t.cuid = this.cookie.props.cuid, this._sendTrackRequest(t)
            } else this._stopPing();
            var e = new Date;
            return e - this.last_activity > this.config.idle_threshold && (this.idle = e - this.last_activity), this
        }, f.prototype.getDid = function() {
            return this.did.props.did
        }, f.prototype.getSid = function() {
            return this.cookie.props.sid
        }, f.prototype.setSuperProperty = function(t) {
            i.isObject(t) && this.cookie.register({
                superProperty: i.JSONEncode(t)
            })
        }, f.prototype.setPlatform = function(t) {
            i.isObject(t) && (this.cookie.register({
                platform: i.JSONEncode(t),
                info: 0
            }), this._info())
        }, f.prototype._batchTrack = function(t, e) {
            if (!i.hasMobileSdk().flag) {
                var n = {},
                    r = new Date;
                n.sln = "itn", n.pl = "js", n.sdk = "zg-js", n.sdkv = "2.0", n.owner = "zg", n.ut = [r.getFullYear(), r.getMonth() + 1, r.getDate()].join("-") + " " + r.toTimeString().match(/\d{2}:\d{2}:\d{2}/)[0], n.tz = 6e4 * -r.getTimezoneOffset(), n.debug = this.config.debug ? 1 : 0, n.ak = this._key, n.usr = {
                    did: this.did.props.did
                };
                var o = [];
                i.isArray(t) ? o = t : o.push(t), n.data = o, this._sendTrackRequest(n, this._prepareCallback(e, n))
            }
        }, f.prototype._prepareCallback = function(t, e) {
            return i.isFunction(t) ? function(n) {
                t(n, e)
            } : null
        }, f.prototype._initDid = function(t) {
            var e = i.cookie.get("_zg"),
                t = t || i.UUID();
            e && i.JSONDecode(e).uuid && (t = i.JSONDecode(e).uuid), i.cookie.get("zg_did") || i.cookie.remove("zg_" + this._key), this.did = new s("zg_did", this.config), this.did.register_once({
                did: t
            }, "")
        }, f.prototype._sendTrackRequest = function(t, e) {
            var n = i.truncate(t, 255),
                r = i.JSONEncode(n),
                o = {
                    event: r,
                    _: (new Date).getTime().toString()
                },
                a = {
                    bac: this.config.api_host_bac + "&" + i.HTTPBuildQuery(o),
                    normal: this.config.api_host + "&" + i.HTTPBuildQuery(o)
                };
            this._sendRequest(a, e)
        }, f.prototype._sendRequest = function(t, e) {
            var n = new Image,
                i = !1,
                r = setTimeout(function() {
                    !i && e && (e(), i = !0)
                }, 500),
                o = function() {
                    !i && e && (clearTimeout(r), e())
                };
            n.onload = o, n.onerror = function() {
                var e = new Image;
                e.onload = o, e.onerror = o, e.src = t.bac
            }, n.src = t.normal
        }, f.prototype.push = function(t) {
            var e = t.shift();
            this[e] && this[e].apply(this, t)
        }, f.prototype.getKey = function() {
            return this._key
        }, t.exports = f
    },
    5: function(t, e, n) {
        var i = n(0),
            r = {
                prefix: {
                    expand: "zhuge-auto-track-",
                    interface: "zhuge-interface-"
                },
                body: document.getElementsByTagName("body")[0],
                ready: function(t, e) {
                    if (this.body) t.call(e);
                    else var n = this,
                        i = setInterval(function() {
                            window.document.body && (n.body = window.document.body, clearInterval(i), t.call(e))
                        }, 50)
                },
                addClass: function(t, e) {
                    var n = this.getAttr(t, "class") || "";
                    new RegExp(e).test(n) || (n += " " + e, r.setAttr(t, "class", i.trim(n)))
                },
                removeClass: function(t, e) {
                    var n = this.getAttr(t, "class") || "";
                    r.setAttr(t, "class", i.trim(n.replace(e, "")))
                },
                bind: function(t, e, n, r) {
                    r = r || t;
                    var o = function(e) {
                        if (e.target = e.target || e.srcElement, i.isFunction(n)) {
                            if (!1 === n.call(r, e || window.event, t)) return e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.returnValue && (e.returnValue = !1), e.cancelBubble && (e.cancelBubble = !0), !1
                        }
                    };
                    if (t.addEventListener) t.addEventListener(e, o, !1);
                    else if (t.attachEvent) t.attachEvent("on" + e, o);
                    else {
                        var a = "on" + e,
                            s = t[a];
                        t[a] = function(e) {
                            return i.isFunction(s) && s.call(t, e || window.event), n.call(r, e || window.event, t)
                        }
                    }
                    return {
                        unbind: function() {
                            t.removeEventListener ? t.removeEventListener(e, o) : t.detachEvent && t.detachEvent("on" + e, o)
                        }
                    }
                },
                data: function(t, e) {
                    var n = t.dataset || {};
                    if (i.isString(e)) return n[e];
                    for (var r in e) n[r] = e[r]
                },
                getTagName: function(t) {
                    return t.tagName ? t.tagName.toLowerCase() : ""
                },
                getAttr: function(t, e) {
                    return t.getAttribute(e)
                },
                setAttr: function(t, e, n) {
                    if (i.isObject(e))
                        for (var r in e) t.setAttribute(r, e[r]);
                    else t.setAttribute(e, n)
                },
                isValidLink: function(t) {
                    return "a" === this.getTagName(t) && this.getAttr(t, "href") && !/^javascript:/.test(this.getAttr(t, "href"))
                },
                is: function(t, e) {
                    for (var n = !1, i = this.query(e), r = t; r && !n && "body" !== this.getTagName(r);) {
                        for (var o = 0, a = i.length; o < a; o++) {
                            if (i[o] === r) {
                                n = !0;
                                break
                            }
                        }
                        n || (r = this.getParent(r))
                    }
                    return {
                        flag: n,
                        target: r
                    }
                },
                isClickAble: function(t, e, n) {
                    if (!t || this.isTextNode(t)) return {
                        flag: !1
                    };
                    var r = this.getTagName(t),
                        o = this.getAttr(t, "type"),
                        a = this.isValidLink(t),
                        s = {
                            flag: !1,
                            target: t,
                            isValidLink: a,
                            form: null
                        };
                    switch (r) {
                        case "a":
                            if (a) {
                                s.flag = !0;
                                break
                            }
                        case "button":
                            t.disabled || (s.flag = !0);
                            break;
                        case "input":
                            /button|reset|submit/.test(o) && !t.disabled && (s.flag = !0, "submit" === o && (s.form = t.form));
                            break;
                        case "body":
                            s.flag = !1;
                            break;
                        default:
                            if (this.hasBindClick(t) || i.isFunction(e) && e(t)) s.flag = !0;
                            else if (!n) return this.isClickAble(this.getParent(t))
                    }
                    return s
                },
                hasBindClick: function(t) {
                    return !!(t.onclick || window.jQuery && (window.jQuery._data || window.jQuery.data) && i.isFunction(window.jQuery._data || window.jQuery.data) && (window.jQuery._data || window.jQuery.data)(t, "events"))
                },
                getParent: function(t) {
                    return t.parentNode
                },
                getIndexInParent: function(t) {
                    for (var e = this.getParent(t), n = 0, i = this.getSelector(t), r = e.children, o = 0, a = r.length; o < a; o++) {
                        var s = r[o];
                        if (s === t) return n;
                        (this.getSelector(s) === i || new RegExp("^" + i).test(this.getSelector(s))) && n++
                    }
                    return n
                },
                getSelector: function(t) {
                    for (var e = this.getAttr(t, "id"), n = this.getTagName(t), r = i.trim(this.getAttr(t, "class")).split(/\s/), o = [], a = 0, s = r.length; a < s; a++) new RegExp(this.prefix.interface + "|" + this.prefix.expand).test(r[a]) || o.push(r[a]);
                    return o = o.join("."), e ? "#" + e : (o = o ? "." + o : "", n + o)
                },
                getUniqueSelector: function(t, e) {
                    var n = this.getSelector(t);
                    return /#/.test(n) || "body" === this.getTagName(t) ? (e && (n = n + ">" + e), n) : (n += ":eq(" + this.getIndexInParent(t) + ")", e && (n = n + ">" + e), this.getUniqueSelector(this.getParent(t), n))
                },
                getTextContent: function(t) {
                    return t.textContent || t.innerText || this.getAttr(t, "type") || t.value || ""
                },
                query: function() {
                    var t = "",
                        e = window.document,
                        n = /:eq\(\d+\)/g;
                    if (i.isString(arguments[0]) ? t = arguments[0] : (e = arguments[0] || e, t = arguments[1]), this.isTextNode(e)) return [];
                    if (n.test(t)) {
                        for (var r = t.split(n), o = t.match(n), a = null, s = 0, c = r.length; s < c; s++) {
                            var u = r[s].replace(/^>/, ":scope>");
                            if (!u) break;
                            if (a = this.query(a || e, u), !(o.length > s)) return a;
                            var f = o[s].match(/\d+/)[0];
                            if (!(a && f < a.length)) return [];
                            a = a[f]
                        }
                        return [a]
                    }
                    return i.isString(t) && t.match(/^[#.]\d/) && (t = t.slice(0, 1) + "\\00003" + t.slice(1)), e.querySelectorAll(t)
                },
                isTextNode: function(t) {
                    return "#text" === t.nodeName
                },
                loadJs: function(t) {
                    t = i.extend({
                        async: !0,
                        src: "",
                        onLoad: null,
                        onError: null,
                        context: null
                    }, t || {});
                    var e = document.createElement("script");
                    this.setAttr(e, {
                        async: t.async,
                        src: t.src
                    }), this.bind(e, "load", t.onLoad, t.context), this.bind(e, "error", t.onError, t.context), this.body.appendChild(e)
                }
            };
        t.exports = r
    },
    6: function(t, e, n) {
        function i() {
            return window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP")
        }

        function r(t, e) {
            var n = t.responseText;
            switch (e) {
                case "json":
                    n = c.JSONDecode(n);
                    break;
                default:
                    console && console.error(arguments, this)
            }
            return n
        }

        function o(t) {
            var e = [];
            for (var n in t) {
                var i = t[n];
                e.push(encodeURIComponent(n) + "=" + encodeURIComponent(c.isString(i) ? i : c.JSONEncode(i)))
            }
            return e.join("&")
        }

        function a(t, e) {
            var n = i(),
                a = function(t) {
                    c.isFunction(e[t]) && e[t].call(e.context, r(n, e.dataType))
                };
            switch (n.onreadystatechange = function() {
                if (n.readyState === u.DONE)
                    if (n.status >= 200 && n.status <= 299) try {
                        a("success")
                    } catch (t) {
                        a("error")
                    } else a("error")
            }, n.onerror = function() {
                a("error"), console && console.error(arguments, this)
            }, n.withCredentials = !0, e.type.toLowerCase()) {
                case "get":
                    t += "?" + o(e.data), n.open(e.type, t, e.sync), n.send();
                    break;
                case "post":
                    var s = o(e.data);
                    n.open(e.type, t, e.sync), n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), n.send(s);
                    break;
                default:
                    console && console.error(arguments, this)
            }
        }

        function s(t, e) {
            var n = function(t, n) {
                    c.isFunction(e[t]) && e[t].call(e.context, n)
                },
                i = document.createElement("script"),
                r = "callback" + Math.random().toString().split(".")[1],
                a = t + "?";
            e.data.callback = r, window[r] = function(t) {
                n("success", t)
            }, i.src = a + o(e.data), i.onerror = function() {
                n("error")
            }, document.body.appendChild(i)
        }
        var c = n(0),
            u = {
                UNSENT: 0,
                OPENED: 1,
                HEADERS_RECEIVED: 2,
                LOADING: 3,
                DONE: 4
            };
        t.exports = function(t, e) {
            var n = c.extend({
                type: "post",
                data: {},
                dataType: "json",
                success: null,
                error: null,
                sync: !0,
                context: this,
                jsonp: !1
            }, e);
            n.jsonp ? s(t, n) : a(t, n)
        }
    },
    62: function(t, e, n) {
        function i(t, e) {
            this.tracker = t, this.config = r.extend({
                open: !1,
                isClickAble: null,
                singlePage: !1
            }, e), this.config.open && this._init()
        }
        var r = n(0),
            o = n(5),
            a = n(7),
            s = n(13),
            c = n(6);
        i.prototype = {
            constructor: i,
            _init: function() {
                this.config.singlePage && this._initHistoryHook(), this._onView(), o.ready(function() {
                    this._initEventBind(), this._checkPermissions()
                }, this)
            },
            _initHistoryHook: function() {
                var t = window.history,
                    e = t.pushState,
                    n = this;
                t.pushState = function(i) {
                    var r = e.apply(t, arguments);
                    return n._onView(), r
                }
            },
            _initEventBind: function() {
                o.bind(window, "message", this._onMessage, this), this.config.singlePage && (o.bind(window, "popstate", this._onView, this), o.bind(window, "hashchange", this._onView, this))
            },
            _checkPermissions: function() {
                window.sessionStorage.getItem("isZhugeAutoTrackAnalysisMode") && c(s.url.checkLogin, {
                    type: s.json ? "get" : "post",
                    context: this,
                    success: function(t) {
                        t.authorized && this._loadAnalysisCode()
                    },
                    error: function(t) {
                        console && console.error("鍔犺浇鍒嗘瀽鑴氭湰澶辫触", t)
                    }
                })
            },
            _loadAnalysisCode: function() {
                window.sessionStorage.setItem("isZhugeAutoTrackAnalysisMode", JSON.stringify({
                    flag: !0
                }));
                var t = "http://iofx.glodon.com/webapp/lib/sdk/analysis.min.js".replace(/\"/g, "");
                o.loadJs({
                    src: t + "?a=" + Math.random()
                })
            },
            _onMessage: function() {
                if ("http://iofx.glodon.com" === event.origin) {
                    var t = event.data;
                    switch (t.command) {
                        case "authorized":
                            var e = window.opener || window.parent;
                            if (e === window) return;
                            e.postMessage({
                                command: "hasOpenAutoTrackAnalysis"
                            }, "http://iofx.glodon.com"), this._loadAnalysisCode();
                            break;
                        default:
                            console && console.warn("鏈瘑鍒殑message淇℃伅", t)
                    }
                }
            },
            _onView: function() {
                this.tracker.batchTrack([{
                    dt: "abp",
                    eid: "pv",
                    param: {
                        $page_title: document.title
                    }
                }])
            },
            getEvent: function(t) {
                var e = o.getUniqueSelector(t.target),
                    n = t.target;
                return {
                    dt: "abp",
                    eid: "click",
                    param: {
                        $page_title: window.document.title,
                        $element_id: o.getAttr(n, "id"),
                        $element_content: o.getTextContent(n),
                        $element_type: o.getTagName(n),
                        $element_style: o.getAttr(n, "class"),
                        $element_selector: a(e),
                        $element_link: t.isValidLink ? o.getAttr(n, "href") : null
                    }
                }
            }
        }, t.exports = i
    },
    68: function(t, e, n) {
        function i(t, e) {
            this.config = r.extend({
                open: !1,
                stopTrack: null
            }, e || {}), this.tracker = t, this.eventList = [], this.loaded = !1, this.config.open && this._init()
        }
        var r = n(0),
            o = n(5),
            a = n(6),
            s = n(8);
        i.prototype = {
            constructor: i,
            _init: function() {
                o.ready(function() {
                    this._initEventBind(), this._loadEventList(), window.sessionStorage.getItem(s.SESSION_KEYS.IS_ANALYSIS_MODE) && this._loadAnalysisCode()
                }, this)
            },
            _initEventBind: function() {
                o.bind(window, "message", this._onMessage, this)
            },
            _loadEventList: function() {
                a("http://iofx.glodon.com/apiv2/visual", {
                    type: "get",
                    data: {
                        url: location.href,
                        app_key: this.tracker.getKey(),
                        platform: 3
                    },
                    context: this,
                    jsonp: !0,
                    success: function(t) {
                        10001 === t.code && (this.eventList = t.visual_events)
                    }
                })
            },
            _onMessage: function(t) {
                var e = t.origin,
                    n = t.data;
                if ("http://iofx.glodon.com" === e) switch (n.command) {
                    case "openJsVisualizer":
                        window.opener.postMessage({
                            command: "getQueryParam"
                        }, e);
                        break;
                    case "getQueryParam":
                        window.sessionStorage.setItem(s.SESSION_KEYS.PARAMS, JSON.stringify(n.data)), this._loadAnalysisCode()
                }
            },
            _loadAnalysisCode: function() {
                if (!this.loaded) {
                    this.loaded = !0, this.config.stopTrack(), window.sessionStorage.setItem(s.SESSION_KEYS.IS_ANALYSIS_MODE, JSON.stringify({
                        flag: !0
                    }));
                    var t = "http://iofx.glodon.com/webapp/lib/sdk/visualizer.min.js".replace(/\"/g, "");
                    o.loadJs({
                        src: t + "?a=" + Math.random()
                    })
                }
            },
            getEvent: function(t) {
                for (var e = [], n = 0, i = this.eventList.length; n < i; n++)
                    for (var r = this.eventList[n], a = 0; a < r.element.length; a++)
                        if (o.is(t.target, r.element[a]).flag) {
                            for (var s = {
                                element_content: o.getTextContent(t.target),
                                element_link: t.isValidLink ? o.getAttr(t.target, "href") : null
                            }, c = 0; c < r.attr.length; c++) {
                                var u = r.attr[c];
                                s[u.name] = o.getTextContent(o.query(u.selector)[0])
                            }
                            var f = {
                                dt: "evt",
                                eid: r.event_name,
                                param: s
                            };
                            e.push(f)
                        }
                return e
            }
        }, t.exports = i
    },
    69: function(t, e, n) {
        var i = n(0),
            r = function(t, e) {
                this.name = t, this.props = {}, this.config = i.extend({}, e), this.load()
            };
        r.prototype.load = function() {
            var t = i.cookie.parse(this.name);
            t && (this.props = i.extend({}, t))
        }, r.prototype.save = function() {
            i.cookie.set(this.name, i.JSONEncode(this.props), this.config.cookie_expire_days, this.config.cookie_cross_subdomain, this.config.cookie_secure)
        }, r.prototype.register_once = function(t, e) {
            return !!i.isObject(t) && (void 0 === e && (e = "None"), i.each(t, function(t, n) {
                this.props[n] && this.props[n] !== e || (this.props[n] = t)
            }, this), this.save(), !0)
        }, r.prototype.register = function(t) {
            return !!i.isObject(t) && (i.extend(this.props, t), this.save(), !0)
        }, t.exports = r
    },
    7: function(t, e) {
        function n(t, e) {
            var n = (65535 & t) + (65535 & e);
            return (t >> 16) + (e >> 16) + (n >> 16) << 16 | 65535 & n
        }

        function i(t, e) {
            return t << e | t >>> 32 - e
        }

        function r(t, e, r, o, a, s) {
            return n(i(n(n(e, t), n(o, s)), a), r)
        }

        function o(t, e, n, i, o, a, s) {
            return r(e & n | ~e & i, t, e, o, a, s)
        }

        function a(t, e, n, i, o, a, s) {
            return r(e & i | n & ~i, t, e, o, a, s)
        }

        function s(t, e, n, i, o, a, s) {
            return r(e ^ n ^ i, t, e, o, a, s)
        }

        function c(t, e, n, i, o, a, s) {
            return r(n ^ (e | ~i), t, e, o, a, s)
        }

        function u(t, e) {
            t[e >> 5] |= 128 << e % 32, t[14 + (e + 64 >>> 9 << 4)] = e;
            var i, r, u, f, d, l = 1732584193,
                p = -271733879,
                h = -1732584194,
                g = 271733878;
            for (i = 0; i < t.length; i += 16) r = l, u = p, f = h, d = g, l = o(l, p, h, g, t[i], 7, -680876936), g = o(g, l, p, h, t[i + 1], 12, -389564586), h = o(h, g, l, p, t[i + 2], 17, 606105819), p = o(p, h, g, l, t[i + 3], 22, -1044525330), l = o(l, p, h, g, t[i + 4], 7, -176418897), g = o(g, l, p, h, t[i + 5], 12, 1200080426), h = o(h, g, l, p, t[i + 6], 17, -1473231341), p = o(p, h, g, l, t[i + 7], 22, -45705983), l = o(l, p, h, g, t[i + 8], 7, 1770035416), g = o(g, l, p, h, t[i + 9], 12, -1958414417), h = o(h, g, l, p, t[i + 10], 17, -42063), p = o(p, h, g, l, t[i + 11], 22, -1990404162), l = o(l, p, h, g, t[i + 12], 7, 1804603682), g = o(g, l, p, h, t[i + 13], 12, -40341101), h = o(h, g, l, p, t[i + 14], 17, -1502002290), p = o(p, h, g, l, t[i + 15], 22, 1236535329), l = a(l, p, h, g, t[i + 1], 5, -165796510), g = a(g, l, p, h, t[i + 6], 9, -1069501632), h = a(h, g, l, p, t[i + 11], 14, 643717713), p = a(p, h, g, l, t[i], 20, -373897302), l = a(l, p, h, g, t[i + 5], 5, -701558691), g = a(g, l, p, h, t[i + 10], 9, 38016083), h = a(h, g, l, p, t[i + 15], 14, -660478335), p = a(p, h, g, l, t[i + 4], 20, -405537848), l = a(l, p, h, g, t[i + 9], 5, 568446438), g = a(g, l, p, h, t[i + 14], 9, -1019803690), h = a(h, g, l, p, t[i + 3], 14, -187363961), p = a(p, h, g, l, t[i + 8], 20, 1163531501), l = a(l, p, h, g, t[i + 13], 5, -1444681467), g = a(g, l, p, h, t[i + 2], 9, -51403784), h = a(h, g, l, p, t[i + 7], 14, 1735328473), p = a(p, h, g, l, t[i + 12], 20, -1926607734), l = s(l, p, h, g, t[i + 5], 4, -378558), g = s(g, l, p, h, t[i + 8], 11, -2022574463), h = s(h, g, l, p, t[i + 11], 16, 1839030562), p = s(p, h, g, l, t[i + 14], 23, -35309556), l = s(l, p, h, g, t[i + 1], 4, -1530992060), g = s(g, l, p, h, t[i + 4], 11, 1272893353), h = s(h, g, l, p, t[i + 7], 16, -155497632), p = s(p, h, g, l, t[i + 10], 23, -1094730640), l = s(l, p, h, g, t[i + 13], 4, 681279174), g = s(g, l, p, h, t[i], 11, -358537222), h = s(h, g, l, p, t[i + 3], 16, -722521979), p = s(p, h, g, l, t[i + 6], 23, 76029189), l = s(l, p, h, g, t[i + 9], 4, -640364487), g = s(g, l, p, h, t[i + 12], 11, -421815835), h = s(h, g, l, p, t[i + 15], 16, 530742520), p = s(p, h, g, l, t[i + 2], 23, -995338651), l = c(l, p, h, g, t[i], 6, -198630844), g = c(g, l, p, h, t[i + 7], 10, 1126891415), h = c(h, g, l, p, t[i + 14], 15, -1416354905), p = c(p, h, g, l, t[i + 5], 21, -57434055), l = c(l, p, h, g, t[i + 12], 6, 1700485571), g = c(g, l, p, h, t[i + 3], 10, -1894986606), h = c(h, g, l, p, t[i + 10], 15, -1051523), p = c(p, h, g, l, t[i + 1], 21, -2054922799), l = c(l, p, h, g, t[i + 8], 6, 1873313359), g = c(g, l, p, h, t[i + 15], 10, -30611744), h = c(h, g, l, p, t[i + 6], 15, -1560198380), p = c(p, h, g, l, t[i + 13], 21, 1309151649), l = c(l, p, h, g, t[i + 4], 6, -145523070), g = c(g, l, p, h, t[i + 11], 10, -1120210379), h = c(h, g, l, p, t[i + 2], 15, 718787259), p = c(p, h, g, l, t[i + 9], 21, -343485551), l = n(l, r), p = n(p, u), h = n(h, f), g = n(g, d);
            return [l, p, h, g]
        }

        function f(t) {
            var e, n = "",
                i = 32 * t.length;
            for (e = 0; e < i; e += 8) n += String.fromCharCode(t[e >> 5] >>> e % 32 & 255);
            return n
        }

        function d(t) {
            var e, n = [];
            for (n[(t.length >> 2) - 1] = void 0, e = 0; e < n.length; e += 1) n[e] = 0;
            var i = 8 * t.length;
            for (e = 0; e < i; e += 8) n[e >> 5] |= (255 & t.charCodeAt(e / 8)) << e % 32;
            return n
        }

        function l(t) {
            return f(u(d(t), 8 * t.length))
        }

        function p(t, e) {
            var n, i, r = d(t),
                o = [],
                a = [];
            for (o[15] = a[15] = void 0, r.length > 16 && (r = u(r, 8 * t.length)), n = 0; n < 16; n += 1) o[n] = 909522486 ^ r[n], a[n] = 1549556828 ^ r[n];
            return i = u(o.concat(d(e)), 512 + 8 * e.length), f(u(a.concat(i), 640))
        }

        function h(t) {
            var e, n, i = "0123456789abcdef",
                r = "";
            for (n = 0; n < t.length; n += 1) e = t.charCodeAt(n), r += i.charAt(e >>> 4 & 15) + i.charAt(15 & e);
            return r
        }

        function g(t) {
            return unescape(encodeURIComponent(t))
        }

        function v(t) {
            return l(g(t))
        }

        function m(t) {
            return h(v(t))
        }

        function y(t, e) {
            return p(g(t), g(e))
        }

        function _(t, e) {
            return h(y(t, e))
        }

        function k(t, e, n) {
            return e ? n ? y(e, t) : _(e, t) : n ? v(t) : m(t)
        }
        t.exports = k
    },
    70: function(t, e, n) {
        for (var i = n(31), r = n(5), o = {
            api_host: "https://zgapi.glodon.com/web_event/web.gif?method=web_event_srv.upload",
            api_host_bac: "https://zgapi.glodon.com/web_event/web.gif?method=web_event_srv.upload",
            debug: !1,
            inherit_user_data: !0,
            ping: !1,
            ping_interval: 12e3,
            idle_timeout: 3e5,
            idle_threshold: 1e4,
            track_link_timeout: 300,
            cookie_expire_days: 365,
            cookie_cross_subdomain: !0,
            cookie_secure: !1,
            info_upload_interval_days: 7,
            session_interval_mins: 30,
            app_channel: "js",
            app_version: "1.0",
            superProperty: "{}",
            platform: "{}",
            autoTrack: !1,
            isClickAble: null,
            redirectAfterTrack: !1,
            singlePage: !1,
            visualizer: !1,
            deepShare: !1,
            onLoadDeepShare: null,
            utm: {},
            adTrack: !1
        }, a = window.zhuge || [], s = new i(o), c = 0; c < a.length; c++)
            if ("_init" === a[c][0]) {
                var u = a.shift(),
                    f = u.shift();
                u.push(function() {
                    for (; a && a.length > 0;) {
                        var t = a.shift(),
                            e = t.shift();
                        s[e] && s[e].apply(s, t)
                    }
                }), s[f] && s[f].apply(s, u);
                break
            }
        if (s.config.deepShare) {
            var d = new Date,
                l = d.getFullYear().toString() + d.getMonth().toString() + d.getDate().toString();
            r.loadJs({
                src: "https://zgapi.glodon.com/deepshare.min.js?v=" + l,
                onLoad: s.config.onLoadDeepShare
            })
        }
        window.zhuge = s
    },
    8: function(t, e) {
        t.exports = {
            MODE: {
                NORMAL: 0,
                CREATE: 1,
                CREATING_EVENT: 2,
                ADD_SAME: 3,
                ADDING_SAME_AUTO: 4,
                ADDING_SAME_CUSTOM: 5,
                ADD_PROPERTY: 6,
                ADDING_PROPERTY: 7
            },
            SESSION_KEYS: {
                IS_ANALYSIS_MODE: "isZhugeVisualizerMode",
                PARAMS: "jsVisualizerParam"
            }
        }
    }
});