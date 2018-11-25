'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (routes) {
  return [{
    component: function component(_ref) {
      var route = _ref.route;
      return (0, _reactRouterConfig.renderRoutes)(route.routes);
    },
    routes: routes
  }];
};

var _reactRouterConfig = require('react-router-config');