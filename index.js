var falseFunc = require('boolbase').falseFunc;
var attribute = {
	'size': 'byte',
	'create-time': 'date',
	'modify-time': 'date'
};
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
				return attr != null && attr <= parse(attribute[name], value) && next(elem);
			};
		};
	};
	select.$attributes.gt = function (adapter) {
		return function (next, data) {
			var name = data.name,
				value = data.value;

			return function start(elem) {
				var attr = adapter.getAttributeValue(elem, name);
				return attr != null && attr >= parse(attribute[name], value) && next(elem);
			};
		};
	};
	function parse(type, value) {
		switch (type) {
			case 'byte': return parseSize(value);
			case 'date': return parseDate(value);
		}
	}
	function parseSize(value) {
		var match = value.match(/([0-9]+)(k|m|g)?/);
		var value = parseInt(match[1]), unit = match[2];
		switch (unit) {
			case 'k': value <<= 10; break;
			case 'm': value <<= 20; break;
			case 'g': value <<= 30; break;
		}
		return value;
	}
	function parseDate(value) {
		return new Date(value).valueOf();
	}
};
