var callWbApp = function() {
    "use strict";

    function b(e) {
        return (b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function t(t, e) {
        var n, o = Object.keys(t);
        return Object.getOwnPropertySymbols && (n = Object.getOwnPropertySymbols(t), e && (n = n.filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
        })), o.push.apply(o, n)), o
    }

    function v(o) {
        for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2 ? t(Object(r), !0).forEach(function(e) {
                var t, n;
                t = o, e = r[n = e], n in t ? Object.defineProperty(t, n, {
                    value: e,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[n] = e
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(r)) : t(Object(r)).forEach(function(e) {
                Object.defineProperty(o, e, Object.getOwnPropertyDescriptor(r, e))
            })
        }
        return o
    }

    function w(e) {
        var t, n, o, r, i, a, c, u, l = "{'GTID': ".concat(s, ", 'UUID': ").concat(d, ", 'SOURCE': '58-call-app'}");
        (new Image).src = "//tracklog.58.com/m/click/empty.js.gif?site_name=M58&pagetype=CallApp&referrer=".concat(f, "&time=").concat((o = new Date, r = o.getFullYear(), i = o.getMonth() + 1, a = o.getDate(), c = o.getHours(), u = o.getMinutes(), o = o.getSeconds(), "".concat(r, "-").concat(i, "-").concat(a, ".").concat(c, ":").concat(u, ":").concat(o)), "&from=").concat((t = e, n = "", Object.keys(t).forEach(function(e) {
            n += ("" === n ? "".concat(e, "_") : "&".concat(e, "=")).concat("object" === b(t[e]) ? JSON.stringify(t[e]) : t[e])
        }), n), "&trackURL=").concat(l, "&rand=").concat(Math.random(), "&")
    }
    var s = "0d000000-0000-0xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
            var t = 16 * Math.random() | 0;
            return ("x" == e ? t : 3 & t | 8).toString(16)
        }),
        f = window && window.location && window.location.href,
        d = localStorage.getItem("58tj_uuid");
    d || (d = function() {
        for (var e = [], t = "0123456789abcdef", n = 0; n < 36; n++) e[n] = t.substr(Math.floor(16 * Math.random()), 1);
        return e[14] = "4", e[19] = t.substr(3 & e[19] | 8, 1), e[8] = e[13] = e[18] = e[23] = "-", e.join("")
    }(), localStorage.setItem("58tj_uuid", d));
    var e, n, o = navigator.userAgent.toLocaleLowerCase(),
        x = function() {
            var e, t = {
                    weixin: /micromessenger\//gi,
                    momo: /momowebview\//gi,
                    qq: /mqqbrowser\/|\sqq\//gi,
                    baidu: /baidu/gi,
                    uc: /ucbrowser/gi,
                    xiaomi: /xiaomi\//gi,
                    firefox: /firefox/gi,
                    opera: /opr\/|opera/gi,
                    sogou: /sogoumobilebrowser/gi,
                    liebao: /liebao/gi,
                    oppo: /oppobrowser/gi,
                    360: /360 aphone browser/gi,
                    safari: /version\/([0-9]+\.\d[\.\d]*)\s+mobile\/\w+\s+safari\/([0-9]+\.\d[\.\d]*)/gi,
                    chrome: /chrome\/([0-9]+\.\d[\.\d]*)+\s+mobile\s+safari\/([0-9]+\.\d[\.\d]*)$|crios/gi
                },
                n = "other";
            for (e in t)
                if (t[e].test(o)) {
                    n = e;
                    break
                }
            return n
        }(),
        r = (e = o.match(/(android);?[\s\/]+([\d.]+)?/), n = o.match(/(iphone\sos)\s([\d_]+)/), u = "", n && (c = /[\S\s]*os ([\d_]+) like/gi.exec(o), c = parseInt(c[1], 10)), "weixin" === x && (u = /micromessenger\/([\d.]+)/gi.exec(o)[1]), {
            isAndroid: e || "",
            isIOS: n || "",
            iosVersion: c || "",
            wxVersion: u
        }),
        k = function e(t, n) {
            for (var o in n = n || {}) n.hasOwnProperty(o) && ("object" === b(n[o]) ? e(t[o], n[o]) : t[o] = n[o]);
            return t
        },
        E = function(e) {
            for (var t, n = [], o = e || "", r = (o = o.replace(/\s/g, "")).split(","), i = 0; i < r.length; i++) {
                switch (r[i].charAt(0)) {
                    case ".":
                        t = function(e, t) {
                            if (t.getElementsByClassName) return t.getElementsByClassName(e);
                            for (var n = t.getElementsByTagName("*") || document.all, o = [], r = 0, i = n.length; r < i; r++)
                                for (var a = n[r].className.split(/\s+/), c = 0; c < a.length; c++)
                                    if (a[c] == e) {
                                        o.push(n[r]);
                                        break
                                    }
                            return o
                        }(r[i].substring(1), document);
                        break;
                    case "#":
                        t = document.getElementById(r[i].substring(1));
                        break;
                    default:
                        o.charAt(0).match(/\w/) && (t = document.getElementById(r[i]))
                }
                if (t && t.length)
                    for (var a = 0; a < t.length; a++) t[a] && n.push(t[a])
            }
            return n
        },
        i = function(e, t) {
            for (var n = e.split("."), o = t.split("."), r = 0; r < n.length || r < o.length; r++) {
                var i = parseInt(n[r], 10),
                    a = parseInt(o[r], 10);
                if (isNaN(i) && (i = 0), isNaN(a) && (a = 0), a < i) return !0
            }
            return !1
        }(r.wxVersion, "6.5.16"),
        S = 2e3;

    function a(e, t) {
        setTimeout(function() {
            wx.invoke("launchApplication", {
                appID: "wxc7929cc3d3fda545",
                parameter: e,
                extInfo: e
            }, function(e) {
                "launchApplication:fail" === e.err_msg && t && t(), "launchApplication:ok" === e.err_msg && w({
                    MainPage: "AutoCallAppSuccess"
                })
            })
        }, 500)
    }
    var c, u, O = function(e, t) {
            var n;
            e && ("weixin" === x && i ? window.WeixinJSBridge ? a(e, t) : document.addEventListener("WeixinJSBridgeReady", function() {
                a(e, t)
            }, !1) : r.isIOS && 9 <= parseInt(r.iosVersion) ? window.location.href = e : ((n = document.createElement("iframe")).style.display = "none", n.src = e, document.body.appendChild(n)))
        },
        j = {
            pid: "751",
            protocol: !(!r.isIOS || "uc" != x && "qq" != x) && "wbcore" || "wbmain",
            wlmode: "qr",
            wltype: "third",
            wlsour: {
                browser: x
            },
            downUrl: location.protocol + "//apiwireless.58.com/api/redirect/down/",
            userConf: function(e) {
                var t, n = [];
                for (t in e) "pid" != t && "wlsour" != t && n.push(t + "=" + encodeURIComponent(e[t]));
                return n.join("&")
            }
        };
    return c = window, u = function() {
            return r = {}, o.m = n = [function(e, t, n) {
                var o;
                o = [e, n(7)], void 0 !== (n = "function" == typeof(n = function(e, t) {
                    function n(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }
                    var r = function(e) {
                            return e && e.__esModule ? e : {
                                default: e
                            }
                        }(t),
                        o = "function" == typeof Symbol && "symbol" == b(Symbol.iterator) ? function(e) {
                            return b(e)
                        } : function(e) {
                            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : b(e)
                        },
                        i = function() {
                            function o(e, t) {
                                for (var n = 0; n < t.length; n++) {
                                    var o = t[n];
                                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                                }
                            }
                            return function(e, t, n) {
                                return t && o(e.prototype, t), n && o(e, n), e
                            }
                        }(),
                        a = function() {
                            function t(e) {
                                n(this, t), this.resolveOptions(e), this.initSelection()
                            }
                            return i(t, [{
                                key: "resolveOptions",
                                value: function e() {
                                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                    this.action = t.action, this.container = t.container, this.emitter = t.emitter, this.target = t.target, this.text = t.text, this.trigger = t.trigger, this.selectedText = ""
                                }
                            }, {
                                key: "initSelection",
                                value: function e() {
                                    this.text ? this.selectFake() : this.target && this.selectTarget()
                                }
                            }, {
                                key: "selectFake",
                                value: function e() {
                                    var t = this,
                                        n = "rtl" == document.documentElement.getAttribute("dir");
                                    this.removeFake(), this.fakeHandlerCallback = function() {
                                        return t.removeFake()
                                    }, this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || !0, this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "absolute", this.fakeElem.style[n ? "right" : "left"] = "-9999px";
                                    var o = window.pageYOffset || document.documentElement.scrollTop;
                                    this.fakeElem.style.top = o + "px", this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, this.container.appendChild(this.fakeElem), this.selectedText = (0, r["default"])(this.fakeElem), this.copyText()
                                }
                            }, {
                                key: "removeFake",
                                value: function e() {
                                    this.fakeHandler && (this.container.removeEventListener("click", this.fakeHandlerCallback), this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (this.container.removeChild(this.fakeElem), this.fakeElem = null)
                                }
                            }, {
                                key: "selectTarget",
                                value: function e() {
                                    this.selectedText = (0, r["default"])(this.target), this.copyText()
                                }
                            }, {
                                key: "copyText",
                                value: function e() {
                                    var t = void 0;
                                    try {
                                        t = document.execCommand(this.action)
                                    } catch (e) {
                                        t = !1
                                    }
                                    this.handleResult(t)
                                }
                            }, {
                                key: "handleResult",
                                value: function e(t) {
                                    this.emitter.emit(t ? "success" : "error", {
                                        action: this.action,
                                        text: this.selectedText,
                                        trigger: this.trigger,
                                        clearSelection: this.clearSelection.bind(this)
                                    })
                                }
                            }, {
                                key: "clearSelection",
                                value: function e() {
                                    this.trigger && this.trigger.focus(), window.getSelection().removeAllRanges()
                                }
                            }, {
                                key: "destroy",
                                value: function e() {
                                    this.removeFake()
                                }
                            }, {
                                key: "action",
                                set: function e() {
                                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "copy";
                                    if (this._action = t, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"')
                                },
                                get: function e() {
                                    return this._action
                                }
                            }, {
                                key: "target",
                                set: function e(t) {
                                    if (void 0 !== t) {
                                        if (!t || "object" !== (void 0 === t ? "undefined" : o(t)) || 1 !== t.nodeType) throw new Error('Invalid "target" value, use a valid Element');
                                        if ("copy" === this.action && t.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                                        if ("cut" === this.action && (t.hasAttribute("readonly") || t.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                                        this._target = t
                                    }
                                },
                                get: function e() {
                                    return this._target
                                }
                            }]), t
                        }();
                    e.exports = a
                }) ? n.apply(t, o) : n) && (e.exports = n)
            }, function(e, t, n) {
                var l = n(6),
                    s = n(5);
                e.exports = function(e, t, n) {
                    if (!e && !t && !n) throw new Error("Missing required arguments");
                    if (!l.string(t)) throw new TypeError("Second argument must be a String");
                    if (!l.fn(n)) throw new TypeError("Third argument must be a Function");
                    if (l.node(e)) return r = t, i = n, (o = e).addEventListener(r, i), {
                        destroy: function() {
                            o.removeEventListener(r, i)
                        }
                    };
                    var o, r, i, a, c, u;
                    if (l.nodeList(e)) return a = e, c = t, u = n, Array.prototype.forEach.call(a, function(e) {
                        e.addEventListener(c, u)
                    }), {
                        destroy: function() {
                            Array.prototype.forEach.call(a, function(e) {
                                e.removeEventListener(c, u)
                            })
                        }
                    };
                    if (l.string(e)) return e = e, t = t, n = n, s(document.body, e, t, n);
                    throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")
                }
            }, function(e, t) {
                function n() {}
                n.prototype = {
                    on: function(e, t, n) {
                        var o = this.e || (this.e = {});
                        return (o[e] || (o[e] = [])).push({
                            fn: t,
                            ctx: n
                        }), this
                    },
                    once: function(e, t, n) {
                        function o() {
                            r.off(e, o), t.apply(n, arguments)
                        }
                        var r = this;
                        return o._ = t, this.on(e, o, n)
                    },
                    emit: function(e) {
                        for (var t = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[e] || []).slice(), o = 0, r = n.length; o < r; o++) n[o].fn.apply(n[o].ctx, t);
                        return this
                    },
                    off: function(e, t) {
                        var n = this.e || (this.e = {}),
                            o = n[e],
                            r = [];
                        if (o && t)
                            for (var i = 0, a = o.length; i < a; i++) o[i].fn !== t && o[i].fn._ !== t && r.push(o[i]);
                        return r.length ? n[e] = r : delete n[e], this
                    }
                }, e.exports = n
            }, function(e, t, n) {
                var o;
                o = [e, n(0), n(2), n(1)], void 0 !== (n = "function" == typeof(n = function(e, t, n, o) {
                    function r(e) {
                        return e && e.__esModule ? e : {
                            default: e
                        }
                    }

                    function i(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }

                    function a(e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != b(t) && "function" != typeof t ? e : t
                    }

                    function c(e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + b(t));
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }

                    function u(e, t) {
                        var n = "data-clipboard-" + e;
                        if (t.hasAttribute(n)) return t.getAttribute(n)
                    }
                    var l = r(t),
                        s = r(n),
                        f = r(o),
                        d = "function" == typeof Symbol && "symbol" == b(Symbol.iterator) ? function(e) {
                            return b(e)
                        } : function(e) {
                            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : b(e)
                        },
                        p = function() {
                            function o(e, t) {
                                for (var n = 0; n < t.length; n++) {
                                    var o = t[n];
                                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                                }
                            }
                            return function(e, t, n) {
                                return t && o(e.prototype, t), n && o(e, n), e
                            }
                        }(),
                        h = function(e) {
                            function o(e, t) {
                                i(this, o);
                                var n = a(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this));
                                return n.resolveOptions(t), n.listenClick(e), n
                            }
                            return c(o, e), p(o, [{
                                key: "resolveOptions",
                                value: function e() {
                                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                    this.action = "function" == typeof t.action ? t.action : this.defaultAction, this.target = "function" == typeof t.target ? t.target : this.defaultTarget, this.text = "function" == typeof t.text ? t.text : this.defaultText, this.container = "object" === d(t.container) ? t.container : document.body
                                }
                            }, {
                                key: "listenClick",
                                value: function e(t) {
                                    var n = this;
                                    this.listener = (0, f["default"])(t, "click", function(e) {
                                        return n.onClick(e)
                                    })
                                }
                            }, {
                                key: "onClick",
                                value: function e(t) {
                                    var n = t.delegateTarget || t.currentTarget;
                                    this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new l["default"]({
                                        action: this.action(n),
                                        target: this.target(n),
                                        text: this.text(n),
                                        container: this.container,
                                        trigger: n,
                                        emitter: this
                                    })
                                }
                            }, {
                                key: "defaultAction",
                                value: function e(t) {
                                    return u("action", t)
                                }
                            }, {
                                key: "defaultTarget",
                                value: function e(t) {
                                    var n = u("target", t);
                                    if (n) return document.querySelector(n)
                                }
                            }, {
                                key: "defaultText",
                                value: function e(t) {
                                    return u("text", t)
                                }
                            }, {
                                key: "destroy",
                                value: function e() {
                                    this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null)
                                }
                            }], [{
                                key: "isSupported",
                                value: function e() {
                                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ["copy", "cut"],
                                        n = "string" == typeof t ? [t] : t,
                                        o = !!document.queryCommandSupported;
                                    return n.forEach(function(e) {
                                        o = o && !!document.queryCommandSupported(e)
                                    }), o
                                }
                            }]), o
                        }(s["default"]);
                    e.exports = h
                }) ? n.apply(t, o) : n) && (e.exports = n)
            }, function(e, t) {
                var n;
                "undefined" == typeof Element || Element.prototype.matches || ((n = Element.prototype).matches = n.matchesSelector || n.mozMatchesSelector || n.msMatchesSelector || n.oMatchesSelector || n.webkitMatchesSelector), e.exports = function(e, t) {
                    for (; e && 9 !== e.nodeType;) {
                        if ("function" == typeof e.matches && e.matches(t)) return e;
                        e = e.parentNode
                    }
                }
            }, function(e, t, n) {
                function i(e, t, n, o, r) {
                    var i = function(t, n, e, o) {
                        return function(e) {
                            e.delegateTarget = a(e.target, n), e.delegateTarget && o.call(t, e)
                        }
                    }.apply(this, arguments);
                    return e.addEventListener(n, i, r), {
                        destroy: function() {
                            e.removeEventListener(n, i, r)
                        }
                    }
                }
                var a = n(4);
                e.exports = function(e, t, n, o, r) {
                    return "function" == typeof e.addEventListener ? i.apply(null, arguments) : "function" == typeof n ? i.bind(null, document).apply(null, arguments) : ("string" == typeof e && (e = document.querySelectorAll(e)), Array.prototype.map.call(e, function(e) {
                        return i(e, t, n, o, r)
                    }))
                }
            }, function(e, n) {
                n.node = function(e) {
                    return void 0 !== e && e instanceof HTMLElement && 1 === e.nodeType
                }, n.nodeList = function(e) {
                    var t = Object.prototype.toString.call(e);
                    return void 0 !== e && ("[object NodeList]" === t || "[object HTMLCollection]" === t) && "length" in e && (0 === e.length || n.node(e[0]))
                }, n.string = function(e) {
                    return "string" == typeof e || e instanceof String
                }, n.fn = function(e) {
                    return "[object Function]" === Object.prototype.toString.call(e)
                }
            }, function(e, t) {
                e.exports = function(e) {
                    var t, n = "SELECT" === e.nodeName ? (e.focus(), e.value) : "INPUT" === e.nodeName || "TEXTAREA" === e.nodeName ? ((t = e.hasAttribute("readonly")) || e.setAttribute("readonly", ""), e.select(), e.setSelectionRange(0, e.value.length), t || e.removeAttribute("readonly"), e.value) : (e.hasAttribute("contenteditable") && e.focus(), n = window.getSelection(), (t = document.createRange()).selectNodeContents(e), n.removeAllRanges(), n.addRange(t), n.toString());
                    return n
                }
            }], o.c = r, o.i = function(e) {
                return e
            }, o.d = function(e, t, n) {
                o.o(e, t) || Object.defineProperty(e, t, {
                    configurable: !1,
                    enumerable: !0,
                    get: n
                })
            }, o.n = function(e) {
                var t = e && e.__esModule ? function() {
                    return e.default
                } : function() {
                    return e
                };
                return o.d(t, "a", t), t
            }, o.o = function(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
            }, o.p = "", o(o.s = 3);

            function o(e) {
                if (r[e]) return r[e].exports;
                var t = r[e] = {
                    i: e,
                    l: !1,
                    exports: {}
                };
                return n[e].call(t.exports, t, t.exports, o), t.l = !0, t.exports
            }
            var n, r
        }, "object" == ("undefined" == typeof exports ? "undefined" : b(exports)) && "object" == ("undefined" == typeof module ? "undefined" : b(module)) ? module.exports = u() : "function" == typeof define && define.amd ? define([], u) : "object" == ("undefined" == typeof exports ? "undefined" : b(exports)) ? exports.ClipboardJS = u() : c.ClipboardJS = u(),
        function e(t, n, o, r) {
            var i = 0 === Object.keys(o).length ? {
                pid: (h = j).pid,
                browser: h.wlsour.browser
            } : o;
            w(v({
                MainPage: "PagePV"
            }, i));
            var a = o && o.wlsour || {};
            "object" === b(a) && (a = encodeURIComponent(JSON.stringify(k(j.wlsour, a))));
            var c = E(t),
                u = o && o.pid || j.pid,
                l = "pid=" + u + "&wlsour=" + a,
                s = "&wlmode=" + j.wlmode + "&wltype=" + j.wltype + "&" + l,
                f = o && o.channelid || null,
                d = j.protocol + "://nativejump?",
                r = !!r;
            switch (n) {
                case "url":
                    d += j.userConf(o) + s;
                    break;
                case "copyandcall":
                    return e(t, "copy", o, r), void e(t, "other", o, r);
                case "copy":
                    c.forEach(function(e) {
                        e.setAttribute("data-clipboard-text", "#@" + o.jump + "#@"), new ClipboardJS(e)
                    });
                    break;
                case "cate":
                case "list":
                case "detail":
                    d += "pagetype=" + n + "&" + j.userConf(o) + s;
                    break;
                case "protocol":
                    d = o.jump;
                    break;
                case "other":
                    var p = o.jump,
                        h = p.indexOf("://"),
                        a = p.indexOf("?"),
                        t = [];
                    t.push(p.substring(h)), 0 < a ? t.push("&" + l) : t.push("?" + l), d = j.protocol + t.join("");
                    break;
                default:
                    d += "pagetype=main&jumptype=native" + s
            }
            for (var m, y = function(e) {
                    e = 0 < arguments.length && void 0 !== e ? e : "", "weixin" !== x && document.hidden ? w(v({
                        MainPage: "AutoCallAppSuccess"
                    }, i)) : (w(v({
                        MainPage: "AutoCallAppFailure"
                    }, i)), "" === e && (window.location.href = j.downUrl + u + "?pid=" + (null == f ? u : f)))
                }, g = 0; g < c.length; g++) c[g] && c[g].addEventListener && c[g].addEventListener("click", function() {
                w(v({
                    MainPage: "ClickDowloadButton"
                }, i)), (window.event || event).stopPropagation(), "weixin" !== x && setTimeout(y, S), "copy" !== n && (w(v({
                    MainPage: "CallApp"
                }, i)), O(d, y))
            });
            ("copy" !== n && !r || c.length <= 0) && (w(v({
                MainPage: m = "AutoCallApp"
            }, i)), "weixin" !== x && setTimeout(function() {
                y(m)
            }, S), O(d, y))
        }
}();