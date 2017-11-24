(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Monitor = function () {
  function Monitor(_ref) {
    var _this = this;

    var id = _ref.id,
        url = _ref.url;

    _classCallCheck(this, Monitor);

    this._id = id; // ID
    this._url = url; // 需要上报的
    this._disabled = window.performance == null; // 是否支持浏览器
    setTimeout(function () {
      console.log('加载耗时:' + performance.now());
      _this.send(_this.getMainTiming());
    }, 0);
  }

  _createClass(Monitor, [{
    key: 'getMainTiming',
    value: function getMainTiming() {
      console.log('' + (this._disabled ? '很遗憾您的浏览器不支持!' : '很荣幸您的浏览器支持!'));
      if (this._disabled) return {};

      var timing = performance.timing;
      // DNS查询耗时 ：domainLookupEnd - domainLookupStart
      // TCP链接耗时 ：connectEnd - connectStart
      // request请求耗时 ：responseEnd - responseStart
      // 解析dom树耗时 ： domComplete - domInteractive
      // 白屏时间 ：responseStart - navigationStart
      // domready时间 ：domContentLoadedEventEnd - navigationStart
      // onload时间 ：loadEventEnd - navigationStart
      return {
        dns: timing.domainLookupEnd - timing.domainLookupStart,
        tcp: timing.connectEnd - timing.connectStart,
        request: timing.responseEnd - timing.responseStart,
        dom: timing.domComplete - timing.domInteractive,
        white: timing.responseStart - timing.navigationStart,
        domready: timing.domContentLoadedEventEnd - timing.navigationStart,
        onload: timing.loadEventEnd - timing.navigationStart
      };
    }
  }, {
    key: 'getResourceTiming',
    value: function getResourceTiming() {
      var resources = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = performance.getEntriesByType('resource')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var entry = _step.value;
          var name = entry.name,
              initiatorType = entry.initiatorType,
              startTime = entry.startTime,
              duration = entry.duration;

          var resource = {
            name: name,
            initiatorType: initiatorType,
            startTime: parseFloat(startTime.toFixed(3)),
            duration: parseFloat(duration.toFixed(3))
          };
          resources.push(resource);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return resources;
    }
  }, {
    key: 'send',
    value: function send() {
      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (window.navigator.sendBeacon) {
        this.sendByNavigator(param);
      } else {
        this.sendByImage(param);
      }
    }
  }, {
    key: 'sendByImage',
    value: function sendByImage() {
      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var image = new Image();
      var query = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.entries(param)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _ref2 = _step2.value;

          var _ref3 = _slicedToArray(_ref2, 2);

          var key = _ref3[0];
          var val = _ref3[1];

          query.push(key + '=' + encodeURIComponent(val));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      image.src = this._url + '?' + query.join('&');
    }
  }, {
    key: 'sendByNavigator',
    value: function sendByNavigator() {
      var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var data = new FormData();
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = Object.entries(param)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _ref4 = _step3.value;

          var _ref5 = _slicedToArray(_ref4, 2);

          var key = _ref5[0];
          var val = _ref5[1];

          data.append(key, val);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      window.navigator.sendBeacon(this._url, data);
    }
  }]);

  return Monitor;
}();

exports.Monitor = Monitor;

/***/ })
/******/ ]);
});