'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _reactRouterDom = require('react-router-dom');

var _reactRedux = require('react-redux');

var _history = require('history');

var _connectedReactRouter = require('connected-react-router');

var _renderRoutes = require('./renderRoutes');

var _renderRoutes2 = _interopRequireDefault(_renderRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderApp(path, store, routes, wrapper, history) {
  var context = {};
  var App = wrapper || 'div';
  var view = _react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
      _connectedReactRouter.ConnectedRouter,
      { history: history },
      _react2.default.createElement(
        _reactRouterDom.StaticRouter,
        { location: path, context: context },
        _react2.default.createElement(
          App,
          null,
          (0, _renderRoutes2.default)(routes)
        )
      )
    )
  );

  return (0, _server.renderToString)(view);
}

exports.default = renderApp;