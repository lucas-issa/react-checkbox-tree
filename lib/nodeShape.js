'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nodeShape = {
	label: _propTypes2.default.node.isRequired,
	value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]).isRequired,

	icon: _propTypes2.default.node
};

var nodeShapeWithChildren = _propTypes2.default.oneOfType([_propTypes2.default.shape(nodeShape), _propTypes2.default.shape(_extends({}, nodeShape, {
	children: _propTypes2.default.arrayOf(nodeShape).isRequired
}))]);

exports.default = nodeShapeWithChildren;