(function () {
	if (!Application) return false;

	/*
	Load application required scripts and modules.

	Currently supported format for loading modules is:

	{
	  'module_name': 'module_url',
	  'module_dependency': {
	    'url': 'module_url',
	    'async': true,
	    'callback': function () {}
	  }
	}
	*/
	Application.load = function (loadModules) {
		if (!loadModules.isType('object')) {
		  return false;
		}

		var head = document.querySelector('head');

		for (var moduleId in loadModules) {
		  if (loadModules.hasOwnProperty(moduleId)) {
		    var module  = loadModules[moduleId],
		      url, async = false, callback;

		    if (module.isType('string')) {
		      url = module;
		    } else if (module.isType('object')) {
		      if (module.url) {
		        url = module.url;
		      }

		      if (module.async) {
		        async = module.async;
		      }

		      if (module.callback) {
		        callback = module.callback;
		      }
		    }

		    if (url && !core.isLoaded(url)) {
		      core.debug('Loading module "' + moduleId + '" (' + url + ').');

		      var script = document.createElement('script');
		      script.src    = url;
		      script.async  = async;
		      script.type   = 'text/javascript';
		      
		      if (callback && callback.call) {
		        script.onload = callback;
		      }

		      head.appendChild(script);

		      scripts[moduleId] = url;
		    } // Load module
		  }
		}
	};
});