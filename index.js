var falseFunc = require('boolbase').falseFunc;
module.exports = function (what, select) {
	what.actionTypes['<'] = 'lt';
	what.actionTypes['>'] = 'gt';
	select.$attributes = select.$attributes || {};
	select.$attributes.lt = function (adapter) {
		return function (next, data) {
			var name = data.name,
				value = data.value;
			
			return function start(elem) {
				var attr = adapter.getAttributeValue(elem, name);
				return attr != null && attr <= parseInt(value) && next(elem);
			};
		};
	};
	select.$attributes.gt = function (adapter) {
		return function (next, data) {
			var name = data.name,
				value = data.value;
			
			return function start(elem) {
				var attr = adapter.getAttributeValue(elem, name);
				return attr != null && attr >= parseInt(value) && next(elem);
			};
		};
	};
};
