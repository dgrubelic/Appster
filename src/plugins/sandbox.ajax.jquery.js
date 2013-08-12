(function () {

	if (!Sandbox) return false;

	var request = function (config, success, error) {
		var url, 
			type = 'get', 
			dataType = 'html', 
			data = null,
			async = true;

		if (config.isType('string')) {
			url = config;

		} else if (!config.isType('object')) {
			return (error && error.call) ? error.call(Sandbox) : null;
		}

		if (config.url) 		url 		= config.url;
		if (config.type) 		type 		= config.type;
		if (config.dataType)	dataType 	= config.dataType;
		if (config.data)		data 		= config.data;
		
		if (undefined !== config.async) async = config.async;

		$.ajax({
			url: url,
			async: async,
			type: type,
			data: data,
			dataType: dataType,

			success: function(response) {
				if (success && success.apply) {
					success.apply(window, arguments);
				}
			},

			error: function () {
				if (error && error.apply) {
					error.apply(window, arguments);
				}
			}
		});
	};

	Sandbox.request = function () {
		request.apply(window, arguments);
	}

}.call(this));