if (typeof($) == 'undefined') $ = {};
$._PPP = {
	say: function(something) {
		$.writeln(something); // output to ExtendScript Toolkit Console
		alert(something); // invoke a warning popup
		return "thanks"; // return a string back to JavaScript
	},

	create_sequence: function() {
		var someID	= "xyz123";
		var seqName = prompt('Name of sequence?',	 'Some Descriptive Name', 'Sequence Naming Prompt');
		app.project.createNewSequence(seqName, someID);
		return "done"
	},

	get_user_data_path: function(){
	//  alert(Folder.userData.fsName+"/autoEdit2");
	 return Folder.userData.fsName+"/autoEdit2";
	},

	open_file_in_source_monitor_and_play_if_present: function(options){
		var options = JSON.parse(options);
		// if the file is present in the project bin it loads it into source monitor from there
		var viewIDs = app.getProjectViewIDs(); 
		// sample code optimized for a single open project
		// getting selection in project panel 
		viewSelection = app.getProjectViewSelection(viewIDs[0]);
		if(viewSelection !== undefined){
			// path to selected media in 
			var selectionFilePath = viewSelection[0].getMediaPath();
			// checking against name
			if(options.fileName === getFilenameFromPath(selectionFilePath) ){
				// load file in source monitor 
				app.sourceMonitor.openFilePath(selectionFilePath);
				playTc(options.timecode);
			}
			// if it is not it tries to see if it is present in the filePath
			// if the transctription source file does not match the file name of the selected file in source monitor
			else {
				// check if file exists . can we use fs?
				var fileName = new File(options.fileName);  
				if(fileName.exists){
					app.sourceMonitor.openFilePath(options.fileName);
					playTc(options.timecode);
				} 
				// if it is not present in either, returns error, file not found, add to project bin and try again.
				else{
					// if autoEdit original file path does not exist anymore 
					// alert message, file not present, add file to premiere bin. 
					alert('file not present, add file to premiere project panel')
				} 
			}
		}
		// no clip selected in project panel  
		else{
			// see if file exists in project bin 
				// TODO: 

			// see if file exists on user's computer
			var fileName = new File(options.filePath);  
				if(fileName.exists){
					// add project to adobe project  
					var tmpFilesToImpot = [];
					tmpFilesToImpot.push(options.filePath)
					app.project.importFiles(tmpFilesToImpot, 1,app.project.getInsertionBin(),0)
					
					app.sourceMonitor.openFilePath(options.fileName);
					playTc(options.timecode);
				} 
				// if it is not present in either, returns error, file not found, add to project bin and try again.
				else{
					// if autoEdit original file path does not exist anymore 
					// alert message, file not present, add file to premiere bin. 
					alert('file not present, add file to premiere project panel')
				} 

		}
		
		function playTc(timecode){
			// enables the undocumented QE DOM which is necessary to control program monitor playback
			app.enableQE(); 
			// scrub source monitor to timecode  
			qe.source.player.startScrubbing();
			qe.source.player.scrubTo(String(timecode));
			qe.source.player.endScrubbing();
			// play 
			if(options.playBool){
				app.sourceMonitor.play(1.0);
			}
			return "done";
		}

		// TODO: repluce with node file path get name?
		function getFilenameFromPath(filePath){
			var filePathAr = filePath.split("/");
			var fileName = filePathAr[filePathAr.length-1];
			return fileName;
		}
	},

	get_current_project_panel_selection_absolute_path: function(){
		var viewIDs = app.getProjectViewIDs(); 
		// sample code optimized for a single open project
		viewSelection = app.getProjectViewSelection(viewIDs[0]);
		if(viewSelection === undefined){
			alert('Select a video or audio file from the Project Panel');
			return "";
		}else{
			// get string with absolute path to media file
		return viewSelection[0].getMediaPath();
		}
	},
	
	open_file_in_source_monitor_using_path: function(filePath){
		app.sourceMonitor.openFilePath(filePath);
		return "done"
	},

	open_current_project_panel_selection_in_source_monitor: function(){
		var viewIDs = app.getProjectViewIDs(); 
		// sample code optimized for a single open project
		viewSelection = app.getProjectViewSelection(viewIDs[0]);
		// get string with absolute path to media file
		var filePath = viewSelection[0].getMediaPath();
		app.sourceMonitor.openFilePath(filePath);
		return "done";
	},

	// pos is in the format of seconds.frames (e.g. 10.5 is 10 seconds, 5 frames) or in timecode ('00;00;10;05')
	// This might be a useful reference: https://forums.adobe.com/thread/2420603
	set_source_pos: function(options){
		var options = JSON.parse(options);
		// var options = JSON.parse(options);
		app.enableQE(); // enables the undocumented QE DOM which is necessary to control program monitor playback
		qe.source.player.startScrubbing();
		qe.source.player.scrubTo(String(options.pos));
		qe.source.player.endScrubbing();
		// if(playBool){
		app.sourceMonitor.play(1.0);
		// }
		return "done";
	},

	traverse_project_items: function() {
		if (!app.project.rootItem) return "rootItem is not available";

		var file_paths = [];
		// breadth first traversal
		var stack  = [app.project.rootItem];
		while (stack.length > 0) {
			var item = stack.shift();
			if (item === undefined || item.children === undefined || item.children.numItems < 1) continue;
			var numChildren = item.children.numItems;
			for (var i = 0; i < numChildren; i++) {
				var child = item.children[i];
				switch (child.type) {
					case ProjectItemType.CLIP:
					case ProjectItemType.FILE:
						var file_path = child.getMediaPath();
						if (file_path && file_path.length > 0) {
							file_paths.push('"'+encodeURIComponent(file_path)+'"');
						}
						// do something with the file_path
						break;
					case ProjectItemType.BIN:
						stack.push(child);
						break;
				} // switch end
			}
		}
		var result = '['+file_paths.join(", ")+']';
		return result;
	},



}