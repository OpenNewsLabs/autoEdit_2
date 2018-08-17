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

	create_sequence_from_paper_edit: function(options){
		// alert(options);
		var options = JSON.parse(options);
		var paperEdit = options.edlJson;
		var sequenceName = options.edlJson.title;
		
	
		// alert(sequenceName);

		// Create sequence 
		// TODO: find out what's the role of sequence ID. eg does it have to be unique? can you retrieve sequences by ids
		var someID	= "xyz123";
		// OR Could get the name of the sequence 
		// var seqName = prompt('Name of sequence?', '+sequenceName+', 'Sequence Naming Prompt');
		
		// var seq = app.project.createNewSequence(sequenceName, someID);

		// OR could add to existing open sequence eg user could chose, add extra options. flag for this.
		var seq = app.project.activeSequence;

		var vTrack1 = seq.videoTracks[0];

		// TODO: data structure from  `getEDLJsonDataFromDom`
		// but cannot figure out why it arrives in reversed order here, it seems fine in EDL file creation
		// which uses same function 
		var clipEvents = paperEdit.events.reverse();
		
		// // find clips from paper-edit events in project panel browser
		// var clipsInProjectPanel = app.project.rootItem.children;
		// alert(JSON.stringify(paperEdit.events));
		for(var i=0;  i< clipEvents.length; i++ ){
			var papercut = clipEvents[i];
			// alert(JSON.stringify( papercut));
		
			// https://forums.adobe.com/thread/2455401
			var arrayOfProjectItemsReferencingSomePath = app.project.rootItem.findItemsMatchingMediaPath( papercut.clipName, 1);
			var clipInProjectPanel = arrayOfProjectItemsReferencingSomePath[0]
			
			// alert(JSON.stringify(clipInProjectPanel))
			// var first = app.project.rootItem.children[0];

			// alert(JSON.stringify(first));
			// var clipInProjectPanel = app.project.rootItem.children.find(function(clipsInProjectPanel) {
			// 	return clipsInProjectPanel.name ===  papercut.clipName;
			//   });

			clipInProjectPanel.setInPoint(parseFloat(papercut.startTime));
			clipInProjectPanel.setOutPoint(parseFloat(papercut.endTime));
			// insert clip sequence offset is in this format '00;00;00;00' edlJson offset is this format '00:00:28:08'
			
			var lastClipEndTime = '00;00;00;00';
			// first clip
			if(i===0){
				vTrack1.insertClip(clipInProjectPanel, '00;00;00;00');
				// TODO: might need to convert from seconds to `;` notation 
				
				// var first = app.project.rootItem.children[0];
				// var lastCLip = vTrack1.clips[vTrack1.clips.menuItems -1 ];
				// alert(JSON.stringify(clipInProjectPanel))
				// parseFlaot(papercut.startTime) + parseFloat(papercut.endTime)
				// lastClipEndTime = clipInProjectPanel.end.seconds;
				lastClipEndTime = parseFloat(papercut.endTime);
			}
			else {
				// alert(JSON.stringify(lastClipEndTime))
				// var lastClip = vTrack1.clips[vTrack1.clips.menuItems -1 ];
				// ALso if it doesn't work, might need to get the clip from the sequence
				// lastClipEndTime
				// alert(lastClipEndTime);
				// alert(fromSeconds(lastClipEndTime, 25));
				vTrack1.insertClip(clipInProjectPanel,  lastClipEndTime);		
			}
		}	
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
		// if nothing selected it returns an empty array
		var viewSelection = app.getProjectViewSelection(viewIDs[0]);
		// if something is selected 
		if(viewSelection.length !== 0){
			// path to selected media in 
			var selectionFilePath = viewSelection[0].getMediaPath();
			// checking that what is selected is same as transcription source file in autoEdit 
			// by comparing names if name match add to source monitor
		
			if(options.fileName === getFilenameFromPath(selectionFilePath) ){
				// load file in source monitor 
				app.sourceMonitor.openFilePath(selectionFilePath);
				playTc(options.timecode);
			
			}
			// if it is not it tries to see if it is present in the filePath
			// if the transctription source file does not match the file name of the selected file in source monitor
			else {
				// check if file exists . can we use fs?
				var filePath = new File(options.filePath);  
				if(filePath.exists){
					app.sourceMonitor.openFilePath(options.filePath);
					playTc(options.timecode);
				} 
				// if it is not present in either, returns error, file not found, add to project bin and try again.
				else{
					// if autoEdit original file path does not exist anymore 
					// alert message, file not present, add file to premiere bin. 
					alert('media file for this transcription not present, add file to premiere project panel');
					return 'file-not-found';
				} 
			}
		}
		// no clip selected in project panel  
		else{
			// see if file exists in project bin 
				// TODO: 

			// see if file exists on user's computer
			var filePath = new File(options.filePath);  
				if(filePath.exists){
					// TODO: add project to adobe project  
					// var tmpFilesToImpot = [];
					// tmpFilesToImpot.push(options.filePath)
					// app.project.importFiles(tmpFilesToImpot, 1, app.project.getInsertionBin(),0)
					
					app.sourceMonitor.openFilePath(options.filePath);
					playTc(options.timecode);
					return 'done'
				} 
				// if it is not present in either, returns error, file not found, add to project bin and try again.
				else{
					// if autoEdit original file path does not exist anymore 
					// alert message, file not present, add file to premiere bin. 
					alert('file not present on computer, add and select file to premiere project panel and try again');
					return 'file-not-found';
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