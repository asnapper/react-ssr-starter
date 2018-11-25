'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expressRemoteHandlebars = require('express-remote-handlebars');

var _expressRemoteHandlebars2 = _interopRequireDefault(_expressRemoteHandlebars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LayoutEngine = function () {
  function LayoutEngine(layoutUrl) {
    _classCallCheck(this, LayoutEngine);

    var remoteHandlebars = _expressRemoteHandlebars2.default.create();
    this.layoutUrl = layoutUrl;
    this.engine = remoteHandlebars.engine;
    this.getLayout = remoteHandlebars.getLayout.bind(remoteHandlebars);
  }

  _createClass(LayoutEngine, [{
    key: 'resolveLayout',
    value: function resolveLayout(req, options) {
      var _this = this;

      if (!this.layoutUrl) {
        return Promise.resolve();
      }

      return new Promise(function (resolve, reject) {
        var resolvedLayoutUrl = typeof _this.layoutUrl === 'function' ? _this.layoutUrl(req) : _this.layoutUrl;

        _this.getLayout({ headers: options.headers, url: resolvedLayoutUrl }, function (err, layout) {
          if (err) return reject(err);
          resolve(layout);
        });
      });
    }
  }]);

  return LayoutEngine;
}();

exports.default = LayoutEngine;