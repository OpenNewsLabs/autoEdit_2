if (window.frontEndEnviromentNWJS) {
	var autoEdit2API = require("./autoEdit2API.js")

	Backbone.sync = autoEdit2API
}
