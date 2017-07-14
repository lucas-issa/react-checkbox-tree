'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _TreeNode = require('./TreeNode');

var _TreeNode2 = _interopRequireDefault(_TreeNode);

var _nodeShape = require('./nodeShape');

var _nodeShape2 = _interopRequireDefault(_nodeShape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckboxTree = function (_React$Component) {
	_inherits(CheckboxTree, _React$Component);

	function CheckboxTree(props) {
		_classCallCheck(this, CheckboxTree);

		var _this = _possibleConstructorReturn(this, (CheckboxTree.__proto__ || Object.getPrototypeOf(CheckboxTree)).call(this, props));

		_this.id = 'rct-' + _shortid2.default.generate();
		_this.nodes = {};

		_this.flattenNodes(props.nodes);
		_this.unserializeLists({
			checked: props.checked,
			expanded: props.expanded
		});

		_this.onCheck = _this.onCheck.bind(_this);
		_this.onExpand = _this.onExpand.bind(_this);
		return _this;
	}

	_createClass(CheckboxTree, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(_ref) {
			var nodes = _ref.nodes,
			    checked = _ref.checked,
			    expanded = _ref.expanded;

			if (!(0, _isEqual2.default)(this.props.nodes, nodes)) {
				this.flattenNodes(nodes);
			}

			this.unserializeLists({ checked: checked, expanded: expanded });
		}
	}, {
		key: 'onCheck',
		value: function onCheck(node) {
			var _props = this.props,
			    noCascade = _props.noCascade,
			    onCheck = _props.onCheck;


			this.toggleChecked(node, node.checked, noCascade);
			onCheck(this.serializeList('checked'));
		}
	}, {
		key: 'onExpand',
		value: function onExpand(node) {
			var onExpand = this.props.onExpand;


			this.toggleNode('expanded', node, node.expanded);
			onExpand(this.serializeList('expanded'));
		}
	}, {
		key: 'getFormattedNodes',
		value: function getFormattedNodes(nodes) {
			var _this2 = this;

			return nodes.map(function (node) {
				var formatted = _extends({}, node);

				formatted.checked = _this2.nodes[node.value].checked;
				formatted.expanded = _this2.nodes[node.value].expanded;

				if (Array.isArray(node.children) && node.children.length > 0) {
					formatted.children = _this2.getFormattedNodes(formatted.children);
				} else {
					formatted.children = null;
				}

				return formatted;
			});
		}
	}, {
		key: 'getCheckState',
		value: function getCheckState(node, noCascade) {
			if (node.children === null || noCascade) {
				return node.checked ? 1 : 0;
			}

			if (this.isEveryChildChecked(node)) {
				return 1;
			}

			if (this.isSomeChildChecked(node)) {
				return 2;
			}

			return 0;
		}
	}, {
		key: 'toggleChecked',
		value: function toggleChecked(node, isChecked, noCascade) {
			var _this3 = this;

			if (node.children === null || noCascade) {
				// Set the check status of a leaf node or an uncoupled parent
				this.toggleNode('checked', node, isChecked);
			} else {
				// Percolate check status down to all children
				node.children.forEach(function (child) {
					_this3.toggleChecked(child, isChecked);
				});
			}
		}
	}, {
		key: 'toggleNode',
		value: function toggleNode(key, node, toggleValue) {
			this.nodes[node.value][key] = toggleValue;
		}
	}, {
		key: 'flattenNodes',
		value: function flattenNodes(nodes) {
			var _this4 = this;

			if (!Array.isArray(nodes) || nodes.length === 0) {
				return;
			}

			nodes.forEach(function (node) {
				_this4.nodes[node.value] = {};
				_this4.flattenNodes(node.children);
			});
		}
	}, {
		key: 'unserializeLists',
		value: function unserializeLists(lists) {
			var _this5 = this;

			// Reset values to false
			Object.keys(this.nodes).forEach(function (value) {
				Object.keys(lists).forEach(function (listKey) {
					_this5.nodes[value][listKey] = false;
				});
			});

			// Unserialize values and set their nodes to true
			Object.keys(lists).forEach(function (listKey) {
				lists[listKey].forEach(function (value) {
					_this5.nodes[value][listKey] = true;
				});
			});
		}
	}, {
		key: 'serializeList',
		value: function serializeList(key) {
			var _this6 = this;

			var list = [];

			Object.keys(this.nodes).forEach(function (value) {
				if (_this6.nodes[value][key]) {
					list.push(value);
				}
			});

			return list;
		}
	}, {
		key: 'isEveryChildChecked',
		value: function isEveryChildChecked(node) {
			var _this7 = this;

			return node.children.every(function (child) {
				if (child.children !== null) {
					return _this7.isEveryChildChecked(child);
				}

				return child.checked;
			});
		}
	}, {
		key: 'isSomeChildChecked',
		value: function isSomeChildChecked(node) {
			var _this8 = this;

			return node.children.some(function (child) {
				if (child.children !== null) {
					return _this8.isSomeChildChecked(child);
				}

				return child.checked;
			});
		}
	}, {
		key: 'renderTreeNodes',
		value: function renderTreeNodes(nodes) {
			var _this9 = this;

			var _props2 = this.props,
			    disabled = _props2.disabled,
			    expandDisabled = _props2.expandDisabled,
			    noCascade = _props2.noCascade,
			    optimisticToggle = _props2.optimisticToggle,
			    showNodeIcon = _props2.showNodeIcon;

			var treeNodes = nodes.map(function (node) {
				var key = '' + node.value;
				var checked = _this9.getCheckState(node, noCascade);
				var children = _this9.renderChildNodes(node);

				var nodeDisabled = !!(disabled || node.disabled);

				return _react2.default.createElement(
					_TreeNode2.default,
					{
						key: key,
						checked: checked,
						className: node.className,
						disabled: nodeDisabled,
						expandDisabled: expandDisabled,
						expanded: node.expanded,
						icon: node.icon,
						label: node.label,
						optimisticToggle: optimisticToggle,
						rawChildren: node.children,
						showNodeIcon: showNodeIcon,
						treeId: _this9.id,
						value: node.value,
						onCheck: _this9.onCheck,
						onExpand: _this9.onExpand
					},
					children
				);
			});

			return _react2.default.createElement(
				'ol',
				null,
				treeNodes
			);
		}
	}, {
		key: 'renderChildNodes',
		value: function renderChildNodes(node) {
			if (node.children !== null && node.expanded) {
				return this.renderTreeNodes(node.children);
			}

			return null;
		}
	}, {
		key: 'renderHiddenInput',
		value: function renderHiddenInput() {
			if (this.props.name === undefined) {
				return null;
			}

			if (this.props.nameAsArray) {
				return this.renderArrayHiddenInput();
			}

			return this.renderJoinedHiddenInput();
		}
	}, {
		key: 'renderArrayHiddenInput',
		value: function renderArrayHiddenInput() {
			var _this10 = this;

			return this.props.checked.map(function (value) {
				var name = _this10.props.name + '[]';

				return _react2.default.createElement('input', { key: value, name: name, type: 'hidden', value: value });
			});
		}
	}, {
		key: 'renderJoinedHiddenInput',
		value: function renderJoinedHiddenInput() {
			var checked = this.props.checked.join(',');

			return _react2.default.createElement('input', { name: this.props.name, type: 'hidden', value: checked });
		}
	}, {
		key: 'render',
		value: function render() {
			var nodes = this.getFormattedNodes(this.props.nodes);
			var treeNodes = this.renderTreeNodes(nodes);
			var className = (0, _classnames2.default)({
				'react-checkbox-tree': true,
				'rct-disabled': this.props.disabled
			});

			return _react2.default.createElement(
				'div',
				{ className: className },
				this.renderHiddenInput(),
				treeNodes
			);
		}
	}]);

	return CheckboxTree;
}(_react2.default.Component);

CheckboxTree.propTypes = {
	nodes: _propTypes2.default.arrayOf(_nodeShape2.default).isRequired,

	checked: _propTypes2.default.arrayOf(_propTypes2.default.string),
	disabled: _propTypes2.default.bool,
	expandDisabled: _propTypes2.default.bool,
	expanded: _propTypes2.default.arrayOf(_propTypes2.default.string),
	name: _propTypes2.default.string,
	nameAsArray: _propTypes2.default.bool,
	noCascade: _propTypes2.default.bool,
	optimisticToggle: _propTypes2.default.bool,
	showNodeIcon: _propTypes2.default.bool,
	onCheck: _propTypes2.default.func,
	onExpand: _propTypes2.default.func
};
CheckboxTree.defaultProps = {
	checked: [],
	disabled: false,
	expandDisabled: false,
	expanded: [],
	name: undefined,
	nameAsArray: false,
	noCascade: false,
	optimisticToggle: true,
	showNodeIcon: true,
	onCheck: function onCheck() {},
	onExpand: function onExpand() {}
};
exports.default = CheckboxTree;