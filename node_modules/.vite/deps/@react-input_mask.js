import { r as __toESM } from "./chunk-CYJPkc-J.js";
import { t as require_react } from "./react.js";
//#region node_modules/@react-input/mask/module/helpers-BtaZ0NTN.js
function e$3(e, t) {
	(null == t || t > e.length) && (t = e.length);
	for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
	return n;
}
function t$3(e, t, r) {
	return t = i$1(t), function(e, t) {
		if (t && ("object" == typeof t || "function" == typeof t)) return t;
		if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
		return function(e) {
			if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return e;
		}(e);
	}(e, l$2() ? Reflect.construct(t, r || [], i$1(e).constructor) : t.apply(e, r));
}
function r$4(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function n$3(e, t, r) {
	return Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function o$1(t, r) {
	var n = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
	if (!n) {
		if (Array.isArray(t) || (n = function(t, r) {
			if (t) {
				if ("string" == typeof t) return e$3(t, r);
				var n = {}.toString.call(t).slice(8, -1);
				return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? e$3(t, r) : void 0;
			}
		}(t)) || r) {
			n && (t = n);
			var o = 0, a = function() {};
			return {
				s: a,
				n: function() {
					return o >= t.length ? { done: !0 } : {
						done: !1,
						value: t[o++]
					};
				},
				e: function(e) {
					throw e;
				},
				f: a
			};
		}
		throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	var c, i = !0, u = !1;
	return {
		s: function() {
			n = n.call(t);
		},
		n: function() {
			var e = n.next();
			return i = e.done, e;
		},
		e: function(e) {
			u = !0, c = e;
		},
		f: function() {
			try {
				i || null == n.return || n.return();
			} finally {
				if (u) throw c;
			}
		}
	};
}
function a$3(e, t, r) {
	return (t = function(e) {
		var t = function(e, t) {
			if ("object" != typeof e || !e) return e;
			var r = e[Symbol.toPrimitive];
			if (void 0 !== r) {
				var n = r.call(e, t || "default");
				if ("object" != typeof n) return n;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === t ? String : Number)(e);
		}(e, "string");
		return "symbol" == typeof t ? t : t + "";
	}(t)) in e ? Object.defineProperty(e, t, {
		value: r,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = r, e;
}
function c$2() {
	return c$2 = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var r = arguments[t];
			for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
		}
		return e;
	}, c$2.apply(null, arguments);
}
function i$1(e) {
	return i$1 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
		return e.__proto__ || Object.getPrototypeOf(e);
	}, i$1(e);
}
function u$1(e, t) {
	if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
	e.prototype = Object.create(t && t.prototype, { constructor: {
		value: e,
		writable: !0,
		configurable: !0
	} }), Object.defineProperty(e, "prototype", { writable: !1 }), t && y$2(e, t);
}
function l$2() {
	try {
		var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})));
	} catch (e) {}
	return (l$2 = function() {
		return !!e;
	})();
}
function f$1(e, t) {
	var r = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		t && (n = n.filter((function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		}))), r.push.apply(r, n);
	}
	return r;
}
function s$2(e) {
	for (var t = 1; t < arguments.length; t++) {
		var r = null != arguments[t] ? arguments[t] : {};
		t % 2 ? f$1(Object(r), !0).forEach((function(t) {
			a$3(e, t, r[t]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : f$1(Object(r)).forEach((function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
		}));
	}
	return e;
}
function p$2(e, t) {
	if (null == e) return {};
	var r, n, o = function(e, t) {
		if (null == e) return {};
		var r = {};
		for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
			if (t.includes(n)) continue;
			r[n] = e[n];
		}
		return r;
	}(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (n = 0; n < a.length; n++) r = a[n], t.includes(r) || {}.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
	}
	return o;
}
function y$2(e, t) {
	return y$2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
		return e.__proto__ = t, e;
	}, y$2(e, t);
}
function b$1(e, t) {
	var r, n = t.replacementChars, a = t.replacement, c = t.separate, i = n, u = "", l = o$1(e);
	try {
		for (l.s(); !(r = l.n()).done;) {
			var f, s = r.value, p = !Object.prototype.hasOwnProperty.call(a, s) && (null === (f = a[i[0]]) || void 0 === f ? void 0 : f.test(s));
			(c && s === i[0] || p) && (i = i.slice(1), u += s);
		}
	} catch (e) {
		l.e(e);
	} finally {
		l.f();
	}
	return u;
}
function v(e, t) {
	var r, n = t.mask, a = t.replacement, c = t.separate, i = t.showMask, u = 0, l = "", f = o$1(n);
	try {
		for (f.s(); !(r = f.n()).done;) {
			var s = r.value;
			if (!i && void 0 === e[u]) break;
			Object.prototype.hasOwnProperty.call(a, s) && void 0 !== e[u] ? l += e[u++] : l += s;
		}
	} catch (e) {
		f.e(e);
	} finally {
		f.f();
	}
	if (c && !i) {
		for (var p = n.length - 1; p >= 0 && l[p] === n[p]; p--);
		l = l.slice(0, p + 1);
	}
	return l;
}
function m(e, t) {
	for (var r = t.mask, n = t.replacement, o = [], a = 0; a < r.length; a++) {
		var c, i = null !== (c = e[a]) && void 0 !== c ? c : r[a], u = Object.prototype.hasOwnProperty.call(n, i) ? "replacement" : void 0 !== e[a] && e[a] !== r[a] ? "input" : "mask";
		o.push({
			type: u,
			value: i,
			index: a
		});
	}
	return o;
}
function O(e) {
	return e.length > 0 ? a$3({}, e, /./) : {};
}
function h(e, t) {
	for (var r = t.start, n = void 0 === r ? 0 : r, o = t.end, a = t.mask, c = t.replacement, i = t.separate, u = e.slice(n, o), l = a.slice(n, o), f = "", s = 0; s < l.length; s++) {
		var p = Object.prototype.hasOwnProperty.call(c, l[s]);
		p && void 0 !== u[s] && u[s] !== l[s] ? f += u[s] : p && i && (f += l[s]);
	}
	return f;
}
function d(e, t) {
	var r = t.mask, n = t.replacement, o = "string" == typeof n ? O(n) : n, a = RegExp("[^".concat(Object.keys(o).join(""), "]"), "g");
	return v(b$1(e, {
		replacementChars: r.replace(a, ""),
		replacement: o,
		separate: !1
	}), {
		mask: r,
		replacement: o,
		separate: !1,
		showMask: !1
	});
}
function g(e, t) {
	var r = t.mask, n = t.replacement, o = "string" == typeof n ? O(n) : n, a = h(e, {
		mask: r,
		replacement: o,
		separate: !1
	}), c = RegExp("[^".concat(Object.keys(o).join(""), "]"), "g");
	return b$1(a, {
		replacementChars: r.replace(c, ""),
		replacement: o,
		separate: !1
	});
}
function j(e, t) {
	var r = t.mask, n = t.replacement, o = "string" == typeof n ? O(n) : n;
	return m(d(e, {
		mask: r,
		replacement: o
	}), {
		mask: r,
		replacement: o
	});
}
var w$1 = [
	"[",
	"]",
	"\\",
	"/",
	"^",
	"$",
	".",
	"|",
	"?",
	"*",
	"+",
	"(",
	")",
	"{",
	"}"
];
function P(e) {
	return w$1.includes(e) ? "\\".concat(e) : e;
}
function k(e, t) {
	for (var r = t.mask, n = t.replacement, o = "string" == typeof n ? O(n) : n, a = "partial" === e || "partial-inexact" === e, c = "full" === e || "partial" === e, i = "", u = 0; u < r.length; u++) {
		var l = r[u];
		0 === u && (i = "^"), a && (i += "("), i += Object.prototype.hasOwnProperty.call(o, l) ? "".concat(c ? "(?!".concat(P(l), ")") : "", "(").concat(o[l].source, ")") : P(l), u === r.length - 1 && (a && (i += ")?".repeat(r.length)), i += "$");
	}
	return i;
}
//#endregion
//#region node_modules/@react-input/core/module/createProxy.js
function r$3(r, e) {
	return new Proxy(r, { set: function(n, t, u) {
		return "current" === t && (u !== r.current && (null !== r.current && e.unregister(r.current), null !== u && e.register(u)), n[t] = u, !0);
	} });
}
//#endregion
//#region node_modules/@react-input/core/module/helpers-C8k3UfPS.js
function t$2(t, e, r) {
	return e = o(e), function(t, e) {
		if (e && ("object" == typeof e || "function" == typeof e)) return e;
		if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
		return function(t) {
			if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
			return t;
		}(t);
	}(t, i() ? Reflect.construct(e, r || [], o(t).constructor) : e.apply(t, r));
}
function e$2(t, e) {
	if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function r$2(t, e, r) {
	return Object.defineProperty(t, "prototype", { writable: !1 }), t;
}
function n$2(t, e, r) {
	return (e = function(t) {
		var e = function(t, e) {
			if ("object" != typeof t || !t) return t;
			var r = t[Symbol.toPrimitive];
			if (void 0 !== r) {
				var n = r.call(t, e || "default");
				if ("object" != typeof n) return n;
				throw new TypeError("@@toPrimitive must return a primitive value.");
			}
			return ("string" === e ? String : Number)(t);
		}(t, "string");
		return "symbol" == typeof e ? e : e + "";
	}(e)) in t ? Object.defineProperty(t, e, {
		value: r,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : t[e] = r, t;
}
function o(t) {
	return o = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
		return t.__proto__ || Object.getPrototypeOf(t);
	}, o(t);
}
function u(t, e) {
	if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
	t.prototype = Object.create(e && e.prototype, { constructor: {
		value: t,
		writable: !0,
		configurable: !0
	} }), Object.defineProperty(t, "prototype", { writable: !1 }), e && a$2(t, e);
}
function i() {
	try {
		var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})));
	} catch (t) {}
	return (i = function() {
		return !!t;
	})();
}
function c$1(t, e) {
	var r = Object.keys(t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(t);
		e && (n = n.filter((function(e) {
			return Object.getOwnPropertyDescriptor(t, e).enumerable;
		}))), r.push.apply(r, n);
	}
	return r;
}
function f(t) {
	for (var e = 1; e < arguments.length; e++) {
		var r = null != arguments[e] ? arguments[e] : {};
		e % 2 ? c$1(Object(r), !0).forEach((function(e) {
			n$2(t, e, r[e]);
		})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : c$1(Object(r)).forEach((function(e) {
			Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e));
		}));
	}
	return t;
}
function p$1(t, e) {
	if (null == t) return {};
	var r, n, o = function(t, e) {
		if (null == t) return {};
		var r = {};
		for (var n in t) if ({}.hasOwnProperty.call(t, n)) {
			if (e.includes(n)) continue;
			r[n] = t[n];
		}
		return r;
	}(t, e);
	if (Object.getOwnPropertySymbols) {
		var u = Object.getOwnPropertySymbols(t);
		for (n = 0; n < u.length; n++) r = u[n], e.includes(r) || {}.propertyIsEnumerable.call(t, r) && (o[r] = t[r]);
	}
	return o;
}
function a$2(t, e) {
	return a$2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
		return t.__proto__ = e, t;
	}, a$2(t, e);
}
function l$1(t) {
	return l$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
		return typeof t;
	} : function(t) {
		return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
	}, l$1(t);
}
function y$1(t) {
	var e = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
	return y$1 = function(t) {
		if (null === t || !function(t) {
			try {
				return -1 !== Function.toString.call(t).indexOf("[native code]");
			} catch (e) {
				return "function" == typeof t;
			}
		}(t)) return t;
		if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
		if (void 0 !== e) {
			if (e.has(t)) return e.get(t);
			e.set(t, r);
		}
		function r() {
			return function(t, e, r) {
				if (i()) return Reflect.construct.apply(null, arguments);
				var n = [null];
				n.push.apply(n, e);
				var o = new (t.bind.apply(t, n))();
				return r && a$2(o, r.prototype), o;
			}(t, arguments, o(this).constructor);
		}
		return r.prototype = Object.create(t.prototype, { constructor: {
			value: r,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }), a$2(r, t);
	}, y$1(t);
}
//#endregion
//#region node_modules/@react-input/core/module/SyntheticChangeError.js
var n$1 = function(t) {
	function n(r) {
		var a;
		return e$2(this, n), (a = t$2(this, n, [r])).name = "SyntheticChangeError", a;
	}
	return u(n, t), r$2(n);
}(y$1(Error));
//#endregion
//#region node_modules/@react-input/core/module/Input.js
var l, a$1 = ["options"], r$1 = [
	"text",
	"email",
	"tel",
	"search",
	"url"
], s$1 = r$2((function e(l) {
	var s = l.init, c = l.tracking;
	e$2(this, e);
	var u = /* @__PURE__ */ new WeakMap();
	this.register = function(e) {
		var t;
		if (r$1.includes(e.type)) {
			var l = null !== (t = e._wrapperState) && void 0 !== t ? t : {}, d = l.initialValue, v = void 0 === d ? "" : d, p = l.controlled, h = void 0 !== p && p, f$2 = s({
				initialValue: e.value || v,
				controlled: h
			}), E = f$2.value, g = f$2.options, w = {
				value: E,
				options: g,
				fallbackOptions: g
			}, S = {
				id: -1,
				cachedId: -1
			}, m = {
				value: "",
				selectionStart: 0,
				selectionEnd: 0
			}, b = Object.getOwnPropertyDescriptor("_valueTracker" in e ? e : HTMLInputElement.prototype, "value");
			Object.defineProperty(e, "value", f(f({}, b), {}, { set: function(t) {
				var n;
				m.value = t, null == b || null === (n = b.set) || void 0 === n || n.call(e, t);
			} })), e.value = E;
			var y = function() {
				var t = function() {
					var n, o;
					m.selectionStart = null !== (n = e.selectionStart) && void 0 !== n ? n : 0, m.selectionEnd = null !== (o = e.selectionEnd) && void 0 !== o ? o : 0, S.id = window.setTimeout(t);
				};
				S.id = window.setTimeout(t);
			}, T = function() {
				window.clearTimeout(S.id), S.id = -1, S.cachedId = -1;
			}, k = function(t) {
				try {
					var n, l;
					if (S.cachedId === S.id) throw new n$1("The input selection has not been updated.");
					S.cachedId = S.id;
					var r = e.value, s = e.selectionStart, u = e.selectionEnd;
					if (null === s || null === u) throw new n$1("The selection attributes have not been initialized.");
					var d, v = m.value;
					if (void 0 === t.inputType && (m.selectionStart = 0, m.selectionEnd = v.length), s > m.selectionStart ? d = "insert" : s <= m.selectionStart && s < m.selectionEnd ? d = "deleteBackward" : s === m.selectionEnd && r.length < v.length && (d = "deleteForward"), void 0 === d || ("deleteBackward" === d || "deleteForward" === d) && r.length > v.length) throw new n$1("Input type detection error.");
					var p = "", h = m.selectionStart, f = m.selectionEnd;
					if ("insert" === d) p = r.slice(m.selectionStart, s);
					else {
						var E = v.length - r.length;
						h = s, f = s + E;
					}
					w.value !== v ? w.options = w.fallbackOptions : w.fallbackOptions = w.options;
					var g = w.options, b = c({
						inputType: d,
						previousValue: v,
						previousOptions: g,
						value: r,
						addedValue: p,
						changeStart: h,
						changeEnd: f,
						selectionStart: s,
						selectionEnd: u
					}), y = b.options, T = p$1(b, a$1);
					e.value = T.value, e.setSelectionRange(T.selectionStart, T.selectionEnd), w.value = T.value, w.options = y, m.selectionStart = T.selectionStart, m.selectionEnd = T.selectionEnd, null === (n = e._valueTracker) || void 0 === n || null === (l = n.setValue) || void 0 === l || l.call(n, v);
				} catch (n) {
					if (e.value = m.value, e.setSelectionRange(m.selectionStart, m.selectionEnd), t.preventDefault(), t.stopPropagation(), "SyntheticChangeError" !== n.name) throw n;
				}
			};
			document.activeElement === e && y(), e.addEventListener("focus", y), e.addEventListener("blur", T), e.addEventListener("input", k), u.set(e, {
				onFocus: y,
				onBlur: T,
				onInput: k
			});
		} else console.warn("Warn: The input element type does not match one of the types: ".concat(r$1.join(", "), "."));
	}, this.unregister = function(e) {
		var t = u.get(e);
		void 0 !== t && (e.removeEventListener("focus", t.onFocus), e.removeEventListener("blur", t.onBlur), e.removeEventListener("input", t.onInput), u.delete(e));
	};
}));
l = s$1, Object.defineProperty(l.prototype, Symbol.toStringTag, {
	writable: !1,
	enumerable: !1,
	configurable: !0,
	value: "Input"
});
//#endregion
//#region node_modules/@react-input/core/module/useConnectedRef.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function e$1(e, n) {
	return (0, import_react.useCallback)((function(t) {
		e.current = t, "function" == typeof n ? n(t) : "object" === l$1(n) && null !== n && (n.current = t);
	}), [e, n]);
}
//#endregion
//#region node_modules/@react-input/mask/module/Mask.js
var k$1 = function(e) {
	return function() {
		for (var t = arguments.length, a = new Array(t), n = 0; n < t; n++) a[n] = arguments[n];
		return new e("".concat(a.join("\n\n"), "\n"));
	};
};
var g$1, y = ["track", "modify"];
function w(e) {
	var t, a, n, r;
	return {
		mask: null !== (t = e.mask) && void 0 !== t ? t : "",
		replacement: "string" == typeof e.replacement ? O(e.replacement) : null !== (a = e.replacement) && void 0 !== a ? a : {},
		showMask: null !== (n = e.showMask) && void 0 !== n && n,
		separate: null !== (r = e.separate) && void 0 !== r && r,
		track: e.track,
		modify: e.modify
	};
}
var b = function(g$2) {
	function b() {
		var t, a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
		return r$4(this, b), (t = t$3(this, b, [{
			init: function(e) {
				var t = e.initialValue, n = e.controlled, r = w(a), i = r.mask, l = r.replacement, o = r.separate, s = r.showMask;
				return t = n || t ? t : s ? i : "", function(e) {
					var t = e.initialValue, a = e.mask, n = e.replacement;
					t.length > a.length && console.error(k$1(Error)("The initialized value of the `value` or `defaultValue` property is longer than the value specified in the `mask` property. Check the correctness of the initialized value in the specified property.", "Invalid value: \"".concat(t, "\"."), "To initialize an unmasked value, use the `format` utility. More details https://github.com/GoncharukOrg/react-input/tree/main/packages/mask#initializing-the-value."));
					var r = Object.keys(n).filter((function(e) {
						return e.length > 1;
					}));
					r.length > 0 && console.error(k$1(Error)("Object keys in the `replacement` property are longer than one character. Replacement keys must be one character long. Check the correctness of the value in the specified property.", "Invalid keys: ".concat(r.join(", "), "."), "To initialize an unmasked value, use the `format` utility. More details https://github.com/GoncharukOrg/react-input/tree/main/packages/mask#initializing-the-value."));
					for (var i = a.slice(0, t.length), l = -1, o = 0; o < i.length; o++) {
						var s = Object.prototype.hasOwnProperty.call(n, i[o]);
						if (!(i[o] === t[o] || s && n[i[o]].test(t[o]))) {
							l = o;
							break;
						}
					}
					-1 !== l && console.error(k$1(Error)("An invalid character was found in the initialized property value `value` or `defaultValue` (index: ".concat(l, "). Check the correctness of the initialized value in the specified property."), "Invalid value: \"".concat(t, "\"."), "To initialize an unmasked value, use the `format` utility. More details https://github.com/GoncharukOrg/react-input/tree/main/packages/mask#initializing-the-value."));
				}({
					initialValue: t,
					mask: i,
					replacement: l
				}), {
					value: t,
					options: {
						mask: i,
						replacement: l,
						separate: o
					}
				};
			},
			tracking: function(t) {
				var n = t.inputType, r = t.previousValue, i = t.previousOptions, l = t.addedValue, o = t.changeStart, s = t.changeEnd, m$2 = w(a), k = m$2.track, g = m$2.modify, b = p$2(m$2, y), O$1 = b.mask, j = b.replacement, T = b.showMask, V = b.separate, M = s$2(s$2({}, "insert" === n ? {
					inputType: n,
					data: l
				} : {
					inputType: n,
					data: null
				}), {}, {
					value: r,
					selectionStart: o,
					selectionEnd: s
				}), z = null == k ? void 0 : k(M);
				if (!1 === z) throw new n$1("Custom tracking stop.");
				null === z ? l = "" : !0 !== z && void 0 !== z && (l = z);
				var C = null == g ? void 0 : g(M);
				void 0 !== (null == C ? void 0 : C.mask) && (O$1 = C.mask), void 0 !== (null == C ? void 0 : C.replacement) && (j = "string" == typeof (null == C ? void 0 : C.replacement) ? O(null == C ? void 0 : C.replacement) : C.replacement), void 0 !== (null == C ? void 0 : C.showMask) && (T = C.showMask), void 0 !== (null == C ? void 0 : C.separate) && (V = C.separate);
				var E = h(r, s$2({ end: o }, i)), x = h(r, s$2({ start: s }, i)), P = RegExp("[^".concat(Object.keys(j).join(""), "]"), "g"), S = O$1.replace(P, "");
				if (E && (E = b$1(E, {
					replacementChars: S,
					replacement: j,
					separate: V
				}), S = S.slice(E.length)), l && (l = b$1(l, {
					replacementChars: S,
					replacement: j,
					separate: !1
				}), S = S.slice(l.length)), "insert" === n && "" === l) throw new n$1("The character does not match the key value of the `replacement` object.");
				if (V) {
					var I = O$1.slice(o, s).replace(P, ""), G = I.length - l.length;
					G < 0 ? x = x.slice(-G) : G > 0 && (x = I.slice(-G) + x);
				}
				x && (x = b$1(x, {
					replacementChars: S,
					replacement: j,
					separate: V
				}));
				var A = v(E + l + x, {
					mask: O$1,
					replacement: j,
					separate: V,
					showMask: T
				}), N = function(t) {
					var a, n, r, i = t.inputType, l = t.value, o = t.addedValue, s = t.beforeChangeValue, c = t.mask, u = t.replacement, p = t.separate, d = m(l, {
						mask: c,
						replacement: u
					}).filter((function(e) {
						var t = e.type;
						return "input" === t || p && "replacement" === t;
					})), h = null === (a = d[s.length + o.length - 1]) || void 0 === a ? void 0 : a.index, v = null === (n = d[s.length - 1]) || void 0 === n ? void 0 : n.index, m$1 = null === (r = d[s.length + o.length]) || void 0 === r ? void 0 : r.index;
					if ("insert" === i) {
						if (void 0 !== h) return h + 1;
						if (void 0 !== m$1) return m$1;
						if (void 0 !== v) return v + 1;
					}
					if ("deleteForward" === i) {
						if (void 0 !== m$1) return m$1;
						if (void 0 !== v) return v + 1;
					}
					if ("deleteBackward" === i) {
						if (void 0 !== v) return v + 1;
						if (void 0 !== m$1) return m$1;
					}
					var f = l.split("").findIndex((function(e) {
						return Object.prototype.hasOwnProperty.call(u, e);
					}));
					return -1 !== f ? f : l.length;
				}({
					inputType: n,
					value: A,
					addedValue: l,
					beforeChangeValue: E,
					mask: O$1,
					replacement: j,
					separate: V
				});
				return {
					value: A,
					selectionStart: N,
					selectionEnd: N,
					options: {
						mask: O$1,
						replacement: j,
						separate: V
					}
				};
			}
		}])).format = function(e) {
			return d(e, w(a));
		}, t.formatToParts = function(e) {
			return j(e, w(a));
		}, t.unformat = function(e) {
			return g(e, w(a));
		}, t.generatePattern = function(e) {
			return k(e, w(a));
		}, t;
	}
	return u$1(b, s$1), n$3(b);
}();
g$1 = b, Object.defineProperty(g$1.prototype, Symbol.toStringTag, {
	writable: !1,
	enumerable: !1,
	configurable: !0,
	value: "Mask"
});
//#endregion
//#region node_modules/@react-input/mask/module/useMask.js
function n() {
	var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, c = n.mask, o = n.replacement, m = n.showMask, s = n.separate, u = n.track, p = n.modify, i = (0, import_react.useRef)(null), k = (0, import_react.useRef)({
		mask: c,
		replacement: o,
		showMask: m,
		separate: s,
		track: u,
		modify: p
	});
	return k.current.mask = c, k.current.replacement = o, k.current.showMask = m, k.current.separate = s, k.current.track = u, k.current.modify = p, (0, import_react.useMemo)((function() {
		return r$3(i, new b(k.current));
	}), []);
}
//#endregion
//#region node_modules/@react-input/mask/module/InputMask.js
var s = [
	"component",
	"mask",
	"replacement",
	"showMask",
	"separate",
	"track",
	"modify"
];
function p(t, p) {
	var c = t.component, n$4 = t.mask, f = t.replacement, i = t.showMask, k = t.separate, l = t.track, u = t.modify, d = p$2(t, s), M = e$1(n({
		mask: n$4,
		replacement: f,
		showMask: i,
		separate: k,
		track: l,
		modify: u
	}), p);
	return c ? import_react.createElement(c, c$2({ ref: M }, d)) : import_react.createElement("input", c$2({ ref: M }, d));
}
var c = (0, import_react.forwardRef)(p);
//#endregion
export { c as InputMask, b as Mask, d as format, j as formatToParts, k as generatePattern, g as unformat, n as useMask };

//# sourceMappingURL=@react-input_mask.js.map