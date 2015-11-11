var IScroll = function(e, t, n) {
function r(e, n) {
this.wrapper = "string" == typeof e ? t.querySelector(e) : e, this.scroller = this.wrapper.children[0], this.scrollerStyle = this.scroller.style, this.options = {
resizeIndicator: !0,
mouseWheelSpeed: 20,
snapThreshold: .334,
startX: 0,
startY: 0,
scrollY: !0,
directionLockThreshold: 5,
momentum: !0,
bounce: !0,
bounceTime: 600,
bounceEasing: "",
preventDefault: !0,
HWCompositing: !0,
useTransition: !0,
useTransform: !0
};
for (var r in n) this.options[r] = n[r];
this.translateZ = this.options.HWCompositing && u.hasPerspective ? " translateZ(0)" : "", this.options.useTransition = u.hasTransition && this.options.useTransition, this.options.useTransform = u.hasTransform && this.options.useTransform, this.options.eventPassthrough = this.options.eventPassthrough === !0 ? "vertical" : this.options.eventPassthrough, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollY = "vertical" == this.options.eventPassthrough ? !1 : this.options.scrollY, this.options.scrollX = "horizontal" == this.options.eventPassthrough ? !1 : this.options.scrollX, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? u.ease[this.options.bounceEasing] || u.ease.circular : this.options.bounceEasing, this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling, this.options.tap === !0 && (this.options.tap = "tap"), this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1, this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this._events = {}, this._init(), this.refresh(), this.scrollTo(this.options.startX, this.options.startY), this.enable();
}
function i(e, n, r) {
var i = t.createElement("div"), s = t.createElement("div");
return r === !0 && (i.style.cssText = "position:absolute;z-index:9999", s.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"), s.className = "iScrollIndicator", "h" == e ? (r === !0 && (i.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", s.style.height = "100%"), i.className = "iScrollHorizontalScrollbar") : (r === !0 && (i.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", s.style.width = "100%"), i.className = "iScrollVerticalScrollbar"), n || (i.style.pointerEvents = "none"), i.appendChild(s), i;
}
function s(n, r) {
this.wrapper = "string" == typeof r.el ? t.querySelector(r.el) : r.el, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = n, this.options = {
listenX: !0,
listenY: !0,
interactive: !1,
resize: !0,
defaultScrollbars: !1,
speedRatioX: 0,
speedRatioY: 0
};
for (var i in r) this.options[i] = r[i];
this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.options.interactive && (u.addEvent(this.indicator, "touchstart", this), u.addEvent(this.indicator, "MSPointerDown", this), u.addEvent(this.indicator, "mousedown", this), u.addEvent(e, "touchend", this), u.addEvent(e, "MSPointerUp", this), u.addEvent(e, "mouseup", this));
}
var o = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function(t) {
e.setTimeout(t, 1e3 / 60);
}, u = function() {
function r(e) {
return o === !1 ? !1 : "" === o ? e : o + e.charAt(0).toUpperCase() + e.substr(1);
}
var i = {}, s = t.createElement("div").style, o = function() {
for (var e, t = [ "t", "webkitT", "MozT", "msT", "OT" ], n = 0, r = t.length; r > n; n++) if (e = t[n] + "ransform", e in s) return t[n].substr(0, t[n].length - 1);
return !1;
}();
i.getTime = Date.now || function() {
return (new Date).getTime();
}, i.extend = function(e, t) {
for (var n in t) e[n] = t[n];
}, i.addEvent = function(e, t, n, r) {
e.addEventListener(t, n, !!r);
}, i.removeEvent = function(e, t, n, r) {
e.removeEventListener(t, n, !!r);
}, i.momentum = function(e, t, r, i, s) {
var o, u, a = e - t, f = n.abs(a) / r, l = 6e-4;
return o = e + f * f / (2 * l) * (0 > a ? -1 : 1), u = f / l, i > o ? (o = s ? i - s / 2.5 * (f / 8) : i, a = n.abs(o - e), u = a / f) : o > 0 && (o = s ? s / 2.5 * (f / 8) : 0, a = n.abs(e) + o, u = a / f), {
destination: n.round(o),
duration: u
};
};
var u = r("transform");
return i.extend(i, {
hasTransform: u !== !1,
hasPerspective: r("perspective") in s,
hasTouch: "ontouchstart" in e,
hasPointer: navigator.msPointerEnabled,
hasTransition: r("transition") in s
}), i.isAndroidBrowser = /Android/.test(e.navigator.appVersion) && /Version\/\d/.test(e.navigator.appVersion), i.extend(i.style = {}, {
transform: u,
transitionTimingFunction: r("transitionTimingFunction"),
transitionDuration: r("transitionDuration"),
transformOrigin: r("transformOrigin")
}), i.hasClass = function(e, t) {
var n = new RegExp("(^|\\s)" + t + "(\\s|$)");
return n.test(e.className);
}, i.addClass = function(e, t) {
if (!i.hasClass(e, t)) {
var n = e.className.split(" ");
n.push(t), e.className = n.join(" ");
}
}, i.removeClass = function(e, t) {
if (i.hasClass(e, t)) {
var n = new RegExp("(^|\\s)" + t + "(\\s|$)", "g");
e.className = e.className.replace(n, "");
}
}, i.offset = function(e) {
for (var t = -e.offsetLeft, n = -e.offsetTop; e = e.offsetParent; ) t -= e.offsetLeft, n -= e.offsetTop;
return {
left: t,
top: n
};
}, i.extend(i.eventType = {}, {
touchstart: 1,
touchmove: 1,
touchend: 1,
mousedown: 2,
mousemove: 2,
mouseup: 2,
MSPointerDown: 3,
MSPointerMove: 3,
MSPointerUp: 3
}), i.extend(i.ease = {}, {
quadratic: {
style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
fn: function(e) {
return e * (2 - e);
}
},
circular: {
style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
fn: function(e) {
return n.sqrt(1 - --e * e);
}
},
back: {
style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
fn: function(e) {
var t = 4;
return (e -= 1) * e * ((t + 1) * e + t) + 1;
}
},
bounce: {
style: "",
fn: function(e) {
return (e /= 1) < 1 / 2.75 ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375;
}
},
elastic: {
style: "",
fn: function(e) {
var t = .22, r = .4;
return 0 === e ? 0 : 1 == e ? 1 : r * n.pow(2, -10 * e) * n.sin((e - t / 4) * 2 * n.PI / t) + 1;
}
}
}), i.tap = function(e, n) {
var r = t.createEvent("Event");
r.initEvent(n, !0, !0), r.pageX = e.pageX, r.pageY = e.pageY, e.target.dispatchEvent(r);
}, i.click = function(e) {
var n, r = e.target;
"SELECT" != r.tagName && "INPUT" != r.tagName && "TEXTAREA" != r.tagName && (n = t.createEvent("MouseEvents"), n.initMouseEvent("click", !0, !0, e.view, 1, r.screenX, r.screenY, r.clientX, r.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null), n._constructed = !0, r.dispatchEvent(n));
}, i;
}();
return r.prototype = {
version: "5.0.4",
_init: function() {
this._initEvents(), (this.options.scrollbars || this.options.indicators) && this._initIndicators(), this.options.mouseWheel && this._initWheel(), this.options.snap && this._initSnap(), this.options.keyBindings && this._initKeys();
},
destroy: function() {
this._initEvents(!0), this._execEvent("destroy");
},
_transitionEnd: function(e) {
e.target == this.scroller && (this._transitionTime(0), this.resetPosition(this.options.bounceTime) || this._execEvent("scrollEnd"));
},
_start: function(e) {
if (!(1 != u.eventType[e.type] && 0 !== e.button || !this.enabled || this.initiated && u.eventType[e.type] !== this.initiated)) {
this.options.preventDefault && !u.isAndroidBrowser && e.preventDefault();
var t, r = e.touches ? e.touches[0] : e;
this.initiated = u.eventType[e.type], this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.directionLocked = 0, this._transitionTime(), this.isAnimating = !1, this.startTime = u.getTime(), this.options.useTransition && this.isInTransition && (t = this.getComputedPosition(), this._translate(n.round(t.x), n.round(t.y)), this.isInTransition = !1), this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = r.pageX, this.pointY = r.pageY, this._execEvent("scrollStart");
}
},
_move: function(e) {
if (this.enabled && u.eventType[e.type] === this.initiated) {
this.options.preventDefault && e.preventDefault();
var t, r, i, s, o = e.touches ? e.touches[0] : e, a = this.hasHorizontalScroll ? o.pageX - this.pointX : 0, f = this.hasVerticalScroll ? o.pageY - this.pointY : 0, l = u.getTime();
if (this.pointX = o.pageX, this.pointY = o.pageY, this.distX += a, this.distY += f, i = n.abs(this.distX), s = n.abs(this.distY), !(l - this.endTime > 300 && 10 > i && 10 > s)) {
if (this.directionLocked || this.options.freeScroll || (this.directionLocked = i > s + this.options.directionLockThreshold ? "h" : s >= i + this.options.directionLockThreshold ? "v" : "n"), "h" == this.directionLocked) {
if ("vertical" == this.options.eventPassthrough) e.preventDefault(); else if ("horizontal" == this.options.eventPassthrough) return this.initiated = !1, void 0;
f = 0;
} else if ("v" == this.directionLocked) {
if ("horizontal" == this.options.eventPassthrough) e.preventDefault(); else if ("vertical" == this.options.eventPassthrough) return this.initiated = !1, void 0;
a = 0;
}
t = this.x + a, r = this.y + f, (t > 0 || t < this.maxScrollX) && (t = this.options.bounce ? this.x + a / 3 : t > 0 ? 0 : this.maxScrollX), (r > 0 || r < this.maxScrollY) && (r = this.options.bounce ? this.y + f / 3 : r > 0 ? 0 : this.maxScrollY), this.directionX = a > 0 ? -1 : 0 > a ? 1 : 0, this.directionY = f > 0 ? -1 : 0 > f ? 1 : 0, this.moved = !0, this._translate(t, r), l - this.startTime > 300 && (this.startTime = l, this.startX = this.x, this.startY = this.y);
}
}
},
_end: function(e) {
if (this.enabled && u.eventType[e.type] === this.initiated) {
this.options.preventDefault && e.preventDefault();
var t, r, i = (e.changedTouches ? e.changedTouches[0] : e, u.getTime() - this.startTime), s = n.round(this.x), o = n.round(this.y), a = n.abs(s - this.startX), f = n.abs(o - this.startY), l = 0, c = "";
if (this.scrollTo(s, o), this.isInTransition = 0, this.initiated = 0, this.endTime = u.getTime(), !this.resetPosition(this.options.bounceTime)) {
if (!this.moved) return this.options.tap && u.tap(e, this.options.tap), this.options.click && u.click(e), void 0;
if (this._events.flick && 200 > i && 100 > a && 100 > f) return this._execEvent("flick"), void 0;
if (this.options.momentum && 300 > i && (t = this.hasHorizontalScroll ? u.momentum(this.x, this.startX, i, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0) : {
destination: s,
duration: 0
}, r = this.hasVerticalScroll ? u.momentum(this.y, this.startY, i, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0) : {
destination: o,
duration: 0
}, s = t.destination, o = r.destination, l = n.max(t.duration, r.duration), this.isInTransition = 1), this.options.snap) {
var h = this._nearestSnap(s, o);
this.currentPage = h, s = h.x, o = h.y, l = this.options.snapSpeed || n.max(n.max(n.min(a, 1e3), n.min(a, 1e3)), 300), this.directionX = 0, this.directionY = 0, c = this.options.bounceEasing;
}
return s != this.x || o != this.y ? ((s > 0 || s < this.maxScrollX || o > 0 || o < this.maxScrollY) && (c = u.ease.quadratic), this.scrollTo(s, o, l, c), void 0) : (this._execEvent("scrollEnd"), void 0);
}
}
},
_resize: function() {
var e = this;
clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() {
e.refresh();
}, this.options.resizePolling);
},
resetPosition: function(e) {
var t = this.x, n = this.y;
return e = e || 0, !this.hasHorizontalScroll || this.x > 0 ? t = 0 : this.x < this.maxScrollX && (t = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? n = 0 : this.y < this.maxScrollY && (n = this.maxScrollY), t == this.x && n == this.y ? !1 : (this.scrollTo(t, n, e, this.options.bounceEasing), !0);
},
disable: function() {
this.enabled = !1;
},
enable: function() {
this.enabled = !0;
},
refresh: function() {
if (this.wrapper.offsetHeight, this.wrapperWidth = this.wrapper.clientWidth, this.wrapperHeight = this.wrapper.clientHeight, this.scrollerWidth = this.scroller.offsetWidth, this.scrollerHeight = this.scroller.offsetHeight, this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight, this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = u.offset(this.wrapper), this._execEvent("refresh"), this.resetPosition(), this.options.snap) {
var e = this._nearestSnap(this.x, this.y);
if (this.x == e.x && this.y == e.y) return;
this.currentPage = e, this.scrollTo(e.x, e.y);
}
},
on: function(e, t) {
this._events[e] || (this._events[e] = []), this._events[e].push(t);
},
_execEvent: function(e) {
if (this._events[e]) {
var t = 0, n = this._events[e].length;
if (n) for (; n > t; t++) this._events[e][t].call(this);
}
},
scrollBy: function(e, t, n, r) {
e = this.x + e, t = this.y + t, n = n || 0, this.scrollTo(e, t, n, r);
},
scrollTo: function(e, t, n, r) {
r = r || u.ease.circular, !n || this.options.useTransition && r.style ? (this._transitionTimingFunction(r.style), this._transitionTime(n), this._translate(e, t)) : this._animate(e, t, n, r.fn);
},
scrollToElement: function(e, t, r, i, s) {
if (e = e.nodeType ? e : this.scroller.querySelector(e)) {
var o = u.offset(e);
o.left -= this.wrapperOffset.left, o.top -= this.wrapperOffset.top, r === !0 && (r = n.round(e.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), i === !0 && (i = n.round(e.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), o.left -= r || 0, o.top -= i || 0, o.left = o.left > 0 ? 0 : o.left < this.maxScrollX ? this.maxScrollX : o.left, o.top = o.top > 0 ? 0 : o.top < this.maxScrollY ? this.maxScrollY : o.top, t = void 0 === t || null === t || "auto" === t ? n.max(2 * n.abs(o.left), 2 * n.abs(o.top)) : t, this.scrollTo(o.left, o.top, t, s);
}
},
_transitionTime: function(e) {
e = e || 0, this.scrollerStyle[u.style.transitionDuration] = e + "ms", this.indicator1 && this.indicator1.transitionTime(e), this.indicator2 && this.indicator2.transitionTime(e);
},
_transitionTimingFunction: function(e) {
this.scrollerStyle[u.style.transitionTimingFunction] = e, this.indicator1 && this.indicator1.transitionTimingFunction(e), this.indicator2 && this.indicator2.transitionTimingFunction(e);
},
_translate: function(e, t) {
this.options.useTransform ? this.scrollerStyle[u.style.transform] = "translate(" + e + "px," + t + "px)" + this.translateZ : (e = n.round(e), t = n.round(t), this.scrollerStyle.left = e + "px", this.scrollerStyle.top = t + "px"), this.x = e, this.y = t, this.indicator1 && this.indicator1.updatePosition(), this.indicator2 && this.indicator2.updatePosition();
},
_initEvents: function(t) {
var n = t ? u.removeEvent : u.addEvent, r = this.options.bindToWrapper ? this.wrapper : e;
n(e, "orientationchange", this), n(e, "resize", this), n(this.wrapper, "mousedown", this), n(r, "mousemove", this), n(r, "mousecancel", this), n(r, "mouseup", this), u.hasPointer && (n(this.wrapper, "MSPointerDown", this), n(r, "MSPointerMove", this), n(r, "MSPointerCancel", this), n(r, "MSPointerUp", this)), u.hasTouch && (n(this.wrapper, "touchstart", this), n(r, "touchmove", this), n(r, "touchcancel", this), n(r, "touchend", this)), n(this.scroller, "transitionend", this), n(this.scroller, "webkitTransitionEnd", this), n(this.scroller, "oTransitionEnd", this), n(this.scroller, "MSTransitionEnd", this);
},
getComputedPosition: function() {
var t, n, r = e.getComputedStyle(this.scroller, null);
return this.options.useTransform ? (r = r[u.style.transform].split(")")[0].split(", "), t = +(r[12] || r[4]), n = +(r[13] || r[5])) : (t = +r.left.replace(/[^-\d]/g, ""), n = +r.top.replace(/[^-\d]/g, "")), {
x: t,
y: n
};
},
_initIndicators: function() {
var e, t, n = this.options.interactiveScrollbars, r = ("object" != typeof this.options.scrollbars, "string" != typeof this.options.scrollbars);
this.options.scrollbars ? (this.options.scrollY && (e = {
el: i("v", n, this.options.scrollbars),
interactive: n,
defaultScrollbars: !0,
customStyle: r,
resize: this.options.resizeIndicator,
listenX: !1
}, this.wrapper.appendChild(e.el)), this.options.scrollX && (t = {
el: i("h", n, this.options.scrollbars),
interactive: n,
defaultScrollbars: !0,
customStyle: r,
resize: this.options.resizeIndicator,
listenY: !1
}, this.wrapper.appendChild(t.el))) : (e = this.options.indicators.length ? this.options.indicators[0] : this.options.indicators, t = this.options.indicators[1] && this.options.indicators[1]), e && (this.indicator1 = new s(this, e)), t && (this.indicator2 = new s(this, t)), this.on("refresh", function() {
this.indicator1 && this.indicator1.refresh(), this.indicator2 && this.indicator2.refresh();
}), this.on("destroy", function() {
this.indicator1 && (this.indicator1.destroy(), this.indicator1 = null), this.indicator2 && (this.indicator2.destroy(), this.indicator2 = null);
});
},
_initWheel: function() {
u.addEvent(this.wrapper, "mousewheel", this), u.addEvent(this.wrapper, "DOMMouseScroll", this), this.on("destroy", function() {
u.removeEvent(this.wrapper, "mousewheel", this), u.removeEvent(this.wrapper, "DOMMouseScroll", this);
});
},
_wheel: function(e) {
if (this.enabled) {
var t, n, r, i, s = this;
if (clearTimeout(this.wheelTimeout), this.wheelTimeout = setTimeout(function() {
s._execEvent("scrollEnd");
}, 400), e.preventDefault(), "wheelDeltaX" in e) t = e.wheelDeltaX / 120, n = e.wheelDeltaY / 120; else if ("wheelDelta" in e) t = n = e.wheelDelta / 120; else {
if (!("detail" in e)) return;
t = n = -e.detail / 3;
}
t *= this.options.mouseWheelSpeed, n *= this.options.mouseWheelSpeed, this.hasVerticalScroll || (t = n), r = this.x + (this.hasHorizontalScroll ? t * this.options.invertWheelDirection : 0), i = this.y + (this.hasVerticalScroll ? n * this.options.invertWheelDirection : 0), r > 0 ? r = 0 : r < this.maxScrollX && (r = this.maxScrollX), i > 0 ? i = 0 : i < this.maxScrollY && (i = this.maxScrollY), this.scrollTo(r, i, 0);
}
},
_initSnap: function() {
this.currentPage = {}, "string" == typeof this.options.snap && (this.options.snap = this.scroller.querySelectorAll(this.options.snap)), this.on("refresh", function() {
var e, t, r, i, s, o, u = 0, a = 0, f = 0, l = this.options.snapStepX || this.wrapperWidth, c = this.options.snapStepY || this.wrapperHeight;
if (this.pages = [], this.options.snap === !0) for (r = n.round(l / 2), i = n.round(c / 2); f > -this.scrollerWidth; ) {
for (this.pages[u] = [], e = 0, s = 0; s > -this.scrollerHeight; ) this.pages[u][e] = {
x: n.max(f, this.maxScrollX),
y: n.max(s, this.maxScrollY),
width: l,
height: c,
cx: f - r,
cy: s - i
}, s -= c, e++;
f -= l, u++;
} else for (o = this.options.snap, e = o.length, t = -1; e > u; u++) (0 === u || o[u].offsetLeft <= o[u - 1].offsetLeft) && (a = 0, t++), this.pages[a] || (this.pages[a] = []), f = n.max(-o[u].offsetLeft, this.maxScrollX), s = n.max(-o[u].offsetTop, this.maxScrollY), r = f - n.round(o[u].offsetWidth / 2), i = s - n.round(o[u].offsetHeight / 2), this.pages[a][t] = {
x: f,
y: s,
width: o[u].offsetWidth,
height: o[u].offsetHeight,
cx: r,
cy: i
}, f > this.maxScrollX && a++;
this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0), 0 === this.options.snapThreshold % 1 ? (this.snapThresholdX = this.options.snapThreshold, this.snapThresholdY = this.options.snapThreshold) : (this.snapThresholdX = n.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold), this.snapThresholdY = n.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold));
}), this.on("flick", function() {
var e = this.options.snapSpeed || n.max(n.max(n.min(n.abs(this.x - this.startX), 1e3), n.min(n.abs(this.y - this.startY), 1e3)), 300);
this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, e);
});
},
_nearestSnap: function(e, t) {
var r = 0, i = this.pages.length, s = 0;
if (n.abs(e - this.absStartX) < this.snapThresholdX && n.abs(t - this.absStartY) < this.snapThresholdY) return this.currentPage;
for (e > 0 ? e = 0 : e < this.maxScrollX && (e = this.maxScrollX), t > 0 ? t = 0 : t < this.maxScrollY && (t = this.maxScrollY); i > r; r++) if (e >= this.pages[r][0].cx) {
e = this.pages[r][0].x;
break;
}
for (i = this.pages[r].length; i > s; s++) if (t >= this.pages[0][s].cy) {
t = this.pages[0][s].y;
break;
}
return r == this.currentPage.pageX && (r += this.directionX, 0 > r ? r = 0 : r >= this.pages.length && (r = this.pages.length - 1), e = this.pages[r][0].x), s == this.currentPage.pageY && (s += this.directionY, 0 > s ? s = 0 : s >= this.pages[0].length && (s = this.pages[0].length - 1), t = this.pages[0][s].y), {
x: e,
y: t,
pageX: r,
pageY: s
};
},
goToPage: function(e, t, r, i) {
i = i || this.options.bounceEasing, e >= this.pages.length ? e = this.pages.length - 1 : 0 > e && (e = 0), t >= this.pages[0].length ? t = this.pages[0].length - 1 : 0 > t && (t = 0);
var s = this.pages[e][t].x, o = this.pages[e][t].y;
r = void 0 === r ? this.options.snapSpeed || n.max(n.max(n.min(n.abs(s - this.x), 1e3), n.min(n.abs(o - this.y), 1e3)), 300) : r, this.currentPage = {
x: s,
y: o,
pageX: e,
pageY: t
}, this.scrollTo(s, o, r, i);
},
next: function(e, t) {
var n = this.currentPage.pageX, r = this.currentPage.pageY;
n++, n >= this.pages.length && this.hasVerticalScroll && (n = 0, r++), this.goToPage(n, r, e, t);
},
prev: function(e, t) {
var n = this.currentPage.pageX, r = this.currentPage.pageY;
n--, 0 > n && this.hasVerticalScroll && (n = 0, r--), this.goToPage(n, r, e, t);
},
_initKeys: function() {
var t, n = {
pageUp: 33,
pageDown: 34,
end: 35,
home: 36,
left: 37,
up: 38,
right: 39,
down: 40
};
if ("object" == typeof this.options.keyBindings) for (t in this.options.keyBindings) "string" == typeof this.options.keyBindings[t] && (this.options.keyBindings[t] = this.options.keyBindings[t].toUpperCase().charCodeAt(0)); else this.options.keyBindings = {};
for (t in n) this.options.keyBindings[t] = this.options.keyBindings[t] || n[t];
u.addEvent(e, "keydown", this), this.on("destroy", function() {
u.removeEvent(e, "keydown", this);
});
},
_key: function(e) {
if (this.enabled) {
var t, r = this.options.snap, i = r ? this.currentPage.pageX : this.x, s = r ? this.currentPage.pageY : this.y, o = u.getTime(), a = this.keyTime || 0, f = .25;
switch (this.options.useTransition && this.isInTransition && (t = this.getComputedPosition(), this._translate(n.round(t.x), n.round(t.y)), this.isInTransition = !1), this.keyAcceleration = 200 > o - a ? n.min(this.keyAcceleration + f, 50) : 0, e.keyCode) {
case this.options.keyBindings.pageUp:
this.hasHorizontalScroll && !this.hasVerticalScroll ? i += r ? 1 : this.wrapperWidth : s += r ? 1 : this.wrapperHeight;
break;
case this.options.keyBindings.pageDown:
this.hasHorizontalScroll && !this.hasVerticalScroll ? i -= r ? 1 : this.wrapperWidth : s -= r ? 1 : this.wrapperHeight;
break;
case this.options.keyBindings.end:
i = r ? this.pages.length - 1 : this.maxScrollX, s = r ? this.pages[0].length - 1 : this.maxScrollY;
break;
case this.options.keyBindings.home:
i = 0, s = 0;
break;
case this.options.keyBindings.left:
i += r ? -1 : 5 + this.keyAcceleration >> 0;
break;
case this.options.keyBindings.up:
s += r ? 1 : 5 + this.keyAcceleration >> 0;
break;
case this.options.keyBindings.right:
i -= r ? -1 : 5 + this.keyAcceleration >> 0;
break;
case this.options.keyBindings.down:
s -= r ? 1 : 5 + this.keyAcceleration >> 0;
}
if (r) return this.goToPage(i, s), void 0;
i > 0 ? (i = 0, this.keyAcceleration = 0) : i < this.maxScrollX && (i = this.maxScrollX, this.keyAcceleration = 0), s > 0 ? (s = 0, this.keyAcceleration = 0) : s < this.maxScrollY && (s = this.maxScrollY, this.keyAcceleration = 0), this.scrollTo(i, s, 0), this.keyTime = o;
}
},
_animate: function(e, t, n, r) {
function i() {
var h, p, d, v = u.getTime();
return v >= c ? (s.isAnimating = !1, s._translate(e, t), s.resetPosition(s.options.bounceTime) || s._execEvent("scrollEnd"), void 0) : (v = (v - l) / n, d = r(v), h = (e - a) * d + a, p = (t - f) * d + f, s._translate(h, p), s.isAnimating && o(i), void 0);
}
var s = this, a = this.x, f = this.y, l = u.getTime(), c = l + n;
this.isAnimating = !0, i();
},
handleEvent: function(e) {
switch (e.type) {
case "touchstart":
case "MSPointerDown":
case "mousedown":
this._start(e);
break;
case "touchmove":
case "MSPointerMove":
case "mousemove":
this._move(e);
break;
case "touchend":
case "MSPointerUp":
case "mouseup":
case "touchcancel":
case "MSPointerCancel":
case "mousecancel":
this._end(e);
break;
case "orientationchange":
case "resize":
this._resize();
break;
case "transitionend":
case "webkitTransitionEnd":
case "oTransitionEnd":
case "MSTransitionEnd":
this._transitionEnd(e);
break;
case "DOMMouseScroll":
case "mousewheel":
this._wheel(e);
break;
case "keydown":
this._key(e);
}
}
}, s.prototype = {
handleEvent: function(e) {
switch (e.type) {
case "touchstart":
case "MSPointerDown":
case "mousedown":
this._start(e);
break;
case "touchmove":
case "MSPointerMove":
case "mousemove":
this._move(e);
break;
case "touchend":
case "MSPointerUp":
case "mouseup":
case "touchcancel":
case "MSPointerCancel":
case "mousecancel":
this._end(e);
}
},
destroy: function() {
this.options.interactive && (u.removeEvent(this.indicator, "touchstart", this), u.removeEvent(this.indicator, "MSPointerDown", this), u.removeEvent(this.indicator, "mousedown", this), u.removeEvent(e, "touchmove", this), u.removeEvent(e, "MSPointerMove", this), u.removeEvent(e, "mousemove", this), u.removeEvent(e, "touchend", this), u.removeEvent(e, "MSPointerUp", this), u.removeEvent(e, "mouseup", this)), this.options.defaultScrollbars && this.wrapper.parentNode.removeChild(this.wrapper);
},
_start: function(t) {
var n = t.touches ? t.touches[0] : t;
t.preventDefault(), t.stopPropagation(), this.transitionTime(0), this.initiated = !0, this.moved = !1, this.lastPointX = n.pageX, this.lastPointY = n.pageY, this.startTime = u.getTime(), u.addEvent(e, "touchmove", this), u.addEvent(e, "MSPointerMove", this), u.addEvent(e, "mousemove", this), this.scroller._execEvent("scrollStart");
},
_move: function(e) {
var t, n, r, i, s = e.touches ? e.touches[0] : e;
u.getTime(), this.moved = !0, t = s.pageX - this.lastPointX, this.lastPointX = s.pageX, n = s.pageY - this.lastPointY, this.lastPointY = s.pageY, r = this.x + t, i = this.y + n, this._pos(r, i), e.preventDefault(), e.stopPropagation();
},
_end: function(t) {
this.initiated && (this.initiated = !1, t.preventDefault(), t.stopPropagation(), u.removeEvent(e, "touchmove", this), u.removeEvent(e, "MSPointerMove", this), u.removeEvent(e, "mousemove", this), this.moved && this.scroller._execEvent("scrollEnd"));
},
transitionTime: function(e) {
e = e || 0, this.indicatorStyle[u.style.transitionDuration] = e + "ms";
},
transitionTimingFunction: function(e) {
this.indicatorStyle[u.style.transitionTimingFunction] = e;
},
refresh: function() {
this.transitionTime(0), this.indicatorStyle.display = this.options.listenX && !this.options.listenY ? this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.scroller.hasVerticalScroll ? "block" : "none" : this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none", this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (u.addClass(this.wrapper, "iScrollBothScrollbars"), u.removeClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px" : this.wrapper.style.bottom = "8px")) : (u.removeClass(this.wrapper, "iScrollBothScrollbars"), u.addClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px" : this.wrapper.style.bottom = "2px")), this.wrapper.offsetHeight, this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.options.resize ? (this.indicatorWidth = n.max(n.round(this.wrapperWidth * this.wrapperWidth / this.scroller.scrollerWidth), 8), this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth, this.maxPosX = this.wrapperWidth - this.indicatorWidth, this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX), this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.options.resize ? (this.indicatorHeight = n.max(n.round(this.wrapperHeight * this.wrapperHeight / this.scroller.scrollerHeight), 8), this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight, this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY), this.updatePosition();
},
updatePosition: function() {
var e = n.round(this.sizeRatioX * this.scroller.x) || 0, t = n.round(this.sizeRatioY * this.scroller.y) || 0;
this.options.ignoreBoundaries || (0 > e ? e = 0 : e > this.maxPosX && (e = this.maxPosX), 0 > t ? t = 0 : t > this.maxPosY && (t = this.maxPosY)), this.x = e, this.y = t, this.scroller.options.useTransform ? this.indicatorStyle[u.style.transform] = "translate(" + e + "px," + t + "px)" + this.scroller.translateZ : (this.indicatorStyle.left = e + "px", this.indicatorStyle.top = t + "px");
},
_pos: function(e, t) {
0 > e ? e = 0 : e > this.maxPosX && (e = this.maxPosX), 0 > t ? t = 0 : t > this.maxPosY && (t = this.maxPosY), e = this.options.listenX ? n.round(e / this.sizeRatioX) : this.scroller.x, t = this.options.listenY ? n.round(t / this.sizeRatioY) : this.scroller.y, this.scroller.scrollTo(e, t);
}
}, r.ease = u.ease, r;
}(window, document, Math);