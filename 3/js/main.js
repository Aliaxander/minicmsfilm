(function(window, undefined) {
    var rootjQuery, readyList, document = window.document, location = window.location, navigator = window.navigator, _jQuery = window.jQuery, _$ = window.$, core_push = Array.prototype.push, core_slice = Array.prototype.slice, core_indexOf = Array.prototype.indexOf, core_toString = Object.prototype.toString, core_hasOwn = Object.prototype.hasOwnProperty, core_trim = String.prototype.trim, jQuery = function(selector, context) {
        return new jQuery.fn.init(selector,context,rootjQuery)
    }, core_pnum = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, core_rnotwhite = /\S/, core_rspace = /\s+/, rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, rvalidchars = /^[\],:{}\s]*$/, rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g, rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function(all, letter) {
        return (letter + "").toUpperCase()
    }, DOMContentLoaded = function() {
        if (document.addEventListener) {
            document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
            jQuery.ready()
        } else if (document.readyState === "complete") {
            document.detachEvent("onreadystatechange", DOMContentLoaded);
            jQuery.ready()
        }
    }, class2type = {};
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        init: function(selector, context, rootjQuery) {
            var match, elem, ret, doc;
            if (!selector) {
                return this
            }
            if (selector.nodeType) {
                this.context = this[0] = selector;
                this.length = 1;
                return this
            }
            if (typeof selector === "string") {
                if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
                    match = [null, selector, null]
                } else {
                    match = rquickExpr.exec(selector)
                }
                if (match && (match[1] || !context)) {
                    if (match[1]) {
                        context = context instanceof jQuery ? context[0] : context;
                        doc = (context && context.nodeType ? context.ownerDocument || context : document);
                        selector = jQuery.parseHTML(match[1], doc, true);
                        if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                            this.attr.call(selector, context, true)
                        }
                        return jQuery.merge(this, selector)
                    } else {
                        elem = document.getElementById(match[2]);
                        if (elem && elem.parentNode) {
                            if (elem.id !== match[2]) {
                                return rootjQuery.find(selector)
                            }
                            this.length = 1;
                            this[0] = elem
                        }
                        this.context = document;
                        this.selector = selector;
                        return this
                    }
                } else if (!context || context.jquery) {
                    return (context || rootjQuery).find(selector)
                } else {
                    return this.constructor(context).find(selector)
                }
            } else if (jQuery.isFunction(selector)) {
                return rootjQuery.ready(selector)
            }
            if (selector.selector !== undefined) {
                this.selector = selector.selector;
                this.context = selector.context
            }
            return jQuery.makeArray(selector, this)
        },
        selector: "",
        jquery: "1.8.2",
        length: 0,
        size: function() {
            return this.length
        },
        toArray: function() {
            return core_slice.call(this)
        },
        get: function(num) {
            return num == null ? this.toArray() : (num < 0 ? this[this.length + num] : this[num])
        },
        pushStack: function(elems, name, selector) {
            var ret = jQuery.merge(this.constructor(), elems);
            ret.prevObject = this;
            ret.context = this.context;
            if (name === "find") {
                ret.selector = this.selector + (this.selector ? " " : "") + selector
            } else if (name) {
                ret.selector = this.selector + "." + name + "(" + selector + ")"
            }
            return ret
        },
        each: function(callback, args) {
            return jQuery.each(this, callback, args)
        },
        ready: function(fn) {
            jQuery.ready.promise().done(fn);
            return this
        },
        eq: function(i) {
            i = +i;
            return i === -1 ? this.slice(i) : this.slice(i, i + 1)
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        slice: function() {
            return this.pushStack(core_slice.apply(this, arguments), "slice", core_slice.call(arguments).join(","))
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: core_push,
        sort: [].sort,
        splice: [].splice
    };
    jQuery.fn.init.prototype = jQuery.fn;
    jQuery.extend = jQuery.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            i = 2
        }
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
            target = {}
        }
        if (length === i) {
            target = this;
            --i
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue
                    }
                    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : []
                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {}
                        }
                        target[name] = jQuery.extend(deep, clone, copy)
                    } else if (copy !== undefined) {
                        target[name] = copy
                    }
                }
            }
        }
        return target
    }
    ;
    jQuery.extend({
        noConflict: function(deep) {
            if (window.$ === jQuery) {
                window.$ = _$
            }
            if (deep && window.jQuery === jQuery) {
                window.jQuery = _jQuery
            }
            return jQuery
        },
        isReady: false,
        readyWait: 1,
        holdReady: function(hold) {
            if (hold) {
                jQuery.readyWait++
            } else {
                jQuery.ready(true)
            }
        },
        ready: function(wait) {
            if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                return
            }
            if (!document.body) {
                return setTimeout(jQuery.ready, 1)
            }
            jQuery.isReady = true;
            if (wait !== true && --jQuery.readyWait > 0) {
                return
            }
            readyList.resolveWith(document, [jQuery]);
            if (jQuery.fn.trigger) {
                jQuery(document).trigger("ready").off("ready")
            }
        },
        isFunction: function(obj) {
            return jQuery.type(obj) === "function"
        },
        isArray: Array.isArray || function(obj) {
            return jQuery.type(obj) === "array"
        }
        ,
        isWindow: function(obj) {
            return obj != null && obj == obj.window
        },
        isNumeric: function(obj) {
            return !isNaN(parseFloat(obj)) && isFinite(obj)
        },
        type: function(obj) {
            return obj == null ? String(obj) : class2type[core_toString.call(obj)] || "object"
        },
        isPlainObject: function(obj) {
            if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                return false
            }
            try {
                if (obj.constructor && !core_hasOwn.call(obj, "constructor") && !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return false
                }
            } catch (e) {
                return false
            }
            var key;
            for (key in obj) {}
            return key === undefined || core_hasOwn.call(obj, key)
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) {
                return false
            }
            return true
        },
        error: function(msg) {
            throw new Error(msg)
        },
        parseHTML: function(data, context, scripts) {
            var parsed;
            if (!data || typeof data !== "string") {
                return null
            }
            if (typeof context === "boolean") {
                scripts = context;
                context = 0
            }
            context = context || document;
            if ((parsed = rsingleTag.exec(data))) {
                return [context.createElement(parsed[1])]
            }
            parsed = jQuery.buildFragment([data], context, scripts ? null : []);
            return jQuery.merge([], (parsed.cacheable ? jQuery.clone(parsed.fragment) : parsed.fragment).childNodes)
        },
        parseJSON: function(data) {
            if (!data || typeof data !== "string") {
                return null
            }
            data = jQuery.trim(data);
            if (window.JSON && window.JSON.parse) {
                return window.JSON.parse(data)
            }
            if (rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, ""))) {
                return (new Function("return " + data))()
            }
            jQuery.error("Invalid JSON: " + data)
        },
        parseXML: function(data) {
            var xml, tmp;
            if (!data || typeof data !== "string") {
                return null
            }
            try {
                if (window.DOMParser) {
                    tmp = new DOMParser();
                    xml = tmp.parseFromString(data, "text/xml")
                } else {
                    xml = new ActiveXObject("Microsoft.XMLDOM");
                    xml.async = "false";
                    xml.loadXML(data)
                }
            } catch (e) {
                xml = undefined
            }
            if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
                jQuery.error("Invalid XML: " + data)
            }
            return xml
        },
        noop: function() {},
        globalEval: function(data) {
            if (data && core_rnotwhite.test(data)) {
                (window.execScript || function(data) {
                    window["eval"].call(window, data)
                }
                )(data)
            }
        },
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
        },
        each: function(obj, callback, args) {
            var name, i = 0, length = obj.length, isObj = length === undefined || jQuery.isFunction(obj);
            if (args) {
                if (isObj) {
                    for (name in obj) {
                        if (callback.apply(obj[name], args) === false) {
                            break
                        }
                    }
                } else {
                    for (; i < length; ) {
                        if (callback.apply(obj[i++], args) === false) {
                            break
                        }
                    }
                }
            } else {
                if (isObj) {
                    for (name in obj) {
                        if (callback.call(obj[name], name, obj[name]) === false) {
                            break
                        }
                    }
                } else {
                    for (; i < length; ) {
                        if (callback.call(obj[i], i, obj[i++]) === false) {
                            break
                        }
                    }
                }
            }
            return obj
        },
        trim: core_trim && !core_trim.call("\uFEFF\xA0") ? function(text) {
            return text == null ? "" : core_trim.call(text)
        }
        : function(text) {
            return text == null ? "" : (text + "").replace(rtrim, "")
        }
        ,
        makeArray: function(arr, results) {
            var type, ret = results || [];
            if (arr != null) {
                type = jQuery.type(arr);
                if (arr.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow(arr)) {
                    core_push.call(ret, arr)
                } else {
                    jQuery.merge(ret, arr)
                }
            }
            return ret
        },
        inArray: function(elem, arr, i) {
            var len;
            if (arr) {
                if (core_indexOf) {
                    return core_indexOf.call(arr, elem, i)
                }
                len = arr.length;
                i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
                for (; i < len; i++) {
                    if (i in arr && arr[i] === elem) {
                        return i
                    }
                }
            }
            return -1
        },
        merge: function(first, second) {
            var l = second.length
              , i = first.length
              , j = 0;
            if (typeof l === "number") {
                for (; j < l; j++) {
                    first[i++] = second[j]
                }
            } else {
                while (second[j] !== undefined) {
                    first[i++] = second[j++]
                }
            }
            first.length = i;
            return first
        },
        grep: function(elems, callback, inv) {
            var retVal, ret = [], i = 0, length = elems.length;
            inv = !!inv;
            for (; i < length; i++) {
                retVal = !!callback(elems[i], i);
                if (inv !== retVal) {
                    ret.push(elems[i])
                }
            }
            return ret
        },
        map: function(elems, callback, arg) {
            var value, key, ret = [], i = 0, length = elems.length, isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ((length > 0 && elems[0] && elems[length - 1]) || length === 0 || jQuery.isArray(elems));
            if (isArray) {
                for (; i < length; i++) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret[ret.length] = value
                    }
                }
            } else {
                for (key in elems) {
                    value = callback(elems[key], key, arg);
                    if (value != null) {
                        ret[ret.length] = value
                    }
                }
            }
            return ret.concat.apply([], ret)
        },
        guid: 1,
        proxy: function(fn, context) {
            var tmp, args, proxy;
            if (typeof context === "string") {
                tmp = fn[context];
                context = fn;
                fn = tmp
            }
            if (!jQuery.isFunction(fn)) {
                return undefined
            }
            args = core_slice.call(arguments, 2);
            proxy = function() {
                return fn.apply(context, args.concat(core_slice.call(arguments)))
            }
            ;
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;
            return proxy
        },
        access: function(elems, fn, key, value, chainable, emptyGet, pass) {
            var exec, bulk = key == null, i = 0, length = elems.length;
            if (key && typeof key === "object") {
                for (i in key) {
                    jQuery.access(elems, fn, i, key[i], 1, emptyGet, value)
                }
                chainable = 1
            } else if (value !== undefined) {
                exec = pass === undefined && jQuery.isFunction(value);
                if (bulk) {
                    if (exec) {
                        exec = fn;
                        fn = function(elem, key, value) {
                            return exec.call(jQuery(elem), value)
                        }
                    } else {
                        fn.call(elems, value);
                        fn = null
                    }
                }
                if (fn) {
                    for (; i < length; i++) {
                        fn(elems[i], key, exec ? value.call(elems[i], i, fn(elems[i], key)) : value, pass)
                    }
                }
                chainable = 1
            }
            return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet
        },
        now: function() {
            return (new Date()).getTime()
        }
    });
    jQuery.ready.promise = function(obj) {
        if (!readyList) {
            readyList = jQuery.Deferred();
            if (document.readyState === "complete") {
                setTimeout(jQuery.ready, 1)
            } else if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
                window.addEventListener("load", jQuery.ready, false)
            } else {
                document.attachEvent("onreadystatechange", DOMContentLoaded);
                window.attachEvent("onload", jQuery.ready);
                var top = false;
                try {
                    top = window.frameElement == null && document.documentElement
                } catch (e) {}
                if (top && top.doScroll) {
                    (function doScrollCheck() {
                        if (!jQuery.isReady) {
                            try {
                                top.doScroll("left")
                            } catch (e) {
                                return setTimeout(doScrollCheck, 50)
                            }
                            jQuery.ready()
                        }
                    }
                    )()
                }
            }
        }
        return readyList.promise(obj)
    }
    ;
    jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase()
    });
    rootjQuery = jQuery(document);
    var optionsCache = {};
    function createOptions(options) {
        var object = optionsCache[options] = {};
        jQuery.each(options.split(core_rspace), function(_, flag) {
            object[flag] = true
        });
        return object
    }
    jQuery.Callbacks = function(options) {
        options = typeof options === "string" ? (optionsCache[options] || createOptions(options)) : jQuery.extend({}, options);
        var memory, fired, firing, firingStart, firingLength, firingIndex, list = [], stack = !options.once && [], fire = function(data) {
            memory = options.memory && data;
            fired = true;
            firingIndex = firingStart || 0;
            firingStart = 0;
            firingLength = list.length;
            firing = true;
            for (; list && firingIndex < firingLength; firingIndex++) {
                if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
                    memory = false;
                    break
                }
            }
            firing = false;
            if (list) {
                if (stack) {
                    if (stack.length) {
                        fire(stack.shift())
                    }
                } else if (memory) {
                    list = []
                } else {
                    self.disable()
                }
            }
        }, self = {
            add: function() {
                if (list) {
                    var start = list.length;
                    (function add(args) {
                        jQuery.each(args, function(_, arg) {
                            var type = jQuery.type(arg);
                            if (type === "function" && (!options.unique || !self.has(arg))) {
                                list.push(arg)
                            } else if (arg && arg.length && type !== "string") {
                                add(arg)
                            }
                        })
                    }
                    )(arguments);
                    if (firing) {
                        firingLength = list.length
                    } else if (memory) {
                        firingStart = start;
                        fire(memory)
                    }
                }
                return this
            },
            remove: function() {
                if (list) {
                    jQuery.each(arguments, function(_, arg) {
                        var index;
                        while ((index = jQuery.inArray(arg, list, index)) > -1) {
                            list.splice(index, 1);
                            if (firing) {
                                if (index <= firingLength) {
                                    firingLength--
                                }
                                if (index <= firingIndex) {
                                    firingIndex--
                                }
                            }
                        }
                    })
                }
                return this
            },
            has: function(fn) {
                return jQuery.inArray(fn, list) > -1
            },
            empty: function() {
                list = [];
                return this
            },
            disable: function() {
                list = stack = memory = undefined;
                return this
            },
            disabled: function() {
                return !list
            },
            lock: function() {
                stack = undefined;
                if (!memory) {
                    self.disable()
                }
                return this
            },
            locked: function() {
                return !stack
            },
            fireWith: function(context, args) {
                args = args || [];
                args = [context, args.slice ? args.slice() : args];
                if (list && (!fired || stack)) {
                    if (firing) {
                        stack.push(args)
                    } else {
                        fire(args)
                    }
                }
                return this
            },
            fire: function() {
                self.fireWith(this, arguments);
                return this
            },
            fired: function() {
                return !!fired
            }
        };
        return self
    }
    ;
    jQuery.extend({
        Deferred: function(func) {
            var tuples = [["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]]
              , state = "pending"
              , promise = {
                state: function() {
                    return state
                },
                always: function() {
                    deferred.done(arguments).fail(arguments);
                    return this
                },
                then: function() {
                    var fns = arguments;
                    return jQuery.Deferred(function(newDefer) {
                        jQuery.each(tuples, function(i, tuple) {
                            var action = tuple[0]
                              , fn = fns[i];
                            deferred[tuple[1]](jQuery.isFunction(fn) ? function() {
                                var returned = fn.apply(this, arguments);
                                if (returned && jQuery.isFunction(returned.promise)) {
                                    returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify)
                                } else {
                                    newDefer[action + "With"](this === deferred ? newDefer : this, [returned])
                                }
                            }
                            : newDefer[action])
                        });
                        fns = null
                    }).promise()
                },
                promise: function(obj) {
                    return obj != null ? jQuery.extend(obj, promise) : promise
                }
            }
              , deferred = {};
            promise.pipe = promise.then;
            jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2]
                  , stateString = tuple[3];
                promise[tuple[1]] = list.add;
                if (stateString) {
                    list.add(function() {
                        state = stateString
                    }, tuples[i ^ 1][2].disable, tuples[2][2].lock)
                }
                deferred[tuple[0]] = list.fire;
                deferred[tuple[0] + "With"] = list.fireWith
            });
            promise.promise(deferred);
            if (func) {
                func.call(deferred, deferred)
            }
            return deferred
        },
        when: function(subordinate) {
            var i = 0, resolveValues = core_slice.call(arguments), length = resolveValues.length, remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0, deferred = remaining === 1 ? subordinate : jQuery.Deferred(), updateFunc = function(i, contexts, values) {
                return function(value) {
                    contexts[i] = this;
                    values[i] = arguments.length > 1 ? core_slice.call(arguments) : value;
                    if (values === progressValues) {
                        deferred.notifyWith(contexts, values)
                    } else if (!(--remaining)) {
                        deferred.resolveWith(contexts, values)
                    }
                }
            }, progressValues, progressContexts, resolveContexts;
            if (length > 1) {
                progressValues = new Array(length);
                progressContexts = new Array(length);
                resolveContexts = new Array(length);
                for (; i < length; i++) {
                    if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
                        resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues))
                    } else {
                        --remaining
                    }
                }
            }
            if (!remaining) {
                deferred.resolveWith(resolveContexts, resolveValues)
            }
            return deferred.promise()
        }
    });
    jQuery.support = (function() {
        var support, all, a, select, opt, input, fragment, eventName, i, isSupported, clickFn, div = document.createElement("div");
        div.setAttribute("className", "t");
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        all = div.getElementsByTagName("*");
        a = div.getElementsByTagName("a")[0];
        a.style.cssText = "top:1px;float:left;opacity:.5";
        if (!all || !all.length) {
            return {}
        }
        select = document.createElement("select");
        opt = select.appendChild(document.createElement("option"));
        input = div.getElementsByTagName("input")[0];
        support = {
            leadingWhitespace: (div.firstChild.nodeType === 3),
            tbody: !div.getElementsByTagName("tbody").length,
            htmlSerialize: !!div.getElementsByTagName("link").length,
            style: /top/.test(a.getAttribute("style")),
            hrefNormalized: (a.getAttribute("href") === "/a"),
            opacity: /^0.5/.test(a.style.opacity),
            cssFloat: !!a.style.cssFloat,
            checkOn: (input.value === "on"),
            optSelected: opt.selected,
            getSetAttribute: div.className !== "t",
            enctype: !!document.createElement("form").enctype,
            html5Clone: document.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>",
            boxModel: (document.compatMode === "CSS1Compat"),
            submitBubbles: true,
            changeBubbles: true,
            focusinBubbles: false,
            deleteExpando: true,
            noCloneEvent: true,
            inlineBlockNeedsLayout: false,
            shrinkWrapBlocks: false,
            reliableMarginRight: true,
            boxSizingReliable: true,
            pixelPosition: false
        };
        input.checked = true;
        support.noCloneChecked = input.cloneNode(true).checked;
        select.disabled = true;
        support.optDisabled = !opt.disabled;
        try {
            delete div.test
        } catch (e) {
            support.deleteExpando = false
        }
        if (!div.addEventListener && div.attachEvent && div.fireEvent) {
            div.attachEvent("onclick", clickFn = function() {
                support.noCloneEvent = false
            }
            );
            div.cloneNode(true).fireEvent("onclick");
            div.detachEvent("onclick", clickFn)
        }
        input = document.createElement("input");
        input.value = "t";
        input.setAttribute("type", "radio");
        support.radioValue = input.value === "t";
        input.setAttribute("checked", "checked");
        input.setAttribute("name", "t");
        div.appendChild(input);
        fragment = document.createDocumentFragment();
        fragment.appendChild(div.lastChild);
        support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;
        support.appendChecked = input.checked;
        fragment.removeChild(input);
        fragment.appendChild(div);
        if (div.attachEvent) {
            for (i in {
                submit: true,
                change: true,
                focusin: true
            }) {
                eventName = "on" + i;
                isSupported = (eventName in div);
                if (!isSupported) {
                    div.setAttribute(eventName, "return;");
                    isSupported = (typeof div[eventName] === "function")
                }
                support[i + "Bubbles"] = isSupported
            }
        }
        jQuery(function() {
            var container, div, tds, marginDiv, divReset = "padding:0;margin:0;border:0;display:block;overflow:hidden;", body = document.getElementsByTagName("body")[0];
            if (!body) {
                return
            }
            container = document.createElement("div");
            container.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px";
            body.insertBefore(container, body.firstChild);
            div = document.createElement("div");
            container.appendChild(div);
            div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
            tds = div.getElementsByTagName("td");
            tds[0].style.cssText = "padding:0;margin:0;border:0;display:none";
            isSupported = (tds[0].offsetHeight === 0);
            tds[0].style.display = "";
            tds[1].style.display = "none";
            support.reliableHiddenOffsets = isSupported && (tds[0].offsetHeight === 0);
            div.innerHTML = "";
            div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
            support.boxSizing = (div.offsetWidth === 4);
            support.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== 1);
            if (window.getComputedStyle) {
                support.pixelPosition = (window.getComputedStyle(div, null) || {}).top !== "1%";
                support.boxSizingReliable = (window.getComputedStyle(div, null) || {
                    width: "4px"
                }).width === "4px";
                marginDiv = document.createElement("div");
                marginDiv.style.cssText = div.style.cssText = divReset;
                marginDiv.style.marginRight = marginDiv.style.width = "0";
                div.style.width = "1px";
                div.appendChild(marginDiv);
                support.reliableMarginRight = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight)
            }
            if (typeof div.style.zoom !== "undefined") {
                div.innerHTML = "";
                div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
                support.inlineBlockNeedsLayout = (div.offsetWidth === 3);
                div.style.display = "block";
                div.style.overflow = "visible";
                div.innerHTML = "<div></div>";
                div.firstChild.style.width = "5px";
                support.shrinkWrapBlocks = (div.offsetWidth !== 3);
                container.style.zoom = 1
            }
            body.removeChild(container);
            container = div = tds = marginDiv = null
        });
        fragment.removeChild(div);
        all = a = select = opt = input = fragment = div = null;
        return support
    }
    )();
    var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/
      , rmultiDash = /([A-Z])/g;
    jQuery.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + (jQuery.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            "embed": true,
            "object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            "applet": true
        },
        hasData: function(elem) {
            elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
            return !!elem && !isEmptyDataObject(elem)
        },
        data: function(elem, name, data, pvt) {
            if (!jQuery.acceptData(elem)) {
                return
            }
            var thisCache, ret, internalKey = jQuery.expando, getByName = typeof name === "string", isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
            if ((!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined) {
                return
            }
            if (!id) {
                if (isNode) {
                    elem[internalKey] = id = jQuery.deletedIds.pop() || jQuery.guid++
                } else {
                    id = internalKey
                }
            }
            if (!cache[id]) {
                cache[id] = {};
                if (!isNode) {
                    cache[id].toJSON = jQuery.noop
                }
            }
            if (typeof name === "object" || typeof name === "function") {
                if (pvt) {
                    cache[id] = jQuery.extend(cache[id], name)
                } else {
                    cache[id].data = jQuery.extend(cache[id].data, name)
                }
            }
            thisCache = cache[id];
            if (!pvt) {
                if (!thisCache.data) {
                    thisCache.data = {}
                }
                thisCache = thisCache.data
            }
            if (data !== undefined) {
                thisCache[jQuery.camelCase(name)] = data
            }
            if (getByName) {
                ret = thisCache[name];
                if (ret == null) {
                    ret = thisCache[jQuery.camelCase(name)]
                }
            } else {
                ret = thisCache
            }
            return ret
        },
        removeData: function(elem, name, pvt) {
            if (!jQuery.acceptData(elem)) {
                return
            }
            var thisCache, i, l, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[jQuery.expando] : jQuery.expando;
            if (!cache[id]) {
                return
            }
            if (name) {
                thisCache = pvt ? cache[id] : cache[id].data;
                if (thisCache) {
                    if (!jQuery.isArray(name)) {
                        if (name in thisCache) {
                            name = [name]
                        } else {
                            name = jQuery.camelCase(name);
                            if (name in thisCache) {
                                name = [name]
                            } else {
                                name = name.split(" ")
                            }
                        }
                    }
                    for (i = 0,
                    l = name.length; i < l; i++) {
                        delete thisCache[name[i]]
                    }
                    if (!(pvt ? isEmptyDataObject : jQuery.isEmptyObject)(thisCache)) {
                        return
                    }
                }
            }
            if (!pvt) {
                delete cache[id].data;
                if (!isEmptyDataObject(cache[id])) {
                    return
                }
            }
            if (isNode) {
                jQuery.cleanData([elem], true)
            } else if (jQuery.support.deleteExpando || cache != cache.window) {
                delete cache[id]
            } else {
                cache[id] = null
            }
        },
        _data: function(elem, name, data) {
            return jQuery.data(elem, name, data, true)
        },
        acceptData: function(elem) {
            var noData = elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()];
            return !noData || noData !== true && elem.getAttribute("classid") === noData
        }
    });
    jQuery.fn.extend({
        data: function(key, value) {
            var parts, part, attr, name, l, elem = this[0], i = 0, data = null;
            if (key === undefined) {
                if (this.length) {
                    data = jQuery.data(elem);
                    if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
                        attr = elem.attributes;
                        for (l = attr.length; i < l; i++) {
                            name = attr[i].name;
                            if (!name.indexOf("data-")) {
                                name = jQuery.camelCase(name.substring(5));
                                dataAttr(elem, name, data[name])
                            }
                        }
                        jQuery._data(elem, "parsedAttrs", true)
                    }
                }
                return data
            }
            if (typeof key === "object") {
                return this.each(function() {
                    jQuery.data(this, key)
                })
            }
            parts = key.split(".", 2);
            parts[1] = parts[1] ? "." + parts[1] : "";
            part = parts[1] + "!";
            return jQuery.access(this, function(value) {
                if (value === undefined) {
                    data = this.triggerHandler("getData" + part, [parts[0]]);
                    if (data === undefined && elem) {
                        data = jQuery.data(elem, key);
                        data = dataAttr(elem, key, data)
                    }
                    return data === undefined && parts[1] ? this.data(parts[0]) : data
                }
                parts[1] = value;
                this.each(function() {
                    var self = jQuery(this);
                    self.triggerHandler("setData" + part, parts);
                    jQuery.data(this, key, value);
                    self.triggerHandler("changeData" + part, parts)
                })
            }, null, value, arguments.length > 1, null, false)
        },
        removeData: function(key) {
            return this.each(function() {
                jQuery.removeData(this, key)
            })
        }
    });
    function dataAttr(elem, key, data) {
        if (data === undefined && elem.nodeType === 1) {
            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
            data = elem.getAttribute(name);
            if (typeof data === "string") {
                try {
                    data = data === "true" ? true : data === "false" ? false : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data
                } catch (e) {}
                jQuery.data(elem, key, data)
            } else {
                data = undefined
            }
        }
        return data
    }
    function isEmptyDataObject(obj) {
        var name;
        for (name in obj) {
            if (name === "data" && jQuery.isEmptyObject(obj[name])) {
                continue
            }
            if (name !== "toJSON") {
                return false
            }
        }
        return true
    }
    jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            if (elem) {
                type = (type || "fx") + "queue";
                queue = jQuery._data(elem, type);
                if (data) {
                    if (!queue || jQuery.isArray(data)) {
                        queue = jQuery._data(elem, type, jQuery.makeArray(data))
                    } else {
                        queue.push(data)
                    }
                }
                return queue || []
            }
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type)
              , startLength = queue.length
              , fn = queue.shift()
              , hooks = jQuery._queueHooks(elem, type)
              , next = function() {
                jQuery.dequeue(elem, type)
            };
            if (fn === "inprogress") {
                fn = queue.shift();
                startLength--
            }
            if (fn) {
                if (type === "fx") {
                    queue.unshift("inprogress")
                }
                delete hooks.stop;
                fn.call(elem, next, hooks)
            }
            if (!startLength && hooks) {
                hooks.empty.fire()
            }
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return jQuery._data(elem, key) || jQuery._data(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    jQuery.removeData(elem, type + "queue", true);
                    jQuery.removeData(elem, key, true)
                })
            })
        }
    });
    jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            if (typeof type !== "string") {
                data = type;
                type = "fx";
                setter--
            }
            if (arguments.length < setter) {
                return jQuery.queue(this[0], type)
            }
            return data === undefined ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type);
                if (type === "fx" && queue[0] !== "inprogress") {
                    jQuery.dequeue(this, type)
                }
            })
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type)
            })
        },
        delay: function(time, type) {
            time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
            type = type || "fx";
            return this.queue(type, function(next, hooks) {
                var timeout = setTimeout(next, time);
                hooks.stop = function() {
                    clearTimeout(timeout)
                }
            })
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", [])
        },
        promise: function(type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
                if (!(--count)) {
                    defer.resolveWith(elements, [elements])
                }
            };
            if (typeof type !== "string") {
                obj = type;
                type = undefined
            }
            type = type || "fx";
            while (i--) {
                tmp = jQuery._data(elements[i], type + "queueHooks");
                if (tmp && tmp.empty) {
                    count++;
                    tmp.empty.add(resolve)
                }
            }
            resolve();
            return defer.promise(obj)
        }
    });
    var nodeHook, boolHook, fixSpecified, rclass = /[\t\r\n]/g, rreturn = /\r/g, rtype = /^(?:button|input)$/i, rfocusable = /^(?:button|input|object|select|textarea)$/i, rclickable = /^a(?:rea|)$/i, rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, getSetAttribute = jQuery.support.getSetAttribute;
    jQuery.fn.extend({
        attr: function(name, value) {
            return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1)
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name)
            })
        },
        prop: function(name, value) {
            return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1)
        },
        removeProp: function(name) {
            name = jQuery.propFix[name] || name;
            return this.each(function() {
                try {
                    this[name] = undefined;
                    delete this[name]
                } catch (e) {}
            })
        },
        addClass: function(value) {
            var classNames, i, l, elem, setClass, c, cl;
            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).addClass(value.call(this, j, this.className))
                })
            }
            if (value && typeof value === "string") {
                classNames = value.split(core_rspace);
                for (i = 0,
                l = this.length; i < l; i++) {
                    elem = this[i];
                    if (elem.nodeType === 1) {
                        if (!elem.className && classNames.length === 1) {
                            elem.className = value
                        } else {
                            setClass = " " + elem.className + " ";
                            for (c = 0,
                            cl = classNames.length; c < cl; c++) {
                                if (setClass.indexOf(" " + classNames[c] + " ") < 0) {
                                    setClass += classNames[c] + " "
                                }
                            }
                            elem.className = jQuery.trim(setClass)
                        }
                    }
                }
            }
            return this
        },
        removeClass: function(value) {
            var removes, className, elem, c, cl, i, l;
            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).removeClass(value.call(this, j, this.className))
                })
            }
            if ((value && typeof value === "string") || value === undefined) {
                removes = (value || "").split(core_rspace);
                for (i = 0,
                l = this.length; i < l; i++) {
                    elem = this[i];
                    if (elem.nodeType === 1 && elem.className) {
                        className = (" " + elem.className + " ").replace(rclass, " ");
                        for (c = 0,
                        cl = removes.length; c < cl; c++) {
                            while (className.indexOf(" " + removes[c] + " ") >= 0) {
                                className = className.replace(" " + removes[c] + " ", " ")
                            }
                        }
                        elem.className = value ? jQuery.trim(className) : ""
                    }
                }
            }
            return this
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value
              , isBool = typeof stateVal === "boolean";
            if (jQuery.isFunction(value)) {
                return this.each(function(i) {
                    jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal)
                })
            }
            return this.each(function() {
                if (type === "string") {
                    var className, i = 0, self = jQuery(this), state = stateVal, classNames = value.split(core_rspace);
                    while ((className = classNames[i++])) {
                        state = isBool ? state : !self.hasClass(className);
                        self[state ? "addClass" : "removeClass"](className)
                    }
                } else if (type === "undefined" || type === "boolean") {
                    if (this.className) {
                        jQuery._data(this, "__className__", this.className)
                    }
                    this.className = this.className || value === false ? "" : jQuery._data(this, "__className__") || ""
                }
            })
        },
        hasClass: function(selector) {
            var className = " " + selector + " "
              , i = 0
              , l = this.length;
            for (; i < l; i++) {
                if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
                    return true
                }
            }
            return false
        },
        val: function(value) {
            var hooks, ret, isFunction, elem = this[0];
            if (!arguments.length) {
                if (elem) {
                    hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
                    if (hooks && "get"in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
                        return ret
                    }
                    ret = elem.value;
                    return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret
                }
                return
            }
            isFunction = jQuery.isFunction(value);
            return this.each(function(i) {
                var val, self = jQuery(this);
                if (this.nodeType !== 1) {
                    return
                }
                if (isFunction) {
                    val = value.call(this, i, self.val())
                } else {
                    val = value
                }
                if (val == null) {
                    val = ""
                } else if (typeof val === "number") {
                    val += ""
                } else if (jQuery.isArray(val)) {
                    val = jQuery.map(val, function(value) {
                        return value == null ? "" : value + ""
                    })
                }
                hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                if (!hooks || !("set"in hooks) || hooks.set(this, val, "value") === undefined) {
                    this.value = val
                }
            })
        }
    });
    jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = elem.attributes.value;
                    return !val || val.specified ? elem.value : elem.text
                }
            },
            select: {
                get: function(elem) {
                    var value, i, max, option, index = elem.selectedIndex, values = [], options = elem.options, one = elem.type === "select-one";
                    if (index < 0) {
                        return null
                    }
                    i = one ? index : 0;
                    max = one ? index + 1 : options.length;
                    for (; i < max; i++) {
                        option = options[i];
                        if (option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                            value = jQuery(option).val();
                            if (one) {
                                return value
                            }
                            values.push(value)
                        }
                    }
                    if (one && !values.length && options.length) {
                        return jQuery(options[index]).val()
                    }
                    return values
                },
                set: function(elem, value) {
                    var values = jQuery.makeArray(value);
                    jQuery(elem).find("option").each(function() {
                        this.selected = jQuery.inArray(jQuery(this).val(), values) >= 0
                    });
                    if (!values.length) {
                        elem.selectedIndex = -1
                    }
                    return values
                }
            }
        },
        attrFn: {},
        attr: function(elem, name, value, pass) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return
            }
            if (pass && jQuery.isFunction(jQuery.fn[name])) {
                return jQuery(elem)[name](value)
            }
            if (typeof elem.getAttribute === "undefined") {
                return jQuery.prop(elem, name, value)
            }
            notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
            if (notxml) {
                name = name.toLowerCase();
                hooks = jQuery.attrHooks[name] || (rboolean.test(name) ? boolHook : nodeHook)
            }
            if (value !== undefined) {
                if (value === null) {
                    jQuery.removeAttr(elem, name);
                    return
                } else if (hooks && "set"in hooks && notxml && (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret
                } else {
                    elem.setAttribute(name, value + "");
                    return value
                }
            } else if (hooks && "get"in hooks && notxml && (ret = hooks.get(elem, name)) !== null) {
                return ret
            } else {
                ret = elem.getAttribute(name);
                return ret === null ? undefined : ret
            }
        },
        removeAttr: function(elem, value) {
            var propName, attrNames, name, isBool, i = 0;
            if (value && elem.nodeType === 1) {
                attrNames = value.split(core_rspace);
                for (; i < attrNames.length; i++) {
                    name = attrNames[i];
                    if (name) {
                        propName = jQuery.propFix[name] || name;
                        isBool = rboolean.test(name);
                        if (!isBool) {
                            jQuery.attr(elem, name, "")
                        }
                        elem.removeAttribute(getSetAttribute ? name : propName);
                        if (isBool && propName in elem) {
                            elem[propName] = false
                        }
                    }
                }
            }
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (rtype.test(elem.nodeName) && elem.parentNode) {
                        jQuery.error("type property can't be changed")
                    } else if (!jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        elem.setAttribute("type", value);
                        if (val) {
                            elem.value = val
                        }
                        return value
                    }
                }
            },
            value: {
                get: function(elem, name) {
                    if (nodeHook && jQuery.nodeName(elem, "button")) {
                        return nodeHook.get(elem, name)
                    }
                    return name in elem ? elem.value : null
                },
                set: function(elem, value, name) {
                    if (nodeHook && jQuery.nodeName(elem, "button")) {
                        return nodeHook.set(elem, value, name)
                    }
                    elem.value = value
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(elem, name, value) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return
            }
            notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
            if (notxml) {
                name = jQuery.propFix[name] || name;
                hooks = jQuery.propHooks[name]
            }
            if (value !== undefined) {
                if (hooks && "set"in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret
                } else {
                    return (elem[name] = value)
                }
            } else {
                if (hooks && "get"in hooks && (ret = hooks.get(elem, name)) !== null) {
                    return ret
                } else {
                    return elem[name]
                }
            }
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    var attributeNode = elem.getAttributeNode("tabindex");
                    return attributeNode && attributeNode.specified ? parseInt(attributeNode.value, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : undefined
                }
            }
        }
    });
    boolHook = {
        get: function(elem, name) {
            var attrNode, property = jQuery.prop(elem, name);
            return property === true || typeof property !== "boolean" && (attrNode = elem.getAttributeNode(name)) && attrNode.nodeValue !== false ? name.toLowerCase() : undefined
        },
        set: function(elem, value, name) {
            var propName;
            if (value === false) {
                jQuery.removeAttr(elem, name)
            } else {
                propName = jQuery.propFix[name] || name;
                if (propName in elem) {
                    elem[propName] = true
                }
                elem.setAttribute(name, name.toLowerCase())
            }
            return name
        }
    };
    if (!getSetAttribute) {
        fixSpecified = {
            name: true,
            id: true,
            coords: true
        };
        nodeHook = jQuery.valHooks.button = {
            get: function(elem, name) {
                var ret;
                ret = elem.getAttributeNode(name);
                return ret && (fixSpecified[name] ? ret.value !== "" : ret.specified) ? ret.value : undefined
            },
            set: function(elem, value, name) {
                var ret = elem.getAttributeNode(name);
                if (!ret) {
                    ret = document.createAttribute(name);
                    elem.setAttributeNode(ret)
                }
                return (ret.value = value + "")
            }
        };
        jQuery.each(["width", "height"], function(i, name) {
            jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
                set: function(elem, value) {
                    if (value === "") {
                        elem.setAttribute(name, "auto");
                        return value
                    }
                }
            })
        });
        jQuery.attrHooks.contenteditable = {
            get: nodeHook.get,
            set: function(elem, value, name) {
                if (value === "") {
                    value = "false"
                }
                nodeHook.set(elem, value, name)
            }
        }
    }
    if (!jQuery.support.hrefNormalized) {
        jQuery.each(["href", "src", "width", "height"], function(i, name) {
            jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
                get: function(elem) {
                    var ret = elem.getAttribute(name, 2);
                    return ret === null ? undefined : ret
                }
            })
        })
    }
    if (!jQuery.support.style) {
        jQuery.attrHooks.style = {
            get: function(elem) {
                return elem.style.cssText.toLowerCase() || undefined
            },
            set: function(elem, value) {
                return (elem.style.cssText = value + "")
            }
        }
    }
    if (!jQuery.support.optSelected) {
        jQuery.propHooks.selected = jQuery.extend(jQuery.propHooks.selected, {
            get: function(elem) {
                var parent = elem.parentNode;
                if (parent) {
                    parent.selectedIndex;
                    if (parent.parentNode) {
                        parent.parentNode.selectedIndex
                    }
                }
                return null
            }
        })
    }
    if (!jQuery.support.enctype) {
        jQuery.propFix.enctype = "encoding"
    }
    if (!jQuery.support.checkOn) {
        jQuery.each(["radio", "checkbox"], function() {
            jQuery.valHooks[this] = {
                get: function(elem) {
                    return elem.getAttribute("value") === null ? "on" : elem.value
                }
            }
        })
    }
    jQuery.each(["radio", "checkbox"], function() {
        jQuery.valHooks[this] = jQuery.extend(jQuery.valHooks[this], {
            set: function(elem, value) {
                if (jQuery.isArray(value)) {
                    return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0)
                }
            }
        })
    });
    var rformElems = /^(?:textarea|input|select)$/i
      , rtypenamespace = /^([^\.]*|)(?:\.(.+)|)$/
      , rhoverHack = /(?:^|\s)hover(\.\S+|)\b/
      , rkeyEvent = /^key/
      , rmouseEvent = /^(?:mouse|contextmenu)|click/
      , rfocusMorph = /^(?:focusinfocus|focusoutblur)$/
      , hoverHack = function(events) {
        return jQuery.event.special.hover ? events : events.replace(rhoverHack, "mouseenter$1 mouseleave$1")
    };
    jQuery.event = {
        add: function(elem, types, handler, data, selector) {
            var elemData, eventHandle, events, t, tns, type, namespaces, handleObj, handleObjIn, handlers, special;
            if (elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data(elem))) {
                return
            }
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector
            }
            if (!handler.guid) {
                handler.guid = jQuery.guid++
            }
            events = elemData.events;
            if (!events) {
                elemData.events = events = {}
            }
            eventHandle = elemData.handle;
            if (!eventHandle) {
                elemData.handle = eventHandle = function(e) {
                    return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch.apply(eventHandle.elem, arguments) : undefined
                }
                ;
                eventHandle.elem = elem
            }
            types = jQuery.trim(hoverHack(types)).split(" ");
            for (t = 0; t < types.length; t++) {
                tns = rtypenamespace.exec(types[t]) || [];
                type = tns[1];
                namespaces = (tns[2] || "").split(".").sort();
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                special = jQuery.event.special[type] || {};
                handleObj = jQuery.extend({
                    type: type,
                    origType: tns[1],
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn);
                handlers = events[type];
                if (!handlers) {
                    handlers = events[type] = [];
                    handlers.delegateCount = 0;
                    if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle, false)
                        } else if (elem.attachEvent) {
                            elem.attachEvent("on" + type, eventHandle)
                        }
                    }
                }
                if (special.add) {
                    special.add.call(elem, handleObj);
                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid
                    }
                }
                if (selector) {
                    handlers.splice(handlers.delegateCount++, 0, handleObj)
                } else {
                    handlers.push(handleObj)
                }
                jQuery.event.global[type] = true
            }
            elem = null
        },
        global: {},
        remove: function(elem, types, handler, selector, mappedTypes) {
            var t, tns, type, origType, namespaces, origCount, j, events, special, eventType, handleObj, elemData = jQuery.hasData(elem) && jQuery._data(elem);
            if (!elemData || !(events = elemData.events)) {
                return
            }
            types = jQuery.trim(hoverHack(types || "")).split(" ");
            for (t = 0; t < types.length; t++) {
                tns = rtypenamespace.exec(types[t]) || [];
                type = origType = tns[1];
                namespaces = tns[2];
                if (!type) {
                    for (type in events) {
                        jQuery.event.remove(elem, type + types[t], handler, selector, true)
                    }
                    continue
                }
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                eventType = events[type] || [];
                origCount = eventType.length;
                namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                for (j = 0; j < eventType.length; j++) {
                    handleObj = eventType[j];
                    if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!namespaces || namespaces.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                        eventType.splice(j--, 1);
                        if (handleObj.selector) {
                            eventType.delegateCount--
                        }
                        if (special.remove) {
                            special.remove.call(elem, handleObj)
                        }
                    }
                }
                if (eventType.length === 0 && origCount !== eventType.length) {
                    if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                        jQuery.removeEvent(elem, type, elemData.handle)
                    }
                    delete events[type]
                }
            }
            if (jQuery.isEmptyObject(events)) {
                delete elemData.handle;
                jQuery.removeData(elem, "events", true)
            }
        },
        customEvent: {
            "getData": true,
            "setData": true,
            "changeData": true
        },
        trigger: function(event, data, elem, onlyHandlers) {
            if (elem && (elem.nodeType === 3 || elem.nodeType === 8)) {
                return
            }
            var cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType, type = event.type || event, namespaces = [];
            if (rfocusMorph.test(type + jQuery.event.triggered)) {
                return
            }
            if (type.indexOf("!") >= 0) {
                type = type.slice(0, -1);
                exclusive = true
            }
            if (type.indexOf(".") >= 0) {
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort()
            }
            if ((!elem || jQuery.event.customEvent[type]) && !jQuery.event.global[type]) {
                return
            }
            event = typeof event === "object" ? event[jQuery.expando] ? event : new jQuery.Event(type,event) : new jQuery.Event(type);
            event.type = type;
            event.isTrigger = true;
            event.exclusive = exclusive;
            event.namespace = namespaces.join(".");
            event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
            ontype = type.indexOf(":") < 0 ? "on" + type : "";
            if (!elem) {
                cache = jQuery.cache;
                for (i in cache) {
                    if (cache[i].events && cache[i].events[type]) {
                        jQuery.event.trigger(event, data, cache[i].handle.elem, true)
                    }
                }
                return
            }
            event.result = undefined;
            if (!event.target) {
                event.target = elem
            }
            data = data != null ? jQuery.makeArray(data) : [];
            data.unshift(event);
            special = jQuery.event.special[type] || {};
            if (special.trigger && special.trigger.apply(elem, data) === false) {
                return
            }
            eventPath = [[elem, special.bindType || type]];
            if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                bubbleType = special.delegateType || type;
                cur = rfocusMorph.test(bubbleType + type) ? elem : elem.parentNode;
                for (old = elem; cur; cur = cur.parentNode) {
                    eventPath.push([cur, bubbleType]);
                    old = cur
                }
                if (old === (elem.ownerDocument || document)) {
                    eventPath.push([old.defaultView || old.parentWindow || window, bubbleType])
                }
            }
            for (i = 0; i < eventPath.length && !event.isPropagationStopped(); i++) {
                cur = eventPath[i][0];
                event.type = eventPath[i][1];
                handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle");
                if (handle) {
                    handle.apply(cur, data)
                }
                handle = ontype && cur[ontype];
                if (handle && jQuery.acceptData(cur) && handle.apply && handle.apply(cur, data) === false) {
                    event.preventDefault()
                }
            }
            event.type = type;
            if (!onlyHandlers && !event.isDefaultPrevented()) {
                if ((!special._default || special._default.apply(elem.ownerDocument, data) === false) && !(type === "click" && jQuery.nodeName(elem, "a")) && jQuery.acceptData(elem)) {
                    if (ontype && elem[type] && ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0) && !jQuery.isWindow(elem)) {
                        old = elem[ontype];
                        if (old) {
                            elem[ontype] = null
                        }
                        jQuery.event.triggered = type;
                        elem[type]();
                        jQuery.event.triggered = undefined;
                        if (old) {
                            elem[ontype] = old
                        }
                    }
                }
            }
            return event.result
        },
        dispatch: function(event) {
            event = jQuery.event.fix(event || window.event);
            var i, j, cur, ret, selMatch, matched, matches, handleObj, sel, related, handlers = ((jQuery._data(this, "events") || {})[event.type] || []), delegateCount = handlers.delegateCount, args = core_slice.call(arguments), run_all = !event.exclusive && !event.namespace, special = jQuery.event.special[event.type] || {}, handlerQueue = [];
            args[0] = event;
            event.delegateTarget = this;
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                return
            }
            if (delegateCount && !(event.button && event.type === "click")) {
                for (cur = event.target; cur != this; cur = cur.parentNode || this) {
                    if (cur.disabled !== true || event.type !== "click") {
                        selMatch = {};
                        matches = [];
                        for (i = 0; i < delegateCount; i++) {
                            handleObj = handlers[i];
                            sel = handleObj.selector;
                            if (selMatch[sel] === undefined) {
                                selMatch[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length
                            }
                            if (selMatch[sel]) {
                                matches.push(handleObj)
                            }
                        }
                        if (matches.length) {
                            handlerQueue.push({
                                elem: cur,
                                matches: matches
                            })
                        }
                    }
                }
            }
            if (handlers.length > delegateCount) {
                handlerQueue.push({
                    elem: this,
                    matches: handlers.slice(delegateCount)
                })
            }
            for (i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++) {
                matched = handlerQueue[i];
                event.currentTarget = matched.elem;
                for (j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++) {
                    handleObj = matched.matches[j];
                    if (run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test(handleObj.namespace)) {
                        event.data = handleObj.data;
                        event.handleObj = handleObj;
                        ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                        if (ret !== undefined) {
                            event.result = ret;
                            if (ret === false) {
                                event.preventDefault();
                                event.stopPropagation()
                            }
                        }
                    }
                }
            }
            if (special.postDispatch) {
                special.postDispatch.call(this, event)
            }
            return event.result
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                if (event.which == null) {
                    event.which = original.charCode != null ? original.charCode : original.keyCode
                }
                return event
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var eventDoc, doc, body, button = original.button, fromElement = original.fromElement;
                if (event.pageX == null && original.clientX != null) {
                    eventDoc = event.target.ownerDocument || document;
                    doc = eventDoc.documentElement;
                    body = eventDoc.body;
                    event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                    event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)
                }
                if (!event.relatedTarget && fromElement) {
                    event.relatedTarget = fromElement === event.target ? original.toElement : fromElement
                }
                if (!event.which && button !== undefined) {
                    event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)))
                }
                return event
            }
        },
        fix: function(event) {
            if (event[jQuery.expando]) {
                return event
            }
            var i, prop, originalEvent = event, fixHook = jQuery.event.fixHooks[event.type] || {}, copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
            event = jQuery.Event(originalEvent);
            for (i = copy.length; i; ) {
                prop = copy[--i];
                event[prop] = originalEvent[prop]
            }
            if (!event.target) {
                event.target = originalEvent.srcElement || document
            }
            if (event.target.nodeType === 3) {
                event.target = event.target.parentNode
            }
            event.metaKey = !!event.metaKey;
            return fixHook.filter ? fixHook.filter(event, originalEvent) : event
        },
        special: {
            load: {
                noBubble: true
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(data, namespaces, eventHandle) {
                    if (jQuery.isWindow(this)) {
                        this.onbeforeunload = eventHandle
                    }
                },
                teardown: function(namespaces, eventHandle) {
                    if (this.onbeforeunload === eventHandle) {
                        this.onbeforeunload = null
                    }
                }
            }
        },
        simulate: function(type, elem, event, bubble) {
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: true,
                originalEvent: {}
            });
            if (bubble) {
                jQuery.event.trigger(e, null, elem)
            } else {
                jQuery.event.dispatch.call(elem, e)
            }
            if (e.isDefaultPrevented()) {
                event.preventDefault()
            }
        }
    };
    jQuery.event.handle = jQuery.event.dispatch;
    jQuery.removeEvent = document.removeEventListener ? function(elem, type, handle) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handle, false)
        }
    }
    : function(elem, type, handle) {
        var name = "on" + type;
        if (elem.detachEvent) {
            if (typeof elem[name] === "undefined") {
                elem[name] = null
            }
            elem.detachEvent(name, handle)
        }
    }
    ;
    jQuery.Event = function(src, props) {
        if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(src,props)
        }
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
            this.isDefaultPrevented = (src.defaultPrevented || src.returnValue === false || src.getPreventDefault && src.getPreventDefault()) ? returnTrue : returnFalse
        } else {
            this.type = src
        }
        if (props) {
            jQuery.extend(this, props)
        }
        this.timeStamp = src && src.timeStamp || jQuery.now();
        this[jQuery.expando] = true
    }
    ;
    function returnFalse() {
        return false
    }
    function returnTrue() {
        return true
    }
    jQuery.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = returnTrue;
            var e = this.originalEvent;
            if (!e) {
                return
            }
            if (e.preventDefault) {
                e.preventDefault()
            } else {
                e.returnValue = false
            }
        },
        stopPropagation: function() {
            this.isPropagationStopped = returnTrue;
            var e = this.originalEvent;
            if (!e) {
                return
            }
            if (e.stopPropagation) {
                e.stopPropagation()
            }
            e.cancelBubble = true
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = returnTrue;
            this.stopPropagation()
        },
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse
    };
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj, selector = handleObj.selector;
                if (!related || (related !== target && !jQuery.contains(target, related))) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply(this, arguments);
                    event.type = fix
                }
                return ret
            }
        }
    });
    if (!jQuery.support.submitBubbles) {
        jQuery.event.special.submit = {
            setup: function() {
                if (jQuery.nodeName(this, "form")) {
                    return false
                }
                jQuery.event.add(this, "click._submit keypress._submit", function(e) {
                    var elem = e.target
                      , form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : undefined;
                    if (form && !jQuery._data(form, "_submit_attached")) {
                        jQuery.event.add(form, "submit._submit", function(event) {
                            event._submit_bubble = true
                        });
                        jQuery._data(form, "_submit_attached", true)
                    }
                })
            },
            postDispatch: function(event) {
                if (event._submit_bubble) {
                    delete event._submit_bubble;
                    if (this.parentNode && !event.isTrigger) {
                        jQuery.event.simulate("submit", this.parentNode, event, true)
                    }
                }
            },
            teardown: function() {
                if (jQuery.nodeName(this, "form")) {
                    return false
                }
                jQuery.event.remove(this, "._submit")
            }
        }
    }
    if (!jQuery.support.changeBubbles) {
        jQuery.event.special.change = {
            setup: function() {
                if (rformElems.test(this.nodeName)) {
                    if (this.type === "checkbox" || this.type === "radio") {
                        jQuery.event.add(this, "propertychange._change", function(event) {
                            if (event.originalEvent.propertyName === "checked") {
                                this._just_changed = true
                            }
                        });
                        jQuery.event.add(this, "click._change", function(event) {
                            if (this._just_changed && !event.isTrigger) {
                                this._just_changed = false
                            }
                            jQuery.event.simulate("change", this, event, true)
                        })
                    }
                    return false
                }
                jQuery.event.add(this, "beforeactivate._change", function(e) {
                    var elem = e.target;
                    if (rformElems.test(elem.nodeName) && !jQuery._data(elem, "_change_attached")) {
                        jQuery.event.add(elem, "change._change", function(event) {
                            if (this.parentNode && !event.isSimulated && !event.isTrigger) {
                                jQuery.event.simulate("change", this.parentNode, event, true)
                            }
                        });
                        jQuery._data(elem, "_change_attached", true)
                    }
                })
            },
            handle: function(event) {
                var elem = event.target;
                if (this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox")) {
                    return event.handleObj.handler.apply(this, arguments)
                }
            },
            teardown: function() {
                jQuery.event.remove(this, "._change");
                return !rformElems.test(this.nodeName)
            }
        }
    }
    if (!jQuery.support.focusinBubbles) {
        jQuery.each({
            focus: "focusin",
            blur: "focusout"
        }, function(orig, fix) {
            var attaches = 0
              , handler = function(event) {
                jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true)
            };
            jQuery.event.special[fix] = {
                setup: function() {
                    if (attaches++ === 0) {
                        document.addEventListener(orig, handler, true)
                    }
                },
                teardown: function() {
                    if (--attaches === 0) {
                        document.removeEventListener(orig, handler, true)
                    }
                }
            }
        })
    }
    jQuery.fn.extend({
        on: function(types, selector, data, fn, one) {
            var origFn, type;
            if (typeof types === "object") {
                if (typeof selector !== "string") {
                    data = data || selector;
                    selector = undefined
                }
                for (type in types) {
                    this.on(type, selector, data, types[type], one)
                }
                return this
            }
            if (data == null && fn == null) {
                fn = selector;
                data = selector = undefined
            } else if (fn == null) {
                if (typeof selector === "string") {
                    fn = data;
                    data = undefined
                } else {
                    fn = data;
                    data = selector;
                    selector = undefined
                }
            }
            if (fn === false) {
                fn = returnFalse
            } else if (!fn) {
                return this
            }
            if (one === 1) {
                origFn = fn;
                fn = function(event) {
                    jQuery().off(event);
                    return origFn.apply(this, arguments)
                }
                ;
                fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)
            }
            return this.each(function() {
                jQuery.event.add(this, types, fn, data, selector)
            })
        },
        one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1)
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) {
                handleObj = types.handleObj;
                jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
                return this
            }
            if (typeof types === "object") {
                for (type in types) {
                    this.off(type, selector, types[type])
                }
                return this
            }
            if (selector === false || typeof selector === "function") {
                fn = selector;
                selector = undefined
            }
            if (fn === false) {
                fn = returnFalse
            }
            return this.each(function() {
                jQuery.event.remove(this, types, fn, selector)
            })
        },
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn)
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn)
        },
        live: function(types, data, fn) {
            jQuery(this.context).on(types, this.selector, data, fn);
            return this
        },
        die: function(types, fn) {
            jQuery(this.context).off(types, this.selector || "**", fn);
            return this
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn)
        },
        undelegate: function(selector, types, fn) {
            return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn)
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this)
            })
        },
        triggerHandler: function(type, data) {
            if (this[0]) {
                return jQuery.event.trigger(type, data, this[0], true)
            }
        },
        toggle: function(fn) {
            var args = arguments
              , guid = fn.guid || jQuery.guid++
              , i = 0
              , toggler = function(event) {
                var lastToggle = (jQuery._data(this, "lastToggle" + fn.guid) || 0) % i;
                jQuery._data(this, "lastToggle" + fn.guid, lastToggle + 1);
                event.preventDefault();
                return args[lastToggle].apply(this, arguments) || false
            };
            toggler.guid = guid;
            while (i < args.length) {
                args[i++].guid = guid
            }
            return this.click(toggler)
        },
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver)
        }
    });
    jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            if (fn == null) {
                fn = data;
                data = null
            }
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name)
        }
        ;
        if (rkeyEvent.test(name)) {
            jQuery.event.fixHooks[name] = jQuery.event.keyHooks
        }
        if (rmouseEvent.test(name)) {
            jQuery.event.fixHooks[name] = jQuery.event.mouseHooks
        }
    });
    (function(window, undefined) {
        var cachedruns, assertGetIdNotName, Expr, getText, isXML, contains, compile, sortOrder, hasDuplicate, outermostContext, baseHasDuplicate = true, strundefined = "undefined", expando = ("sizcache" + Math.random()).replace(".", ""), Token = String, document = window.document, docElem = document.documentElement, dirruns = 0, done = 0, pop = [].pop, push = [].push, slice = [].slice, indexOf = [].indexOf || function(elem) {
            var i = 0
              , len = this.length;
            for (; i < len; i++) {
                if (this[i] === elem) {
                    return i
                }
            }
            return -1
        }
        , markFunction = function(fn, value) {
            fn[expando] = value == null || value;
            return fn
        }, createCache = function() {
            var cache = {}
              , keys = [];
            return markFunction(function(key, value) {
                if (keys.push(key) > Expr.cacheLength) {
                    delete cache[keys.shift()]
                }
                return (cache[key] = value)
            }, cache)
        }, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), whitespace = "[\\x20\\t\\r\\n\\f]", characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+", identifier = characterEncoding.replace("w", "w#"), operators = "([*^$|!~]?=)", attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace + "*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]", pseudos = ":(" + characterEncoding + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + attributes + ")|[^:]|\\\\.)*|.*))\\)|)", pos = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$","g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*"), rpseudo = new RegExp(pseudos), rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, rnot = /^:not/, rsibling = /[\x20\t\r\n\f]*[+~]/, rendsWithNot = /:not\($/, rheader = /h\d/i, rinputs = /input|select|textarea|button/i, rbackslash = /\\(?!\\)/g, matchExpr = {
            "ID": new RegExp("^#(" + characterEncoding + ")"),
            "CLASS": new RegExp("^\\.(" + characterEncoding + ")"),
            "NAME": new RegExp("^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]"),
            "TAG": new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
            "ATTR": new RegExp("^" + attributes),
            "PSEUDO": new RegExp("^" + pseudos),
            "POS": new RegExp(pos,"i"),
            "CHILD": new RegExp("^:(only|nth|first|last)-child(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)","i"),
            "needsContext": new RegExp("^" + whitespace + "*[>+~]|" + pos,"i")
        }, assert = function(fn) {
            var div = document.createElement("div");
            try {
                return fn(div)
            } catch (e) {
                return false
            } finally {
                div = null
            }
        }, assertTagNameNoComments = assert(function(div) {
            div.appendChild(document.createComment(""));
            return !div.getElementsByTagName("*").length
        }), assertHrefNotNormalized = assert(function(div) {
            div.innerHTML = "<a href='#'></a>";
            return div.firstChild && typeof div.firstChild.getAttribute !== strundefined && div.firstChild.getAttribute("href") === "#"
        }), assertAttributes = assert(function(div) {
            div.innerHTML = "<select></select>";
            var type = typeof div.lastChild.getAttribute("multiple");
            return type !== "boolean" && type !== "string"
        }), assertUsableClassName = assert(function(div) {
            div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
            if (!div.getElementsByClassName || !div.getElementsByClassName("e").length) {
                return false
            }
            div.lastChild.className = "e";
            return div.getElementsByClassName("e").length === 2
        }), assertUsableName = assert(function(div) {
            div.id = expando + 0;
            div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
            docElem.insertBefore(div, docElem.firstChild);
            var pass = document.getElementsByName && document.getElementsByName(expando).length === 2 + document.getElementsByName(expando + 0).length;
            assertGetIdNotName = !document.getElementById(expando);
            docElem.removeChild(div);
            return pass
        });
        try {
            slice.call(docElem.childNodes, 0)[0].nodeType
        } catch (e) {
            slice = function(i) {
                var elem, results = [];
                for (; (elem = this[i]); i++) {
                    results.push(elem)
                }
                return results
            }
        }
        function Sizzle(selector, context, results, seed) {
            results = results || [];
            context = context || document;
            var match, elem, xml, m, nodeType = context.nodeType;
            if (!selector || typeof selector !== "string") {
                return results
            }
            if (nodeType !== 1 && nodeType !== 9) {
                return []
            }
            xml = isXML(context);
            if (!xml && !seed) {
                if ((match = rquickExpr.exec(selector))) {
                    if ((m = match[1])) {
                        if (nodeType === 9) {
                            elem = context.getElementById(m);
                            if (elem && elem.parentNode) {
                                if (elem.id === m) {
                                    results.push(elem);
                                    return results
                                }
                            } else {
                                return results
                            }
                        } else {
                            if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
                                results.push(elem);
                                return results
                            }
                        }
                    } else if (match[2]) {
                        push.apply(results, slice.call(context.getElementsByTagName(selector), 0));
                        return results
                    } else if ((m = match[3]) && assertUsableClassName && context.getElementsByClassName) {
                        push.apply(results, slice.call(context.getElementsByClassName(m), 0));
                        return results
                    }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed, xml)
        }
        Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements)
        }
        ;
        Sizzle.matchesSelector = function(elem, expr) {
            return Sizzle(expr, null, null, [elem]).length > 0
        }
        ;
        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return name === "input" && elem.type === type
            }
        }
        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return (name === "input" || name === "button") && elem.type === type
            }
        }
        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                argument = +argument;
                return markFunction(function(seed, matches) {
                    var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length;
                    while (i--) {
                        if (seed[(j = matchIndexes[i])]) {
                            seed[j] = !(matches[j] = seed[j])
                        }
                    }
                })
            })
        }
        getText = Sizzle.getText = function(elem) {
            var node, ret = "", i = 0, nodeType = elem.nodeType;
            if (nodeType) {
                if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                    if (typeof elem.textContent === "string") {
                        return elem.textContent
                    } else {
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            ret += getText(elem)
                        }
                    }
                } else if (nodeType === 3 || nodeType === 4) {
                    return elem.nodeValue
                }
            } else {
                for (; (node = elem[i]); i++) {
                    ret += getText(node)
                }
            }
            return ret
        }
        ;
        isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? documentElement.nodeName !== "HTML" : false
        }
        ;
        contains = Sizzle.contains = docElem.contains ? function(a, b) {
            var adown = a.nodeType === 9 ? a.documentElement : a
              , bup = b && b.parentNode;
            return a === bup || !!(bup && bup.nodeType === 1 && adown.contains && adown.contains(bup))
        }
        : docElem.compareDocumentPosition ? function(a, b) {
            return b && !!(a.compareDocumentPosition(b) & 16)
        }
        : function(a, b) {
            while ((b = b.parentNode)) {
                if (b === a) {
                    return true
                }
            }
            return false
        }
        ;
        Sizzle.attr = function(elem, name) {
            var val, xml = isXML(elem);
            if (!xml) {
                name = name.toLowerCase()
            }
            if ((val = Expr.attrHandle[name])) {
                return val(elem)
            }
            if (xml || assertAttributes) {
                return elem.getAttribute(name)
            }
            val = elem.getAttributeNode(name);
            return val ? typeof elem[name] === "boolean" ? elem[name] ? name : null : val.specified ? val.value : null : null
        }
        ;
        Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: assertHrefNotNormalized ? {} : {
                "href": function(elem) {
                    return elem.getAttribute("href", 2)
                },
                "type": function(elem) {
                    return elem.getAttribute("type")
                }
            },
            find: {
                "ID": assertGetIdNotName ? function(id, context, xml) {
                    if (typeof context.getElementById !== strundefined && !xml) {
                        var m = context.getElementById(id);
                        return m && m.parentNode ? [m] : []
                    }
                }
                : function(id, context, xml) {
                    if (typeof context.getElementById !== strundefined && !xml) {
                        var m = context.getElementById(id);
                        return m ? m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ? [m] : undefined : []
                    }
                }
                ,
                "TAG": assertTagNameNoComments ? function(tag, context) {
                    if (typeof context.getElementsByTagName !== strundefined) {
                        return context.getElementsByTagName(tag)
                    }
                }
                : function(tag, context) {
                    var results = context.getElementsByTagName(tag);
                    if (tag === "*") {
                        var elem, tmp = [], i = 0;
                        for (; (elem = results[i]); i++) {
                            if (elem.nodeType === 1) {
                                tmp.push(elem)
                            }
                        }
                        return tmp
                    }
                    return results
                }
                ,
                "NAME": assertUsableName && function(tag, context) {
                    if (typeof context.getElementsByName !== strundefined) {
                        return context.getElementsByName(name)
                    }
                }
                ,
                "CLASS": assertUsableClassName && function(className, context, xml) {
                    if (typeof context.getElementsByClassName !== strundefined && !xml) {
                        return context.getElementsByClassName(className)
                    }
                }
            },
            relative: {
                ">": {
                    dir: "parentNode",
                    first: true
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: true
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                "ATTR": function(match) {
                    match[1] = match[1].replace(rbackslash, "");
                    match[3] = (match[4] || match[5] || "").replace(rbackslash, "");
                    if (match[2] === "~=") {
                        match[3] = " " + match[3] + " "
                    }
                    return match.slice(0, 4)
                },
                "CHILD": function(match) {
                    match[1] = match[1].toLowerCase();
                    if (match[1] === "nth") {
                        if (!match[2]) {
                            Sizzle.error(match[0])
                        }
                        match[3] = +(match[3] ? match[4] + (match[5] || 1) : 2 * (match[2] === "even" || match[2] === "odd"));
                        match[4] = +((match[6] + match[7]) || match[2] === "odd")
                    } else if (match[2]) {
                        Sizzle.error(match[0])
                    }
                    return match
                },
                "PSEUDO": function(match) {
                    var unquoted, excess;
                    if (matchExpr["CHILD"].test(match[0])) {
                        return null
                    }
                    if (match[3]) {
                        match[2] = match[3]
                    } else if ((unquoted = match[4])) {
                        if (rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                            unquoted = unquoted.slice(0, excess);
                            match[0] = match[0].slice(0, excess)
                        }
                        match[2] = unquoted
                    }
                    return match.slice(0, 3)
                }
            },
            filter: {
                "ID": assertGetIdNotName ? function(id) {
                    id = id.replace(rbackslash, "");
                    return function(elem) {
                        return elem.getAttribute("id") === id
                    }
                }
                : function(id) {
                    id = id.replace(rbackslash, "");
                    return function(elem) {
                        var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                        return node && node.value === id
                    }
                }
                ,
                "TAG": function(nodeName) {
                    if (nodeName === "*") {
                        return function() {
                            return true
                        }
                    }
                    nodeName = nodeName.replace(rbackslash, "").toLowerCase();
                    return function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName
                    }
                },
                "CLASS": function(className) {
                    var pattern = classCache[expando][className];
                    if (!pattern) {
                        pattern = classCache(className, new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)"))
                    }
                    return function(elem) {
                        return pattern.test(elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "")
                    }
                },
                "ATTR": function(name, operator, check) {
                    return function(elem, context) {
                        var result = Sizzle.attr(elem, name);
                        if (result == null) {
                            return operator === "!="
                        }
                        if (!operator) {
                            return true
                        }
                        result += "";
                        return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.substr(result.length - check.length) === check : operator === "~=" ? (" " + result + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.substr(0, check.length + 1) === check + "-" : false
                    }
                },
                "CHILD": function(type, argument, first, last) {
                    if (type === "nth") {
                        return function(elem) {
                            var node, diff, parent = elem.parentNode;
                            if (first === 1 && last === 0) {
                                return true
                            }
                            if (parent) {
                                diff = 0;
                                for (node = parent.firstChild; node; node = node.nextSibling) {
                                    if (node.nodeType === 1) {
                                        diff++;
                                        if (elem === node) {
                                            break
                                        }
                                    }
                                }
                            }
                            diff -= last;
                            return diff === first || (diff % first === 0 && diff / first >= 0)
                        }
                    }
                    return function(elem) {
                        var node = elem;
                        switch (type) {
                        case "only":
                        case "first":
                            while ((node = node.previousSibling)) {
                                if (node.nodeType === 1) {
                                    return false
                                }
                            }
                            if (type === "first") {
                                return true
                            }
                            node = elem;
                        case "last":
                            while ((node = node.nextSibling)) {
                                if (node.nodeType === 1) {
                                    return false
                                }
                            }
                            return true
                        }
                    }
                },
                "PSEUDO": function(pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    if (fn[expando]) {
                        return fn(argument)
                    }
                    if (fn.length > 1) {
                        args = [pseudo, pseudo, "", argument];
                        return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                            var idx, matched = fn(seed, argument), i = matched.length;
                            while (i--) {
                                idx = indexOf.call(seed, matched[i]);
                                seed[idx] = !(matches[idx] = matched[i])
                            }
                        }) : function(elem) {
                            return fn(elem, 0, args)
                        }
                    }
                    return fn
                }
            },
            pseudos: {
                "not": markFunction(function(selector) {
                    var input = []
                      , results = []
                      , matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        var elem, unmatched = matcher(seed, null, xml, []), i = seed.length;
                        while (i--) {
                            if ((elem = unmatched[i])) {
                                seed[i] = !(matches[i] = elem)
                            }
                        }
                    }) : function(elem, context, xml) {
                        input[0] = elem;
                        matcher(input, null, xml, results);
                        return !results.pop()
                    }
                }),
                "has": markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0
                    }
                }),
                "contains": markFunction(function(text) {
                    return function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1
                    }
                }),
                "enabled": function(elem) {
                    return elem.disabled === false
                },
                "disabled": function(elem) {
                    return elem.disabled === true
                },
                "checked": function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected)
                },
                "selected": function(elem) {
                    if (elem.parentNode) {
                        elem.parentNode.selectedIndex
                    }
                    return elem.selected === true
                },
                "parent": function(elem) {
                    return !Expr.pseudos["empty"](elem)
                },
                "empty": function(elem) {
                    var nodeType;
                    elem = elem.firstChild;
                    while (elem) {
                        if (elem.nodeName > "@" || (nodeType = elem.nodeType) === 3 || nodeType === 4) {
                            return false
                        }
                        elem = elem.nextSibling
                    }
                    return true
                },
                "header": function(elem) {
                    return rheader.test(elem.nodeName)
                },
                "text": function(elem) {
                    var type, attr;
                    return elem.nodeName.toLowerCase() === "input" && (type = elem.type) === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === type)
                },
                "radio": createInputPseudo("radio"),
                "checkbox": createInputPseudo("checkbox"),
                "file": createInputPseudo("file"),
                "password": createInputPseudo("password"),
                "image": createInputPseudo("image"),
                "submit": createButtonPseudo("submit"),
                "reset": createButtonPseudo("reset"),
                "button": function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === "button" || name === "button"
                },
                "input": function(elem) {
                    return rinputs.test(elem.nodeName)
                },
                "focus": function(elem) {
                    var doc = elem.ownerDocument;
                    return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href)
                },
                "active": function(elem) {
                    return elem === elem.ownerDocument.activeElement
                },
                "first": createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [0]
                }),
                "last": createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [length - 1]
                }),
                "eq": createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [argument < 0 ? argument + length : argument]
                }),
                "even": createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0; i < length; i += 2) {
                        matchIndexes.push(i)
                    }
                    return matchIndexes
                }),
                "odd": createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 1; i < length; i += 2) {
                        matchIndexes.push(i)
                    }
                    return matchIndexes
                }),
                "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = argument < 0 ? argument + length : argument; --i >= 0; ) {
                        matchIndexes.push(i)
                    }
                    return matchIndexes
                }),
                "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = argument < 0 ? argument + length : argument; ++i < length; ) {
                        matchIndexes.push(i)
                    }
                    return matchIndexes
                })
            }
        };
        function siblingCheck(a, b, ret) {
            if (a === b) {
                return ret
            }
            var cur = a.nextSibling;
            while (cur) {
                if (cur === b) {
                    return -1
                }
                cur = cur.nextSibling
            }
            return 1
        }
        sortOrder = docElem.compareDocumentPosition ? function(a, b) {
            if (a === b) {
                hasDuplicate = true;
                return 0
            }
            return (!a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition : a.compareDocumentPosition(b) & 4) ? -1 : 1
        }
        : function(a, b) {
            if (a === b) {
                hasDuplicate = true;
                return 0
            } else if (a.sourceIndex && b.sourceIndex) {
                return a.sourceIndex - b.sourceIndex
            }
            var al, bl, ap = [], bp = [], aup = a.parentNode, bup = b.parentNode, cur = aup;
            if (aup === bup) {
                return siblingCheck(a, b)
            } else if (!aup) {
                return -1
            } else if (!bup) {
                return 1
            }
            while (cur) {
                ap.unshift(cur);
                cur = cur.parentNode
            }
            cur = bup;
            while (cur) {
                bp.unshift(cur);
                cur = cur.parentNode
            }
            al = ap.length;
            bl = bp.length;
            for (var i = 0; i < al && i < bl; i++) {
                if (ap[i] !== bp[i]) {
                    return siblingCheck(ap[i], bp[i])
                }
            }
            return i === al ? siblingCheck(a, bp[i], -1) : siblingCheck(ap[i], b, 1)
        }
        ;
        [0, 0].sort(sortOrder);
        baseHasDuplicate = !hasDuplicate;
        Sizzle.uniqueSort = function(results) {
            var elem, i = 1;
            hasDuplicate = baseHasDuplicate;
            results.sort(sortOrder);
            if (hasDuplicate) {
                for (; (elem = results[i]); i++) {
                    if (elem === results[i - 1]) {
                        results.splice(i--, 1)
                    }
                }
            }
            return results
        }
        ;
        Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg)
        }
        ;
        function tokenize(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[expando][selector];
            if (cached) {
                return parseOnly ? 0 : cached.slice(0)
            }
            soFar = selector;
            groups = [];
            preFilters = Expr.preFilter;
            while (soFar) {
                if (!matched || (match = rcomma.exec(soFar))) {
                    if (match) {
                        soFar = soFar.slice(match[0].length)
                    }
                    groups.push(tokens = [])
                }
                matched = false;
                if ((match = rcombinators.exec(soFar))) {
                    tokens.push(matched = new Token(match.shift()));
                    soFar = soFar.slice(matched.length);
                    matched.type = match[0].replace(rtrim, " ")
                }
                for (type in Expr.filter) {
                    if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match, document, true)))) {
                        tokens.push(matched = new Token(match.shift()));
                        soFar = soFar.slice(matched.length);
                        matched.type = type;
                        matched.matches = match
                    }
                }
                if (!matched) {
                    break
                }
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0)
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir
              , checkNonElements = base && combinator.dir === "parentNode"
              , doneName = done++;
            return combinator.first ? function(elem, context, xml) {
                while ((elem = elem[dir])) {
                    if (checkNonElements || elem.nodeType === 1) {
                        return matcher(elem, context, xml)
                    }
                }
            }
            : function(elem, context, xml) {
                if (!xml) {
                    var cache, dirkey = dirruns + " " + doneName + " ", cachedkey = dirkey + cachedruns;
                    while ((elem = elem[dir])) {
                        if (checkNonElements || elem.nodeType === 1) {
                            if ((cache = elem[expando]) === cachedkey) {
                                return elem.sizset
                            } else if (typeof cache === "string" && cache.indexOf(dirkey) === 0) {
                                if (elem.sizset) {
                                    return elem
                                }
                            } else {
                                elem[expando] = cachedkey;
                                if (matcher(elem, context, xml)) {
                                    elem.sizset = true;
                                    return elem
                                }
                                elem.sizset = false
                            }
                        }
                    }
                } else {
                    while ((elem = elem[dir])) {
                        if (checkNonElements || elem.nodeType === 1) {
                            if (matcher(elem, context, xml)) {
                                return elem
                            }
                        }
                    }
                }
            }
        }
        function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
                var i = matchers.length;
                while (i--) {
                    if (!matchers[i](elem, context, xml)) {
                        return false
                    }
                }
                return true
            }
            : matchers[0]
        }
        function condense(unmatched, map, filter, context, xml) {
            var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = map != null;
            for (; i < len; i++) {
                if ((elem = unmatched[i])) {
                    if (!filter || filter(elem, context, xml)) {
                        newUnmatched.push(elem);
                        if (mapped) {
                            map.push(i)
                        }
                    }
                }
            }
            return newUnmatched
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            if (postFilter && !postFilter[expando]) {
                postFilter = setMatcher(postFilter)
            }
            if (postFinder && !postFinder[expando]) {
                postFinder = setMatcher(postFinder, postSelector)
            }
            return markFunction(function(seed, results, context, xml) {
                if (seed && postFinder) {
                    return
                }
                var i, elem, postFilterIn, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, [], seed), matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems, matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher) {
                    matcher(matcherIn, matcherOut, context, xml)
                }
                if (postFilter) {
                    postFilterIn = condense(matcherOut, postMap);
                    postFilter(postFilterIn, [], context, xml);
                    i = postFilterIn.length;
                    while (i--) {
                        if ((elem = postFilterIn[i])) {
                            matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem)
                        }
                    }
                }
                if (seed) {
                    i = preFilter && matcherOut.length;
                    while (i--) {
                        if ((elem = matcherOut[i])) {
                            seed[preMap[i]] = !(results[preMap[i]] = elem)
                        }
                    }
                } else {
                    matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
                    if (postFinder) {
                        postFinder(null, results, matcherOut, xml)
                    } else {
                        push.apply(results, matcherOut)
                    }
                }
            })
        }
        function matcherFromTokens(tokens) {
            var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                return elem === checkContext
            }, implicitRelative, true), matchAnyContext = addCombinator(function(elem) {
                return indexOf.call(checkContext, elem) > -1
            }, implicitRelative, true), matchers = [function(elem, context, xml) {
                return (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml))
            }
            ];
            for (; i < len; i++) {
                if ((matcher = Expr.relative[tokens[i].type])) {
                    matchers = [addCombinator(elementMatcher(matchers), matcher)]
                } else {
                    matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
                    if (matcher[expando]) {
                        j = ++i;
                        for (; j < len; j++) {
                            if (Expr.relative[tokens[j].type]) {
                                break
                            }
                        }
                        return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && tokens.slice(0, i - 1).join("").replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && tokens.join(""))
                    }
                    matchers.push(matcher)
                }
            }
            return elementMatcher(matchers)
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0
              , byElement = elementMatchers.length > 0
              , superMatcher = function(seed, context, xml, results, expandContext) {
                var elem, j, matcher, setMatched = [], matchedCount = 0, i = "0", unmatched = seed && [], outermost = expandContext != null, contextBackup = outermostContext, elems = seed || byElement && Expr.find["TAG"]("*", expandContext && context.parentNode || context), dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.E);
                if (outermost) {
                    outermostContext = context !== document && context;
                    cachedruns = superMatcher.el
                }
                for (; (elem = elems[i]) != null; i++) {
                    if (byElement && elem) {
                        for (j = 0; (matcher = elementMatchers[j]); j++) {
                            if (matcher(elem, context, xml)) {
                                results.push(elem);
                                break
                            }
                        }
                        if (outermost) {
                            dirruns = dirrunsUnique;
                            cachedruns = ++superMatcher.el
                        }
                    }
                    if (bySet) {
                        if ((elem = !matcher && elem)) {
                            matchedCount--
                        }
                        if (seed) {
                            unmatched.push(elem)
                        }
                    }
                }
                matchedCount += i;
                if (bySet && i !== matchedCount) {
                    for (j = 0; (matcher = setMatchers[j]); j++) {
                        matcher(unmatched, setMatched, context, xml)
                    }
                    if (seed) {
                        if (matchedCount > 0) {
                            while (i--) {
                                if (!(unmatched[i] || setMatched[i])) {
                                    setMatched[i] = pop.call(results)
                                }
                            }
                        }
                        setMatched = condense(setMatched)
                    }
                    push.apply(results, setMatched);
                    if (outermost && !seed && setMatched.length > 0 && (matchedCount + setMatchers.length) > 1) {
                        Sizzle.uniqueSort(results)
                    }
                }
                if (outermost) {
                    dirruns = dirrunsUnique;
                    outermostContext = contextBackup
                }
                return unmatched
            };
            superMatcher.el = 0;
            return bySet ? markFunction(superMatcher) : superMatcher
        }
        compile = Sizzle.compile = function(selector, group) {
            var i, setMatchers = [], elementMatchers = [], cached = compilerCache[expando][selector];
            if (!cached) {
                if (!group) {
                    group = tokenize(selector)
                }
                i = group.length;
                while (i--) {
                    cached = matcherFromTokens(group[i]);
                    if (cached[expando]) {
                        setMatchers.push(cached)
                    } else {
                        elementMatchers.push(cached)
                    }
                }
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers))
            }
            return cached
        }
        ;
        function multipleContexts(selector, contexts, results, seed) {
            var i = 0
              , len = contexts.length;
            for (; i < len; i++) {
                Sizzle(selector, contexts[i], results, seed)
            }
            return results
        }
        function select(selector, context, results, seed, xml) {
            var i, tokens, token, type, find, match = tokenize(selector), j = match.length;
            if (!seed) {
                if (match.length === 1) {
                    tokens = match[0] = match[0].slice(0);
                    if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && !xml && Expr.relative[tokens[1].type]) {
                        context = Expr.find["ID"](token.matches[0].replace(rbackslash, ""), context, xml)[0];
                        if (!context) {
                            return results
                        }
                        selector = selector.slice(tokens.shift().length)
                    }
                    for (i = matchExpr["POS"].test(selector) ? -1 : tokens.length - 1; i >= 0; i--) {
                        token = tokens[i];
                        if (Expr.relative[(type = token.type)]) {
                            break
                        }
                        if ((find = Expr.find[type])) {
                            if ((seed = find(token.matches[0].replace(rbackslash, ""), rsibling.test(tokens[0].type) && context.parentNode || context, xml))) {
                                tokens.splice(i, 1);
                                selector = seed.length && tokens.join("");
                                if (!selector) {
                                    push.apply(results, slice.call(seed, 0));
                                    return results
                                }
                                break
                            }
                        }
                    }
                }
            }
            compile(selector, match)(seed, context, xml, results, rsibling.test(selector));
            return results
        }
        if (document.querySelectorAll) {
            (function() {
                var disconnectedMatch, oldSelect = select, rescape = /'|\\/g, rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, rbuggyQSA = [":focus"], rbuggyMatches = [":active", ":focus"], matches = docElem.matchesSelector || docElem.mozMatchesSelector || docElem.webkitMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector;
                assert(function(div) {
                    div.innerHTML = "<select><option selected=''></option></select>";
                    if (!div.querySelectorAll("[selected]").length) {
                        rbuggyQSA.push("\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)")
                    }
                    if (!div.querySelectorAll(":checked").length) {
                        rbuggyQSA.push(":checked")
                    }
                });
                assert(function(div) {
                    div.innerHTML = "<p test=''></p>";
                    if (div.querySelectorAll("[test^='']").length) {
                        rbuggyQSA.push("[*^$]=" + whitespace + "*(?:\"\"|'')")
                    }
                    div.innerHTML = "<input type='hidden'/>";
                    if (!div.querySelectorAll(":enabled").length) {
                        rbuggyQSA.push(":enabled", ":disabled")
                    }
                });
                rbuggyQSA = new RegExp(rbuggyQSA.join("|"));
                select = function(selector, context, results, seed, xml) {
                    if (!seed && !xml && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                        var groups, i, old = true, nid = expando, newContext = context, newSelector = context.nodeType === 9 && selector;
                        if (context.nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                            groups = tokenize(selector);
                            if ((old = context.getAttribute("id"))) {
                                nid = old.replace(rescape, "\\$&")
                            } else {
                                context.setAttribute("id", nid)
                            }
                            nid = "[id='" + nid + "'] ";
                            i = groups.length;
                            while (i--) {
                                groups[i] = nid + groups[i].join("")
                            }
                            newContext = rsibling.test(selector) && context.parentNode || context;
                            newSelector = groups.join(",")
                        }
                        if (newSelector) {
                            try {
                                push.apply(results, slice.call(newContext.querySelectorAll(newSelector), 0));
                                return results
                            } catch (qsaError) {} finally {
                                if (!old) {
                                    context.removeAttribute("id")
                                }
                            }
                        }
                    }
                    return oldSelect(selector, context, results, seed, xml)
                }
                ;
                if (matches) {
                    assert(function(div) {
                        disconnectedMatch = matches.call(div, "div");
                        try {
                            matches.call(div, "[test!='']:sizzle");
                            rbuggyMatches.push("!=", pseudos)
                        } catch (e) {}
                    });
                    rbuggyMatches = new RegExp(rbuggyMatches.join("|"));
                    Sizzle.matchesSelector = function(elem, expr) {
                        expr = expr.replace(rattributeQuotes, "='$1']");
                        if (!isXML(elem) && !rbuggyMatches.test(expr) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
                            try {
                                var ret = matches.call(elem, expr);
                                if (ret || disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
                                    return ret
                                }
                            } catch (e) {}
                        }
                        return Sizzle(expr, null, null, [elem]).length > 0
                    }
                }
            }
            )()
        }
        Expr.pseudos["nth"] = Expr.pseudos["eq"];
        function setFilters() {}
        Expr.filters = setFilters.prototype = Expr.pseudos;
        Expr.setFilters = new setFilters();
        Sizzle.attr = jQuery.attr;
        jQuery.find = Sizzle;
        jQuery.expr = Sizzle.selectors;
        jQuery.expr[":"] = jQuery.expr.pseudos;
        jQuery.unique = Sizzle.uniqueSort;
        jQuery.text = Sizzle.getText;
        jQuery.isXMLDoc = Sizzle.isXML;
        jQuery.contains = Sizzle.contains
    }
    )(window);
    var runtil = /Until$/
      , rparentsprev = /^(?:parents|prev(?:Until|All))/
      , isSimple = /^.[^:#\[\.,]*$/
      , rneedsContext = jQuery.expr.match.needsContext
      , guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
    };
    jQuery.fn.extend({
        find: function(selector) {
            var i, l, length, n, r, ret, self = this;
            if (typeof selector !== "string") {
                return jQuery(selector).filter(function() {
                    for (i = 0,
                    l = self.length; i < l; i++) {
                        if (jQuery.contains(self[i], this)) {
                            return true
                        }
                    }
                })
            }
            ret = this.pushStack("", "find", selector);
            for (i = 0,
            l = this.length; i < l; i++) {
                length = ret.length;
                jQuery.find(selector, this[i], ret);
                if (i > 0) {
                    for (n = length; n < ret.length; n++) {
                        for (r = 0; r < length; r++) {
                            if (ret[r] === ret[n]) {
                                ret.splice(n--, 1);
                                break
                            }
                        }
                    }
                }
            }
            return ret
        },
        has: function(target) {
            var i, targets = jQuery(target, this), len = targets.length;
            return this.filter(function() {
                for (i = 0; i < len; i++) {
                    if (jQuery.contains(this, targets[i])) {
                        return true
                    }
                }
            })
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector, false), "not", selector)
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector, true), "filter", selector)
        },
        is: function(selector) {
            return !!selector && (typeof selector === "string" ? rneedsContext.test(selector) ? jQuery(selector, this.context).index(this[0]) >= 0 : jQuery.filter(selector, this).length > 0 : this.filter(selector).length > 0)
        },
        closest: function(selectors, context) {
            var cur, i = 0, l = this.length, ret = [], pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
            for (; i < l; i++) {
                cur = this[i];
                while (cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11) {
                    if (pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors)) {
                        ret.push(cur);
                        break
                    }
                    cur = cur.parentNode
                }
            }
            ret = ret.length > 1 ? jQuery.unique(ret) : ret;
            return this.pushStack(ret, "closest", selectors)
        },
        index: function(elem) {
            if (!elem) {
                return (this[0] && this[0].parentNode) ? this.prevAll().length : -1
            }
            if (typeof elem === "string") {
                return jQuery.inArray(this[0], jQuery(elem))
            }
            return jQuery.inArray(elem.jquery ? elem[0] : elem, this)
        },
        add: function(selector, context) {
            var set = typeof selector === "string" ? jQuery(selector, context) : jQuery.makeArray(selector && selector.nodeType ? [selector] : selector)
              , all = jQuery.merge(this.get(), set);
            return this.pushStack(isDisconnected(set[0]) || isDisconnected(all[0]) ? all : jQuery.unique(all))
        },
        addBack: function(selector) {
            return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector))
        }
    });
    jQuery.fn.andSelf = jQuery.fn.addBack;
    function isDisconnected(node) {
        return !node || !node.parentNode || node.parentNode.nodeType === 11
    }
    function sibling(cur, dir) {
        do {
            cur = cur[dir]
        } while (cur && cur.nodeType !== 1);return cur
    }
    jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null
        },
        parents: function(elem) {
            return jQuery.dir(elem, "parentNode")
        },
        parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until)
        },
        next: function(elem) {
            return sibling(elem, "nextSibling")
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling")
        },
        nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling")
        },
        prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling")
        },
        nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until)
        },
        prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until)
        },
        siblings: function(elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem)
        },
        children: function(elem) {
            return jQuery.sibling(elem.firstChild)
        },
        contents: function(elem) {
            return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes)
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var ret = jQuery.map(this, fn, until);
            if (!runtil.test(name)) {
                selector = until
            }
            if (selector && typeof selector === "string") {
                ret = jQuery.filter(selector, ret)
            }
            ret = this.length > 1 && !guaranteedUnique[name] ? jQuery.unique(ret) : ret;
            if (this.length > 1 && rparentsprev.test(name)) {
                ret = ret.reverse()
            }
            return this.pushStack(ret, name, core_slice.call(arguments).join(","))
        }
    });
    jQuery.extend({
        filter: function(expr, elems, not) {
            if (not) {
                expr = ":not(" + expr + ")"
            }
            return elems.length === 1 ? jQuery.find.matchesSelector(elems[0], expr) ? [elems[0]] : [] : jQuery.find.matches(expr, elems)
        },
        dir: function(elem, dir, until) {
            var matched = []
              , cur = elem[dir];
            while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) {
                if (cur.nodeType === 1) {
                    matched.push(cur)
                }
                cur = cur[dir]
            }
            return matched
        },
        sibling: function(n, elem) {
            var r = [];
            for (; n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    r.push(n)
                }
            }
            return r
        }
    });
    function winnow(elements, qualifier, keep) {
        qualifier = qualifier || 0;
        if (jQuery.isFunction(qualifier)) {
            return jQuery.grep(elements, function(elem, i) {
                var retVal = !!qualifier.call(elem, i, elem);
                return retVal === keep
            })
        } else if (qualifier.nodeType) {
            return jQuery.grep(elements, function(elem, i) {
                return (elem === qualifier) === keep
            })
        } else if (typeof qualifier === "string") {
            var filtered = jQuery.grep(elements, function(elem) {
                return elem.nodeType === 1
            });
            if (isSimple.test(qualifier)) {
                return jQuery.filter(qualifier, filtered, !keep)
            } else {
                qualifier = jQuery.filter(qualifier, filtered)
            }
        }
        return jQuery.grep(elements, function(elem, i) {
            return (jQuery.inArray(elem, qualifier) >= 0) === keep
        })
    }
    function createSafeFragment(document) {
        var list = nodeNames.split("|")
          , safeFrag = document.createDocumentFragment();
        if (safeFrag.createElement) {
            while (list.length) {
                safeFrag.createElement(list.pop())
            }
        }
        return safeFrag
    }
    var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" + "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video"
      , rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g
      , rleadingWhitespace = /^\s+/
      , rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi
      , rtagName = /<([\w:]+)/
      , rtbody = /<tbody/i
      , rhtml = /<|&#?\w+;/
      , rnoInnerhtml = /<(?:script|style|link)/i
      , rnocache = /<(?:script|object|embed|option|style)/i
      , rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]","i")
      , rcheckableType = /^(?:checkbox|radio)$/
      , rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i
      , rscriptType = /\/(java|ecma)script/i
      , rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g
      , wrapMap = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        area: [1, "<map>", "</map>"],
        _default: [0, "", ""]
    }
      , safeFragment = createSafeFragment(document)
      , fragmentDiv = safeFragment.appendChild(document.createElement("div"));
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    if (!jQuery.support.htmlSerialize) {
        wrapMap._default = [1, "X<div>", "</div>"]
    }
    jQuery.fn.extend({
        text: function(value) {
            return jQuery.access(this, function(value) {
                return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value))
            }, null, value, arguments.length)
        },
        wrapAll: function(html) {
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapAll(html.call(this, i))
                })
            }
            if (this[0]) {
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) {
                    wrap.insertBefore(this[0])
                }
                wrap.map(function() {
                    var elem = this;
                    while (elem.firstChild && elem.firstChild.nodeType === 1) {
                        elem = elem.firstChild
                    }
                    return elem
                }).append(this)
            }
            return this
        },
        wrapInner: function(html) {
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapInner(html.call(this, i))
                })
            }
            return this.each(function() {
                var self = jQuery(this)
                  , contents = self.contents();
                if (contents.length) {
                    contents.wrapAll(html)
                } else {
                    self.append(html)
                }
            })
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                if (!jQuery.nodeName(this, "body")) {
                    jQuery(this).replaceWith(this.childNodes)
                }
            }).end()
        },
        append: function() {
            return this.domManip(arguments, true, function(elem) {
                if (this.nodeType === 1 || this.nodeType === 11) {
                    this.appendChild(elem)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, true, function(elem) {
                if (this.nodeType === 1 || this.nodeType === 11) {
                    this.insertBefore(elem, this.firstChild)
                }
            })
        },
        before: function() {
            if (!isDisconnected(this[0])) {
                return this.domManip(arguments, false, function(elem) {
                    this.parentNode.insertBefore(elem, this)
                })
            }
            if (arguments.length) {
                var set = jQuery.clean(arguments);
                return this.pushStack(jQuery.merge(set, this), "before", this.selector)
            }
        },
        after: function() {
            if (!isDisconnected(this[0])) {
                return this.domManip(arguments, false, function(elem) {
                    this.parentNode.insertBefore(elem, this.nextSibling)
                })
            }
            if (arguments.length) {
                var set = jQuery.clean(arguments);
                return this.pushStack(jQuery.merge(this, set), "after", this.selector)
            }
        },
        remove: function(selector, keepData) {
            var elem, i = 0;
            for (; (elem = this[i]) != null; i++) {
                if (!selector || jQuery.filter(selector, [elem]).length) {
                    if (!keepData && elem.nodeType === 1) {
                        jQuery.cleanData(elem.getElementsByTagName("*"));
                        jQuery.cleanData([elem])
                    }
                    if (elem.parentNode) {
                        elem.parentNode.removeChild(elem)
                    }
                }
            }
            return this
        },
        empty: function() {
            var elem, i = 0;
            for (; (elem = this[i]) != null; i++) {
                if (elem.nodeType === 1) {
                    jQuery.cleanData(elem.getElementsByTagName("*"))
                }
                while (elem.firstChild) {
                    elem.removeChild(elem.firstChild)
                }
            }
            return this
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
            return this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents)
            })
        },
        html: function(value) {
            return jQuery.access(this, function(value) {
                var elem = this[0] || {}
                  , i = 0
                  , l = this.length;
                if (value === undefined) {
                    return elem.nodeType === 1 ? elem.innerHTML.replace(rinlinejQuery, "") : undefined
                }
                if (typeof value === "string" && !rnoInnerhtml.test(value) && (jQuery.support.htmlSerialize || !rnoshimcache.test(value)) && (jQuery.support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (; i < l; i++) {
                            elem = this[i] || {};
                            if (elem.nodeType === 1) {
                                jQuery.cleanData(elem.getElementsByTagName("*"));
                                elem.innerHTML = value
                            }
                        }
                        elem = 0
                    } catch (e) {}
                }
                if (elem) {
                    this.empty().append(value)
                }
            }, null, value, arguments.length)
        },
        replaceWith: function(value) {
            if (!isDisconnected(this[0])) {
                if (jQuery.isFunction(value)) {
                    return this.each(function(i) {
                        var self = jQuery(this)
                          , old = self.html();
                        self.replaceWith(value.call(this, i, old))
                    })
                }
                if (typeof value !== "string") {
                    value = jQuery(value).detach()
                }
                return this.each(function() {
                    var next = this.nextSibling
                      , parent = this.parentNode;
                    jQuery(this).remove();
                    if (next) {
                        jQuery(next).before(value)
                    } else {
                        jQuery(parent).append(value)
                    }
                })
            }
            return this.length ? this.pushStack(jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value) : this
        },
        detach: function(selector) {
            return this.remove(selector, true)
        },
        domManip: function(args, table, callback) {
            args = [].concat.apply([], args);
            var results, first, fragment, iNoClone, i = 0, value = args[0], scripts = [], l = this.length;
            if (!jQuery.support.checkClone && l > 1 && typeof value === "string" && rchecked.test(value)) {
                return this.each(function() {
                    jQuery(this).domManip(args, table, callback)
                })
            }
            if (jQuery.isFunction(value)) {
                return this.each(function(i) {
                    var self = jQuery(this);
                    args[0] = value.call(this, i, table ? self.html() : undefined);
                    self.domManip(args, table, callback)
                })
            }
            if (this[0]) {
                results = jQuery.buildFragment(args, this, scripts);
                fragment = results.fragment;
                first = fragment.firstChild;
                if (fragment.childNodes.length === 1) {
                    fragment = first
                }
                if (first) {
                    table = table && jQuery.nodeName(first, "tr");
                    for (iNoClone = results.cacheable || l - 1; i < l; i++) {
                        callback.call(table && jQuery.nodeName(this[i], "table") ? findOrAppend(this[i], "tbody") : this[i], i === iNoClone ? fragment : jQuery.clone(fragment, true, true))
                    }
                }
                fragment = first = null;
                if (scripts.length) {
                    jQuery.each(scripts, function(i, elem) {
                        if (elem.src) {
                            if (jQuery.ajax) {
                                jQuery.ajax({
                                    url: elem.src,
                                    type: "GET",
                                    dataType: "script",
                                    async: false,
                                    global: false,
                                    "throws": true
                                })
                            } else {
                                jQuery.error("no ajax")
                            }
                        } else {
                            jQuery.globalEval((elem.text || elem.textContent || elem.innerHTML || "").replace(rcleanScript, ""))
                        }
                        if (elem.parentNode) {
                            elem.parentNode.removeChild(elem)
                        }
                    })
                }
            }
            return this
        }
    });
    function findOrAppend(elem, tag) {
        return elem.getElementsByTagName(tag)[0] || elem.appendChild(elem.ownerDocument.createElement(tag))
    }
    function cloneCopyEvent(src, dest) {
        if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
            return
        }
        var type, i, l, oldData = jQuery._data(src), curData = jQuery._data(dest, oldData), events = oldData.events;
        if (events) {
            delete curData.handle;
            curData.events = {};
            for (type in events) {
                for (i = 0,
                l = events[type].length; i < l; i++) {
                    jQuery.event.add(dest, type, events[type][i])
                }
            }
        }
        if (curData.data) {
            curData.data = jQuery.extend({}, curData.data)
        }
    }
    function cloneFixAttributes(src, dest) {
        var nodeName;
        if (dest.nodeType !== 1) {
            return
        }
        if (dest.clearAttributes) {
            dest.clearAttributes()
        }
        if (dest.mergeAttributes) {
            dest.mergeAttributes(src)
        }
        nodeName = dest.nodeName.toLowerCase();
        if (nodeName === "object") {
            if (dest.parentNode) {
                dest.outerHTML = src.outerHTML
            }
            if (jQuery.support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML))) {
                dest.innerHTML = src.innerHTML
            }
        } else if (nodeName === "input" && rcheckableType.test(src.type)) {
            dest.defaultChecked = dest.checked = src.checked;
            if (dest.value !== src.value) {
                dest.value = src.value
            }
        } else if (nodeName === "option") {
            dest.selected = src.defaultSelected
        } else if (nodeName === "input" || nodeName === "textarea") {
            dest.defaultValue = src.defaultValue
        } else if (nodeName === "script" && dest.text !== src.text) {
            dest.text = src.text
        }
        dest.removeAttribute(jQuery.expando)
    }
    jQuery.buildFragment = function(args, context, scripts) {
        var fragment, cacheable, cachehit, first = args[0];
        context = context || document;
        context = !context.nodeType && context[0] || context;
        context = context.ownerDocument || context;
        if (args.length === 1 && typeof first === "string" && first.length < 512 && context === document && first.charAt(0) === "<" && !rnocache.test(first) && (jQuery.support.checkClone || !rchecked.test(first)) && (jQuery.support.html5Clone || !rnoshimcache.test(first))) {
            cacheable = true;
            fragment = jQuery.fragments[first];
            cachehit = fragment !== undefined
        }
        if (!fragment) {
            fragment = context.createDocumentFragment();
            jQuery.clean(args, context, fragment, scripts);
            if (cacheable) {
                jQuery.fragments[first] = cachehit && fragment
            }
        }
        return {
            fragment: fragment,
            cacheable: cacheable
        }
    }
    ;
    jQuery.fragments = {};
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            var elems, i = 0, ret = [], insert = jQuery(selector), l = insert.length, parent = this.length === 1 && this[0].parentNode;
            if ((parent == null || parent && parent.nodeType === 11 && parent.childNodes.length === 1) && l === 1) {
                insert[original](this[0]);
                return this
            } else {
                for (; i < l; i++) {
                    elems = (i > 0 ? this.clone(true) : this).get();
                    jQuery(insert[i])[original](elems);
                    ret = ret.concat(elems)
                }
                return this.pushStack(ret, name, insert.selector)
            }
        }
    });
    function getAll(elem) {
        if (typeof elem.getElementsByTagName !== "undefined") {
            return elem.getElementsByTagName("*")
        } else if (typeof elem.querySelectorAll !== "undefined") {
            return elem.querySelectorAll("*")
        } else {
            return []
        }
    }
    function fixDefaultChecked(elem) {
        if (rcheckableType.test(elem.type)) {
            elem.defaultChecked = elem.checked
        }
    }
    jQuery.extend({
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var srcElements, destElements, i, clone;
            if (jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">")) {
                clone = elem.cloneNode(true)
            } else {
                fragmentDiv.innerHTML = elem.outerHTML;
                fragmentDiv.removeChild(clone = fragmentDiv.firstChild)
            }
            if ((!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
                cloneFixAttributes(elem, clone);
                srcElements = getAll(elem);
                destElements = getAll(clone);
                for (i = 0; srcElements[i]; ++i) {
                    if (destElements[i]) {
                        cloneFixAttributes(srcElements[i], destElements[i])
                    }
                }
            }
            if (dataAndEvents) {
                cloneCopyEvent(elem, clone);
                if (deepDataAndEvents) {
                    srcElements = getAll(elem);
                    destElements = getAll(clone);
                    for (i = 0; srcElements[i]; ++i) {
                        cloneCopyEvent(srcElements[i], destElements[i])
                    }
                }
            }
            srcElements = destElements = null;
            return clone
        },
        clean: function(elems, context, fragment, scripts) {
            var i, j, elem, tag, wrap, depth, div, hasBody, tbody, len, handleScript, jsTags, safe = context === document && safeFragment, ret = [];
            if (!context || typeof context.createDocumentFragment === "undefined") {
                context = document
            }
            for (i = 0; (elem = elems[i]) != null; i++) {
                if (typeof elem === "number") {
                    elem += ""
                }
                if (!elem) {
                    continue
                }
                if (typeof elem === "string") {
                    if (!rhtml.test(elem)) {
                        elem = context.createTextNode(elem)
                    } else {
                        safe = safe || createSafeFragment(context);
                        div = context.createElement("div");
                        safe.appendChild(div);
                        elem = elem.replace(rxhtmlTag, "<$1></$2>");
                        tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                        wrap = wrapMap[tag] || wrapMap._default;
                        depth = wrap[0];
                        div.innerHTML = wrap[1] + elem + wrap[2];
                        while (depth--) {
                            div = div.lastChild
                        }
                        if (!jQuery.support.tbody) {
                            hasBody = rtbody.test(elem);
                            tbody = tag === "table" && !hasBody ? div.firstChild && div.firstChild.childNodes : wrap[1] === "<table>" && !hasBody ? div.childNodes : [];
                            for (j = tbody.length - 1; j >= 0; --j) {
                                if (jQuery.nodeName(tbody[j], "tbody") && !tbody[j].childNodes.length) {
                                    tbody[j].parentNode.removeChild(tbody[j])
                                }
                            }
                        }
                        if (!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem)) {
                            div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]), div.firstChild)
                        }
                        elem = div.childNodes;
                        div.parentNode.removeChild(div)
                    }
                }
                if (elem.nodeType) {
                    ret.push(elem)
                } else {
                    jQuery.merge(ret, elem)
                }
            }
            if (div) {
                elem = div = safe = null
            }
            if (!jQuery.support.appendChecked) {
                for (i = 0; (elem = ret[i]) != null; i++) {
                    if (jQuery.nodeName(elem, "input")) {
                        fixDefaultChecked(elem)
                    } else if (typeof elem.getElementsByTagName !== "undefined") {
                        jQuery.grep(elem.getElementsByTagName("input"), fixDefaultChecked)
                    }
                }
            }
            if (fragment) {
                handleScript = function(elem) {
                    if (!elem.type || rscriptType.test(elem.type)) {
                        return scripts ? scripts.push(elem.parentNode ? elem.parentNode.removeChild(elem) : elem) : fragment.appendChild(elem)
                    }
                }
                ;
                for (i = 0; (elem = ret[i]) != null; i++) {
                    if (!(jQuery.nodeName(elem, "script") && handleScript(elem))) {
                        fragment.appendChild(elem);
                        if (typeof elem.getElementsByTagName !== "undefined") {
                            jsTags = jQuery.grep(jQuery.merge([], elem.getElementsByTagName("script")), handleScript);
                            ret.splice.apply(ret, [i + 1, 0].concat(jsTags));
                            i += jsTags.length
                        }
                    }
                }
            }
            return ret
        },
        cleanData: function(elems, acceptData) {
            var data, id, elem, type, i = 0, internalKey = jQuery.expando, cache = jQuery.cache, deleteExpando = jQuery.support.deleteExpando, special = jQuery.event.special;
            for (; (elem = elems[i]) != null; i++) {
                if (acceptData || jQuery.acceptData(elem)) {
                    id = elem[internalKey];
                    data = id && cache[id];
                    if (data) {
                        if (data.events) {
                            for (type in data.events) {
                                if (special[type]) {
                                    jQuery.event.remove(elem, type)
                                } else {
                                    jQuery.removeEvent(elem, type, data.handle)
                                }
                            }
                        }
                        if (cache[id]) {
                            delete cache[id];
                            if (deleteExpando) {
                                delete elem[internalKey]
                            } else if (elem.removeAttribute) {
                                elem.removeAttribute(internalKey)
                            } else {
                                elem[internalKey] = null
                            }
                            jQuery.deletedIds.push(id)
                        }
                    }
                }
            }
        }
    });
    (function() {
        var matched, browser;
        jQuery.uaMatch = function(ua) {
            ua = ua.toLowerCase();
            var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
            return {
                browser: match[1] || "",
                version: match[2] || "0"
            }
        }
        ;
        matched = jQuery.uaMatch(navigator.userAgent);
        browser = {};
        if (matched.browser) {
            browser[matched.browser] = true;
            browser.version = matched.version
        }
        if (browser.chrome) {
            browser.webkit = true
        } else if (browser.webkit) {
            browser.safari = true
        }
        jQuery.browser = browser;
        jQuery.sub = function() {
            function jQuerySub(selector, context) {
                return new jQuerySub.fn.init(selector,context)
            }
            jQuery.extend(true, jQuerySub, this);
            jQuerySub.superclass = this;
            jQuerySub.fn = jQuerySub.prototype = this();
            jQuerySub.fn.constructor = jQuerySub;
            jQuerySub.sub = this.sub;
            jQuerySub.fn.init = function init(selector, context) {
                if (context && context instanceof jQuery && !(context instanceof jQuerySub)) {
                    context = jQuerySub(context)
                }
                return jQuery.fn.init.call(this, selector, context, rootjQuerySub)
            }
            ;
            jQuerySub.fn.init.prototype = jQuerySub.fn;
            var rootjQuerySub = jQuerySub(document);
            return jQuerySub
        }
    }
    )();
    var curCSS, iframe, iframeDoc, ralpha = /alpha\([^)]*\)/i, ropacity = /opacity=([^)]*)/, rposition = /^(top|right|bottom|left)$/, rdisplayswap = /^(none|table(?!-c[ea]).+)/, rmargin = /^margin/, rnumsplit = new RegExp("^(" + core_pnum + ")(.*)$","i"), rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$","i"), rrelNum = new RegExp("^([-+])=(" + core_pnum + ")","i"), elemdisplay = {}, cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, cssNormalTransform = {
        letterSpacing: 0,
        fontWeight: 400
    }, cssExpand = ["Top", "Right", "Bottom", "Left"], cssPrefixes = ["Webkit", "O", "Moz", "ms"], eventsToggle = jQuery.fn.toggle;
    function vendorPropName(style, name) {
        if (name in style) {
            return name
        }
        var capName = name.charAt(0).toUpperCase() + name.slice(1)
          , origName = name
          , i = cssPrefixes.length;
        while (i--) {
            name = cssPrefixes[i] + capName;
            if (name in style) {
                return name
            }
        }
        return origName
    }
    function isHidden(elem, el) {
        elem = el || elem;
        return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem)
    }
    function showHide(elements, show) {
        var elem, display, values = [], index = 0, length = elements.length;
        for (; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue
            }
            values[index] = jQuery._data(elem, "olddisplay");
            if (show) {
                if (!values[index] && elem.style.display === "none") {
                    elem.style.display = ""
                }
                if (elem.style.display === "" && isHidden(elem)) {
                    values[index] = jQuery._data(elem, "olddisplay", css_defaultDisplay(elem.nodeName))
                }
            } else {
                display = curCSS(elem, "display");
                if (!values[index] && display !== "none") {
                    jQuery._data(elem, "olddisplay", display)
                }
            }
        }
        for (index = 0; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue
            }
            if (!show || elem.style.display === "none" || elem.style.display === "") {
                elem.style.display = show ? values[index] || "" : "none"
            }
        }
        return elements
    }
    jQuery.fn.extend({
        css: function(name, value) {
            return jQuery.access(this, function(elem, name, value) {
                return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name)
            }, name, value, arguments.length > 1)
        },
        show: function() {
            return showHide(this, true)
        },
        hide: function() {
            return showHide(this)
        },
        toggle: function(state, fn2) {
            var bool = typeof state === "boolean";
            if (jQuery.isFunction(state) && jQuery.isFunction(fn2)) {
                return eventsToggle.apply(this, arguments)
            }
            return this.each(function() {
                if (bool ? state : isHidden(this)) {
                    jQuery(this).show()
                } else {
                    jQuery(this).hide()
                }
            })
        }
    });
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return ret === "" ? "1" : ret
                    }
                }
            }
        },
        cssNumber: {
            "fillOpacity": true,
            "fontWeight": true,
            "lineHeight": true,
            "opacity": true,
            "orphans": true,
            "widows": true,
            "zIndex": true,
            "zoom": true
        },
        cssProps: {
            "float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(elem, name, value, extra) {
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                return
            }
            var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (value !== undefined) {
                type = typeof value;
                if (type === "string" && (ret = rrelNum.exec(value))) {
                    value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
                    type = "number"
                }
                if (value == null || type === "number" && isNaN(value)) {
                    return
                }
                if (type === "number" && !jQuery.cssNumber[origName]) {
                    value += "px"
                }
                if (!hooks || !("set"in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
                    try {
                        style[name] = value
                    } catch (e) {}
                }
            } else {
                if (hooks && "get"in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
                    return ret
                }
                return style[name]
            }
        },
        css: function(elem, name, numeric, extra) {
            var val, num, hooks, origName = jQuery.camelCase(name);
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (hooks && "get"in hooks) {
                val = hooks.get(elem, true, extra)
            }
            if (val === undefined) {
                val = curCSS(elem, name)
            }
            if (val === "normal" && name in cssNormalTransform) {
                val = cssNormalTransform[name]
            }
            if (numeric || extra !== undefined) {
                num = parseFloat(val);
                return numeric || jQuery.isNumeric(num) ? num || 0 : val
            }
            return val
        },
        swap: function(elem, options, callback) {
            var ret, name, old = {};
            for (name in options) {
                old[name] = elem.style[name];
                elem.style[name] = options[name]
            }
            ret = callback.call(elem);
            for (name in options) {
                elem.style[name] = old[name]
            }
            return ret
        }
    });
    if (window.getComputedStyle) {
        curCSS = function(elem, name) {
            var ret, width, minWidth, maxWidth, computed = window.getComputedStyle(elem, null), style = elem.style;
            if (computed) {
                ret = computed[name];
                if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
                    ret = jQuery.style(elem, name)
                }
                if (rnumnonpx.test(ret) && rmargin.test(name)) {
                    width = style.width;
                    minWidth = style.minWidth;
                    maxWidth = style.maxWidth;
                    style.minWidth = style.maxWidth = style.width = ret;
                    ret = computed.width;
                    style.width = width;
                    style.minWidth = minWidth;
                    style.maxWidth = maxWidth
                }
            }
            return ret
        }
    } else if (document.documentElement.currentStyle) {
        curCSS = function(elem, name) {
            var left, rsLeft, ret = elem.currentStyle && elem.currentStyle[name], style = elem.style;
            if (ret == null && style && style[name]) {
                ret = style[name]
            }
            if (rnumnonpx.test(ret) && !rposition.test(name)) {
                left = style.left;
                rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;
                if (rsLeft) {
                    elem.runtimeStyle.left = elem.currentStyle.left
                }
                style.left = name === "fontSize" ? "1em" : ret;
                ret = style.pixelLeft + "px";
                style.left = left;
                if (rsLeft) {
                    elem.runtimeStyle.left = rsLeft
                }
            }
            return ret === "" ? "auto" : ret
        }
    }
    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value
    }
    function augmentWidthOrHeight(elem, name, extra, isBorderBox) {
        var i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0
          , val = 0;
        for (; i < 4; i += 2) {
            if (extra === "margin") {
                val += jQuery.css(elem, extra + cssExpand[i], true)
            }
            if (isBorderBox) {
                if (extra === "content") {
                    val -= parseFloat(curCSS(elem, "padding" + cssExpand[i])) || 0
                }
                if (extra !== "margin") {
                    val -= parseFloat(curCSS(elem, "border" + cssExpand[i] + "Width")) || 0
                }
            } else {
                val += parseFloat(curCSS(elem, "padding" + cssExpand[i])) || 0;
                if (extra !== "padding") {
                    val += parseFloat(curCSS(elem, "border" + cssExpand[i] + "Width")) || 0
                }
            }
        }
        return val
    }
    function getWidthOrHeight(elem, name, extra) {
        var val = name === "width" ? elem.offsetWidth : elem.offsetHeight
          , valueIsBorderBox = true
          , isBorderBox = jQuery.support.boxSizing && jQuery.css(elem, "boxSizing") === "border-box";
        if (val <= 0 || val == null) {
            val = curCSS(elem, name);
            if (val < 0 || val == null) {
                val = elem.style[name]
            }
            if (rnumnonpx.test(val)) {
                return val
            }
            valueIsBorderBox = isBorderBox && (jQuery.support.boxSizingReliable || val === elem.style[name]);
            val = parseFloat(val) || 0
        }
        return (val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox)) + "px"
    }
    function css_defaultDisplay(nodeName) {
        if (elemdisplay[nodeName]) {
            return elemdisplay[nodeName]
        }
        var elem = jQuery("<" + nodeName + ">").appendTo(document.body)
          , display = elem.css("display");
        elem.remove();
        if (display === "none" || display === "") {
            iframe = document.body.appendChild(iframe || jQuery.extend(document.createElement("iframe"), {
                frameBorder: 0,
                width: 0,
                height: 0
            }));
            if (!iframeDoc || !iframe.createElement) {
                iframeDoc = (iframe.contentWindow || iframe.contentDocument).document;
                iframeDoc.write("<!doctype html><html><body>");
                iframeDoc.close()
            }
            elem = iframeDoc.body.appendChild(iframeDoc.createElement(nodeName));
            display = curCSS(elem, "display");
            document.body.removeChild(iframe)
        }
        elemdisplay[nodeName] = display;
        return display
    }
    jQuery.each(["height", "width"], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                if (computed) {
                    if (elem.offsetWidth === 0 && rdisplayswap.test(curCSS(elem, "display"))) {
                        return jQuery.swap(elem, cssShow, function() {
                            return getWidthOrHeight(elem, name, extra)
                        })
                    } else {
                        return getWidthOrHeight(elem, name, extra)
                    }
                }
            },
            set: function(elem, value, extra) {
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.support.boxSizing && jQuery.css(elem, "boxSizing") === "border-box") : 0)
            }
        }
    });
    if (!jQuery.support.opacity) {
        jQuery.cssHooks.opacity = {
            get: function(elem, computed) {
                return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? (0.01 * parseFloat(RegExp.$1)) + "" : computed ? "1" : ""
            },
            set: function(elem, value) {
                var style = elem.style
                  , currentStyle = elem.currentStyle
                  , opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + value * 100 + ")" : ""
                  , filter = currentStyle && currentStyle.filter || style.filter || "";
                style.zoom = 1;
                if (value >= 1 && jQuery.trim(filter.replace(ralpha, "")) === "" && style.removeAttribute) {
                    style.removeAttribute("filter");
                    if (currentStyle && !currentStyle.filter) {
                        return
                    }
                }
                style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity
            }
        }
    }
    jQuery(function() {
        if (!jQuery.support.reliableMarginRight) {
            jQuery.cssHooks.marginRight = {
                get: function(elem, computed) {
                    return jQuery.swap(elem, {
                        "display": "inline-block"
                    }, function() {
                        if (computed) {
                            return curCSS(elem, "marginRight")
                        }
                    })
                }
            }
        }
        if (!jQuery.support.pixelPosition && jQuery.fn.position) {
            jQuery.each(["top", "left"], function(i, prop) {
                jQuery.cssHooks[prop] = {
                    get: function(elem, computed) {
                        if (computed) {
                            var ret = curCSS(elem, prop);
                            return rnumnonpx.test(ret) ? jQuery(elem).position()[prop] + "px" : ret
                        }
                    }
                }
            })
        }
    });
    if (jQuery.expr && jQuery.expr.filters) {
        jQuery.expr.filters.hidden = function(elem) {
            return (elem.offsetWidth === 0 && elem.offsetHeight === 0) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || curCSS(elem, "display")) === "none")
        }
        ;
        jQuery.expr.filters.visible = function(elem) {
            return !jQuery.expr.filters.hidden(elem)
        }
    }
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                var i, parts = typeof value === "string" ? value.split(" ") : [value], expanded = {};
                for (i = 0; i < 4; i++) {
                    expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0]
                }
                return expanded
            }
        };
        if (!rmargin.test(prefix)) {
            jQuery.cssHooks[prefix + suffix].set = setPositiveNumber
        }
    });
    var r20 = /%20/g
      , rbracket = /\[\]$/
      , rCRLF = /\r?\n/g
      , rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i
      , rselectTextarea = /^(?:select|textarea)/i;
    jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? jQuery.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || rselectTextarea.test(this.nodeName) || rinput.test(this.type))
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val, i) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    }
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                }
            }).get()
        }
    });
    jQuery.param = function(a, traditional) {
        var prefix, s = [], add = function(key, value) {
            value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
            s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value)
        };
        if (traditional === undefined) {
            traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional
        }
        if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
            jQuery.each(a, function() {
                add(this.name, this.value)
            })
        } else {
            for (prefix in a) {
                buildParams(prefix, a[prefix], traditional, add)
            }
        }
        return s.join("&").replace(r20, "+")
    }
    ;
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) {
            jQuery.each(obj, function(i, v) {
                if (traditional || rbracket.test(prefix)) {
                    add(prefix, v)
                } else {
                    buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add)
                }
            })
        } else if (!traditional && jQuery.type(obj) === "object") {
            for (name in obj) {
                buildParams(prefix + "[" + name + "]", obj[name], traditional, add)
            }
        } else {
            add(prefix, obj)
        }
    }
    var ajaxLocParts, ajaxLocation, rhash = /#.*$/, rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rquery = /\?/, rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, rts = /([?&])_=[^&]*/, rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, _load = jQuery.fn.load, prefilters = {}, transports = {}, allTypes = ["*/"] + ["*"];
    try {
        ajaxLocation = location.href
    } catch (e) {
        ajaxLocation = document.createElement("a");
        ajaxLocation.href = "";
        ajaxLocation = ajaxLocation.href
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            if (typeof dataTypeExpression !== "string") {
                func = dataTypeExpression;
                dataTypeExpression = "*"
            }
            var dataType, list, placeBefore, dataTypes = dataTypeExpression.toLowerCase().split(core_rspace), i = 0, length = dataTypes.length;
            if (jQuery.isFunction(func)) {
                for (; i < length; i++) {
                    dataType = dataTypes[i];
                    placeBefore = /^\+/.test(dataType);
                    if (placeBefore) {
                        dataType = dataType.substr(1) || "*"
                    }
                    list = structure[dataType] = structure[dataType] || [];
                    list[placeBefore ? "unshift" : "push"](func)
                }
            }
        }
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, dataType, inspected) {
        dataType = dataType || options.dataTypes[0];
        inspected = inspected || {};
        inspected[dataType] = true;
        var selection, list = structure[dataType], i = 0, length = list ? list.length : 0, executeOnly = (structure === prefilters);
        for (; i < length && (executeOnly || !selection); i++) {
            selection = list[i](options, originalOptions, jqXHR);
            if (typeof selection === "string") {
                if (!executeOnly || inspected[selection]) {
                    selection = undefined
                } else {
                    options.dataTypes.unshift(selection);
                    selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, selection, inspected)
                }
            }
        }
        if ((executeOnly || !selection) && !inspected["*"]) {
            selection = inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR, "*", inspected)
        }
        return selection
    }
    function ajaxExtend(target, src) {
        var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) {
            if (src[key] !== undefined) {
                (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key]
            }
        }
        if (deep) {
            jQuery.extend(true, target, deep)
        }
    }
    jQuery.fn.load = function(url, params, callback) {
        if (typeof url !== "string" && _load) {
            return _load.apply(this, arguments)
        }
        if (!this.length) {
            return this
        }
        var selector, type, response, self = this, off = url.indexOf(" ");
        if (off >= 0) {
            selector = url.slice(off, url.length);
            url = url.slice(0, off)
        }
        if (jQuery.isFunction(params)) {
            callback = params;
            params = undefined
        } else if (params && typeof params === "object") {
            type = "POST"
        }
        jQuery.ajax({
            url: url,
            type: type,
            dataType: "html",
            data: params,
            complete: function(jqXHR, status) {
                if (callback) {
                    self.each(callback, response || [jqXHR.responseText, status, jqXHR])
                }
            }
        }).done(function(responseText) {
            response = arguments;
            self.html(selector ? jQuery("<div>").append(responseText.replace(rscript, "")).find(selector) : responseText)
        });
        return this
    }
    ;
    jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(i, o) {
        jQuery.fn[o] = function(f) {
            return this.on(o, f)
        }
    });
    jQuery.each(["get", "post"], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined
            }
            return jQuery.ajax({
                type: method,
                url: url,
                data: data,
                success: callback,
                dataType: type
            })
        }
    });
    jQuery.extend({
        getScript: function(url, callback) {
            return jQuery.get(url, undefined, callback, "script")
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json")
        },
        ajaxSetup: function(target, settings) {
            if (settings) {
                ajaxExtend(target, jQuery.ajaxSettings)
            } else {
                settings = target;
                target = jQuery.ajaxSettings
            }
            ajaxExtend(target, settings);
            return target
        },
        ajaxSettings: {
            url: ajaxLocation,
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: true,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: true,
            async: true,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": allTypes
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": window.String,
                "text html": true,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                context: true,
                url: true
            }
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            if (typeof url === "object") {
                options = url;
                url = undefined
            }
            options = options || {};
            var ifModifiedKey, responseHeadersString, responseHeaders, transport, timeoutTimer, parts, fireGlobals, i, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = callbackContext !== s && (callbackContext.nodeType || callbackContext instanceof jQuery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0, strAbort = "canceled", jqXHR = {
                readyState: 0,
                setRequestHeader: function(name, value) {
                    if (!state) {
                        var lname = name.toLowerCase();
                        name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                        requestHeaders[name] = value
                    }
                    return this
                },
                getAllResponseHeaders: function() {
                    return state === 2 ? responseHeadersString : null
                },
                getResponseHeader: function(key) {
                    var match;
                    if (state === 2) {
                        if (!responseHeaders) {
                            responseHeaders = {};
                            while ((match = rheaders.exec(responseHeadersString))) {
                                responseHeaders[match[1].toLowerCase()] = match[2]
                            }
                        }
                        match = responseHeaders[key.toLowerCase()]
                    }
                    return match === undefined ? null : match
                },
                overrideMimeType: function(type) {
                    if (!state) {
                        s.mimeType = type
                    }
                    return this
                },
                abort: function(statusText) {
                    statusText = statusText || strAbort;
                    if (transport) {
                        transport.abort(statusText)
                    }
                    done(0, statusText);
                    return this
                }
            };
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                if (state === 2) {
                    return
                }
                state = 2;
                if (timeoutTimer) {
                    clearTimeout(timeoutTimer)
                }
                transport = undefined;
                responseHeadersString = headers || "";
                jqXHR.readyState = status > 0 ? 4 : 0;
                if (responses) {
                    response = ajaxHandleResponses(s, jqXHR, responses)
                }
                if (status >= 200 && status < 300 || status === 304) {
                    if (s.ifModified) {
                        modified = jqXHR.getResponseHeader("Last-Modified");
                        if (modified) {
                            jQuery.lastModified[ifModifiedKey] = modified
                        }
                        modified = jqXHR.getResponseHeader("Etag");
                        if (modified) {
                            jQuery.etag[ifModifiedKey] = modified
                        }
                    }
                    if (status === 304) {
                        statusText = "notmodified";
                        isSuccess = true
                    } else {
                        isSuccess = ajaxConvert(s, response);
                        statusText = isSuccess.state;
                        success = isSuccess.data;
                        error = isSuccess.error;
                        isSuccess = !error
                    }
                } else {
                    error = statusText;
                    if (!statusText || status) {
                        statusText = "error";
                        if (status < 0) {
                            status = 0
                        }
                    }
                }
                jqXHR.status = status;
                jqXHR.statusText = (nativeStatusText || statusText) + "";
                if (isSuccess) {
                    deferred.resolveWith(callbackContext, [success, statusText, jqXHR])
                } else {
                    deferred.rejectWith(callbackContext, [jqXHR, statusText, error])
                }
                jqXHR.statusCode(statusCode);
                statusCode = undefined;
                if (fireGlobals) {
                    globalEventContext.trigger("ajax" + (isSuccess ? "Success" : "Error"), [jqXHR, s, isSuccess ? success : error])
                }
                completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                    if (!(--jQuery.active)) {
                        jQuery.event.trigger("ajaxStop")
                    }
                }
            }
            deferred.promise(jqXHR);
            jqXHR.success = jqXHR.done;
            jqXHR.error = jqXHR.fail;
            jqXHR.complete = completeDeferred.add;
            jqXHR.statusCode = function(map) {
                if (map) {
                    var tmp;
                    if (state < 2) {
                        for (tmp in map) {
                            statusCode[tmp] = [statusCode[tmp], map[tmp]]
                        }
                    } else {
                        tmp = map[jqXHR.status];
                        jqXHR.always(tmp)
                    }
                }
                return this
            }
            ;
            s.url = ((url || s.url) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
            s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().split(core_rspace);
            if (s.crossDomain == null) {
                parts = rurl.exec(s.url.toLowerCase()) || false;
                s.crossDomain = parts && (parts.join(":") + (parts[3] ? "" : parts[1] === "http:" ? 80 : 443)) !== (ajaxLocParts.join(":") + (ajaxLocParts[3] ? "" : ajaxLocParts[1] === "http:" ? 80 : 443))
            }
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional)
            }
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
            if (state === 2) {
                return jqXHR
            }
            fireGlobals = s.global;
            s.type = s.type.toUpperCase();
            s.hasContent = !rnoContent.test(s.type);
            if (fireGlobals && jQuery.active++ === 0) {
                jQuery.event.trigger("ajaxStart")
            }
            if (!s.hasContent) {
                if (s.data) {
                    s.url += (rquery.test(s.url) ? "&" : "?") + s.data;
                    delete s.data
                }
                ifModifiedKey = s.url;
                if (s.cache === false) {
                    var ts = jQuery.now()
                      , ret = s.url.replace(rts, "$1_=" + ts);
                    s.url = ret + ((ret === s.url) ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : "")
                }
            }
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                jqXHR.setRequestHeader("Content-Type", s.contentType)
            }
            if (s.ifModified) {
                ifModifiedKey = ifModifiedKey || s.url;
                if (jQuery.lastModified[ifModifiedKey]) {
                    jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[ifModifiedKey])
                }
                if (jQuery.etag[ifModifiedKey]) {
                    jqXHR.setRequestHeader("If-None-Match", jQuery.etag[ifModifiedKey])
                }
            }
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) {
                jqXHR.setRequestHeader(i, s.headers[i])
            }
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
                return jqXHR.abort()
            }
            strAbort = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            }) {
                jqXHR[i](s[i])
            }
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
            if (!transport) {
                done(-1, "No Transport")
            } else {
                jqXHR.readyState = 1;
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxSend", [jqXHR, s])
                }
                if (s.async && s.timeout > 0) {
                    timeoutTimer = setTimeout(function() {
                        jqXHR.abort("timeout")
                    }, s.timeout)
                }
                try {
                    state = 1;
                    transport.send(requestHeaders, done)
                } catch (e) {
                    if (state < 2) {
                        done(-1, e)
                    } else {
                        throw e
                    }
                }
            }
            return jqXHR
        },
        active: 0,
        lastModified: {},
        etag: {}
    });
    function ajaxHandleResponses(s, jqXHR, responses) {
        var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes, responseFields = s.responseFields;
        for (type in responseFields) {
            if (type in responses) {
                jqXHR[responseFields[type]] = responses[type]
            }
        }
        while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === undefined) {
                ct = s.mimeType || jqXHR.getResponseHeader("content-type")
            }
        }
        if (ct) {
            for (type in contents) {
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break
                }
            }
        }
        if (dataTypes[0]in responses) {
            finalDataType = dataTypes[0]
        } else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break
                }
                if (!firstDataType) {
                    firstDataType = type
                }
            }
            finalDataType = finalDataType || firstDataType
        }
        if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
                dataTypes.unshift(finalDataType)
            }
            return responses[finalDataType]
        }
    }
    function ajaxConvert(s, response) {
        var conv, conv2, current, tmp, dataTypes = s.dataTypes.slice(), prev = dataTypes[0], converters = {}, i = 0;
        if (s.dataFilter) {
            response = s.dataFilter(response, s.dataType)
        }
        if (dataTypes[1]) {
            for (conv in s.converters) {
                converters[conv.toLowerCase()] = s.converters[conv]
            }
        }
        for (; (current = dataTypes[++i]); ) {
            if (current !== "*") {
                if (prev !== "*" && prev !== current) {
                    conv = converters[prev + " " + current] || converters["* " + current];
                    if (!conv) {
                        for (conv2 in converters) {
                            tmp = conv2.split(" ");
                            if (tmp[1] === current) {
                                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                                if (conv) {
                                    if (conv === true) {
                                        conv = converters[conv2]
                                    } else if (converters[conv2] !== true) {
                                        current = tmp[0];
                                        dataTypes.splice(i--, 0, current)
                                    }
                                    break
                                }
                            }
                        }
                    }
                    if (conv !== true) {
                        if (conv && s["throws"]) {
                            response = conv(response)
                        } else {
                            try {
                                response = conv(response)
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: conv ? e : "No conversion from " + prev + " to " + current
                                }
                            }
                        }
                    }
                }
                prev = current
            }
        }
        return {
            state: "success",
            data: response
        }
    }
    var oldCallbacks = []
      , rquestion = /\?/
      , rjsonp = /(=)\?(?=&|$)|\?\?/
      , nonce = jQuery.now();
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
            this[callback] = true;
            return callback
        }
    });
    jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, data = s.data, url = s.url, hasCallback = s.jsonp !== false, replaceInUrl = hasCallback && rjsonp.test(url), replaceInData = hasCallback && !replaceInUrl && typeof data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(data);
        if (s.dataTypes[0] === "jsonp" || replaceInUrl || replaceInData) {
            callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
            overwritten = window[callbackName];
            if (replaceInUrl) {
                s.url = url.replace(rjsonp, "$1" + callbackName)
            } else if (replaceInData) {
                s.data = data.replace(rjsonp, "$1" + callbackName)
            } else if (hasCallback) {
                s.url += (rquestion.test(url) ? "&" : "?") + s.jsonp + "=" + callbackName
            }
            s.converters["script json"] = function() {
                if (!responseContainer) {
                    jQuery.error(callbackName + " was not called")
                }
                return responseContainer[0]
            }
            ;
            s.dataTypes[0] = "json";
            window[callbackName] = function() {
                responseContainer = arguments
            }
            ;
            jqXHR.always(function() {
                window[callbackName] = overwritten;
                if (s[callbackName]) {
                    s.jsonpCallback = originalSettings.jsonpCallback;
                    oldCallbacks.push(callbackName)
                }
                if (responseContainer && jQuery.isFunction(overwritten)) {
                    overwritten(responseContainer[0])
                }
                responseContainer = overwritten = undefined
            });
            return "script"
        }
    });
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(text) {
                jQuery.globalEval(text);
                return text
            }
        }
    });
    jQuery.ajaxPrefilter("script", function(s) {
        if (s.cache === undefined) {
            s.cache = false
        }
        if (s.crossDomain) {
            s.type = "GET";
            s.global = false
        }
    });
    jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script, head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
            return {
                send: function(_, callback) {
                    script = document.createElement("script");
                    script.async = "async";
                    if (s.scriptCharset) {
                        script.charset = s.scriptCharset
                    }
                    script.src = s.url;
                    script.onload = script.onreadystatechange = function(_, isAbort) {
                        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                            script.onload = script.onreadystatechange = null;
                            if (head && script.parentNode) {
                                head.removeChild(script)
                            }
                            script = undefined;
                            if (!isAbort) {
                                callback(200, "success")
                            }
                        }
                    }
                    ;
                    head.insertBefore(script, head.firstChild)
                },
                abort: function() {
                    if (script) {
                        script.onload(0, 1)
                    }
                }
            }
        }
    });
    var xhrCallbacks, xhrOnUnloadAbort = window.ActiveXObject ? function() {
        for (var key in xhrCallbacks) {
            xhrCallbacks[key](0, 1)
        }
    }
    : false, xhrId = 0;
    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest()
        } catch (e) {}
    }
    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {}
    }
    jQuery.ajaxSettings.xhr = window.ActiveXObject ? function() {
        return !this.isLocal && createStandardXHR() || createActiveXHR()
    }
    : createStandardXHR;
    (function(xhr) {
        jQuery.extend(jQuery.support, {
            ajax: !!xhr,
            cors: !!xhr && ("withCredentials"in xhr)
        })
    }
    )(jQuery.ajaxSettings.xhr());
    if (jQuery.support.ajax) {
        jQuery.ajaxTransport(function(s) {
            if (!s.crossDomain || jQuery.support.cors) {
                var callback;
                return {
                    send: function(headers, complete) {
                        var handle, i, xhr = s.xhr();
                        if (s.username) {
                            xhr.open(s.type, s.url, s.async, s.username, s.password)
                        } else {
                            xhr.open(s.type, s.url, s.async)
                        }
                        if (s.xhrFields) {
                            for (i in s.xhrFields) {
                                xhr[i] = s.xhrFields[i]
                            }
                        }
                        if (s.mimeType && xhr.overrideMimeType) {
                            xhr.overrideMimeType(s.mimeType)
                        }
                        if (!s.crossDomain && !headers["X-Requested-With"]) {
                            headers["X-Requested-With"] = "XMLHttpRequest"
                        }
                        try {
                            for (i in headers) {
                                xhr.setRequestHeader(i, headers[i])
                            }
                        } catch (_) {}
                        xhr.send((s.hasContent && s.data) || null);
                        callback = function(_, isAbort) {
                            var status, statusText, responseHeaders, responses, xml;
                            try {
                                if (callback && (isAbort || xhr.readyState === 4)) {
                                    callback = undefined;
                                    if (handle) {
                                        xhr.onreadystatechange = jQuery.noop;
                                        if (xhrOnUnloadAbort) {
                                            delete xhrCallbacks[handle]
                                        }
                                    }
                                    if (isAbort) {
                                        if (xhr.readyState !== 4) {
                                            xhr.abort()
                                        }
                                    } else {
                                        status = xhr.status;
                                        responseHeaders = xhr.getAllResponseHeaders();
                                        responses = {};
                                        xml = xhr.responseXML;
                                        if (xml && xml.documentElement) {
                                            responses.xml = xml
                                        }
                                        try {
                                            responses.text = xhr.responseText
                                        } catch (_) {}
                                        try {
                                            statusText = xhr.statusText
                                        } catch (e) {
                                            statusText = ""
                                        }
                                        if (!status && s.isLocal && !s.crossDomain) {
                                            status = responses.text ? 200 : 404
                                        } else if (status === 1223) {
                                            status = 204
                                        }
                                    }
                                }
                            } catch (firefoxAccessException) {
                                if (!isAbort) {
                                    complete(-1, firefoxAccessException)
                                }
                            }
                            if (responses) {
                                complete(status, statusText, responses, responseHeaders)
                            }
                        }
                        ;
                        if (!s.async) {
                            callback()
                        } else if (xhr.readyState === 4) {
                            setTimeout(callback, 0)
                        } else {
                            handle = ++xhrId;
                            if (xhrOnUnloadAbort) {
                                if (!xhrCallbacks) {
                                    xhrCallbacks = {};
                                    jQuery(window).unload(xhrOnUnloadAbort)
                                }
                                xhrCallbacks[handle] = callback
                            }
                            xhr.onreadystatechange = callback
                        }
                    },
                    abort: function() {
                        if (callback) {
                            callback(0, 1)
                        }
                    }
                }
            }
        })
    }
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp("^(?:([-+])=|)(" + core_pnum + ")([a-z%]*)$","i"), rrun = /queueHooks$/, animationPrefilters = [defaultPrefilter], tweeners = {
        "*": [function(prop, value) {
            var end, unit, tween = this.createTween(prop, value), parts = rfxnum.exec(value), target = tween.cur(), start = +target || 0, scale = 1, maxIterations = 20;
            if (parts) {
                end = +parts[2];
                unit = parts[3] || (jQuery.cssNumber[prop] ? "" : "px");
                if (unit !== "px" && start) {
                    start = jQuery.css(tween.elem, prop, true) || end || 1;
                    do {
                        scale = scale || ".5";
                        start = start / scale;
                        jQuery.style(tween.elem, prop, start + unit)
                    } while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations)
                }
                tween.unit = unit;
                tween.start = start;
                tween.end = parts[1] ? start + (parts[1] + 1) * end : end
            }
            return tween
        }
        ]
    };
    function createFxNow() {
        setTimeout(function() {
            fxNow = undefined
        }, 0);
        return (fxNow = jQuery.now())
    }
    function createTweens(animation, props) {
        jQuery.each(props, function(prop, value) {
            var collection = (tweeners[prop] || []).concat(tweeners["*"])
              , index = 0
              , length = collection.length;
            for (; index < length; index++) {
                if (collection[index].call(animation, prop, value)) {
                    return
                }
            }
        })
    }
    function Animation(elem, properties, options) {
        var result, index = 0, tweenerIndex = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function() {
            delete tick.elem
        }), tick = function() {
            var currentTime = fxNow || createFxNow()
              , remaining = Math.max(0, animation.startTime + animation.duration - currentTime)
              , percent = 1 - (remaining / animation.duration || 0)
              , index = 0
              , length = animation.tweens.length;
            for (; index < length; index++) {
                animation.tweens[index].run(percent)
            }
            deferred.notifyWith(elem, [animation, percent, remaining]);
            if (percent < 1 && length) {
                return remaining
            } else {
                deferred.resolveWith(elem, [animation]);
                return false
            }
        }, animation = deferred.promise({
            elem: elem,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(true, {
                specialEasing: {}
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function(prop, end, easing) {
                var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                animation.tweens.push(tween);
                return tween
            },
            stop: function(gotoEnd) {
                var index = 0
                  , length = gotoEnd ? animation.tweens.length : 0;
                for (; index < length; index++) {
                    animation.tweens[index].run(1)
                }
                if (gotoEnd) {
                    deferred.resolveWith(elem, [animation, gotoEnd])
                } else {
                    deferred.rejectWith(elem, [animation, gotoEnd])
                }
                return this
            }
        }), props = animation.props;
        propFilter(props, animation.opts.specialEasing);
        for (; index < length; index++) {
            result = animationPrefilters[index].call(animation, elem, props, animation.opts);
            if (result) {
                return result
            }
        }
        createTweens(animation, props);
        if (jQuery.isFunction(animation.opts.start)) {
            animation.opts.start.call(elem, animation)
        }
        jQuery.fx.timer(jQuery.extend(tick, {
            anim: animation,
            queue: animation.opts.queue,
            elem: elem
        }));
        return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always)
    }
    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) {
            name = jQuery.camelCase(index);
            easing = specialEasing[name];
            value = props[index];
            if (jQuery.isArray(value)) {
                easing = value[1];
                value = props[index] = value[0]
            }
            if (index !== name) {
                props[name] = value;
                delete props[index]
            }
            hooks = jQuery.cssHooks[name];
            if (hooks && "expand"in hooks) {
                value = hooks.expand(value);
                delete props[name];
                for (index in value) {
                    if (!(index in props)) {
                        props[index] = value[index];
                        specialEasing[index] = easing
                    }
                }
            } else {
                specialEasing[name] = easing
            }
        }
    }
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function(props, callback) {
            if (jQuery.isFunction(props)) {
                callback = props;
                props = ["*"]
            } else {
                props = props.split(" ")
            }
            var prop, index = 0, length = props.length;
            for (; index < length; index++) {
                prop = props[index];
                tweeners[prop] = tweeners[prop] || [];
                tweeners[prop].unshift(callback)
            }
        },
        prefilter: function(callback, prepend) {
            if (prepend) {
                animationPrefilters.unshift(callback)
            } else {
                animationPrefilters.push(callback)
            }
        }
    });
    function defaultPrefilter(elem, props, opts) {
        var index, prop, value, length, dataShow, tween, hooks, oldfire, anim = this, style = elem.style, orig = {}, handled = [], hidden = elem.nodeType && isHidden(elem);
        if (!opts.queue) {
            hooks = jQuery._queueHooks(elem, "fx");
            if (hooks.unqueued == null) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function() {
                    if (!hooks.unqueued) {
                        oldfire()
                    }
                }
            }
            hooks.unqueued++;
            anim.always(function() {
                anim.always(function() {
                    hooks.unqueued--;
                    if (!jQuery.queue(elem, "fx").length) {
                        hooks.empty.fire()
                    }
                })
            })
        }
        if (elem.nodeType === 1 && ("height"in props || "width"in props)) {
            opts.overflow = [style.overflow, style.overflowX, style.overflowY];
            if (jQuery.css(elem, "display") === "inline" && jQuery.css(elem, "float") === "none") {
                if (!jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay(elem.nodeName) === "inline") {
                    style.display = "inline-block"
                } else {
                    style.zoom = 1
                }
            }
        }
        if (opts.overflow) {
            style.overflow = "hidden";
            if (!jQuery.support.shrinkWrapBlocks) {
                anim.done(function() {
                    style.overflow = opts.overflow[0];
                    style.overflowX = opts.overflow[1];
                    style.overflowY = opts.overflow[2]
                })
            }
        }
        for (index in props) {
            value = props[index];
            if (rfxtypes.exec(value)) {
                delete props[index];
                if (value === (hidden ? "hide" : "show")) {
                    continue
                }
                handled.push(index)
            }
        }
        length = handled.length;
        if (length) {
            dataShow = jQuery._data(elem, "fxshow") || jQuery._data(elem, "fxshow", {});
            if (hidden) {
                jQuery(elem).show()
            } else {
                anim.done(function() {
                    jQuery(elem).hide()
                })
            }
            anim.done(function() {
                var prop;
                jQuery.removeData(elem, "fxshow", true);
                for (prop in orig) {
                    jQuery.style(elem, prop, orig[prop])
                }
            });
            for (index = 0; index < length; index++) {
                prop = handled[index];
                tween = anim.createTween(prop, hidden ? dataShow[prop] : 0);
                orig[prop] = dataShow[prop] || jQuery.style(elem, prop);
                if (!(prop in dataShow)) {
                    dataShow[prop] = tween.start;
                    if (hidden) {
                        tween.end = tween.start;
                        tween.start = prop === "width" || prop === "height" ? 1 : 0
                    }
                }
            }
        }
    }
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem,options,prop,end,easing)
    }
    jQuery.Tween = Tween;
    Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || "swing";
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px")
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this)
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            if (this.options.duration) {
                this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration)
            } else {
                this.pos = eased = percent
            }
            this.now = (this.end - this.start) * eased + this.start;
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this)
            }
            if (hooks && hooks.set) {
                hooks.set(this)
            } else {
                Tween.propHooks._default.set(this)
            }
            return this
        }
    };
    Tween.prototype.init.prototype = Tween.prototype;
    Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                if (tween.elem[tween.prop] != null && (!tween.elem.style || tween.elem.style[tween.prop] == null)) {
                    return tween.elem[tween.prop]
                }
                result = jQuery.css(tween.elem, tween.prop, false, "");
                return !result || result === "auto" ? 0 : result
            },
            set: function(tween) {
                if (jQuery.fx.step[tween.prop]) {
                    jQuery.fx.step[tween.prop](tween)
                } else if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
                    jQuery.style(tween.elem, tween.prop, tween.now + tween.unit)
                } else {
                    tween.elem[tween.prop] = tween.now
                }
            }
        }
    };
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            if (tween.elem.nodeType && tween.elem.parentNode) {
                tween.elem[tween.prop] = tween.now
            }
        }
    };
    jQuery.each(["toggle", "show", "hide"], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return speed == null || typeof speed === "boolean" || (!i && jQuery.isFunction(speed) && jQuery.isFunction(easing)) ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback)
        }
    });
    jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback)
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop)
              , optall = jQuery.speed(speed, easing, callback)
              , doAnimation = function() {
                var anim = Animation(this, jQuery.extend({}, prop), optall);
                if (empty) {
                    anim.stop(true)
                }
            };
            return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation)
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop(gotoEnd)
            };
            if (typeof type !== "string") {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined
            }
            if (clearQueue && type !== false) {
                this.queue(type || "fx", [])
            }
            return this.each(function() {
                var dequeue = true
                  , index = type != null && type + "queueHooks"
                  , timers = jQuery.timers
                  , data = jQuery._data(this);
                if (index) {
                    if (data[index] && data[index].stop) {
                        stopQueue(data[index])
                    }
                } else {
                    for (index in data) {
                        if (data[index] && data[index].stop && rrun.test(index)) {
                            stopQueue(data[index])
                        }
                    }
                }
                for (index = timers.length; index--; ) {
                    if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                        timers[index].anim.stop(gotoEnd);
                        dequeue = false;
                        timers.splice(index, 1)
                    }
                }
                if (dequeue || !gotoEnd) {
                    jQuery.dequeue(this, type)
                }
            })
        }
    });
    function genFx(type, includeWidth) {
        var which, attrs = {
            height: type
        }, i = 0;
        includeWidth = includeWidth ? 1 : 0;
        for (; i < 4; i += 2 - includeWidth) {
            which = cssExpand[i];
            attrs["margin" + which] = attrs["padding" + which] = type
        }
        if (includeWidth) {
            attrs.opacity = attrs.width = type
        }
        return attrs
    }
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback)
        }
    });
    jQuery.speed = function(speed, easing, fn) {
        var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
        if (opt.queue == null || opt.queue === true) {
            opt.queue = "fx"
        }
        opt.old = opt.complete;
        opt.complete = function() {
            if (jQuery.isFunction(opt.old)) {
                opt.old.call(this)
            }
            if (opt.queue) {
                jQuery.dequeue(this, opt.queue)
            }
        }
        ;
        return opt
    }
    ;
    jQuery.easing = {
        linear: function(p) {
            return p
        },
        swing: function(p) {
            return 0.5 - Math.cos(p * Math.PI) / 2
        }
    };
    jQuery.timers = [];
    jQuery.fx = Tween.prototype.init;
    jQuery.fx.tick = function() {
        var timer, timers = jQuery.timers, i = 0;
        for (; i < timers.length; i++) {
            timer = timers[i];
            if (!timer() && timers[i] === timer) {
                timers.splice(i--, 1)
            }
        }
        if (!timers.length) {
            jQuery.fx.stop()
        }
    }
    ;
    jQuery.fx.timer = function(timer) {
        if (timer() && jQuery.timers.push(timer) && !timerId) {
            timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval)
        }
    }
    ;
    jQuery.fx.interval = 13;
    jQuery.fx.stop = function() {
        clearInterval(timerId);
        timerId = null
    }
    ;
    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    jQuery.fx.step = {};
    if (jQuery.expr && jQuery.expr.filters) {
        jQuery.expr.filters.animated = function(elem) {
            return jQuery.grep(jQuery.timers, function(fn) {
                return elem === fn.elem
            }).length
        }
    }
    var rroot = /^(?:body|html)$/i;
    jQuery.fn.offset = function(options) {
        if (arguments.length) {
            return options === undefined ? this : this.each(function(i) {
                jQuery.offset.setOffset(this, options, i)
            })
        }
        var docElem, body, win, clientTop, clientLeft, scrollTop, scrollLeft, box = {
            top: 0,
            left: 0
        }, elem = this[0], doc = elem && elem.ownerDocument;
        if (!doc) {
            return
        }
        if ((body = doc.body) === elem) {
            return jQuery.offset.bodyOffset(elem)
        }
        docElem = doc.documentElement;
        if (!jQuery.contains(docElem, elem)) {
            return box
        }
        if (typeof elem.getBoundingClientRect !== "undefined") {
            box = elem.getBoundingClientRect()
        }
        win = getWindow(doc);
        clientTop = docElem.clientTop || body.clientTop || 0;
        clientLeft = docElem.clientLeft || body.clientLeft || 0;
        scrollTop = win.pageYOffset || docElem.scrollTop;
        scrollLeft = win.pageXOffset || docElem.scrollLeft;
        return {
            top: box.top + scrollTop - clientTop,
            left: box.left + scrollLeft - clientLeft
        }
    }
    ;
    jQuery.offset = {
        bodyOffset: function(body) {
            var top = body.offsetTop
              , left = body.offsetLeft;
            if (jQuery.support.doesNotIncludeMarginInBodyOffset) {
                top += parseFloat(jQuery.css(body, "marginTop")) || 0;
                left += parseFloat(jQuery.css(body, "marginLeft")) || 0
            }
            return {
                top: top,
                left: left
            }
        },
        setOffset: function(elem, options, i) {
            var position = jQuery.css(elem, "position");
            if (position === "static") {
                elem.style.position = "relative"
            }
            var curElem = jQuery(elem), curOffset = curElem.offset(), curCSSTop = jQuery.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"), calculatePosition = (position === "absolute" || position === "fixed") && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1, props = {}, curPosition = {}, curTop, curLeft;
            if (calculatePosition) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left
            } else {
                curTop = parseFloat(curCSSTop) || 0;
                curLeft = parseFloat(curCSSLeft) || 0
            }
            if (jQuery.isFunction(options)) {
                options = options.call(elem, i, curOffset)
            }
            if (options.top != null) {
                props.top = (options.top - curOffset.top) + curTop
            }
            if (options.left != null) {
                props.left = (options.left - curOffset.left) + curLeft
            }
            if ("using"in options) {
                options.using.call(elem, props)
            } else {
                curElem.css(props)
            }
        }
    };
    jQuery.fn.extend({
        position: function() {
            if (!this[0]) {
                return
            }
            var elem = this[0]
              , offsetParent = this.offsetParent()
              , offset = this.offset()
              , parentOffset = rroot.test(offsetParent[0].nodeName) ? {
                top: 0,
                left: 0
            } : offsetParent.offset();
            offset.top -= parseFloat(jQuery.css(elem, "marginTop")) || 0;
            offset.left -= parseFloat(jQuery.css(elem, "marginLeft")) || 0;
            parentOffset.top += parseFloat(jQuery.css(offsetParent[0], "borderTopWidth")) || 0;
            parentOffset.left += parseFloat(jQuery.css(offsetParent[0], "borderLeftWidth")) || 0;
            return {
                top: offset.top - parentOffset.top,
                left: offset.left - parentOffset.left
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var offsetParent = this.offsetParent || document.body;
                while (offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static")) {
                    offsetParent = offsetParent.offsetParent
                }
                return offsetParent || document.body
            })
        }
    });
    jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = /Y/.test(prop);
        jQuery.fn[method] = function(val) {
            return jQuery.access(this, function(elem, method, val) {
                var win = getWindow(elem);
                if (val === undefined) {
                    return win ? (prop in win) ? win[prop] : win.document.documentElement[method] : elem[method]
                }
                if (win) {
                    win.scrollTo(!top ? val : jQuery(win).scrollLeft(), top ? val : jQuery(win).scrollTop())
                } else {
                    elem[method] = val
                }
            }, method, val, arguments.length, null)
        }
    });
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false
    }
    jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean")
                  , extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
                return jQuery.access(this, function(elem, type, value) {
                    var doc;
                    if (jQuery.isWindow(elem)) {
                        return elem.document.documentElement["client" + name]
                    }
                    if (elem.nodeType === 9) {
                        doc = elem.documentElement;
                        return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])
                    }
                    return value === undefined ? jQuery.css(elem, type, value, extra) : jQuery.style(elem, type, value, extra)
                }, type, chainable ? margin : undefined, chainable, null)
            }
        })
    });
    window.jQuery = window.$ = jQuery;
    if (typeof define === "function" && define.amd && define.amd.jQuery) {
        define("jquery", [], function() {
            return jQuery
        })
    }
}
)(window);
(function($) {
    $.extend($.fn, {
        livequery: function(type, fn, fn2) {
            var self = this, q;
            if ($.isFunction(type))
                fn2 = fn,
                fn = type,
                type = undefined;
            $.each($.livequery.queries, function(i, query) {
                if (self.selector == query.selector && self.context == query.context && type == query.type && (!fn || fn.$lqguid == query.fn.$lqguid) && (!fn2 || fn2.$lqguid == query.fn2.$lqguid))
                    return (q = query) && false
            });
            q = q || new $.livequery(this.selector,this.context,type,fn,fn2);
            q.stopped = false;
            q.run();
            return this
        },
        expire: function(type, fn, fn2) {
            var self = this;
            if ($.isFunction(type))
                fn2 = fn,
                fn = type,
                type = undefined;
            $.each($.livequery.queries, function(i, query) {
                if (self.selector == query.selector && self.context == query.context && (!type || type == query.type) && (!fn || fn.$lqguid == query.fn.$lqguid) && (!fn2 || fn2.$lqguid == query.fn2.$lqguid) && !this.stopped)
                    $.livequery.stop(query.id)
            });
            return this
        }
    });
    $.livequery = function(selector, context, type, fn, fn2) {
        this.selector = selector;
        this.context = context;
        this.type = type;
        this.fn = fn;
        this.fn2 = fn2;
        this.elements = [];
        this.stopped = false;
        this.id = $.livequery.queries.push(this) - 1;
        fn.$lqguid = fn.$lqguid || $.livequery.guid++;
        if (fn2)
            fn2.$lqguid = fn2.$lqguid || $.livequery.guid++;
        return this
    }
    ;
    $.livequery.prototype = {
        stop: function() {
            var query = this;
            if (this.type)
                this.elements.unbind(this.type, this.fn);
            else if (this.fn2)
                this.elements.each(function(i, el) {
                    query.fn2.apply(el)
                });
            this.elements = [];
            this.stopped = true
        },
        run: function() {
            if (this.stopped)
                return;
            var query = this;
            var oEls = this.elements
              , els = $(this.selector, this.context)
              , nEls = els.not(oEls);
            this.elements = els;
            if (this.type) {
                nEls.bind(this.type, this.fn);
                if (oEls.length > 0)
                    $.each(oEls, function(i, el) {
                        if ($.inArray(el, els) < 0)
                            $.event.remove(el, query.type, query.fn)
                    })
            } else {
                nEls.each(function() {
                    query.fn.apply(this)
                });
                if (this.fn2 && oEls.length > 0)
                    $.each(oEls, function(i, el) {
                        if ($.inArray(el, els) < 0)
                            query.fn2.apply(el)
                    })
            }
        }
    };
    $.extend($.livequery, {
        guid: 0,
        queries: [],
        queue: [],
        running: false,
        timeout: null,
        checkQueue: function() {
            if ($.livequery.running && $.livequery.queue.length) {
                var length = $.livequery.queue.length;
                while (length--)
                    $.livequery.queries[$.livequery.queue.shift()].run()
            }
        },
        pause: function() {
            $.livequery.running = false
        },
        play: function() {
            $.livequery.running = true;
            $.livequery.run()
        },
        registerPlugin: function() {
            $.each(arguments, function(i, n) {
                if (!$.fn[n])
                    return;
                var old = $.fn[n];
                $.fn[n] = function() {
                    var r = old.apply(this, arguments);
                    $.livequery.run();
                    return r
                }
            })
        },
        run: function(id) {
            if (id != undefined) {
                if ($.inArray(id, $.livequery.queue) < 0)
                    $.livequery.queue.push(id)
            } else
                $.each($.livequery.queries, function(id) {
                    if ($.inArray(id, $.livequery.queue) < 0)
                        $.livequery.queue.push(id)
                });
            if ($.livequery.timeout)
                clearTimeout($.livequery.timeout);
            $.livequery.timeout = setTimeout($.livequery.checkQueue, 20)
        },
        stop: function(id) {
            if (id != undefined)
                $.livequery.queries[id].stop();
            else
                $.each($.livequery.queries, function(id) {
                    $.livequery.queries[id].stop()
                })
        }
    });
    $.livequery.registerPlugin('append', 'prepend', 'after', 'before', 'wrap', 'attr', 'removeAttr', 'addClass', 'removeClass', 'toggleClass', 'empty', 'remove', 'html');
    $(function() {
        $.livequery.play()
    })
}
)(jQuery);
(function($) {
    var types = ['DOMMouseScroll', 'mousewheel'];
    if ($.event.fixHooks) {
        for (var i = types.length; i; ) {
            $.event.fixHooks[types[--i]] = $.event.mouseHooks
        }
    }
    $.event.special.mousewheel = {
        setup: function() {
            if (this.addEventListener) {
                for (var i = types.length; i; ) {
                    this.addEventListener(types[--i], handler, false)
                }
            } else {
                this.onmousewheel = handler
            }
        },
        teardown: function() {
            if (this.removeEventListener) {
                for (var i = types.length; i; ) {
                    this.removeEventListener(types[--i], handler, false)
                }
            } else {
                this.onmousewheel = null
            }
        }
    };
    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel")
        },
        unmousewheel: function(fn) {
            return this.unbind("mousewheel", fn)
        }
    });
    function handler(event) {
        var orgEvent = event || window.event
          , args = [].slice.call(arguments, 1)
          , delta = 0
          , returnValue = true
          , deltaX = 0
          , deltaY = 0;
        event = $.event.fix(orgEvent);
        event.type = "mousewheel";
        if (orgEvent.wheelDelta) {
            delta = orgEvent.wheelDelta / 120
        }
        if (orgEvent.detail) {
            delta = -orgEvent.detail / 3
        }
        deltaY = delta;
        if (orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
            deltaY = 0;
            deltaX = -1 * delta
        }
        if (orgEvent.wheelDeltaY !== undefined) {
            deltaY = orgEvent.wheelDeltaY / 120
        }
        if (orgEvent.wheelDeltaX !== undefined) {
            deltaX = -1 * orgEvent.wheelDeltaX / 120
        }
        args.unshift(event, delta, deltaX, deltaY);
        return ($.event.dispatch || $.event.handle).apply(this, args)
    }
}
)(jQuery);
function disableForm(form) {
    $(form).find(":input:not([disabled])").attr('disabled', 'disabled').attr('submit-prevent', 1)
}
function enableForm(form) {
    $(form).find("[submit-prevent]").removeAttr('disabled').removeAttr('submit-prevent')
}
jQuery.mouse || function($) {
    var mouse = {
        top: 0,
        left: 0
    };
    $(window).bind('mousemove', function(e) {
        mouse = {
            top: e.pageY,
            left: e.pageX
        }
    });
    $.mouse = function() {
        return mouse
    }
}(jQuery);
function clone(obj) {
    if (!obj || typeof obj !== 'object')
        return obj;
    var c = (typeof obj.pop === 'function') ? [] : {};
    var p, v;
    for (p in obj) {
        if (obj.hasOwnProperty(p)) {
            v = obj[p];
            if (v && typeof v === 'object')
                c[p] = clone(v);
            else
                c[p] = v
        }
    }
    return c
}
function icon(icon, iclass) {
    var span = $('<span/>');
    $(span).addClass('icon');
    $(span).addClass('icon-' + icon);
    if (iclass)
        $(span).addClass(iclass);
    return span
}
function ajax(_url, _data) {
    var url = _url;
    var data = _data;
    var isForm = false;
    if (typeof _url == 'object') {
        isForm = _url && $(_url).length && $(_url)[0].tagName == 'FORM';
        if (isForm) {
            data = _url;
            url = null
        } else {
            url = $(_url).data('url')
        }
    }
    var opts = {};
    opts.url = url || (isForm ? $(data).attr('action') : '');
    opts.type = 'post';
    if (data)
        opts.data = isForm ? $(data).serialize() : data;
    var err = function() {
        error({
            text: 'Ошибка сервера'
        })
    };
    var mess = function(resp) {
        if (resp && resp.error) {
            if (resp.urlReload)
                window.location.reload();
            else if (resp.urlRedirect)
                window.location.href = resp.urlRedirect;
            else if (resp.not_authorized)
                dialog({
                    title: 'Вы не зарегистрированы',
                    text: resp.not_authorized,
                    width: 483
                });
            else
                error({
                    text: resp.error
                })
        }
    };
    var inscreen = null;
    var showIndicator = function() {
        if (isForm)
            disableForm(data);
        $('body').addClass('wait')
    };
    var hideIndicator = function(response) {
        if (isForm)
            enableForm(data);
        $('body').removeClass('wait')
    };
    showIndicator();
    return $.ajax(opts).error([hideIndicator, err]).success([hideIndicator, mess])
}
jQuery.fn.extend({
    refresh: function(post, callback) {
        var obj = this;
        var url = $(obj).data('url');
        if (url) {
            ajax(url, post).success(function(data) {
                $(obj).replaceWith(data);
                if (callback)
                    callback(data)
            })
        }
    }
});
var popups_count = 0;
var popup = {
    options: {
        dialogClass: 'default',
        title: 'title',
        text: '',
        buttons: null,
        width: 500
    },
    cont: null,
    background: null,
    z_index: 0,
    on_destroy: function() {},
    setOptions: function(options) {
        this.options = $.extend(this.options, options)
    },
    show: function() {
        var self = this;
        if (self.cont)
            return null;
        var background = $("<div/>");
        $(background).appendTo($("body"));
        $(background).addClass("dialog-background");
        var div = $("<div/>");
        $(div).appendTo($("body"));
        $(div).width(self.options.width);
        $(div).addClass('dialog');
        $(div).addClass(self.options.dialogClass);
        var z_index = self.calc_z_index();
        $(background).css('z-index', z_index);
        $(div).css('z-index', z_index + 1);
        var title = $("<div/>");
        $(title).appendTo($(div));
        $(title).addClass('title');
        $(title).html(self.options.title);
        var close = icon('close', 'close');
        $(close).prependTo($(title));
        $(close).bind('click', function() {
            self.destroy()
        });
        var text = $("<div/>");
        $(text).appendTo($(div));
        $(text).addClass("text");
        $(text).html(self.options.text);
        if (self.options.buttons) {
            var buttons = $("<div/>");
            $(buttons).appendTo($(div));
            $(buttons).addClass('buttons');
            for (var i in self.options.buttons) {
                var button = $("<button/>");
                $(button).appendTo(buttons);
                $(button).addClass('button');
                $(button).html(self.options.buttons[i]['text']);
                $(button).attr('button-id', i);
                if (self.options.buttons[i]['class'])
                    $(button).addClass(self.options.buttons[i]['class']);
                $(button).bind('click', function() {
                    if (self.options.buttons[$(this).attr('button-id')]['callback'])
                        self.options.buttons[$(this).attr('button-id')]['callback'](self)
                })
            }
        }
        $(".popup", div).first().focus();
        self.cont = div;
        self.background = background;
        var calc = function() {
            self.calc_size();
            self.calc_pos()
        };
        var mousewheel = function(e, delta) {
            if (0) {
                if (delta > 0)
                    $('.text', div)[0].scrollTop -= 20;
                else
                    $('.text', div)[0].scrollTop += 20;
                return false
            }
        };
        $(window).bind('resize', calc);
        $(document).bind('mouseup', calc);
        $(window).bind('mousewheel', mousewheel);
        self.on_destroy = function() {
            $(window).unbind('resize', calc);
            $(document).unbind('mouseup', calc);
            $(window).unbind('mousewheel', mousewheel)
        }
        ;
        calc();
        popups_count++
    },
    calc_z_index: function() {
        var max_z = 0;
        $("div").each(function() {
            var z = parseInt($(this).css('z-index'));
            if (max_z < z)
                max_z = z
        });
        return max_z + 1
    },
    calc_pos: function() {
        var self = this;
        if (!self.cont)
            return null;
        var width = $(self.cont).width();
        var height = $(self.cont).height();
        var window_width = $(window).width();
        var window_height = $(window).height();
        $(self.cont).css('left', ((window_width - width) / 2) + 'px');
        $(self.cont).css('top', ((window_height - height) / 2) + 'px')
    },
    calc_size: function() {
        var self = this;
        if (!self.cont)
            return null;
        var padding = 120;
        var window_height = $(window).height();
        var title_h = $($('.title', self.cont)[0]).height() + parseInt($($('.title', self.cont)[0]).css('padding-top'));
        $(".text", self.cont).css('max-height', (window_height - padding) + 'px');
        var height = $(self.cont).height();
        var top = (window_height - height) / 2 - title_h;
        var max_height = window_height - top - padding;
        $(".text", self.cont).css('max-height', max_height + 'px')
    },
    destroy: function() {
        var self = this;
        if (!self.cont)
            return null;
        self.on_destroy();
        $(window).unbind('resize', function() {
            self.calc()
        });
        $(document).unbind('mouseup', function() {
            self.calc()
        });
        $(self.cont).remove();
        $(self.background).remove();
        self.cont = null;
        self.background = null;
        popups_count--
    }
};
function dialog(options) {
    var d = clone(popup);
    d.setOptions(options);
    d.show();
    return d
}
function error(options) {
    options = $.extend({
        title: 'Ошибка',
        text: 'Ошибка',
        dialogClass: 'error'
    }, options);
    return message(options)
}
function message(options) {
    options = $.extend({
        title: '',
        text: '',
        dialogClass: 'default',
        width: 500
    }, options);
    return dialog({
        title: options.title,
        text: options.text,
        width: options.width,
        dialogClass: options.dialogClass,
        buttons: [{
            text: 'OK',
            callback: function(err) {
                err.destroy()
            }
        }]
    })
}
function confirm(options) {
    options = $.extend({
        title: 'Вы уверены?',
        text: 'Вы уверены?',
        button_ok: "Ok",
        button_cancel: "Отмена",
        callback: function() {}
    }, options);
    return dialog({
        title: options.title,
        text: options.text,
        buttons: [{
            text: options.button_ok,
            callback: function(err) {
                options.callback();
                err.destroy()
            }
        }, {
            text: options.button_cancel,
            callback: function(err) {
                err.destroy()
            }
        }]
    })
}
var disable_form_dialog = false;
function form_dialog(options) {
    if (disable_form_dialog)
        return false;
    disable_form_dialog = true;
    options = $.extend({
        title: 'Form',
        url: null,
        button_submit: 'Отправить',
        button_cancel: 'Отмена',
        width: 500,
        callback: function() {
            return true
        },
        init: function() {}
    }, options);
    ajax(options.url).success(function(data) {
        if (data && !data.error) {
            var form = dialog({
                width: options.width,
                title: options.title,
                text: data,
                buttons: [{
                    'text': options.button_submit,
                    'class': 'submit',
                    'callback': function(dlg) {
                        $(dlg.cont).find('form').submit()
                    }
                }, {
                    'text': options.button_cancel,
                    'class': 'reset',
                    'callback': function(dlg) {
                        dlg.destroy()
                    }
                }]
            });
            options.init(form);
            $(form.cont).find('form').bind('submit', function() {
                ajax($(this)).success(function(data) {
                    if (options.callback(data) && data.success)
                        form.destroy()
                });
                return false
            });
            var submit = $("<input/>").attr('type', 'submit').addClass('submit-hidden');
            $(form.cont).find('form').prepend(submit)
        }
        disable_form_dialog = false
    })
}
(function($) {
    var DatePicker = function() {
        var ids = {}
          , views = {
            years: 'datepickerViewYears',
            moths: 'datepickerViewMonths',
            days: 'datepickerViewDays'
        }
          , tpl = {
            wrapper: '<div class="datepicker"><div class="datepickerBorderT" /><div class="datepickerBorderB" /><div class="datepickerBorderL" /><div class="datepickerBorderR" /><div class="datepickerBorderTL" /><div class="datepickerBorderTR" /><div class="datepickerBorderBL" /><div class="datepickerBorderBR" /><div class="datepickerContainer"><table cellspacing="0" cellpadding="0"><tbody><tr></tr></tbody></table></div></div>',
            head: ['<td>', '<table cellspacing="0" cellpadding="0">', '<thead>', '<tr>', '<th class="datepickerGoPrev"><a href="#"><span><%=prev%></span></a></th>', '<th colspan="5" class="datepickerMonth"><a href="#"><span></span></a></th>', '<th class="datepickerGoNext"><a href="#"><span><%=next%></span></a></th>', '</tr>', '<tr class="datepickerDoW">', '<th><span><%=day1%></span></th>', '<th><span><%=day2%></span></th>', '<th><span><%=day3%></span></th>', '<th><span><%=day4%></span></th>', '<th><span><%=day5%></span></th>', '<th><span><%=day6%></span></th>', '<th><span><%=day7%></span></th>', '</tr>', '</thead>', '</table></td>'],
            space: '<td class="datepickerSpace"><div></div></td>',
            days: ['<tbody class="datepickerDays">', '<tr>', '<td class="<%=weeks[0].days[0].classname%>"><a href="#"><span><%=weeks[0].days[0].text%></span></a></td>', '<td class="<%=weeks[0].days[1].classname%>"><a href="#"><span><%=weeks[0].days[1].text%></span></a></td>', '<td class="<%=weeks[0].days[2].classname%>"><a href="#"><span><%=weeks[0].days[2].text%></span></a></td>', '<td class="<%=weeks[0].days[3].classname%>"><a href="#"><span><%=weeks[0].days[3].text%></span></a></td>', '<td class="<%=weeks[0].days[4].classname%>"><a href="#"><span><%=weeks[0].days[4].text%></span></a></td>', '<td class="<%=weeks[0].days[5].classname%>"><a href="#"><span><%=weeks[0].days[5].text%></span></a></td>', '<td class="<%=weeks[0].days[6].classname%>"><a href="#"><span><%=weeks[0].days[6].text%></span></a></td>', '</tr>', '<tr>', '<td class="<%=weeks[1].days[0].classname%>"><a href="#"><span><%=weeks[1].days[0].text%></span></a></td>', '<td class="<%=weeks[1].days[1].classname%>"><a href="#"><span><%=weeks[1].days[1].text%></span></a></td>', '<td class="<%=weeks[1].days[2].classname%>"><a href="#"><span><%=weeks[1].days[2].text%></span></a></td>', '<td class="<%=weeks[1].days[3].classname%>"><a href="#"><span><%=weeks[1].days[3].text%></span></a></td>', '<td class="<%=weeks[1].days[4].classname%>"><a href="#"><span><%=weeks[1].days[4].text%></span></a></td>', '<td class="<%=weeks[1].days[5].classname%>"><a href="#"><span><%=weeks[1].days[5].text%></span></a></td>', '<td class="<%=weeks[1].days[6].classname%>"><a href="#"><span><%=weeks[1].days[6].text%></span></a></td>', '</tr>', '<tr>', '<td class="<%=weeks[2].days[0].classname%>"><a href="#"><span><%=weeks[2].days[0].text%></span></a></td>', '<td class="<%=weeks[2].days[1].classname%>"><a href="#"><span><%=weeks[2].days[1].text%></span></a></td>', '<td class="<%=weeks[2].days[2].classname%>"><a href="#"><span><%=weeks[2].days[2].text%></span></a></td>', '<td class="<%=weeks[2].days[3].classname%>"><a href="#"><span><%=weeks[2].days[3].text%></span></a></td>', '<td class="<%=weeks[2].days[4].classname%>"><a href="#"><span><%=weeks[2].days[4].text%></span></a></td>', '<td class="<%=weeks[2].days[5].classname%>"><a href="#"><span><%=weeks[2].days[5].text%></span></a></td>', '<td class="<%=weeks[2].days[6].classname%>"><a href="#"><span><%=weeks[2].days[6].text%></span></a></td>', '</tr>', '<tr>', '<td class="<%=weeks[3].days[0].classname%>"><a href="#"><span><%=weeks[3].days[0].text%></span></a></td>', '<td class="<%=weeks[3].days[1].classname%>"><a href="#"><span><%=weeks[3].days[1].text%></span></a></td>', '<td class="<%=weeks[3].days[2].classname%>"><a href="#"><span><%=weeks[3].days[2].text%></span></a></td>', '<td class="<%=weeks[3].days[3].classname%>"><a href="#"><span><%=weeks[3].days[3].text%></span></a></td>', '<td class="<%=weeks[3].days[4].classname%>"><a href="#"><span><%=weeks[3].days[4].text%></span></a></td>', '<td class="<%=weeks[3].days[5].classname%>"><a href="#"><span><%=weeks[3].days[5].text%></span></a></td>', '<td class="<%=weeks[3].days[6].classname%>"><a href="#"><span><%=weeks[3].days[6].text%></span></a></td>', '</tr>', '<tr>', '<td class="<%=weeks[4].days[0].classname%>"><a href="#"><span><%=weeks[4].days[0].text%></span></a></td>', '<td class="<%=weeks[4].days[1].classname%>"><a href="#"><span><%=weeks[4].days[1].text%></span></a></td>', '<td class="<%=weeks[4].days[2].classname%>"><a href="#"><span><%=weeks[4].days[2].text%></span></a></td>', '<td class="<%=weeks[4].days[3].classname%>"><a href="#"><span><%=weeks[4].days[3].text%></span></a></td>', '<td class="<%=weeks[4].days[4].classname%>"><a href="#"><span><%=weeks[4].days[4].text%></span></a></td>', '<td class="<%=weeks[4].days[5].classname%>"><a href="#"><span><%=weeks[4].days[5].text%></span></a></td>', '<td class="<%=weeks[4].days[6].classname%>"><a href="#"><span><%=weeks[4].days[6].text%></span></a></td>', '</tr>', '<tr>', '<td class="<%=weeks[5].days[0].classname%>"><a href="#"><span><%=weeks[5].days[0].text%></span></a></td>', '<td class="<%=weeks[5].days[1].classname%>"><a href="#"><span><%=weeks[5].days[1].text%></span></a></td>', '<td class="<%=weeks[5].days[2].classname%>"><a href="#"><span><%=weeks[5].days[2].text%></span></a></td>', '<td class="<%=weeks[5].days[3].classname%>"><a href="#"><span><%=weeks[5].days[3].text%></span></a></td>', '<td class="<%=weeks[5].days[4].classname%>"><a href="#"><span><%=weeks[5].days[4].text%></span></a></td>', '<td class="<%=weeks[5].days[5].classname%>"><a href="#"><span><%=weeks[5].days[5].text%></span></a></td>', '<td class="<%=weeks[5].days[6].classname%>"><a href="#"><span><%=weeks[5].days[6].text%></span></a></td>', '</tr>', '</tbody>'],
            months: ['<tbody class="<%=className%>">', '<tr>', '<td colspan="2"><a href="#"><span><%=data[0]%></span></a></td>', '<td colspan="2"><a href="#"><span><%=data[1]%></span></a></td>', '<td colspan="2"><a href="#"><span><%=data[2]%></span></a></td>', '<td colspan="2"><a href="#"><span><%=data[3]%></span></a></td>', '</tr>', '<tr>', '<td colspan="2"><a href="#"><span><%=data[4]%></span></a></td>', '<td colspan="2"><a href="#"><span><%=data[5]%></span></a></td>', '<td colspan="2"><a href="#"><span><%=data[6]%></span></a></td>', '<td colspan="2"><a href="#"><span><%=data[7]%></span></a></td>', '</tr>', '<tr>', '<td colspan="2"><a href="#"><span><%=data[8]%></span></a></td>', '<td colspan="2"><a href="#"><span><%=data[9]%></span></a></td>', '<td colspan="2"><a href="#"><span><%=data[10]%></span></a></td>', '<td colspan="2"><a href="#"><span><%=data[11]%></span></a></td>', '</tr>', '</tbody>']
        }
          , defaults = {
            flat: false,
            starts: 1,
            prev: '&#9664;',
            next: '&#9654;',
            lastSel: false,
            mode: 'single',
            view: 'days',
            calendars: 1,
            format: 'Y-m-d',
            position: 'bottom',
            eventName: 'click',
            onRender: function() {
                return {}
            },
            onChange: function() {
                return true
            },
            onShow: function() {
                return true
            },
            onBeforeShow: function() {
                return true
            },
            onHide: function() {
                return true
            },
            locale: {
                days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
                daysShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
                daysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
                months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
                monthsShort: ["Янв", "Фев", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сен", "Окт", "Ноя", "Дек"],
                weekMin: 'wk'
            }
        }
          , fill = function(el) {
            var options = $(el).data('datepicker');
            var cal = $(el);
            var currentCal = Math.floor(options.calendars / 2), date, data, dow, month, cnt = 0, week, days, indic, indic2, html, tblCal;
            cal.find('td>table tbody').remove();
            for (var i = 0; i < options.calendars; i++) {
                date = new Date(options.current);
                date.addMonths(-currentCal + i);
                tblCal = cal.find('table').eq(i + 1);
                switch (tblCal[0].className) {
                case 'datepickerViewDays':
                    dow = formatDate(date, 'B, Y');
                    break;
                case 'datepickerViewMonths':
                    dow = date.getFullYear();
                    break;
                case 'datepickerViewYears':
                    dow = (date.getFullYear() - 6) + ' - ' + (date.getFullYear() + 5);
                    break
                }
                tblCal.find('thead tr:first th:eq(1) span').text(dow);
                dow = date.getFullYear() - 6;
                data = {
                    data: [],
                    className: 'datepickerYears'
                };
                for (var j = 0; j < 12; j++) {
                    data.data.push(dow + j)
                }
                html = tmpl(tpl.months.join(''), data);
                date.setDate(1);
                data = {
                    weeks: [],
                    test: 10
                };
                month = date.getMonth();
                var dow = (date.getDay() - options.starts) % 7;
                date.addDays(-(dow + (dow < 0 ? 7 : 0)));
                week = -1;
                cnt = 0;
                while (cnt < 42) {
                    indic = parseInt(cnt / 7, 10);
                    indic2 = cnt % 7;
                    if (!data.weeks[indic]) {
                        week = date.getWeekNumber();
                        data.weeks[indic] = {
                            week: week,
                            days: []
                        }
                    }
                    data.weeks[indic].days[indic2] = {
                        text: date.getDate(),
                        classname: []
                    };
                    if (month != date.getMonth()) {
                        data.weeks[indic].days[indic2].classname.push('datepickerNotInMonth')
                    }
                    if (date.getDay() == 0) {
                        data.weeks[indic].days[indic2].classname.push('datepickerSunday')
                    }
                    if (date.getDay() == 6) {
                        data.weeks[indic].days[indic2].classname.push('datepickerSaturday')
                    }
                    var fromUser = options.onRender(date);
                    var val = date.valueOf();
                    if (fromUser.selected || options.date == val || $.inArray(val, options.date) > -1 || (options.mode == 'range' && val >= options.date[0] && val <= options.date[1])) {
                        data.weeks[indic].days[indic2].classname.push('datepickerSelected')
                    }
                    if (fromUser.disabled) {
                        data.weeks[indic].days[indic2].classname.push('datepickerDisabled')
                    }
                    if (fromUser.className) {
                        data.weeks[indic].days[indic2].classname.push(fromUser.className)
                    }
                    data.weeks[indic].days[indic2].classname = data.weeks[indic].days[indic2].classname.join(' ');
                    cnt++;
                    date.addDays(1)
                }
                html = tmpl(tpl.days.join(''), data) + html;
                data = {
                    data: options.locale.monthsShort,
                    className: 'datepickerMonths'
                };
                html = tmpl(tpl.months.join(''), data) + html;
                tblCal.append(html)
            }
        }
          , parseDate = function(date, format) {
            if (date.constructor == Date) {
                return new Date(date)
            }
            var parts = date.split(/\W+/);
            var against = format.split(/\W+/), d, m, y, h, min, now = new Date();
            for (var i = 0; i < parts.length; i++) {
                switch (against[i]) {
                case 'd':
                case 'e':
                    d = parseInt(parts[i], 10);
                    break;
                case 'm':
                    m = parseInt(parts[i], 10) - 1;
                    break;
                case 'Y':
                case 'y':
                    y = parseInt(parts[i], 10);
                    y += y > 100 ? 0 : (y < 29 ? 2000 : 1900);
                    break;
                case 'H':
                case 'I':
                case 'k':
                case 'l':
                    h = parseInt(parts[i], 10);
                    break;
                case 'P':
                case 'p':
                    if (/pm/i.test(parts[i]) && h < 12) {
                        h += 12
                    } else if (/am/i.test(parts[i]) && h >= 12) {
                        h -= 12
                    }
                    break;
                case 'M':
                    min = parseInt(parts[i], 10);
                    break
                }
            }
            return new Date(y === undefined ? now.getFullYear() : y,m === undefined ? now.getMonth() : m,d === undefined ? now.getDate() : d,h === undefined ? now.getHours() : h,min === undefined ? now.getMinutes() : min,0)
        }
          , formatDate = function(date, format) {
            var m = date.getMonth();
            var d = date.getDate();
            var y = date.getFullYear();
            var wn = date.getWeekNumber();
            var w = date.getDay();
            var s = {};
            var hr = date.getHours();
            var pm = (hr >= 12);
            var ir = (pm) ? (hr - 12) : hr;
            var dy = date.getDayOfYear();
            if (ir == 0) {
                ir = 12
            }
            var min = date.getMinutes();
            var sec = date.getSeconds();
            var parts = format.split(''), part;
            for (var i = 0; i < parts.length; i++) {
                part = parts[i];
                switch (parts[i]) {
                case 'a':
                    part = date.getDayName();
                    break;
                case 'A':
                    part = date.getDayName(true);
                    break;
                case 'b':
                    part = date.getMonthName();
                    break;
                case 'B':
                    part = date.getMonthName(true);
                    break;
                case 'C':
                    part = 1 + Math.floor(y / 100);
                    break;
                case 'd':
                    part = (d < 10) ? ("0" + d) : d;
                    break;
                case 'e':
                    part = d;
                    break;
                case 'H':
                    part = (hr < 10) ? ("0" + hr) : hr;
                    break;
                case 'I':
                    part = (ir < 10) ? ("0" + ir) : ir;
                    break;
                case 'j':
                    part = (dy < 100) ? ((dy < 10) ? ("00" + dy) : ("0" + dy)) : dy;
                    break;
                case 'k':
                    part = hr;
                    break;
                case 'l':
                    part = ir;
                    break;
                case 'm':
                    part = (m < 9) ? ("0" + (1 + m)) : (1 + m);
                    break;
                case 'M':
                    part = (min < 10) ? ("0" + min) : min;
                    break;
                case 'p':
                case 'P':
                    part = pm ? "PM" : "AM";
                    break;
                case 's':
                    part = Math.floor(date.getTime() / 1000);
                    break;
                case 'S':
                    part = (sec < 10) ? ("0" + sec) : sec;
                    break;
                case 'u':
                    part = w + 1;
                    break;
                case 'w':
                    part = w;
                    break;
                case 'y':
                    part = ('' + y).substr(2, 2);
                    break;
                case 'Y':
                    part = y;
                    break
                }
                parts[i] = part
            }
            return parts.join('')
        }
          , extendDate = function(options) {
            if (Date.prototype.tempDate) {
                return
            }
            Date.prototype.tempDate = null;
            Date.prototype.months = options.months;
            Date.prototype.monthsShort = options.monthsShort;
            Date.prototype.days = options.days;
            Date.prototype.daysShort = options.daysShort;
            Date.prototype.getMonthName = function(fullName) {
                return this[fullName ? 'months' : 'monthsShort'][this.getMonth()]
            }
            ;
            Date.prototype.getDayName = function(fullName) {
                return this[fullName ? 'days' : 'daysShort'][this.getDay()]
            }
            ;
            Date.prototype.addDays = function(n) {
                this.setDate(this.getDate() + n);
                this.tempDate = this.getDate()
            }
            ;
            Date.prototype.addMonths = function(n) {
                if (this.tempDate == null) {
                    this.tempDate = this.getDate()
                }
                this.setDate(1);
                this.setMonth(this.getMonth() + n);
                this.setDate(Math.min(this.tempDate, this.getMaxDays()))
            }
            ;
            Date.prototype.addYears = function(n) {
                if (this.tempDate == null) {
                    this.tempDate = this.getDate()
                }
                this.setDate(1);
                this.setFullYear(this.getFullYear() + n);
                this.setDate(Math.min(this.tempDate, this.getMaxDays()))
            }
            ;
            Date.prototype.getMaxDays = function() {
                var tmpDate = new Date(Date.parse(this)), d = 28, m;
                m = tmpDate.getMonth();
                d = 28;
                while (tmpDate.getMonth() == m) {
                    d++;
                    tmpDate.setDate(d)
                }
                return d - 1
            }
            ;
            Date.prototype.getFirstDay = function() {
                var tmpDate = new Date(Date.parse(this));
                tmpDate.setDate(1);
                return tmpDate.getDay()
            }
            ;
            Date.prototype.getWeekNumber = function() {
                var tempDate = new Date(this);
                tempDate.setDate(tempDate.getDate() - (tempDate.getDay() + 6) % 7 + 3);
                var dms = tempDate.valueOf();
                tempDate.setMonth(0);
                tempDate.setDate(4);
                return Math.round((dms - tempDate.valueOf()) / (604800000)) + 1
            }
            ;
            Date.prototype.getDayOfYear = function() {
                var now = new Date(this.getFullYear(),this.getMonth(),this.getDate(),0,0,0);
                var then = new Date(this.getFullYear(),0,0,0,0,0);
                var time = now - then;
                return Math.floor(time / 24 * 60 * 60 * 1000)
            }
        }
          , layout = function(el) {
            var options = $(el).data('datepicker');
            var cal = $('#' + options.id);
            if (!options.extraHeight) {
                var divs = $(el).find('div');
                options.extraHeight = divs.get(0).offsetHeight + divs.get(1).offsetHeight;
                options.extraWidth = divs.get(2).offsetWidth + divs.get(3).offsetWidth
            }
            var tbl = cal.find('table:first').get(0);
            var width = tbl.offsetWidth;
            var height = tbl.offsetHeight;
            cal.css({
                width: width + options.extraWidth + 'px',
                height: height + options.extraHeight + 'px'
            }).find('div.datepickerContainer').css({
                width: width + 'px',
                height: height + 'px'
            })
        }
          , click = function(ev) {
            if ($(ev.target).is('span')) {
                ev.target = ev.target.parentNode
            }
            var el = $(ev.target);
            if (el.is('a')) {
                ev.target.blur();
                if (el.hasClass('datepickerDisabled')) {
                    return false
                }
                var options = $(this).data('datepicker');
                var parentEl = el.parent();
                var tblEl = parentEl.parent().parent().parent();
                var tblIndex = $('table', this).index(tblEl.get(0)) - 1;
                var tmp = new Date(options.current);
                var changed = false;
                var fillIt = false;
                if (parentEl.is('th')) {
                    if (parentEl.hasClass('datepickerWeek') && options.mode == 'range' && !parentEl.next().hasClass('datepickerDisabled')) {
                        var val = parseInt(parentEl.next().text(), 10);
                        tmp.addMonths(tblIndex - Math.floor(options.calendars / 2));
                        if (parentEl.next().hasClass('datepickerNotInMonth')) {
                            tmp.addMonths(val > 15 ? -1 : 1)
                        }
                        tmp.setDate(val);
                        options.date[0] = (tmp.setHours(0, 0, 0, 0)).valueOf();
                        tmp.setHours(23, 59, 59, 0);
                        tmp.addDays(6);
                        options.date[1] = tmp.valueOf();
                        fillIt = true;
                        changed = true;
                        options.lastSel = false
                    } else if (parentEl.hasClass('datepickerMonth')) {
                        tmp.addMonths(tblIndex - Math.floor(options.calendars / 2));
                        switch (tblEl.get(0).className) {
                        case 'datepickerViewDays':
                            tblEl.get(0).className = 'datepickerViewMonths';
                            el.find('span').text(tmp.getFullYear());
                            break;
                        case 'datepickerViewMonths':
                            tblEl.get(0).className = 'datepickerViewYears';
                            el.find('span').text((tmp.getFullYear() - 6) + ' - ' + (tmp.getFullYear() + 5));
                            break;
                        case 'datepickerViewYears':
                            tblEl.get(0).className = 'datepickerViewDays';
                            el.find('span').text(formatDate(tmp, 'B, Y'));
                            break
                        }
                    } else if (parentEl.parent().parent().is('thead')) {
                        switch (tblEl.get(0).className) {
                        case 'datepickerViewDays':
                            options.current.addMonths(parentEl.hasClass('datepickerGoPrev') ? -1 : 1);
                            break;
                        case 'datepickerViewMonths':
                            options.current.addYears(parentEl.hasClass('datepickerGoPrev') ? -1 : 1);
                            break;
                        case 'datepickerViewYears':
                            options.current.addYears(parentEl.hasClass('datepickerGoPrev') ? -12 : 12);
                            break
                        }
                        fillIt = true
                    }
                } else if (parentEl.is('td') && !parentEl.hasClass('datepickerDisabled')) {
                    switch (tblEl.get(0).className) {
                    case 'datepickerViewMonths':
                        options.current.setMonth(tblEl.find('tbody.datepickerMonths td').index(parentEl));
                        options.current.setFullYear(parseInt(tblEl.find('thead th.datepickerMonth span').text(), 10));
                        options.current.addMonths(Math.floor(options.calendars / 2) - tblIndex);
                        tblEl.get(0).className = 'datepickerViewDays';
                        break;
                    case 'datepickerViewYears':
                        options.current.setFullYear(parseInt(el.text(), 10));
                        tblEl.get(0).className = 'datepickerViewMonths';
                        break;
                    default:
                        var val = parseInt(el.text(), 10);
                        tmp.addMonths(tblIndex - Math.floor(options.calendars / 2));
                        if (parentEl.hasClass('datepickerNotInMonth')) {
                            tmp.addMonths(val > 15 ? -1 : 1)
                        }
                        tmp.setDate(val);
                        switch (options.mode) {
                        case 'multiple':
                            val = (tmp.setHours(0, 0, 0, 0)).valueOf();
                            if ($.inArray(val, options.date) > -1) {
                                $.each(options.date, function(nr, dat) {
                                    if (dat == val) {
                                        options.date.splice(nr, 1);
                                        return false
                                    }
                                })
                            } else {
                                options.date.push(val)
                            }
                            break;
                        case 'range':
                            if (!options.lastSel) {
                                options.date[0] = (tmp.setHours(0, 0, 0, 0)).valueOf()
                            }
                            val = (tmp.setHours(23, 59, 59, 0)).valueOf();
                            if (val < options.date[0]) {
                                options.date[1] = options.date[0] + 86399000;
                                options.date[0] = val - 86399000
                            } else {
                                options.date[1] = val
                            }
                            options.lastSel = !options.lastSel;
                            break;
                        default:
                            options.date = tmp.valueOf();
                            break
                        }
                        break
                    }
                    fillIt = true;
                    changed = true
                }
                if (fillIt) {
                    fill(this)
                }
                if (changed) {
                    options.onChange.apply(this, prepareDate(options))
                }
            }
            return false
        }
          , prepareDate = function(options) {
            var tmp;
            if (options.mode == 'single') {
                tmp = new Date(options.date);
                return [formatDate(tmp, options.format), tmp, options.el]
            } else {
                tmp = [[], [], options.el];
                $.each(options.date, function(nr, val) {
                    var date = new Date(val);
                    tmp[0].push(formatDate(date, options.format));
                    tmp[1].push(date)
                });
                return tmp
            }
        }
          , getViewport = function() {
            var m = document.compatMode == 'CSS1Compat';
            return {
                l: window.pageXOffset || (m ? document.documentElement.scrollLeft : document.body.scrollLeft),
                t: window.pageYOffset || (m ? document.documentElement.scrollTop : document.body.scrollTop),
                w: window.innerWidth || (m ? document.documentElement.clientWidth : document.body.clientWidth),
                h: window.innerHeight || (m ? document.documentElement.clientHeight : document.body.clientHeight)
            }
        }
          , isChildOf = function(parentEl, el, container) {
            if (parentEl == el) {
                return true
            }
            if (parentEl.contains) {
                return parentEl.contains(el)
            }
            if (parentEl.compareDocumentPosition) {
                return !!(parentEl.compareDocumentPosition(el) & 16)
            }
            var prEl = el.parentNode;
            while (prEl && prEl != container) {
                if (prEl == parentEl)
                    return true;
                prEl = prEl.parentNode
            }
            return false
        }
          , show = function(ev) {
            var cal = $('#' + $(this).data('datepickerId'));
            if (!cal.is(':visible')) {
                var calEl = cal.get(0);
                fill(calEl);
                var options = cal.data('datepicker');
                options.onBeforeShow.apply(this, [cal.get(0)]);
                var pos = $(this).offset();
                var viewPort = getViewport();
                var top = pos.top;
                var left = pos.left;
                cal.css({
                    visibility: 'hidden',
                    display: 'block'
                });
                layout(calEl);
                switch (options.position) {
                case 'top':
                    top -= calEl.offsetHeight;
                    break;
                case 'left':
                    left -= calEl.offsetWidth;
                    break;
                case 'right':
                    left += this.offsetWidth;
                    break;
                case 'bottom':
                    top += this.offsetHeight;
                    break
                }
                if (top + calEl.offsetHeight > viewPort.t + viewPort.h) {
                    top = pos.top - calEl.offsetHeight
                }
                if (top < viewPort.t) {
                    top = pos.top + this.offsetHeight + calEl.offsetHeight
                }
                if (left + calEl.offsetWidth > viewPort.l + viewPort.w) {
                    left = pos.left - calEl.offsetWidth
                }
                if (left < viewPort.l) {
                    left = pos.left + this.offsetWidth
                }
                var zIndex = popup.calc_z_index();
                left -= 12;
                cal.css({
                    visibility: 'visible',
                    display: 'block',
                    top: top + 'px',
                    left: left + 'px',
                    zIndex: zIndex
                });
                if (options.onShow.apply(this, [cal.get(0)]) != false) {
                    cal.show()
                }
                $(document).bind('mousedown', {
                    cal: cal,
                    trigger: this
                }, hide)
            }
            return false
        }
          , hide = function(ev) {
            if (ev.target != ev.data.trigger && !isChildOf(ev.data.cal.get(0), ev.target, ev.data.cal.get(0))) {
                if (ev.data.cal.data('datepicker').onHide.apply(this, [ev.data.cal.get(0)]) != false) {
                    ev.data.cal.hide()
                }
                $(document).unbind('mousedown', hide)
            }
        };
        return {
            init: function(options) {
                options = $.extend({}, defaults, options || {});
                extendDate(options.locale);
                options.calendars = Math.max(1, parseInt(options.calendars, 10) || 1);
                options.mode = /single|multiple|range/.test(options.mode) ? options.mode : 'single';
                return this.each(function() {
                    if (!$(this).data('datepicker')) {
                        options.el = this;
                        if (options.date.constructor == String) {
                            options.date = parseDate(options.date, options.format);
                            options.date.setHours(0, 0, 0, 0)
                        }
                        if (options.mode != 'single') {
                            if (options.date.constructor != Array) {
                                options.date = [options.date.valueOf()];
                                if (options.mode == 'range') {
                                    options.date.push(((new Date(options.date[0])).setHours(23, 59, 59, 0)).valueOf())
                                }
                            } else {
                                for (var i = 0; i < options.date.length; i++) {
                                    options.date[i] = (parseDate(options.date[i], options.format).setHours(0, 0, 0, 0)).valueOf()
                                }
                                if (options.mode == 'range') {
                                    options.date[1] = ((new Date(options.date[1])).setHours(23, 59, 59, 0)).valueOf()
                                }
                            }
                        } else {
                            options.date = options.date.valueOf()
                        }
                        if (!options.current) {
                            options.current = new Date()
                        } else {
                            options.current = parseDate(options.current, options.format)
                        }
                        options.current.setDate(1);
                        options.current.setHours(0, 0, 0, 0);
                        var id = 'datepicker_' + parseInt(Math.random() * 1000), cnt;
                        options.id = id;
                        $(this).data('datepickerId', options.id);
                        var cal = $(tpl.wrapper).attr('id', id).bind('click', click).data('datepicker', options);
                        if (options.className) {
                            cal.addClass(options.className)
                        }
                        var html = '';
                        for (var i = 0; i < options.calendars; i++) {
                            cnt = options.starts;
                            if (i > 0) {
                                html += tpl.space
                            }
                            html += tmpl(tpl.head.join(''), {
                                week: options.locale.weekMin,
                                prev: options.prev,
                                next: options.next,
                                day1: options.locale.daysMin[(cnt++) % 7],
                                day2: options.locale.daysMin[(cnt++) % 7],
                                day3: options.locale.daysMin[(cnt++) % 7],
                                day4: options.locale.daysMin[(cnt++) % 7],
                                day5: options.locale.daysMin[(cnt++) % 7],
                                day6: options.locale.daysMin[(cnt++) % 7],
                                day7: options.locale.daysMin[(cnt++) % 7]
                            })
                        }
                        cal.find('tr:first').append(html).find('table').addClass(views[options.view]);
                        fill(cal.get(0));
                        if (options.flat) {
                            cal.appendTo(this).show().css('position', 'relative');
                            layout(cal.get(0))
                        } else {
                            cal.appendTo(document.body);
                            $(this).bind(options.eventName, show)
                        }
                    }
                })
            },
            showPicker: function() {
                return this.each(function() {
                    if ($(this).data('datepickerId')) {
                        show.apply(this)
                    }
                })
            },
            hidePicker: function() {
                return this.each(function() {
                    if ($(this).data('datepickerId')) {
                        $('#' + $(this).data('datepickerId')).hide()
                    }
                })
            },
            setDate: function(date, shiftTo) {
                return this.each(function() {
                    if ($(this).data('datepickerId')) {
                        var cal = $('#' + $(this).data('datepickerId'));
                        var options = cal.data('datepicker');
                        options.date = date;
                        if (options.date.constructor == String) {
                            options.date = parseDate(options.date, options.format);
                            options.date.setHours(0, 0, 0, 0)
                        }
                        if (options.mode != 'single') {
                            if (options.date.constructor != Array) {
                                options.date = [options.date.valueOf()];
                                if (options.mode == 'range') {
                                    options.date.push(((new Date(options.date[0])).setHours(23, 59, 59, 0)).valueOf())
                                }
                            } else {
                                for (var i = 0; i < options.date.length; i++) {
                                    options.date[i] = (parseDate(options.date[i], options.format).setHours(0, 0, 0, 0)).valueOf()
                                }
                                if (options.mode == 'range') {
                                    options.date[1] = ((new Date(options.date[1])).setHours(23, 59, 59, 0)).valueOf()
                                }
                            }
                        } else {
                            options.date = options.date.valueOf()
                        }
                        if (shiftTo) {
                            options.current = new Date(options.mode != 'single' ? options.date[0] : options.date)
                        }
                        fill(cal.get(0))
                    }
                })
            },
            getDate: function(formated) {
                if (this.size() > 0) {
                    return prepareDate($('#' + $(this).data('datepickerId')).data('datepicker'))[formated ? 0 : 1]
                }
            },
            clear: function() {
                return this.each(function() {
                    if ($(this).data('datepickerId')) {
                        var cal = $('#' + $(this).data('datepickerId'));
                        var options = cal.data('datepicker');
                        if (options.mode != 'single') {
                            options.date = [];
                            fill(cal.get(0))
                        }
                    }
                })
            },
            fixLayout: function() {
                return this.each(function() {
                    if ($(this).data('datepickerId')) {
                        var cal = $('#' + $(this).data('datepickerId'));
                        var options = cal.data('datepicker');
                        if (options.flat) {
                            layout(cal.get(0))
                        }
                    }
                })
            }
        }
    }();
    $.fn.extend({
        DatePicker: DatePicker.init,
        DatePickerHide: DatePicker.hidePicker,
        DatePickerShow: DatePicker.showPicker,
        DatePickerSetDate: DatePicker.setDate,
        DatePickerGetDate: DatePicker.getDate,
        DatePickerClear: DatePicker.clear,
        DatePickerLayout: DatePicker.fixLayout
    })
}
)(jQuery);
(function() {
    var cache = {};
    this.tmpl = function tmpl(str, data) {
        var fn = !/\W/.test(str) ? cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML) : new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};" + "with(obj){p.push('" + str.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
        return data ? fn(data) : fn
    }
}
)();
(function(window, undefined) {
    var htmlElement = function(el) {
        this.el = el
    };
    htmlElement.prototype = {};
    htmlElement.prototype.el = null;
    htmlElement.prototype.findByTagName = function(tagName) {
        var el = this.el.getElementsByTagName(tagName);
        var result = [];
        for (var i = 0; i < el.length; i++)
            result.push(new htmlElement(el[i]));
        return result
    }
    ;
    htmlElement.prototype.createElement = function(tagName) {
        var el = document.createElement(tagName);
        return el ? new htmlElement(el) : null
    }
    ;
    htmlElement.prototype.addEventListener = function(eventName, fn) {
        var callBack = function(e) {
            var r = fn(e);
            if (r === false)
                e.preventDefault ? e.preventDefault() : e.returnValue = false;
            return r
        };
        if (this.el.addEventListener)
            this.el.addEventListener(eventName, callBack);
        else if (this.el.attachEvent)
            this.el.attachEvent('on' + eventName, callBack);
        return this
    }
    ;
    htmlElement.prototype.style = function(name, value) {
        var self = this;
        var el = this.el;
        if (typeof name == 'object') {
            Obj.each(name, function(style, value) {
                self.style(style, value)
            });
            return true
        } else {
            if (typeof this.el.style[name] == 'undefined')
                return null;
            if (typeof value != 'undefined')
                el.style[name] = value ? value : '';
            return el.style[name]
        }
    }
    ;
    htmlElement.prototype.append = function(child) {
        if (!child)
            return false;
        this.el.appendChild(child.el);
        return true
    }
    ;
    htmlElement.prototype.prepend = function(child) {
        if (!child)
            return false;
        var firstChild = this.el.firstChild;
        if (firstChild)
            this.el.insertBefore(child.el, firstChild);
        else
            this.append(child);
        return true
    }
    ;
    htmlElement.prototype.attr = function(name, value) {
        if (typeof value != 'undefined')
            this.el.setAttribute(name, value);
        return this.el.getAttribute(name)
    }
    ;
    htmlElement.prototype.removeAttr = function(name) {
        return this.el.removeAttribute(name)
    }
    ;
    htmlElement.prototype.prop = function(name, value) {
        if (typeof value != 'undefined' && typeof this.el[name] != 'undefined')
            this.el[name] = value;
        return this.el[name]
    }
    ;
    htmlElement.prototype.addClass = function(values) {
        var elClass = this.el.className;
        var i, j, find;
        if (values instanceof Array) {
            for (i = 0; i < values.length; i++)
                this.addClass(values[i]);
            return true
        }
        values = values.split(/\s+/);
        elClass = elClass.split(/\s+/);
        for (i = 0; i < values.length; i++) {
            find = false;
            for (j = 0; j < elClass.length; j++) {
                if (values[i] == elClass[j]) {
                    find = true;
                    break
                }
            }
            if (!find)
                elClass.push(values[i])
        }
        this.el.className = elClass.join(' ').replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        return true
    }
    ;
    htmlElement.prototype.removeClass = function(values) {
        var elClass = this.el.className;
        var i, j;
        if (values instanceof Array) {
            for (i = 0; i < values.length; i++)
                this.removeClass(values[i]);
            return true
        }
        values = values.split(/\s+/);
        elClass = elClass.split(/\s+/);
        for (i = 0; i < values.length; i++) {
            for (j = 0; j < elClass.length; j++) {
                if (values[i] == elClass[j]) {
                    elClass.splice(j, 1)
                }
            }
        }
        this.el.className = elClass.join(' ').replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        return true
    }
    ;
    htmlElement.prototype.html = function(data) {
        if (typeof data != 'undefined')
            this.el.innerHTML = data;
        return this.el.innerHTML
    }
    ;
    htmlElement.prototype.firstChild = function() {
        var el = this.el.firstChild;
        return el ? new htmlElement(el) : null
    }
    ;
    htmlElement.prototype.requestFullscreen = function() {
        var fn = ['requestFullscreen', 'msRequestFullscreen', 'mozRequestFullScreen', 'webkitRequestFullscreen'];
        for (var i = 0; i < fn.length; i++) {
            if (this.el[fn[i]]) {
                this.el[fn[i]]();
                return true
            }
        }
        return false
    }
    ;
    htmlElement.prototype.exitFullscreen = function() {
        var fn = ['exitFullscreen', 'msExitFullscreen', 'mozCancelFullScreen', 'webkitExitFullscreen'];
        for (var i = 0; i < fn.length; i++) {
            if (htmlDocument.el[fn[i]]) {
                htmlDocument.el[fn[i]]();
                return true
            }
        }
        return false
    }
    ;
    htmlElement.prototype.fullscreenElement = function() {
        var name = ['fullscreenElement', 'mozFullScreenElement', 'webkitFullscreenElement', 'msFullscreenElement'];
        for (var i = 0; i < name.length; i++) {
            if (typeof htmlDocument.el[name[i]] != 'undefined') {
                var el = htmlDocument.el[name[i]];
                return el ? htmlElement(el) : null
            }
        }
    }
    ;
    var htmlDocument = new htmlElement(document);
    var Obj = {};
    Obj.each = function(o, callback) {
        var k;
        if (o instanceof Array)
            for (k = 0; k < o.length; k++)
                callback(k, o[k]);
        else if (o instanceof Object)
            for (k in o)
                if (o.hasOwnProperty(k))
                    callback(k, o[k])
    }
    ;
    Obj.create = function(o) {
        return this.extend({}, o)
    }
    ;
    Obj.extend = function(o1, o2) {
        var res = {}, o = [], i;
        if ((o1 instanceof Array) && (typeof o2 == 'undefined'))
            o = o1;
        else
            o = [o1, o2];
        for (i = 0; i < o.length; i++) {
            if (o[i]) {
                this.each(o[i], function(key, val) {
                    if (typeof res[key] != 'undefined' && res[key]instanceof Object && val instanceof Object && !res[key]instanceof Array && !val instanceof Array) {
                        res[key] = Obj.extend(res[key], val)
                    } else {
                        if (typeof res[key] == 'undefined' || typeof val != 'undefined')
                            res[key] = val
                    }
                })
            }
        }
        return res
    }
    ;
    var _video = function() {
        this.events = {};
        this.options = {}
    };
    _video.prototype = {};
    _video.prototype.events = {};
    _video.prototype.htmlElement = null;
    _video.prototype.on = function(eventName, fn) {
        if (typeof this.events[eventName] === 'undefined')
            this.events[eventName] = [];
        this.events[eventName].push(fn)
    }
    ;
    _video.prototype.event = function(eventName) {
        var i, result = true, r;
        if (typeof this.events[eventName] === 'undefined')
            return result;
        for (i = 0; i < this.events[eventName].length; i++) {
            r = this.events[eventName][i]();
            if (typeof r !== 'undefined')
                result = result && r
        }
        return result
    }
    ;
    _video.prototype.options = {};
    _video.prototype.setOptions = function(options) {
        this.options = Obj.extend(this.options, options)
    }
    ;
    _video.prototype.mimeTypes = {
        mp4: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
        ogv: 'video/ogg; codecs="theora, vorbis"',
        webm: 'video/webm; codecs="vp8, vorbis"',
        flv: 'video/x-flv'
    };
    var videoHtml = function(options) {
        this.setOptions(options);
        this.init()
    };
    videoHtml.prototype = new _video();
    videoHtml.prototype.options = {
        className: 'video-player-video'
    };
    videoHtml.prototype.support = function(format) {
        var mime = this.mimeTypes[format];
        if (!mime)
            return false;
        var video = document.createElement('video');
        if (!video || !video.canPlayType)
            return false;
        return !!video.canPlayType(mime)
    }
    ;
    videoHtml.prototype.init = function() {
        this.htmlElement = this.createVideo();
        this.event('ready')
    }
    ;
    videoHtml.prototype.createVideo = function() {
        var self = this;
        var video;
        video = htmlDocument.createElement('video');
        video.attr('src', this.options.videoSrc);
        video.attr('preload', 'none');
        video.attr('playsinline', 'playsinline');
        video.attr('webkit-playsinline', 'webkit-playsinline');
        video.addClass(this.options.className);
        var bindEvent = function(eventName) {
            video.addEventListener(eventName, function() {
                return self.event(eventName)
            })
        };
        var events = ['ended', 'playing', 'waiting', 'volumechange', 'play', 'seeked', 'pause'];
        for (var i = 0; i < events.length; i++)
            bindEvent(events[i]);
        return video
    }
    ;
    videoHtml.prototype.property = function(name, value) {
        return this.htmlElement.prop(name, value)
    }
    ;
    videoHtml.prototype.play = function() {
        return this.htmlElement.el.play()
    }
    ;
    videoHtml.prototype.pause = function() {
        return this.htmlElement.el.pause()
    }
    ;
    videoHtml.prototype.stop = function() {
        this.pause();
        this.currentTime(0)
    }
    ;
    videoHtml.prototype.paused = function() {
        return this.property('paused')
    }
    ;
    videoHtml.prototype.muted = function(value) {
        return this.property('muted', value)
    }
    ;
    videoHtml.prototype.volume = function(value) {
        return this.property('volume', value)
    }
    ;
    videoHtml.prototype.currentTime = function(value) {
        return this.property('currentTime', value)
    }
    ;
    videoHtml.prototype.duration = function() {
        return this.property('duration') || 0
    }
    ;
    var videoFlash = function(options) {
        this.setOptions(options);
        this.init()
    };
    videoFlash.prototype = new _video();
    videoFlash.prototype.ready = false;
    videoFlash.prototype.supportedFormats = ['mp4', 'flv'];
    videoFlash.prototype.minFlashVersion = 10;
    videoFlash.prototype.options = {
        className: 'video-player-video'
    };
    videoFlash.prototype.support = function(format) {
        var version = 0, flash;
        if (window.ActiveXObject) {
            try {
                flash = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                if (flash) {
                    var v = flash.GetVariable('$version');
                    if (v) {
                        v = v.split(" ")[1].split(",");
                        version = parseInt(v[0], 10) + "." + parseInt(v[1], 10)
                    }
                }
            } catch (e) {}
        } else if (navigator.plugins && navigator.mimeTypes.length > 0) {
            flash = navigator.plugins['Shockwave Flash'];
            if (flash) {
                version = navigator.plugins['Shockwave Flash'].description.replace(/.*\s(\d+\.\d+).*/, '$1')
            }
        }
        if (!version || version < this.minFlashVersion)
            return false;
        for (var k = 0; k < this.supportedFormats.length; k++)
            if (this.supportedFormats[k] == format)
                return true;
        return false
    }
    ;
    videoFlash.prototype.init = function() {
        var self = this;
        self.htmlElement = this.createVideo();
        self.on('ready', function() {
            self.ready = true
        })
    }
    ;
    var videoPlayerFlash = window['videoPlayerFlash'] = {
        parseId: function(swfID) {
            return parseInt(swfID.replace(/^video_flash_player_/, ''))
        },
        ready: function(swfID) {
            var playerId = this.parseId(swfID);
            var player = players.get(playerId);
            if (player && player.video && player.video.event)
                player.video.event('ready')
        },
        event: function(swfID, eventName) {
            var events = ['ended', 'playing', 'waiting', 'volumechange', 'play', 'seeked', 'pause'];
            for (var i = 0; i < events.length; i++) {
                if (events[i] == eventName) {
                    var playerId = this.parseId(swfID);
                    var player = players.get(playerId);
                    if (player && player.video && player.video.event)
                        player.video.event(eventName)
                }
            }
        },
        error: function(swfID, err) {}
    };
    videoFlash.prototype.createVideo = function() {
        var video, playerId, flashVars = '', params = '';
        playerId = 'video_flash_player_' + this.options.playerId;
        Obj.each({
            'src': this.options.videoSrc,
            'readyFunction': 'videoPlayerFlash.ready',
            'eventProxyFunction': 'videoPlayerFlash.event',
            'errorEventProxyFunction': 'videoPlayerFlash.error',
            'preload': 'none'
        }, function(key, value) {
            flashVars += flashVars ? '&' : '';
            flashVars += encodeURIComponent(key) + '=' + encodeURIComponent(value)
        });
        Obj.each({
            'movie': this.options.swfPath,
            'allowScriptAccess': 'always',
            'flashvars': flashVars,
            'wmode': 'opaque',
            'bgcolor': '#000000'
        }, function(name, value) {
            var param = '<param ';
            param += ' name="' + name + '" ';
            param += ' value="' + value + '" ';
            param += '> ';
            params += param
        });
        var o = '<object type="application/x-shockwave-flash" name="' + playerId + '" id="' + playerId + '" data="' + this.options.swfPath + '" class="' + this.options.className + '" >';
        o += params;
        o += '</object>';
        video = htmlDocument.createElement('div');
        video.html(o);
        video = video.firstChild('object');
        return video
    }
    ;
    videoFlash.prototype.callVjsFn = function(fnName) {
        var self = this;
        if (!this.ready) {
            self.on('ready', function() {
                self.htmlElement.el[fnName]()
            });
            return false
        } else {
            return self.htmlElement.el[fnName]()
        }
    }
    ;
    videoFlash.prototype.play = function() {
        return this.callVjsFn('vjs_play')
    }
    ;
    videoFlash.prototype.pause = function() {
        return this.callVjsFn('vjs_pause')
    }
    ;
    videoFlash.prototype.stop = function() {
        this.pause();
        this.currentTime(0)
    }
    ;
    videoFlash.prototype.property = function(propName, value) {
        if (!this.ready)
            return null;
        if (typeof value != 'undefined')
            this.htmlElement.el.vjs_setProperty(propName, value);
        return this.htmlElement.el.vjs_getProperty(propName)
    }
    ;
    videoFlash.prototype.paused = function() {
        return this.property('paused')
    }
    ;
    videoFlash.prototype.muted = function(value) {
        return this.property('muted', value)
    }
    ;
    videoFlash.prototype.volume = function(value) {
        return this.property('volume', value)
    }
    ;
    videoFlash.prototype.currentTime = function(value) {
        return this.property('currentTime', value)
    }
    ;
    videoFlash.prototype.duration = function() {
        return this.property('duration') || 0
    }
    ;
    var videoDownload = function(options) {
        this.setOptions(options);
        this.init();
        this.event('ready')
    };
    videoDownload.prototype = new _video();
    videoDownload.prototype.mutedVal = false;
    videoDownload.prototype.volumeVal = 1;
    videoDownload.prototype.options = {
        className: 'video-player-video'
    };
    videoDownload.prototype.support = function() {
        return true
    }
    ;
    videoDownload.prototype.init = function() {
        this.htmlElement = this.createDiv()
    }
    ;
    videoDownload.prototype.createDiv = function() {
        var div = htmlDocument.createElement('div');
        div.addClass(this.options.className);
        return div
    }
    ;
    videoDownload.prototype.download = function() {
        if (this.event('download') !== false)
            window.top.location.href = this.options.videoSrc
    }
    ;
    videoDownload.prototype.play = function() {
        this.download()
    }
    ;
    videoDownload.prototype.pause = function() {
        return false
    }
    ;
    videoDownload.prototype.paused = function() {
        return true
    }
    ;
    videoDownload.prototype.stop = function() {
        return false
    }
    ;
    videoDownload.prototype.muted = function(value) {
        if (typeof value != 'undefined') {
            this.mutedVal = !!value;
            this.event('volumechange')
        }
        return this.mutedVal
    }
    ;
    videoDownload.prototype.volume = function(value) {
        if (typeof value != 'undefined') {
            value = parseFloat(value);
            if (value > 1)
                value = 1;
            this.volumeVal = value;
            this.event('volumechange')
        }
        return this.volumeVal
    }
    ;
    videoDownload.prototype.currentTime = function() {
        return 0
    }
    ;
    videoDownload.prototype.duration = function() {
        return 0
    }
    ;
    var poster = function(options) {
        this.setOptions(options);
        this.init()
    };
    poster.prototype = {};
    poster.prototype.htmlElement = null;
    poster.prototype.options = {
        'className': 'video-player-poster',
        'src': null
    };
    poster.prototype.setOptions = function(options) {
        this.options = Obj.extend(this.options, options)
    }
    ;
    poster.prototype.init = function() {
        var el = htmlDocument.createElement('div');
        el.style('backgroundImage', 'url(' + this.options.src + ')');
        el.addClass(this.options.className);
        this.htmlElement = el
    }
    ;
    poster.prototype.hide = function() {
        this.htmlElement.style('display', 'none')
    }
    ;
    poster.prototype.show = function() {
        this.htmlElement.style('display', '')
    }
    ;
    var controls = function(player) {
        this.player = player;
        this.init()
    };
    controls.prototype = {};
    controls.prototype.player = null;
    controls.prototype.controls_types = ['play-pause', 'progress-bar', 'mute', 'volume', 'time-inverse', 'full-screen'];
    controls.prototype.init = function() {
        var self = this;
        var controls = this.findControls();
        var player = this.player;
        var i;
        this.initWaiting(player);
        this.hideOnMosemove(player);
        for (i = 0; i < controls.length; i++)
            this.initControl[controls[i].type](player, controls[i].htmlElement, this)
    }
    ;
    controls.prototype.hideOnMosemove = function(player) {
        var timeout = null;
        var hide = function() {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null
            }
            if (!player.paused())
                timeout = setTimeout(function() {
                    player.htmlElement.attr('no-controls', 'no-controls');
                    timeout = null
                }, 2000)
        };
        var show = function() {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null
            }
            player.htmlElement.removeAttr('no-controls')
        };
        player.on('play', hide);
        player.on('pause', show);
        player.htmlElement.addEventListener('mousemove', function() {
            show();
            hide()
        });
        return true
    }
    ;
    controls.prototype.initWaiting = function(player) {
        player.on('waiting', function() {
            player.htmlElement.attr('waiting', 'waiting')
        });
        player.on('playing', function() {
            player.htmlElement.removeAttr('waiting')
        })
    }
    ;
    controls.prototype.findControls = function() {
        var elements = this.player.htmlElement.findByTagName('*');
        var i, k, data;
        var controls = [];
        for (i = 0; i < elements.length; i++) {
            data = elements[i].attr('data-control');
            if (data) {
                for (k = 0; k < this.controls_types.length; k++) {
                    if (data == this.controls_types[k]) {
                        controls.push({
                            type: data,
                            htmlElement: elements[i]
                        })
                    }
                }
            }
        }
        return controls
    }
    ;
    controls.prototype.initControl = {
        'play-pause': function(player, htmlElement) {
            var updateState = function() {
                var playing = player.paused() ? 'paused' : 'playing';
                htmlElement.attr('playing', playing)
            };
            htmlElement.addEventListener('click', function() {
                player.playingToggle()
            });
            player.on('play', updateState);
            player.on('pause', updateState);
            player.on('ready', updateState);
            updateState()
        },
        'progress-bar': function(player, htmlElement) {
            var valueElement = htmlElement.findByTagName('span')[0];
            var updateState = function() {
                var currentTime = player.currentTime();
                var duration = player.duration();
                var progress = duration ? (currentTime / duration * 100) : 0;
                valueElement.style('width', progress + '%')
            };
            player.on('timeupdate', updateState);
            player.on('seeked', updateState);
            player.on('ready', updateState);
            updateState()
        },
        'mute': function(player, htmlElement) {
            var updateState = function() {
                player.muted() ? htmlElement.attr('muted', 'muted') : htmlElement.removeAttr('muted')
            };
            htmlElement.addEventListener('click', function() {
                player.mutedToggle()
            });
            player.on('volumechange', updateState);
            player.on('ready', updateState);
            updateState()
        },
        'volume': function(player, htmlElement) {
            var valueElement = htmlElement.findByTagName('span')[0];
            var updateState = function() {
                var volume = player.volume() * 100;
                valueElement.style('width', volume + '%');
                player.muted() ? htmlElement.attr('muted', 'muted') : htmlElement.removeAttr('muted')
            };
            var pressed = false;
            var setVolume = function(e) {
                var x = typeof e.offsetX == 'undefined' ? e.layerX : e.offsetX;
                var volume = Math.round(x / htmlElement.el.offsetWidth * 10) / 10;
                player.muted(volume == 0);
                if (volume > 0)
                    player.volume(volume)
            };
            htmlElement.addEventListener('mousemove', function(e) {
                if (pressed)
                    setVolume(e)
            });
            htmlElement.addEventListener('mouseup', setVolume);
            htmlElement.addEventListener('mousedown', function(e) {
                pressed = true;
                setVolume(e)
            });
            htmlDocument.addEventListener('mouseup', function(e) {
                pressed = false
            });
            player.on('volumechange', updateState);
            player.on('ready', updateState);
            updateState()
        },
        'time-inverse': function(player, htmlElement) {
            var updateState = function() {
                var currentTime = player.currentTime();
                var duration = player.duration();
                var time = Math.ceil(duration ? (duration - currentTime) : 0);
                var hours = Math.floor(time / 3600);
                time = time % 3600;
                var minutes = Math.floor(time / 60);
                time = time % 60;
                var seconds = time;
                var intToStr = function(int) {
                    return '' + (int < 10 ? '0' : '') + int
                };
                htmlElement.html((hours ? (hours + ':') : '') + (intToStr(minutes)) + ':' + (intToStr(seconds)))
            };
            player.on('timeupdate', updateState);
            player.on('ready', updateState);
            updateState()
        },
        'full-screen': function(player, htmlElement, self) {
            htmlElement.addEventListener('click', function() {
                if (self.fullScreenEnabled())
                    self.exitFullScreen();
                else
                    self.fullScreen()
            });
            var onFullScreenChange = function() {
                if (typeof htmlDocument.fullscreenElement() != 'undefined')
                    self.exitFullScreen()
            };
            htmlDocument.addEventListener('fullscreenchange', onFullScreenChange);
            htmlDocument.addEventListener('webkitfullscreenchange', onFullScreenChange);
            htmlDocument.addEventListener('mozfullscreenchange', onFullScreenChange);
            htmlDocument.addEventListener('MSFullscreenChange', onFullScreenChange)
        }
    };
    controls.prototype.fullScreen = function() {
        this.player.htmlElement.attr('full-screen', 'full-screen');
        this.player.htmlElement.requestFullscreen();
        return true
    }
    ;
    controls.prototype.exitFullScreen = function() {
        this.player.htmlElement.removeAttr('full-screen');
        htmlDocument.exitFullscreen();
        return true
    }
    ;
    controls.prototype.fullScreenEnabled = function() {
        return this.player.htmlElement.attr('full-screen') != null
    }
    ;
    var player = function(container, options) {
        this.htmlElement = container;
        this.setOptions(options);
        this.init()
    };
    player.prototype = new _video();
    player.prototype.options = {
        className: 'video-player',
        tech: ['html', 'flash', 'download']
    };
    player.prototype.drivers = {
        'html': videoHtml,
        'flash': videoFlash,
        'download': videoDownload
    };
    player.prototype.video = null;
    player.prototype.poster = null;
    player.prototype.controls = null;
    player.prototype.init = function() {
        this.video = this.createVideo();
        this.poster = this.createPoster();
        this.bindEvents();
        this.htmlElement.prepend(this.video.htmlElement);
        this.htmlElement.prepend(this.poster.htmlElement);
        this.htmlElement.addClass(this.options.className);
        if (this.options.controls)
            this.controls = new controls(this)
    }
    ;
    player.prototype.createVideo = function() {
        var driver, i, j, src;
        for (i = 0; i < this.options.tech.length; i++) {
            driver = this.drivers[this.options.tech[i]];
            for (j = 0; j < this.options.video.src.length; j++) {
                src = this.options.video.src[j];
                if (driver.prototype.support(src.format)) {
                    return new driver({
                        playerId: this.options.id,
                        swfPath: this.options.swfPath,
                        className: this.options.video.className,
                        videoSrc: src.url
                    })
                }
            }
        }
        return null
    }
    ;
    player.prototype.createPoster = function() {
        return new poster({
            'className': this.options.poster.className,
            'src': this.options.poster.src
        })
    }
    ;
    player.prototype.hidePoster = function() {
        return this.poster.hide()
    }
    ;
    player.prototype.showPoster = function() {
        return this.poster.show()
    }
    ;
    player.prototype.bindEvents = function() {
        var self = this;
        var events = ['ended', 'playing', 'waiting', 'volumechange', 'play', 'seeked', 'pause', 'download', 'ready'];
        Obj.each(events, function(i, event) {
            self.video.on(event, function() {
                return self.event(event)
            })
        });
        self.timeUpdateInterval = null;
        var timeUpdate = function() {
            self.event('timeupdate')
        };
        var timeUpdateStart = function() {
            timeUpdateStop();
            self.timeUpdateInterval = setInterval(function() {
                timeUpdate()
            }, 250)
        };
        var timeUpdateStop = function() {
            if (self.timeUpdateInterval)
                clearInterval(self.timeUpdateInterval)
        };
        self.on('play', function() {
            self.hidePoster();
            timeUpdateStart()
        });
        self.on('pause', function() {
            timeUpdateStop()
        });
        self.on('playing', function() {
            timeUpdateStart()
        });
        self.on('waiting', function() {
            timeUpdateStop()
        });
        self.on('seeked', function() {
            timeUpdate()
        });
        self.on('ended', function() {
            timeUpdateStop();
            self.stop()
        })
    }
    ;
    player.prototype.play = function() {
        return this.video.play()
    }
    ;
    player.prototype.pause = function() {
        return this.video.pause()
    }
    ;
    player.prototype.stop = function() {
        this.video.stop();
        this.showPoster();
        return true
    }
    ;
    player.prototype.fullScreen = function() {
        if (!this.controls)
            return false;
        this.controls.fullScreen();
        return true
    }
    ;
    player.prototype.exitFullScreen = function() {
        if (!this.controls)
            return false;
        this.controls.exitFullScreen();
        return true
    }
    ;
    player.prototype.playingToggle = function() {
        return this.paused() ? this.play() : this.pause()
    }
    ;
    player.prototype.paused = function() {
        return this.video.paused()
    }
    ;
    player.prototype.muted = function(value) {
        value = (typeof value != 'undefined') ? !!value : value;
        return this.video.muted(value)
    }
    ;
    player.prototype.mutedToggle = function() {
        return this.muted(!this.muted())
    }
    ;
    player.prototype.volume = function(value) {
        if (typeof value != 'undefined') {
            value = parseFloat(value);
            value = (value < 0) ? 0 : (value > 1 ? 1 : value)
        }
        return this.video.volume(value)
    }
    ;
    player.prototype.currentTime = function(value) {
        var duration, currentTime;
        if (typeof value != 'undefined') {
            value = parseFloat(value);
            duration = this.duration();
            currentTime = this.currentTime();
            value = (value < 0) ? 0 : (value > duration ? duration : value);
            value = value == currentTime ? undefined : value
        }
        return this.video.currentTime(value)
    }
    ;
    player.prototype.duration = function() {
        if (typeof this.options.duration != 'undefined')
            return parseInt(this.options.duration);
        else
            return this.video.duration()
    }
    ;
    var players = {};
    players._id = 0;
    players.players = {};
    players.id = function() {
        this._id++;
        return this._id
    }
    ;
    players.add = function(id, player) {
        this.players[id] = player;
        return player
    }
    ;
    players.get = function(id) {
        return this.players[id]
    }
    ;
    window.videoPlayer = function(container, options) {
        var id = players.id();
        var pl = new player(new htmlElement(container),Obj.extend(options, {
            id: id
        }));
        players.add(id, pl);
        return pl
    }
}
)(window);
$(document).ready(function() {
    $('input.datepicker').livequery(function() {
        var input = $(this);
        $(input).attr('readonly', 'readonly');
        $(input).css('cursor', 'pointer');
        var date = $(input).val();
        var current = date;
        var range = $(input).hasClass('range');
        if (date && range) {
            date = date.toString().split(' - ');
            current = date[1]
        }
        $(this).change(function() {
            date = $(this).val();
            range = $(this).hasClass('range');
            if (date && range)
                date = date.toString().split(' - ');
            $(this).DatePickerSetDate(date)
        });
        $(this).DatePicker({
            date: date,
            current: current,
            format: 'd.m.Y',
            mode: range ? 'range' : 'single',
            onChange: function(date) {
                if (parseInt(typeof date == 'object' ? date[0] : date)) {
                    $(input).val(typeof date == 'object' ? date[0] + ' - ' + date[1] : date);
                    $(input).change()
                }
            }
        })
    });
    $('input[placeh]').livequery(function() {
        var input = $(this);
        var placeholder = $('<span/>').addClass('placeholder');
        $(this).before(placeholder);
        var setText = function() {
            if (!$(input).val())
                $(placeholder).html($(input).attr('placeh'));
            else
                $(placeholder).html('')
        };
        $(this).focusin(function() {
            $(placeholder).hide();
            setText()
        });
        $(this).focusout(function() {
            $(placeholder).show();
            setText()
        });
        $(placeholder).click(function() {
            $(input).focus()
        });
        setInterval(setText, 100)
    })
});
mAuth = {
    params: {},
    init: function(params) {
        var self = this;
        self.params = params;
        var header = $('#header').find('.auth');
        if (params.user_ok) {
            var logout_link = $('<a/>').attr('data-action', 'logout').html('Выход');
            header.append(logout_link)
        } else {
            var auth_link = $('<a/>').attr('data-action', 'login').addClass('login').html('Вход');
            var reg_link = $('<a/>').attr('data-action', 'registration').addClass('registration').html('Регистрация');
            header.append(auth_link);
            header.append(reg_link)
        }
        $('[data-action="login"]').livequery('click', function() {
            open_popup('login')
        });
        $('[data-action="registration"]').livequery('click', function() {
            self.block()
        });
        $('[data-action="logout"]').livequery('click', function() {
            ajax(self.params.url_logout)
        });
        $('.popup form').livequery('submit', function() {
            var form = $(this);
            ajax($(this)).success(function(data) {
                if (data.form_errors)
                    self.form_errors(form, data.form_errors);
                if (data.content) {
                    var content = $('<div/>').addClass('registration-end').html(data.content);
                    $(form).hide();
                    $(form).after(content)
                }
                if (data.redirect_url)
                    window.top.location = data.redirect_url
            });
            $('.f-input', this).keypress(function() {
                self.hide_error($(this))
            });
            $('.f-input', this).change(function() {
                self.hide_error($(this))
            });
            return false
        })
    },
    form_errors: function(form, errors) {
        form = $(form);
        for (var name in errors) {
            var error_text = errors[name][0];
            var input = $('.f-input[name="' + name + '"]', form);
            if (!input.length)
                continue;
            $(input).parent().find('.f-error').remove();
            var error_div = $('<div/>').addClass('f-error').html(error_text);
            input.addClass('error');
            input.after(error_div)
        }
    },
    hide_error: function(input) {
        if ($(input).hasClass('error')) {
            $(input).removeClass('error');
            $(input).parent().find('.f-error').remove()
        }
    },
    block: function() {
        var self = this;
        var bl = function() {
            open_popup('block');
            ajax(self.params.url_popup_open)
        };
        var getCookie = function(name) {
            var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
            return matches ? decodeURIComponent(matches[1]) : undefined
        };
        var setCookie = function(name, value, options) {
            options = options || {};
            var expires = options.expires;
            if (typeof expires == "number" && expires) {
                var d = new Date();
                d.setTime(d.getTime() + expires * 1000);
                expires = options.expires = d
            }
            if (expires && expires.toUTCString) {
                options.expires = expires.toUTCString()
            }
            value = encodeURIComponent(value);
            var updatedCookie = name + "=" + value;
            for (var propName in options) {
                updatedCookie += "; " + propName;
                var propValue = options[propName];
                if (propValue !== true) {
                    updatedCookie += "=" + propValue
                }
            }
            document.cookie = updatedCookie
        };
        if (self.params.wap_payment && self.params.wap_payment_url && getCookie('ws') != '1') {
            ajax(self.params.wap_payment_url).success(function(redirect_url) {
                if (redirect_url) {
                    setCookie('ws', '1');
                    window.location.href = redirect_url
                } else {
                    bl()
                }
            }).error(function() {
                bl()
            })
        } else {
            bl()
        }
    }
};
mFilm = {
    options: {},
    player: null,
    setOptions: function(options) {
        this.options = $.extend(this.options, options)
    },
    init: function() {
        if (!this.options)
            return false;
        if (typeof this.options.video == 'undefined')
            return false;
        if (typeof this.options.play_preview == 'undefined')
            return false;
        if (typeof mAuth.params.user_ok == 'undefined')
            return false;
        this.initPlayer();
        this.initLikeButtons()
    },
    initPlayer: function() {
        var self = this;
        var player = document.getElementById('player');
        var user_ok = mAuth.params.user_ok;
        var play = user_ok || (self.options.play_preview && !mAuth.params.wap_payment);
        var agent = self.agent();
        if (!player)
            return false;
        if (agent.os.name == 'ios') {
            $(player).addClass('controls-volume-hidden');
            if (agent.os.version.major <= 9 && agent.device != 'ipad') {
                if (!user_ok)
                    play = false
            }
        }
        self.player = videoPlayer(player, {
            swfPath: self.options.swfPath,
            tech: play ? ['html', 'flash', 'download'] : ['download'],
            controls: true,
            duration: self.options.video.duration,
            video: {
                'src': [{
                    'url': user_ok ? self.options.video.src.user_ok : self.options.video.src.user_not_ok,
                    'format': self.options.video.format
                }]
            },
            poster: {
                'src': self.options.video.poster_src
            }
        });
        if (user_ok)
            return true;
        self.player.on('download', function() {
            self.player.stop();
            self.player.exitFullScreen();
            mAuth.block();
            return false
        });
        self.player.on('ended', function() {
            self.player.exitFullScreen();
            mAuth.block()
        });
        return true
    },
    initLikeButtons: function() {
        $('.like .icon').livequery('click', function() {
            if (mAuth.params.user_ok) {
                $('.like .icon').removeClass('selected');
                $(this).addClass('selected')
            } else {
                mAuth.block()
            }
        });
        $('form.write-comment').livequery('submit', function() {
            if (!mAuth.params.user_ok)
                mAuth.block();
            $(this).find(':input').val('');
            return false
        })
    },
    _agent: null,
    agent: function() {
        if (this._agent !== null)
            return this._agent;
        var agent_str = window.navigator.userAgent;
        this._agent = {
            device: 'other',
            os: {
                name: 'other',
                version: {
                    major: 0,
                    minor: 0,
                    float: 0.0,
                    full: ''
                }
            }
        };
        var apple_ios, apple_device;
        if (apple_device = agent_str.match(/(^|[^\w])(iPhone|iPad|iPop)($|[^\w])/i)) {
            this._agent.device = apple_device[2].toLowerCase();
            if (apple_ios = agent_str.match(/(^|[^\w])OS\s+((\d+)(_(\d+))?(_\d+)*)($|[^\w])/i)) {
                this._agent.os.name = 'ios';
                this._agent.os.version.major = parseInt(apple_ios[3]);
                this._agent.os.version.minor = parseInt(apple_ios[5]);
                this._agent.os.version.float = parseFloat(this._agent.os.version.major + '.' + this._agent.os.version.minor);
                this._agent.os.version.full = apple_ios[2].replace(/_/g, '.')
            }
        }
        return this._agent
    }
};
$(function() {
    $('.films-list .show-more a.load').livequery('click', function() {
        var link = $(this);
        ajax($(link)).success(function(data) {
            if (data) {
                $(link).parents('.show-more').replaceWith(data)
            }
        })
    })
});
$(function() {
    $('.popup .popup-close').livequery('click', function() {
        $(this).parents('.popup').hide()
    })
});
function open_popup(class_name) {
    $('.popup').hide();
    var pop_up = $('.popup.' + class_name);
    pop_up.find('form').show();
    pop_up.find('.registration-end').remove();
    pop_up.show()
}
mStills = {
    container: null,
    urls: null,
    count: 8,
    init: function(container, urls, count) {
        var self = this;
        self.container = container;
        self.count = count;
        var _urls = [];
        for (var i in urls)
            _urls.push(urls[i]);
        if (!_urls.length)
            return;
        self.urls = _urls;
        self.drawPreviews()
    },
    drawPreviews: function() {
        var self = this;
        for (var i = 0; i < self.urls.length && i < self.count; i++) {
            var url_preview = self.urls[i]['url_preview'];
            var still = $('<span/>');
            still.addClass('still');
            still.css('background', 'url(' + url_preview + ') 50% 50% no-repeat');
            still.attr('i', i);
            still.bind('click', function() {
                self.slider($(this).attr('i'))
            });
            self.container.append(still)
        }
    },
    slider: function(i) {
        var self = this;
        i = parseInt(i);
        $('.stills-slider').remove();
        var slider = $('<div/>');
        slider.addClass('stills-slider');
        var slider_content = $('<div/>');
        slider_content.addClass('data');
        slider_content.appendTo(slider);
        var image = $('<img/>');
        image.appendTo(slider_content);
        var image_opacity_interval = null;
        var image_opacity = 0.1;
        var image_opacity_step = 0.1;
        var img_src = function() {
            if (image_opacity_interval)
                clearInterval(image_opacity_interval);
            if (i >= self.urls.length)
                i = 0;
            if (i < 0)
                i = self.urls.length - 1;
            image_opacity_interval = setInterval(function() {
                image_opacity -= image_opacity_step;
                if (image_opacity <= 0) {
                    image_opacity = 0;
                    clearInterval(image_opacity_interval);
                    image_opacity_interval = null;
                    image.hide();
                    image.attr('src', self.urls[i].url_popup)
                }
                $(image).css('opacity', image_opacity)
            }, 20)
        };
        var show_img = function() {
            if (image_opacity_interval)
                clearInterval(image_opacity_interval);
            image_opacity_interval = setInterval(function() {
                image_opacity += image_opacity_step;
                if (image_opacity >= 1) {
                    image_opacity = 1;
                    clearInterval(image_opacity_interval);
                    image_opacity_interval = null
                }
                $(image).css('opacity', image_opacity)
            }, 20);
            $(image).show()
        };
        image.bind('load', show_img);
        image.hide();
        $(image).css('opacity', image_opacity);
        img_src();
        if (self.urls.length > 1) {
            var button_next = icon('image-slider-next');
            button_next.addClass('slider-nav');
            button_next.appendTo(slider_content);
            button_next.bind('click', function() {
                i++;
                img_src()
            });
            var button_prev = icon('image-slider-prev');
            button_prev.addClass('slider-nav');
            button_prev.prependTo(slider_content);
            button_prev.bind('click', function() {
                i--;
                img_src()
            })
        }
        var button_close = icon('close-popup');
        button_close.html('Закрыть');
        button_close.appendTo(slider_content);
        var interval = null;
        var calc_pos_interval = null;
        var close = function() {
            slider.remove();
            if (interval)
                clearInterval(interval);
            if (image_opacity_interval)
                clearInterval(image_opacity_interval);
            if (calc_pos_interval)
                clearInterval(calc_pos_interval)
        };
        button_close.bind('click', function() {
            close()
        });
        slider.bind('click', function(e) {
            if (!e.target)
                return false;
            var target = $(e.target);
            if (target.hasClass('stills-slider') || target.hasClass('data'))
                close()
        });
        var calc_pos = function() {
            var window_h = $(window).height();
            var window_w = $(window).width();
            var slide_h = $(slider_content).height();
            var slide_w = $(slider_content).width();
            slider_content.css({
                top: parseInt((window_h - slide_h) / 2) + 'px',
                left: parseInt((window_w - slide_w) / 2) + 'px'
            })
        };
        slider.appendTo('body');
        calc_pos();
        calc_pos_interval = setInterval(calc_pos, 10)
    }
};
$('.tabs .tabs-head a').livequery('click', function() {
    var tab_id = $(this).attr('href');
    if (tab_id) {
        $(this).parents('.tabs').find('.tabs-content').removeClass('active');
        $(this).parents('.tabs').find('.tabs-head a').removeClass('active');
        $(this).parents('.tabs').find(tab_id).addClass('active');
        $(this).addClass('active')
    }
    return false
});