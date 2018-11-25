'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _history = require('history');

var _connectedReactRouter = require('connected-react-router');

var _reactRedux = require('react-redux');

var _reactRouterDom = require('react-router-dom');

var _redux = require('redux');

var _developmentOnly = require('redux-devtools-extension/developmentOnly');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = function () {
  function Client(_ref) {
    var routes = _ref.routes,
        rootReducer = _ref.rootReducer,
        initialState = _ref.initialState,
        inject = _ref.inject,
        wrapper = _ref.wrapper,
        _ref$middlewares = _ref.middlewares,
        middlewares = _ref$middlewares === undefined ? [] : _ref$middlewares;

    _classCallCheck(this, Client);

    this.routes = routes;
    this.history = (0, _history.createBrowserHistory)();
    var enhancer = (0, _developmentOnly.composeWithDevTools)(_redux.applyMiddleware.apply(undefined, [(0, _connectedReactRouter.routerMiddleware)(this.history), _reduxThunk2.default.withExtraArgument(inject)].concat(_toConsumableArray(middlewares))));
    this.store = (0, _redux.createStore)((0, _connectedReactRouter.connectRouter)(this.history)(rootReducer), initialState, enhancer);
    this.wrapper = wrapper;
  }

  _createClass(Client, [{
    key: 'render',
    value: function render(domElement) {
      var App = this.wrapper || 'div';
      _reactDom2.default.hydrate(_react2.default.createElement(
        _reactRedux.Provider,
        { store: this.store },
        _react2.default.createElement(
          _connectedReactRouter.ConnectedRouter,
          { history: this.history },
          _react2.default.createElement(
            App,
            null,
            (0, _helpers.renderRoutes)(this.routes)
          )
        )
      ), domElement);
    }
  }]);

  return Client;
}();

exports.default = Client;