'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fetchComponentData;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _matchPath = require('react-router/matchPath');

var _matchPath2 = _interopRequireDefault(_matchPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dispatchIfMatch(dispatch, requirement, path, query) {
  var match = (0, _matchPath2.default)(path, requirement[0]);
  return match ? dispatch(requirement[1](match.params, query)) : Promise.resolve();
}

function fetchComponentData(dispatch, components, path, query) {
  var requirements = components.reduce(function (prev, current) {
    return current ? (current.requirements || []).concat(prev) : prev;
  }, []);
  var promises = requirements.map(function (requirement) {
    return typeof requirement === 'function' ? dispatch(requirement()) : dispatchIfMatch(dispatch, requirement, path, query);
  });
  return Promise.all(promises);
}