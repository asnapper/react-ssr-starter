'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (routes) {
  var routerConfig = (0, _createRouterConfig2.default)(routes);
  return (0, _reactRouterConfig.renderRoutes)(routerConfig);
};

var _reactRouterConfig = require('react-router-config');

var _createRouterConfig = require('./createRouterConfig');

var _createRouterConfig2 = _interopRequireDefault(_createRouterConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }