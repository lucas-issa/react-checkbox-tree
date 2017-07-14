'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nodeShape = require('./nodeShape');

var _nodeShape2 = _interopRequireDefault(_nodeShape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeNode = function (_React$Component) {
	_inherits(TreeNode, _React$Component);

	function TreeNode(props) {
		_classCallCheck(this, TreeNode);

		var _this = _possibleConstructorReturn(this, (TreeNode.__proto__ || Object.getPrototypeOf(TreeNode)).call(this, props));

		_this.onCheck = _this.onCheck.bind(_this);
		_this.onExpand = _this.onExpand.bind(_this);
		return _this;
	}

	_createClass(TreeNode, [{
		key: 'onCheck',
		value: function onCheck() {
			var isChecked = false;

			// Toggle off state to checked
			if (this.props.checked === 0) {
				isChecked = true;
			}

			// Toggle partial state based on cascade model
			if (this.props.checked === 2) {
				isChecked = this.props.optimisticToggle;
			}

			this.props.onCheck({
				value: this.props.value,
				checked: isChecked,
				children: this.props.rawChildren
			});
		}
	}, {
		key: 'onExpand',
		value: function onExpand() {
			this.props.onExpand({
				value: this.props.value,
				expanded: !this.props.expanded
			});
		}
	}, {
		key: 'hasChildren',
		value: function hasChildren() {
			return this.props.rawChildren !== null;
		}
	}, {
		key: 'renderCollapseButton',
		value: function renderCollapseButton() {
			var expandDisabled = this.props.expandDisabled;


			if (!this.hasChildren()) {
				return _react2.default.createElement(
					'span',
					{ className: 'rct-collapse' },
					_react2.default.createElement('span', { className: 'rct-icon' })
				);
			}

			return _react2.default.createElement(
				'button',
				{
					'aria-label': 'Toggle',
					className: 'rct-collapse rct-collapse-btn',
					disabled: expandDisabled,
					title: 'Toggle',
					type: 'button',
					onClick: this.onExpand
				},
				this.renderCollapseIcon()
			);
		}
	}, {
		key: 'renderCollapseIcon',
		value: function renderCollapseIcon() {
			if (!this.props.expanded) {
				return _react2.default.createElement('span', { className: 'rct-icon rct-icon-expand-close' });
			}

			return _react2.default.createElement('span', { className: 'rct-icon rct-icon-expand-open' });
		}
	}, {
		key: 'renderCheckboxIcon',
		value: function renderCheckboxIcon() {
			if (this.props.checked === 0) {
				return _react2.default.createElement('span', { className: 'rct-icon rct-icon-uncheck' });
			}

			if (this.props.checked === 1) {
				return _react2.default.createElement('span', { className: 'rct-icon rct-icon-check' });
			}

			return _react2.default.createElement('span', { className: 'rct-icon rct-icon-half-check' });
		}
	}, {
		key: 'renderNodeIcon',
		value: function renderNodeIcon() {
			if (this.props.icon !== null) {
				return this.props.icon;
			}

			if (!this.hasChildren()) {
				return _react2.default.createElement('span', { className: 'rct-icon rct-icon-leaf' });
			}

			if (!this.props.expanded) {
				return _react2.default.createElement('span', { className: 'rct-icon rct-icon-parent-close' });
			}

			return _react2.default.createElement('span', { className: 'rct-icon rct-icon-parent-open' });
		}
	}, {
		key: 'renderChildren',
		value: function renderChildren() {
			if (!this.props.expanded) {
				return null;
			}

			return this.props.children;
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    checked = _props.checked,
			    className = _props.className,
			    disabled = _props.disabled,
			    treeId = _props.treeId,
			    label = _props.label,
			    showNodeIcon = _props.showNodeIcon,
			    value = _props.value;

			var inputId = treeId + '-' + value;
			var nodeClass = (0, _classnames2.default)({
				'rct-node': true,
				'rct-node-parent': this.hasChildren(),
				'rct-node-leaf': !this.hasChildren(),
				'rct-disabled': disabled
			}, className);

			return _react2.default.createElement(
				'li',
				{ className: nodeClass },
				_react2.default.createElement(
					'span',
					{ className: 'rct-text' },
					this.renderCollapseButton(),
					_react2.default.createElement(
						'label',
						{ htmlFor: inputId },
						_react2.default.createElement('input', {
							checked: checked === 1,
							disabled: disabled,
							id: inputId,
							type: 'checkbox',
							onChange: this.onCheck
						}),
						_react2.default.createElement(
							'span',
							{ className: 'rct-checkbox' },
							this.renderCheckboxIcon()
						),
						showNodeIcon ? _react2.default.createElement(
							'span',
							{ className: 'rct-node-icon' },
							this.renderNodeIcon()
						) : null,
						_react2.default.createElement(
							'span',
							{ className: 'rct-title' },
							label
						)
					)
				),
				this.renderChildren()
			);
		}
	}]);

	return TreeNode;
}(_react2.default.Component);

TreeNode.propTypes = {
	checked: _propTypes2.default.number.isRequired,
	disabled: _propTypes2.default.bool.isRequired,
	expandDisabled: _propTypes2.default.bool.isRequired,
	expanded: _propTypes2.default.bool.isRequired,
	label: _propTypes2.default.node.isRequired,
	optimisticToggle: _propTypes2.default.bool.isRequired,
	showNodeIcon: _propTypes2.default.bool.isRequired,
	treeId: _propTypes2.default.string.isRequired,
	value: _propTypes2.default.string.isRequired,
	onCheck: _propTypes2.default.func.isRequired,
	onExpand: _propTypes2.default.func.isRequired,

	children: _propTypes2.default.node,
	className: _propTypes2.default.string,
	icon: _propTypes2.default.node,
	rawChildren: _propTypes2.default.arrayOf(_nodeShape2.default)
};
TreeNode.defaultProps = {
	children: null,
	className: null,
	icon: null,
	rawChildren: null
};
exports.default = TreeNode;