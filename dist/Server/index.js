'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _redux = require('redux');

var _createMemoryHistory = require('history/createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _connectedReactRouter = require('connected-react-router');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _lodash = require('lodash.pick');

var _lodash2 = _interopRequireDefault(_lodash);

var _LayoutEngine = require('./LayoutEngine');

var _LayoutEngine2 = _interopRequireDefault(_LayoutEngine);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultConfig = {
  port: 8080,
  serveStatic: false,
  staticFolder: 'public',
  staticPath: '/public',
  template: null,
  layoutVariables: function layoutVariables() {},
  headersToForward: ['user-agent'],
  layoutUrl: null,
  rootReducer: {},
  preloadState: function preloadState(req) {
    return Promise.resolve({});
  },
  routes: [],
  middlewares: [],
  inject: null,
  wrapper: null,
  onError: function onError(req, res, err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

var Server = function () {
  function Server(userConfig) {
    var _this = this;

    _classCallCheck(this, Server);

    this.config = _extends({}, defaultConfig, userConfig);
    if (typeof this.config.layoutVariables !== 'function') {
      var variables = _extends({}, this.config.layoutVariables);
      this.config.layoutVariables = function () {
        return variables;
      };
    }
    this.server = (0, _express2.default)();
    this.layoutEngine = new _LayoutEngine2.default(this.config.layoutUrl);

    if (this.config.serveStatic) {
      this.server.use(this.config.staticPath, _express2.default.static(this.config.staticFolder));
    }

    this.server.engine('handlebars', this.layoutEngine.engine);
    this.server.set('view engine', 'handlebars');
    this.server.set('view cache', true);
    this.config.middlewares.map(function (m) {
      return _this.server.use(m);
    });

    this.server.use(function (req, res) {
      var history = (0, _createMemoryHistory2.default)({
        initialEntries: [req.url]
      });

      _this.config.preloadState(req).then(function (preloadedState) {
        var store = (0, _redux.createStore)((0, _connectedReactRouter.connectRouter)(history)(_this.config.rootReducer), preloadedState, (0, _redux.applyMiddleware)((0, _connectedReactRouter.routerMiddleware)(history), _reduxThunk2.default.withExtraArgument(_this.config.inject)));
        var components = (0, _helpers.matchRouteComponents)(req.path, (0, _helpers.createRouterConfig)(_this.config.routes));
        var componentDataPromise = (0, _helpers.fetchComponentData)(store.dispatch, components, req.path, req.query);
        var headers = (0, _lodash2.default)(req.headers, _this.config.headersToForward);
        var layoutPromise = _this.layoutEngine.resolveLayout(req, { headers: headers });

        Promise.all([layoutPromise, componentDataPromise]).then(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 1),
              layout = _ref2[0];

          var content = (0, _helpers.renderApp)(req.path, store, _this.config.routes, _this.config.wrapper, history);
          res.type("text/html; charset=UTF-8");
          res.render(_this.config.template, _extends({
            layout: layout,
            state: JSON.stringify(store.getState()),
            content: content
          }, _this.config.layoutVariables()));
        }).catch(function (err) {
          return _this.config.onError(req, res, err);
        });
      });
    });
  }

  _createClass(Server, [{
    key: 'start',
    value: function start(callback) {
      var shutDown = function shutDown(code, srv) {
        console.log('received kill signal: shutting down gracefully');
        srv.close(function () {
          console.log('closed out remaining connections');
          process.exit(0);
        });
      };
      var srv = this.server.listen(this.config.port, callback);
      process.on('SIGTERM', function (code) {
        return shutDown(code, srv);
      });
      process.on('SIGINT', function (code) {
        return shutDown(code, srv);
      });
    }
  }]);

  return Server;
}();

exports.default = Server;