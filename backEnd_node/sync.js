if (window.frontEndEnviromentNWJS) {


	Backbone.sync = function(method, model, options) {

	  function success(result) {
	    // Handle successful results from MyAPI
	    if (options.success) {
	      options.success(result);
	    }
	  }

	  function error(result) {
	    // Handle error results from MyAPI
	    if (options.error) {
	      options.error(result);
	    }
	  }
	
	  options || (options = {});

	  switch (method) {
	    case 'create':
	 	   // var api = new MyAPI();
	      // return api.create(model, success, error);
	      console.info("create")
	      console.log(model)
	      return model;

	    case 'update':
	    // var api = new MyAPI();
	      // return api.update(model, success, error);
	      console.info("Update")
	      console.log(model)
	      return model;

	    case 'patch':
	    // var api = new MyAPI();
	      // return api.patch(model, success, error);
	      console.info("Patch")
	      console.log(model)
	      return model;

	    case 'delete':
	    // var api = new MyAPI();
	      // return api.destroy(model, success, error);
	       console.info("Delete")
	       console.log(model)
	      return model;

	    case 'read':
	      // if (model.attributes[model.idAttribute]) {
	      //   return MyAPI.find(model, success, error);
	      // } else {
	      // 	var api = new MyAPI();
	        // return api.findAll(model, success, error);
	       console.info("Read")
	       console.log(model)
	       console.log(JSON.stringify(model))
	      console.log(model.toJSON())
	      return model;
	      // }
	  }

	}//	Backbone.sync 
}//frontEndEnviromentNWJS


