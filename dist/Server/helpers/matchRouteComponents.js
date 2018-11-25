'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (path, routes) {
  return (0, _reactRouterConfig.matchRoutes)(routes, path).map(function (_ref) {
    var route = _ref.route;
    return route.component;
  });
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterConfig = require('react-router-config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }