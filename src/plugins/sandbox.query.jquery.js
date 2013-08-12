(function () {

	if (!Sandbox) return false;

	var query = function () {
		return $.apply($, arguments);
	};

	Sandbox.query = query;

}.call(this));