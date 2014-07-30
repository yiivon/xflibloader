/**
 * XFLibLoader
 * @author Yiivon http://www.yiivon.net
 * @contact yiivon@126.com
 */

(function (module) {
	if (typeof (module) === 'undefined') {
		var _mod = {};
		var _host = '';

		_mod.load = function (config) {
			if (!config) return false;
			// XFLibLoader.load('xx.js');
			if (typeof (config) === 'string') config = {libs: [config]};
			// XFLibLoader.load(['1.js', '2.js']);
			if (typeof(config.length) === 'number') config = {libs: config};

			if (typeof (config) !== 'object') return false;
			// XFLibLoader.load({file:'1.js'});
			if(!config.libs) config = {libs: [config]};

			config.loaded || (config.loaded = function () {});
			config.host && (_host = config.host);

			config.libs.count = config.libs.length;
			if (config.order) {
				orderLoad(config.libs, config.loaded);
			} else {
				while (config.libs.length > 0) {
					var item = shiftItem(config.libs);
					if (!item) break;

					loadLibrary(item.file, item.type, function () {
						item.loaded();
						--config.libs.count;
						if (config.libs.count < 1) config.loaded();
					});
				}
			}
		};

		function shiftItem(libs) {
			var item = libs.shift();
			if (!item) return null;

			if (typeof (item) === 'string') item = {file: item};
			item.type || (item.type = 'js');
			item.loaded || (item.loaded = function () {});
			return item;
		}

		function orderLoad(libs, loaded) {
			var item = shiftItem(libs);
			if (!item) return false;

			loadLibrary(item.file, item.type, function () {
				item.loaded();
				--libs.count;
				if (libs.count < 1) {
					loaded();
				} else {
					orderLoad(libs, loaded);
				}
			});
			return true;
		}

		// private methods
		function loadLibrary(filename, type, onload) {
			if (_host) filename = _host + "/" + filename;
			var oHead = document.getElementsByTagName('HEAD').item(0);
			var fileref = null;
			if (type == 'css') {
				fileref = document.createElement("link");
				fileref.rel = "stylesheet";
				fileref.type = "text/css";
				fileref.href = filename;
			} else {
				fileref = document.createElement("script");
				fileref.type = "text/javascript";
				fileref.src = filename;
			}

			if (typeof(fileref.onload) === 'undefined') {
				fileref.onreadystatechange = function () {
					if (this.readyState == "complete" || this.readyState == "loaded") {
						fileref.onreadystatechange = null;
						onload && onload();
					}
				}
			} else {
				fileref.onload = onload;
			}

			if (fileref) oHead.appendChild(fileref);
		}

		window.XFLibLoader = _mod;
	}
}(window.XFLibLoader));