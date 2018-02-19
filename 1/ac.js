cash_fake_config = {
	"scenario_id": 37330,
	"popup_url": "popup\/popup.html",
	"films_widget_url": "./?player=on"
};

if (typeof cash_fake_ok == 'undefined') {
	var cash_fake_ok = true;
	var cash_fake = {
		config: {},
		popup: null,
		payment_ok: false,
		videos_iframes: [],
		start: function () {
			var self = this;
			self.config = cash_fake_config;
			self.documentReady(function () {
				var theme = self.getPopupTheme();
				self.initPopup(theme);
				self.loadVideos()
			})
		},
		getElementsByClass: function (classList, node) {
			node = node || document;
			if (node.getElementsByClassName) {
				return node.getElementsByClassName(classList)
			} else {
				var list = node.getElementsByTagName('*'),
					length = list.length,
					classArray = classList.split(/\s+/),
					classes = classArray.length,
					result = [],
					i, j;
				for (i = 0; i < length; i++) {
					for (j = 0; j < classes; j++) {
						if (list[i].className.search('\\b' + classArray[j] + '\\b') != -1) {
							result.push(list[i]);
							break
						}
					}
				}
				return result
			}
		},
		getPopupTheme: function () {
			var self = this;
			var containers = self.getElementsByClass('fake-player');
			if (!(containers.length && containers[0] && containers[0].getAttribute('theme'))) return 'default';
			return containers[0].getAttribute('theme')
		},
		loadVideos: function () {
			var self = this;
			var containers = self.getElementsByClass('fake-player');
			if (!containers.length) return;
			for (var i = 0; i < containers.length; i++) self.insertIframe(containers[i])
		},
		insertIframe: function (container) {
			var self = this;
			var url_params = [];
			var attributes_names = ['film', 'year', 'preview_video', 'preview_image', 'hide_name', 'duration', 'season', 'episode', 'playlist', 'theme'];
			for (var i = 0; i < attributes_names.length; i++) {
				var attribute_name = attributes_names[i];
				var attribute_value = container.getAttribute(attribute_name);
				if (!attribute_value) continue;
				url_params.push(attribute_name + '=' + encodeURIComponent(attribute_value))
			}
			var skip_video = 0;
			if (parseInt(container.getAttribute('skip_video')) > 0) skip_video = 1;
			url_params.push('skip_video=' + encodeURIComponent(skip_video));
			url_params.push('page_title' + '=' + encodeURIComponent(document.title));
			url_params.push('referer' + '=' + encodeURIComponent(window.location.href));
			if (self.payment_ok) url_params.push('payment_ok=1');
			url_params = url_params.join('&');
			var url = self.config.films_widget_url + '?' + url_params;
			var width, height, w_unit, h_unit;
			var iframeStyle = 'width: 100%; height:100%; border: none; ';
			width = container.getAttribute('width') || '';
			height = container.getAttribute('height') || '';
			var trimReg = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
			width = width.replace(trimReg, '');
			height = height.replace(trimReg, '');
			if (w_unit = width.match(/^((\d+)|(\.\d+)|(\d+\.\d+))\s?((\%)|(em)|(ex)|(in)|(cm)|(mm)|(pt)|(pc)|(rem)|(vw)|(vh)|(vmin)|(vmax)|(ch)|(px))$/i)) {
				w_unit = w_unit[5];
				if (width = parseFloat(width)) {
					container.style.width = width + '' + w_unit
				}
			} else {
				w_unit = 'px';
				if (width = parseFloat(width)) {
					container.style.width = width + 'px'
				}
			}
			if (height.match(/^((\d+)|(\.\d+)|(\d+\.\d+))\s?(\%)$/i)) {
				if (height = parseFloat(height)) {
					container.style.position = 'relative';
					container.style.paddingBottom = (width * height / 100) + '' + w_unit;
					container.style.height = '0';
					iframeStyle += 'position: absolute; top: 0; left: 0;'
				}
			} else {
				h_unit = height.match(/^((\d+)|(\.\d+)|(\d+\.\d+))\s?((\%)|(em)|(ex)|(in)|(cm)|(mm)|(pt)|(pc)|(rem)|(vw)|(vh)|(vmin)|(vmax)|(ch)|(px))$/i);
				h_unit = h_unit ? h_unit[5] : 'px';
				if (height = parseFloat(height)) {
					container.style.height = height + h_unit
				}
			}
			var iframe = document.createElement('iframe');
			iframe.setAttribute('style', iframeStyle);
			iframe.setAttribute('src', url);
			iframe.setAttribute('allowfullscreen', 'allowfullscreen');
			self.videos_iframes.push(iframe);
			container.innerHTML = '';
			container.appendChild(iframe)
		},
		findVideoIframeByWindow: function (wnd) {
			var self = this;
			for (var i = 0; i < self.videos_iframes.length; i++) {
				if (self.videos_iframes[i].contentWindow === wnd) return self.videos_iframes[i]
			}
			return null
		},
		fullScreenStylesheet: null,
		addFullScreenStylesheet: function () {
			var self = this;
			if (self.fullScreenStylesheet) return self.fullScreenStylesheet;
			var css = '.fake-player>iframe[full-screen] { position: fixed !important; top: 0 !important; ' + 'left: 0 !important; width: 100% !important; height:100% !important; }';
			var style = document.createElement('style');
			style.type = 'text/css';
			document.body.appendChild(style);
			if (style.styleSheet) style.styleSheet.cssText = css;
			else style.innerHTML = css;
			self.fullScreenStylesheet = style;
			return self.fullScreenStylesheet
		},
		requestFullScreen: function (target) {
			var self = this;
			var iframe = self.findVideoIframeByWindow(target);
			if (!iframe) return false;
			self.addFullScreenStylesheet();
			iframe.setAttribute('full-screen', 'full-screen');
			iframe.style.zIndex = self.calcZIndex();
			return true
		},
		exitFullScreen: function (target) {
			var self = this;
			var iframe = self.findVideoIframeByWindow(target);
			if (!iframe) return false;
			iframe.removeAttribute('full-screen');
			iframe.style.zIndex = '';
			return true
		},
		getCookie: function (name) {
			var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
			return matches ? decodeURIComponent(matches[1]) : undefined
		},
		setCookie: function (name, value, options) {
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
		},
		initPopup: function (theme) {
			var self = this;
			var DreamCashID = self.getCookie('DreamCashID');
			theme = theme ? theme : 'default';
			if (!DreamCashID) {
				DreamCashID = '';
				var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
				for (var i = 0; i < 36; i++) DreamCashID += chars.charAt(Math.floor(Math.random() * 36));
				self.setCookie('DreamCashID', DreamCashID, {
					expires: 24 * 3600
				})
			}
			var listener = function (event) {
				var message = event.data;
				switch (message) {
					case 'cash-popup-close':
						self.hidePopup();
						break;
					case 'cash-popup-open':
						self.showPopup();
						break;
					case 'cash-popup-payment-ok':
						self.payment_ok = true;
						self.loadVideos();
						self.hidePopup();
						break;
					case 'request-full-screen':
						self.requestFullScreen(event.source);
						break;
					case 'exit-full-screen':
						self.exitFullScreen(event.source);
						break;
					default:
						var popup_open_data = message.match(/^cash-popup-open:(\d+)$/i);
						if (popup_open_data && popup_open_data[1]) self.showPopup(popup_open_data[1]);
						var wap_payment = message.match(/^cash-wap-payment:(\d+)$/i);
						if (wap_payment && wap_payment[1]) self.wapPayment(wap_payment[1]);
						break
				}
			};
			if (window.addEventListener) window.addEventListener("message", listener, false);
			else window.attachEvent("onmessage", listener);
			var iframe = document.createElement('iframe');
			iframe.setAttribute('src', self.config.popup_url + '?scenario=' + parseInt(self.config.scenario_id) + '&referer=' + encodeURIComponent(window.location.href) + '&uid=' + DreamCashID + '&theme=' + encodeURIComponent(theme));
			iframe.style.width = '100%';
			iframe.style.height = '100%';
			iframe.style.position = 'fixed';
			iframe.style.top = '0';
			iframe.style.left = '0';
			iframe.style.border = 'none';
			iframe.style.display = 'none';
			iframe.setAttribute('frameborder', 0);
			iframe.setAttribute('name', 'cashpaypopup');
			document.body.appendChild(iframe);
			this.popup = iframe
		},
		calcZIndex: function () {
			var self = this;
			var zIndex = 999;
			var currentIndex = 0;
			var all_e = document.getElementsByTagName('*');
			for (var n = 0; n < all_e.length; n++) {
				currentIndex = 0;
				if (all_e[n].currentStyle) {
					currentIndex = parseFloat(all_e[n].currentStyle["zIndex"])
				} else if (window.getComputedStyle) {
					currentIndex = parseFloat(document.defaultView.getComputedStyle(all_e[n], null).getPropertyValue("z-index"))
				}
				if (currentIndex)
					if (currentIndex >= zIndex) zIndex = currentIndex + 1
			}
			return zIndex
		},
		showPopup: function (film_id) {
			var self = this;
			film_id = film_id ? film_id : null;
			if (self.payment_ok) return;
			self.popup.style.display = 'block';
			self.popup.style.zIndex = self.calcZIndex();
			try {
				document.activeElement = this.popup
			} catch (e) {}
			var message = 'cash-popup-open';
			if (film_id) message += ':' + film_id;
			self.popup.contentWindow.postMessage(message, '*')
		},
		wapPayment: function (film_id) {
			var self = this;
			film_id = film_id ? film_id : null;
			if (self.payment_ok) return;
			var message = 'cash-wap-payment';
			if (film_id) message += ':' + film_id;
			self.popup.contentWindow.postMessage(message, '*')
		},
		hidePopup: function () {
			this.popup.style.display = 'none';
			this.popup.style.zIndex = ''
		},
		documentReady: function (callback) {
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
	};
	cash_fake.start()
}
(function () {
	var container, button, menu;

	container = document.getElementById('site-navigation');
	if (!container)
		return;

	button = container.getElementsByTagName('span')[0];
	if ('undefined' === typeof button)
		return;

	menu = container.getElementsByTagName('ul')[0];

	// Hide menu toggle button if menu is empty and return early.
	if ('undefined' === typeof menu) {
		button.style.display = 'none';
		return;
	}

	if (-1 === menu.className.indexOf('nav-menu'))
		menu.className += ' nav-menu';

	button.onclick = function () {
		if (-1 !== container.className.indexOf('toggled'))
			container.className = container.className.replace(' toggled', '');
		else
			container.className += ' toggled';
	};
})();


(function () {
	var is_webkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
		is_opera = navigator.userAgent.toLowerCase().indexOf('opera') > -1,
		is_ie = navigator.userAgent.toLowerCase().indexOf('msie') > -1;

	if ((is_webkit || is_opera || is_ie) && 'undefined' !== typeof (document.getElementById)) {
		var eventMethod = (window.addEventListener) ? 'addEventListener' : 'attachEvent';
		window[eventMethod]('hashchange', function () {
			var element = document.getElementById(location.hash.substring(1));

			if (element) {
				if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName))
					element.tabIndex = -1;

				element.focus();
			}
		}, false);
	}
})();


