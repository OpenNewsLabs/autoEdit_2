	if (window.frontEndEnviromentNWJS) {

		var fs = require("fs");
		var LinvoDB = require("linvodb3");
		//https://github.com/Ivshti/linvodb3
		LinvoDB.defaults.store = { db: require("level-js") };
		var modelName = "transcription";
		var schema = { }; // Non-strict always, can be left empty
		var options = { };
		var Transcription = new LinvoDB(modelName, schema, options); // New model; Doc is the constructor
		LinvoDB.dbPath = process.cwd() //+"/backEnd_node/db"; 
		console.log("DB PATH")
		console.log(process.cwd())
		console.log(LinvoDB.dbPath)


	// from https://www.safaribooksonline.com/library/view/developing-backbonejs-applications/9781449328535/ch03.html#backbones-sync-api
	//http://backbonejs.org/#Sync 

	var MyAPI = function (){ };


	/**
	* Create 
	*/
	MyAPI.prototype.create = function(model, success, error){

		console.log(model)
		console.log(model.attributes)
		var newElement = model.toJSON();
		
		var transcription = new Transcription(newElement);

		transcription.save(function(err) { 
	    	// Document is saved
	    	console.log(transcription._id);
		});


		console.log(process.cwd())

	var meta;



	var InteractiveTranscriptionGenerator = require(process.cwd()+"/backEnd_node/interactive_transcription_generator/index.js");


	var iTg = new InteractiveTranscriptionGenerator();

	iTg.generate({
		videoUrl: newElement.videoUrl,
		title: newElement.title,
		description: newElement.description, 
		//TODO: this is hardcoded, and this variable is not used, fix me!
		tmpWorkFolder:"/",
		destFolder:"/media",
		keys: global.keys,
		languageModel: newElement.languageModel,
		sttEngine: newElement.sttEngine,

		cbMetadata:function(respM){

			console.log("RESP")
			console.log(respM)
			meta = respM;

		 // Transcription.findOne({ _id: transcription.id }, function (err, transcription) {
		
			  transcription.metadata = respM;
			   transcription.save(function(err) { /* we have updated the Earth doc */ }); 
			// });

		},
		cbTranscription: function(resp){

			 // Transcription.findOne({ _id: transcription.id }, function (err, transcription) {
			  // doc is the document Mars
			  // If no document is found, doc is null
			  transcription.audioFile = resp.audioFile;
			  transcription.processedAudio = resp.processedAudio;
			  transcription.text = resp.text;
			  transcription.status = resp.status;

			  transcription.save(function(err) { /* we have updated the Earth doc */ }); 
			// });

		}, 
		cbVideo: function(resp){

			 // Transcription.findOne({ _id: transcription.id }, function (err, transcription) {
			  // doc is the document Mars
			  // If no document is found, doc is null
			  console.log(resp.videoOgg)
			  transcription.videoOgg = resp.videoOgg;
			  transcription.processedVideo = resp.processedVideo;
			  
			  transcription.save(function(err) { /* we have updated the Earth doc */ }); 
			// });

		}
	})

		success(model);
	}

	/**
	* Read - Find all   
	*/
	MyAPI.prototype.findAll = function(model, success, error){

		console.log("model")

		Transcription.find({}, function (err, transcriptions) {
			console.log(transcriptions)
			success(transcriptions);
		});
	}

	/**
	* Read - Find One - NOT in use    
	*/
	// MyAPI.find = function(model, success, error){

	// 		 Transcription.findOne({ _id: model._id }, function (err, transcription) {
			
	// 		  success(transcription)
			 
	// 		});
	// }


	/**
	* Update 
	*/
	MyAPI.prototype.update = function(model, success, error){

			console.info("ABOUT TO UPDATING/SAVING")
			var startTime = Date.now()
			console.log(model.toJSON())

			  Transcription.findOne({ _id: model.get("_id") }, function(err, doc) {
				    // doc.inhabited = false;

				    //TODO: there's got to be a better way to do this
				    doc.text 				= model.attributes.text;
				    doc.languageModel 		= model.attributes.languageModel;
				    doc.counterForPaperCuts = model.attributes.counterForPaperCuts;
				    doc.processedAudio	   	= model.attributes.processedAudio;
				    doc.processedVideo		= model.attributes.processedVideo;
				    doc.status				= model.attributes.status;
				    doc.highlights			= model.attributes.highlights;
				    doc.title				= model.attributes.title;
				    doc.videoUrl			= model.attributes.videoUrl;
				    doc.sttEngine			= model.attributes.sttEngine
				    doc.audioFile			= model.attributes.audioFile;
				    doc.metadata 			= model.attributes.metadata;
				    // doc.text = model.attributes.text;

				    doc.save(function(err) { 
				    	/* we have updated the Earth doc */ 
				    	success(model);
				    }); 
				});

	}

	/**
	* Update/patch 
	*/
	MyAPI.prototype.patch = function(model, success, error){

		console.log('about to patch')
		console.log(model.toJSON())

		  Transcription.findOne({ _id: model.get("_id") }, function(err, doc) {
		    // doc.inhabited = false;

		    //TODO: there's got to be a better way to do this
		    doc.text 				= model.attributes.text;
		    doc.languageModel 		= model.attributes.languageModel;
		    doc.counterForPaperCuts = model.attributes.counterForPaperCuts;
		    doc.processedAudio	   	= model.attributes.processedAudio;
		    doc.processedVideo		= model.attributes.processedVideo;
		    doc.status				= model.attributes.status;
		    doc.highlights			= model.attributes.highlights;
		    doc.title				= model.attributes.title;
		    doc.videoUrl			= model.attributes.videoUrl;
		    doc.sttEngine			= model.attributes.sttEngine
		    doc.audioFile			= model.attributes.audioFile;
		    doc.metadata 			= model.attributes.metadata;
		    // doc.text = model.attributes.text;

		    doc.save(function(err) { 
		    	/* we have updated the Earth doc */ 
		    	success(model);
		    }); 
		});
	}

	/**
	* Destroy  
	*/
	MyAPI.prototype.destroy = function(model, success, error){
		console.log("DELETE SYNC")

		Transcription.findOne(model._id, function(err, transcription) {

		    transcription.remove(function() {
		        // done
		    	success(model)
		    }); 
		});



	}

	//////////
	 var api = new MyAPI();
	 /////////

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

		console.log('about to sync')


	///////////////////////////////////////////////////
	  options || (options = {});

	  switch (method) {
	    case 'create':
	 	   // var api = new MyAPI();
	      return api.create(model, success, error);

	    case 'update':
	    // var api = new MyAPI();
	      return api.update(model, success, error);

	    case 'patch':
	    // var api = new MyAPI();
	      return api.patch(model, success, error);

	    case 'delete':
	    // var api = new MyAPI();
	      return api.destroy(model, success, error);

	    case 'read':
	      // if (model.attributes[model.idAttribute]) {
	      //   return MyAPI.find(model, success, error);
	      // } else {
	      	// var api = new MyAPI();
	        return api.findAll(model, success, error);
	      // }
	  }

	};
	}//frontEndEnviromentNWJS


