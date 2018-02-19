function documentReady(callback) {
    var called = false;
    var ready = function () {
        if (called) return;
        called = true;
        callback()
    };
    if (document.readyState === "complete") {
        setTimeout(ready, 1)
    } else if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", ready, false);
        window.addEventListener("load", ready, false)
    } else if (window.attachEvent) {
        document.attachEvent("onreadystatechange", ready);
        window.attachEvent("onload", ready)
    }
}
function on(el, type, callback) {
    var cb = function (event) {
        var res = callback.call(el, event);
        if (res === false) event.preventDefault ? event.preventDefault() : (event.returnValue = false);
        return res
    };
    if (el.addEventListener) el.addEventListener(type, cb, false);
    else if (el.attachEvent) el.attachEvent('on' + type, cb)
}
function getElementsByClassName(cn, rootNode) {
    rootNode = rootNode || window.document;
    for (var r = [], e = rootNode.getElementsByTagName('*'), i = e.length; i--;) {
        if ((' ' + e[i].className + ' ').indexOf(' ' + cn + ' ') > -1) {
            r.push(e[i])
        }
    }
    return r
}
function getAttr(el, attr) {
    var result = (el.getAttribute && el.getAttribute(attr)) || null;
    if (!result) {
        var attrs = el.attributes;
        var length = attrs.length;
        for (var i = 0; i < length; i++) if (attrs[i].nodeName === attr) result = attrs[i].nodeValue
    }
    return result
}
function ajax(url, data, callback, error) {
    data = data || '';
    if (data && data instanceof Object) {
        var post_data = '';
        for (var k in data) {
            if (data.hasOwnProperty(k)) {
                post_data += post_data ? '&' : '';
                post_data += encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            }
        }
        data = post_data
    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200 && error) {
            error()
        } else if (callback) {
            var result = xhr.responseText;
            try {
                var j = JSON.parse(result);
                result = j || result
            } catch (e) {}
            callback(result)
        }
    };
    xhr.send(data)
}
var wapPaymentData = {
    enable: false,
    process: false,
    url: null,
    fallback: []
};

function wapPayment(film_id, fallback) {
    if (!wapPaymentData.enable) {
        if (fallback) fallback();
        return
    }
    if (fallback) wapPaymentData.fallback.push(fallback);
    if (wapPaymentData.process) return;
    wapPaymentData.process = true;
    ajax(wapPaymentData.url, {
        film_id: parseInt(film_id)
    }, function (redirect_url) {
        var fb = wapPaymentData.fallback;
        wapPaymentData.process = false;
        wapPaymentData.enable = false;
        wapPaymentData.fallback = [];
        if (redirect_url) {
            window.top.location = redirect_url;
            return
        }
        for (var i = 0; i < fb.length; i++) {
            fb[i]()
        }
    })
}
function form_errors(form, errors) {
    var rows = getElementsByClassName('f-row', form);
    var input, name, error;
    for (var i = 0; i < rows.length; i++) {
        input = rows[i].getElementsByTagName('input')[0];
        name = input.name;
        error = getElementsByClassName('f-error', rows[i])[0];
        if (name && error && errors[name] && errors[name][0]) {
            rows[i].className = 'f-row error';
            error.innerHTML = errors[name][0]
        }
    }
}
function hide_error(input) {
    var row = input.parentNode;
    if ((' ' + row.className + ' ').indexOf(' ' + 'f-row' + ' ') > -1) {
        row.className = 'f-row'
    }
}
function onLinkClick(node) {
    node = node || window.document;
    var links = node.getElementsByTagName('a');
    var i;
    for (i = 0; i < links.length; i++) {
        on(links[i], 'click', function () {
            var link = getAttr(this, 'hash') || getAttr(this, 'href');
            var form_registration = document.getElementById('registration');
            var form_enter = document.getElementById('enter');
            if (!link.match(/^\#.+/)) return;
            var divs = getElementsByClassName('data');
            for (var i = 0; i < divs.length; i++) divs[i].style.display = 'none';
            if (link == '#enter') form_enter.style.display = 'block';
            if (link == '#registration') form_registration.style.display = 'block';
            return false
        })
    }
}
documentReady(function () {
    var film_id = null,
        i;
    wapPaymentData = {
        enable: wap_payment_url ? true : false,
        process: false,
        url: wap_payment_url,
        fallback: []
    };
    onLinkClick(window.document);
    var close = document.getElementById('close');
    on(close, 'click', function (e) {
        document.body.className = 'hidden';
        window.top.postMessage('cash-popup-close', '*')
    });
    on(window, 'message', function (event) {
        var message = event.data;
        film_id = null;
        var popup_open = message.match(/^cash-popup-open(:(\d+))?$/i);
        var wap_payment = message.match(/^cash-wap-payment(:(\d+))?$/i);
        if (popup_open) {
            document.body.className = 'hidden';
            film_id = popup_open[2] || null;
            wapPayment(film_id, function () {
                document.body.className = '';
                ajax(popup_open_url);
                window.top.postMessage('cash-popup-show', '*')
            })
        }
        if (wap_payment) {
            film_id = wap_payment[2] || null;
            wapPayment(film_id)
        }
    });
    var forms = window.document.getElementsByTagName('form'),
        form;
    var waiting = false;
    for (i = 0; i < forms.length; i++) {
        form = forms[i];
        on(form, 'submit', function () {
            if (waiting) return false;
            waiting = true;
            var form = this;
            var data = {};
            var inputs = form.getElementsByTagName('input');
            form.className = 'waiting';
            for (var i = 0; i < inputs.length; i++) {
                data[inputs[i].name] = inputs[i].value;
                if ((inputs[i].parentNode.className.indexOf('error') >= 0) && (inputs[i].parentNode.className.indexOf('f-row') >= 0)) inputs[i].parentNode.className = 'f-row'
            }
            if (film_id) data.film_id = film_id;
            ajax(form.action, data, function (data) {
                waiting = false;
                form.className = '';
                if (data.form_errors) form_errors(form, data.form_errors);
                if (data.payment_success) window.top.postMessage('cash-popup-payment-ok', '*');
                if (data.content && data.content.div_id) {
                    var div = window.document.getElementById(data.content.div_id);
                    if (div) {
                        div.innerHTML = data.content.data;
                        onLinkClick(div)
                    }
                }
                if (data.show_div) {
                    var divs = getElementsByClassName('data');
                    for (var i = 0; i < divs.length; i++) divs[i].style.display = 'none';
                    window.document.getElementById(data.show_div).style.display = 'block'
                }
                if (data.redirect_url) window.top.location = data.redirect_url
            }, function () {
                waiting = false;
                form.className = ''
            });
            return false
        });
        var inputs = form.getElementsByTagName('input');
        for (var k = 0; k < inputs.length; k++) {
            on(inputs[k], 'keypress', function () {
                hide_error(this)
            });
            on(inputs[k], 'change', function () {
                hide_error(this)
            })
        }
    }
});