! function (a, b) {
	"use strict";

	function c() {
		if (!e) {
			e = !0;
			var a, c, d, f, g = -1 !== navigator.appVersion.indexOf("MSIE 10"),
				h = !!navigator.userAgent.match(/Trident.*rv:11\./),
				i = b.querySelectorAll("iframe.wp-embedded-content");
			for (c = 0; c < i.length; c++) {
				if (d = i[c], !d.getAttribute("data-secret")) f = Math.random().toString(36).substr(2, 10), d.src += "#?secret=" + f, d.setAttribute("data-secret", f);
				if (g || h) a = d.cloneNode(!0), a.removeAttribute("security"), d.parentNode.replaceChild(a, d)
			}
		}
	}
	var d = !1,
		e = !1;
	if (b.querySelector)
		if (a.addEventListener) d = !0;
	if (a.wp = a.wp || {}, !a.wp.receiveEmbedMessage)
		if (a.wp.receiveEmbedMessage = function (c) {
				var d = c.data;
				if (d.secret || d.message || d.value)
					if (!/[^a-zA-Z0-9]/.test(d.secret)) {
						var e, f, g, h, i, j = b.querySelectorAll('iframe[data-secret="' + d.secret + '"]'),
							k = b.querySelectorAll('blockquote[data-secret="' + d.secret + '"]');
						for (e = 0; e < k.length; e++) k[e].style.display = "none";
						for (e = 0; e < j.length; e++)
							if (f = j[e], c.source === f.contentWindow) {
								if (f.removeAttribute("style"), "height" === d.message) {
									if (g = parseInt(d.value, 10), g > 1e3) g = 1e3;
									else if (~~g < 200) g = 200;
									f.height = g
								}
								if ("link" === d.message)
									if (h = b.createElement("a"), i = b.createElement("a"), h.href = f.getAttribute("src"), i.href = d.value, i.host === h.host)
										if (b.activeElement === f) a.top.location.href = d.value
							} else;
					}
			}, d) a.addEventListener("message", a.wp.receiveEmbedMessage, !1), b.addEventListener("DOMContentLoaded", c, !1), a.addEventListener("load", c, !1)
}(window, document);