(function () {

	if (!Sandbox) return false;

	Sandbox.query = function () {
		return document.querySelectorAll.apply(document, arguments);
	}

}.call(this));