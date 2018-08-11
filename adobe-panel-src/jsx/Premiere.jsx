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

	set_source_pos: function(pos){
		// pos is in the format of seconds.frames (e.g. 10.5 is 10 seconds, 5 frames) or in timecode ('00;00;10;05')
		// This might be a useful reference: https://forums.adobe.com/thread/2420603
		
		app.enableQE(); // enables the undocumented QE DOM which is necessary to control program monitor playback
		qe.source.player.startScrubbing();
		qe.source.player.scrubTo(String(pos));
		qe.source.player.endScrubbing();

		// app.sourceMonitor.play(1.0)
		// $.sleep(3000);
		// qe.source.player.endScrubbing();
		// app.sourceMonitor.closeClip();

		// var activeSequence	= qe.project.getActiveSequence(); 	// note: make sure a sequence is active in PPro UI
		// if (activeSequence) {
		// 	activeSequence.player.startScrubbing();
		// 	activeSequence.player.scrubTo(String(pos));
		// 	activeSequence.player.endScrubbing();

		// 	// Alternate
		// 	// app.project.activeSequence.setPlayerPosition(pos * 254016000000) // would not be able to use the same pos without parsing as this will assume its a float vs the seconds.frames format


		// 	// app.sourceMonitor.play(1.0)
		// 	// $.sleep(3000);
		// 	// app.sourceMonitor.closeClip();

		// } else {
		// 	$._PPP_.updateEventPanel("No active sequence.");
		// }

		// user data path 
		// alert(Folder.userData.fsName);
		return "done"

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