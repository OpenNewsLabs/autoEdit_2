var VideoCompositor =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	//Matthew Shotton, R&D User Experince,© BBC 2015

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _sourcesVideosourceJs = __webpack_require__(1);

	var _sourcesVideosourceJs2 = _interopRequireDefault(_sourcesVideosourceJs);

	var _sourcesImagesourceJs = __webpack_require__(3);

	var _sourcesImagesourceJs2 = _interopRequireDefault(_sourcesImagesourceJs);

	var _sourcesCanvassourceJs = __webpack_require__(4);

	var _sourcesCanvassourceJs2 = _interopRequireDefault(_sourcesCanvassourceJs);

	var _effectmanagerJs = __webpack_require__(5);

	var _effectmanagerJs2 = _interopRequireDefault(_effectmanagerJs);

	var _audiomanagerJs = __webpack_require__(7);

	var _audiomanagerJs2 = _interopRequireDefault(_audiomanagerJs);

	var updateables = [];
	var previousTime = undefined;
	var mediaSourceMapping = new Map();
	mediaSourceMapping.set("video", _sourcesVideosourceJs2["default"]).set("image", _sourcesImagesourceJs2["default"]).set("canvas", _sourcesCanvassourceJs2["default"]);

	function registerUpdateable(updateable) {
	    updateables.push(updateable);
	}
	function update(time) {
	    if (previousTime === undefined) previousTime = time;
	    var dt = (time - previousTime) / 1000;
	    for (var i = 0; i < updateables.length; i++) {
	        updateables[i]._update(dt);
	    }
	    previousTime = time;
	    requestAnimationFrame(update);
	}
	update();

	var VideoCompositor = (function () {
	    /**
	    * Instantiate the VideoCompositor using the passed canvas to render too.
	    *
	    * You can also pass an AudioContext for use when calling getAudioNodeForTrack. If one is not provided a context will be created internally and be accessible via the getAudioContext function.
	    *
	    * @param {Canvas} canvas - The canvas element to render too.
	    * @param {AudioContext} audioCtx - The AudioContext to create AudioNode's with.
	    * 
	    * @example
	    * 
	    * var canvas = document.getElementById('canvas');
	    * var audioCtx = new AudioContext();
	    * var videoCompositor = new VideoCompositor(canvas, audioCtx);
	    */

	    function VideoCompositor(canvas, audioCtx) {
	        _classCallCheck(this, VideoCompositor);

	        this._canvas = canvas;
	        this._ctx = this._canvas.getContext("experimental-webgl", { preserveDrawingBuffer: true, alpha: false });
	        this._playing = false;
	        this._mediaSources = new Map();
	        //this._mediaSourcePreloadNumber = 4; // define how many mediaSources to preload. This is influenced by the number of simultaneous AJAX requests available.
	        this._mediaSourcePreloadLookaheadTime = 10; // define how far into the future to load mediasources.
	        this._mediaSourcePostPlayLifetime = 0; // set how long until after a media source has finished playing to keep it around.
	        this._playlist = undefined;
	        this._eventMappings = new Map();
	        this._mediaSourceListeners = new Map();
	        this._max_number_of_textures = this._ctx.getParameter(this._ctx.MAX_TEXTURE_IMAGE_UNITS);

	        this._effectManager = new _effectmanagerJs2["default"](this._ctx);
	        this._audioManger = new _audiomanagerJs2["default"](audioCtx);

	        this._currentTime = 0;
	        this._playbackRate = 1.0;
	        this.duration = 0;
	        registerUpdateable(this);
	    }

	    /**
	    * Sets how far in the future to look for preloading mediasources.
	    */

	    _createClass(VideoCompositor, [{
	        key: "play",

	        /**
	        * Play the playlist. If a pause() has been called previously playback will resume from that point.
	        * @example
	        * 
	        * var playlist = {
	        *   tracks:[
	        *       [{type:"video", start:0, duration:4, src:"video1.mp4", id:"video1"},{type:"video", start:4, duration:4, src:"video2.mp4", id:"video2"}]
	        *   ]
	        * }
	        * var canvas = document.getElementById('canvas');
	        * var videoCompositor = new VideoCompositor(canvas);
	        * videoCompositor.playlist = playlist;
	        * videoCompositor.play();
	        */
	        value: function play() {
	            this._playing = true;
	            this._ctx.clearColor(0.0, 0.0, 0.0, 1.0);
	            this._ctx.clear(this._ctx.COLOR_BUFFER_BIT | this._ctx.DEPTH_BUFFER_BIT);
	            var playEvent = new CustomEvent('play', { detail: { data: this._currentTime, instance: this } });
	            this._canvas.dispatchEvent(playEvent);
	        }

	        /**
	        * Pause playback of the playlist. Call play() to resume playing.
	        * @example
	        * 
	        * var playlist = {
	        *   tracks:[
	        *       [{type:"video", start:0, duration:4, src:"video1.mp4", id:"video1"},{type:"video", start:4, duration:4, src:"video2.mp4", id:"video2"}]
	        *   ]
	        * }
	        * var canvas = document.getElementById('canvas');
	        * var videoCompositor = new VideoCompositor(canvas);
	        * videoCompositor.playlist = playlist;
	        * videoCompositor.play();
	        * 
	        * setTimeout(videoCompositor.pause, 3000); //pause after 3 seconds
	        *
	        */
	    }, {
	        key: "pause",
	        value: function pause() {
	            this._playing = false;
	            this._mediaSources.forEach(function (mediaSource) {
	                mediaSource.pause();
	            });
	            var pauseEvent = new CustomEvent('pause', { detail: { data: this._currentTime, instance: this } });
	            this._canvas.dispatchEvent(pauseEvent);
	        }

	        /**
	        * This adds event listeners to the video compositor. Events directed at the underlying canvas are transparently 
	        * passed through, While events that target a video like element are handled within the VideoCompositor. Currently 
	        * the VideoCompositor only handles a limited number of video like events ("play", "pause", "ended").
	        * 
	        * @param {String} type - The type of event to listen to.
	        * @param {Function} func - The Function to be called for the given event.
	        * @example
	        * 
	        * var playlist = {
	        *   tracks:[
	        *       [{type:"video", start:0, duration:4, src:"video1.mp4", id:"video1"},{type:"video", start:4, duration:4, src:"video2.mp4", id:"video2"}]
	        *   ]
	        * }
	        * var canvas = document.getElementById('canvas');
	        * var videoCompositor = new VideoCompositor(canvas);
	        * videoCompositor.playlist = playlist;
	        * 
	        * videoCompositor.addEventListener("play", function(){console.log("Started playing")});
	        * videoCompositor.addEventListener("pause", function(){console.log("Paused")});
	        * videoCompositor.addEventListener("ended", function(){console.log("Finished playing")});
	        * 
	        * videoCompositor.play();
	        * 
	        *
	        */
	    }, {
	        key: "addEventListener",
	        value: function addEventListener(type, func) {
	            //Pass through any event listeners through to the underlying canvas rendering element
	            //Catch any events and handle with a custom events dispatcher so things
	            if (this._eventMappings.has(type)) {
	                this._eventMappings.get(type).push(func);
	            } else {
	                this._eventMappings.set(type, [func]);
	            }
	            this._canvas.addEventListener(type, this._dispatchEvents, false);
	        }

	        /**
	        * This removes event listeners from the video compositor that were added using addEventListener. 
	        * 
	        * @param {String} type - The type of event to remove.
	        * @param {Function} func - The Function to be removed for the given event.
	        * @example
	        * 
	        * var playlist = {
	        *   tracks:[
	        *       [{type:"video", start:0, duration:4, src:"video1.mp4", id:"video1"},{type:"video", start:4, duration:4, src:"video2.mp4", id:"video2"}]
	        *   ]
	        * }
	        * var canvas = document.getElementById('canvas');
	        * var videoCompositor = new VideoCompositor(canvas);
	        * videoCompositor.playlist = playlist;
	        * 
	        * var playingCallback = function(){console.log("playing");};
	        * videoCompositor.addEventListener("play", playingCallback);
	        * 
	        * videoCompositor.play();
	        * 
	        * videoCompositor.removeEventListener("play", playingCallback);
	        *
	        */
	    }, {
	        key: "removeEventListener",
	        value: function removeEventListener(type, func) {
	            if (this._eventMappings.has(type)) {
	                var listenerArray = this._eventMappings.get(type);
	                var listenerIndex = listenerArray.indexOf(func);
	                if (listenerIndex !== -1) {
	                    listenerArray.splice(listenerIndex, 1);
	                    return true;
	                }
	            }
	            return false;
	        }

	        /**
	        * This method allows you to create a listeners for events on a specific MediaSource.
	        *
	        * To use this you must pass an object which has one or more the following function properties: play, pause, seek, 
	        * isReady, load, destroy, render.
	        *
	        * These functions get called when the correspoinding action on the MediaSource happen. In the case of the render 
	        * listener it will be called every time a frame is drawn so the function should aim to return as quickly as possible 
	        * to avoid hanging the render loop.
	        * 
	        * The use-case for this is synchronising external actions to a specfic media source, such as subtitle rendering or 
	        * animations on a canvasMediaSource.
	        * 
	        * The listeners get passed a reference to the internal MediaSource object and somtimes extra data relevant to that 
	        * sepcific actions function ("seek" gets the time seeking too, "render" gets the shaders rendering parameters).
	        *
	        * @param {String} mediaSourceID - The id of the MediaSource to listen to.
	        * @param {Object} mediaSourceListener - An Object implementing listener functions.
	        * @example
	        * 
	        * var playlist = {
	        *   tracks:[
	        *       [{type:"video", start:0, duration:4, src:"video1.mp4", id:"video1"}]
	        *   ]
	        * }
	        * var canvas = document.getElementById('canvas');
	        * var videoCompositor = new VideoCompositor(canvas);
	        * videoCompositor.playlist = playlist;
	        * 
	        * var videoListener = {
	        *     render: function(mediaSource, renderParameters){
	        *         //This will get called every frame.
	        *         var time = renderParameters.progress * mediaSource.duration;
	        *         console.log('Progress through ID', mediaSource.id, ':', time);
	        *     },
	        *     seek:function(mediaSource, seekTime){
	        *         //This function will get called on seek
	        *         console.log("Seeking ID", mediaSource.id, "to :", seekTime);
	        *     },
	        *     play:function(mediaSource){
	        *         //This function will get called on play
	        *         console.log("Plating ID", mediaSource.id);
	        *     },
	        * }
	        *
	        * videoCompositor.registerMediaSourceListener("video1", videoListener);
	        * videoCompositor.play();
	        *
	        */
	    }, {
	        key: "registerMediaSourceListener",
	        value: function registerMediaSourceListener(mediaSourceID, mediaSourceListener) {
	            if (this._mediaSourceListeners.has(mediaSourceID)) {
	                this._mediaSourceListeners.get(mediaSourceID).push(mediaSourceListener);
	            } else {
	                this._mediaSourceListeners.set(mediaSourceID, [mediaSourceListener]);
	            }
	        }

	        /**
	        * This method allows you to remove a listener from a specific MediaSource.
	        *
	        * To use this you must pass in an object which has already been registered using registerMediaSourceListener,
	        * @param {String} mediaSourceID - The id of the MediaSource to remove the listener from.
	        * @param {Object} mediaSourceListener - An Object that has been previously passed in via registerMediaSourceListener. 
	        */
	    }, {
	        key: "unregisterMediaSourceListener",
	        value: function unregisterMediaSourceListener(mediaSourceID, mediaSourceListener) {
	            if (!this._mediaSourceListeners.has(mediaSourceID)) {
	                return false;
	            } else {
	                var listenerArray = this._mediaSourceListeners.get(mediaSourceID);

	                var index = listenerArray.indexOf(mediaSourceListener);
	                if (index > -1) {
	                    listenerArray.splice(index, 1);
	                }

	                if (this._mediaSources.has(mediaSourceID)) {
	                    var mediaSourceListnerArray = this._mediaSources.get(mediaSourceID).mediaSourceListeners;
	                    index = mediaSourceListnerArray.indexOf(mediaSourceListener);
	                    if (index > -1) {
	                        mediaSourceListnerArray.splice(index, 1);
	                    }
	                }
	                return true;
	            }
	        }

	        /**
	        * Returns the audio context that was either passed into the constructor or created internally.
	        * @example <caption>Getting an audio context that was passed in</caption>
	        * var audioCtx = new AudioContext();
	        * var videoCompositor = new VideoCompositor(canvas, audioCtx);
	        * 
	        * var returnedAudioContext = videoCompositor.getAudioContext();
	        *
	        * //returnedAudioContext and audiotCtx are the same object.
	        * 
	        * @example <caption>Getting an AudioContext created internally</caption>
	        * var videoCompositor = new VideoCompositor(canvas); //Don't pass in an audio context
	        *
	        * var audioCtx = videoCompositor.getAudioContext();
	        * //audioCtx was created inside the VideoCompositor constructor
	        *
	        * @return {AudioContext} The audio context used to create any nodes required by calls to getAudioNodeForTrack
	        */
	    }, {
	        key: "getAudioContext",
	        value: function getAudioContext() {
	            return this._audioManger.getAudioContext();
	        }

	        /**
	        * Starts the underlying video/image elements pre-loading. Behavior is not guaranteed and depends on how the browser treats video pre-loading under the hood.
	        * @example <caption>Start a playlist pre-loading so it starts playing quicker</caption>
	        * var videoCompositor = new VideoCompositor(canvas);
	        * videoCompositor.playlist = {
	        *   tracks:[
	        *       [{type:"video", start:0, duration:4, src:"video1.mp4", id:"video1"}]
	        *   ]
	        * }
	        * videoCompositor.preload();
	        * //now when play is called is should start quicker.
	        */
	    }, {
	        key: "preload",
	        value: function preload() {
	            this._playing = true;
	            this._update(0.0);
	            this._playing = false;
	        }

	        /**
	        * Gets an audio bus for the given playlist track.
	        *
	        * In some instances you may want to feed the audio output of the media sources from a given track into a web audio API context. This function provides a mechanism for acquiring an audio GainNode which represents a "bus" of a given track.
	        *
	        * Note: In order for the media sources on a track to play correctly once you have an AudioNode for the track you must connect the Audio Node to the audio contexts destination (even if you want to mute them you must set the gain to 0 then connect them to the output).
	        * @example <caption>Muting all videos on a single track</caption>
	        * 
	        * var playlist = {
	        *   tracks:[
	        *       [{type:"video", start:0, duration:4, src:"video1.mp4", id:"video1"},{type:"video", start:4, duration:4, src:"video2.mp4", id:"video2"}]
	        *   ]
	        * }
	        * 
	        * var audioCtx = new AudioContext();
	        * var canvas = document.getElementById("canvas");
	        * var videoCompositor = new VideoCompositor(canvas, audioCtx);
	        * videoCompositor.playlist = playlist;
	        * var trackGainNode = videoCompositor.getAudioNodeForTrack(playlist.tracks[0]);
	        * trackGainNode.gain.value = 0.0; // Mute the track
	        * 
	        * @param {Array} track - this is track which consist of an array object of MediaSourceReferences (typically a track from a playlist object).
	        * @return {GainNode} this is a web audio GainNode which has the output of any audio producing media sources from the passed track played out of it.
	        */
	    }, {
	        key: "getAudioNodeForTrack",
	        value: function getAudioNodeForTrack(track) {
	            var audioNode = this._audioManger.createAudioNodeFromTrack(track);
	            return audioNode;
	        }
	    }, {
	        key: "_dispatchEvents",
	        value: function _dispatchEvents(evt) {
	            //Catch events and pass them on, mangling the detail property so it looks nice in the API
	            for (var i = 0; i < evt.detail.instance._eventMappings.get(evt.type).length; i++) {
	                evt.detail.instance._eventMappings.get(evt.type)[i](evt.detail.data);
	            }
	        }
	    }, {
	        key: "_getPlaylistPlayingStatusAtTime",
	        value: function _getPlaylistPlayingStatusAtTime(playlist, playhead) {
	            var toPlay = [];
	            var currentlyPlaying = [];
	            var finishedPlaying = [];

	            //itterate tracks
	            for (var i = 0; i < playlist.tracks.length; i++) {
	                var track = playlist.tracks[i];
	                for (var j = 0; j < track.length; j++) {
	                    var segment = track[j];
	                    var segmentEnd = segment.start + segment.duration;

	                    if (playhead > segmentEnd) {
	                        finishedPlaying.push(segment);
	                        continue;
	                    }
	                    if (playhead > segment.start && playhead < segmentEnd) {
	                        currentlyPlaying.push(segment);
	                        continue;
	                    }
	                    if (playhead <= segment.start) {
	                        toPlay.push(segment);
	                        continue;
	                    }
	                }
	            }

	            return [toPlay, currentlyPlaying, finishedPlaying];
	        }
	    }, {
	        key: "_sortMediaSourcesByStartTime",
	        value: function _sortMediaSourcesByStartTime(mediaSources) {
	            mediaSources.sort(function (a, b) {
	                return a.start - b.start;
	            });
	            return mediaSources;
	        }
	    }, {
	        key: "_loadMediaSource",
	        value: function _loadMediaSource(mediaSourceReference, onReadyCallback) {
	            if (onReadyCallback === undefined) onReadyCallback = function () {};
	            var mediaSourceListeners = [];
	            if (this._mediaSourceListeners.has(mediaSourceReference.id)) {
	                mediaSourceListeners = this._mediaSourceListeners.get(mediaSourceReference.id);
	            }

	            var MediaSourceClass = mediaSourceMapping.get(mediaSourceReference.type);
	            if (MediaSourceClass === undefined) {
	                throw { "error": 5, "msg": "mediaSourceReference " + mediaSourceReference.id + " has unrecognized type " + mediaSourceReference.type, toString: function toString() {
	                        return this.msg;
	                    } };
	            }
	            var mediaSource = new MediaSourceClass(mediaSourceReference, this._ctx);
	            mediaSource.onready = onReadyCallback;
	            mediaSource.mediaSourceListeners = mediaSourceListeners;
	            mediaSource.load();
	            this._mediaSources.set(mediaSourceReference.id, mediaSource);
	        }
	    }, {
	        key: "_calculateMediaSourcesOverlap",
	        value: function _calculateMediaSourcesOverlap(mediaSources) {
	            var maxStart = 0.0;
	            var minEnd = undefined;
	            //calculate max start time
	            for (var i = 0; i < mediaSources.length; i++) {
	                var mediaSource = mediaSources[i];
	                if (mediaSource.start > maxStart) {
	                    maxStart = mediaSource.start;
	                }
	                var end = mediaSource.start + mediaSource.duration;
	                if (minEnd === undefined || end < minEnd) {
	                    minEnd = end;
	                }
	            }
	            return [maxStart, minEnd];
	        }
	    }, {
	        key: "_calculateActiveTransitions",
	        value: function _calculateActiveTransitions(currentlyPlaying, currentTime) {
	            if (this._playlist === undefined || this._playing === false) return [];
	            if (this._playlist.transitions === undefined) return [];

	            //Get the currently playing ID's
	            var currentlyPlayingIDs = [];
	            for (var i = 0; i < currentlyPlaying.length; i++) {
	                currentlyPlayingIDs.push(currentlyPlaying[i].id);
	            }

	            var activeTransitions = [];

	            //Get the transitions whose video sources are currently playing

	            var transitionKeys = Object.keys(this._playlist.transitions);
	            for (var i = 0; i < transitionKeys.length; i++) {
	                var transitionID = transitionKeys[i];

	                var transition = this._playlist.transitions[transitionID];
	                var areInputsCurrentlyPlaying = true;
	                for (var j = 0; j < transition.inputs.length; j++) {
	                    var id = transition.inputs[j];
	                    if (currentlyPlayingIDs.indexOf(id) === -1) {
	                        areInputsCurrentlyPlaying = false;
	                        break;
	                    }
	                }
	                if (areInputsCurrentlyPlaying) {
	                    var activeTransition = { transition: transition, transitionID: transitionID, mediaSources: [] };

	                    for (var j = 0; j < transition.inputs.length; j++) {
	                        activeTransition.mediaSources.push(this._mediaSources.get(transition.inputs[j]));
	                    }

	                    activeTransitions.push(activeTransition);
	                }
	            }

	            //Calculate the progress through the transition
	            for (var i = 0; i < activeTransitions.length; i++) {
	                var mediaSources = activeTransitions[i].mediaSources;

	                var _calculateMediaSourcesOverlap2 = this._calculateMediaSourcesOverlap(mediaSources);

	                var _calculateMediaSourcesOverlap22 = _slicedToArray(_calculateMediaSourcesOverlap2, 2);

	                var overlapStart = _calculateMediaSourcesOverlap22[0];
	                var overlapEnd = _calculateMediaSourcesOverlap22[1];

	                var progress = (currentTime - overlapStart) / (overlapEnd - overlapStart);
	                activeTransitions[i].progress = progress;
	            }

	            return activeTransitions;
	        }
	    }, {
	        key: "_update",
	        value: function _update(dt) {
	            if (this._playlist === undefined || this._playing === false) return;

	            var _getPlaylistPlayingStatusAtTime2 = this._getPlaylistPlayingStatusAtTime(this._playlist, this._currentTime);

	            var _getPlaylistPlayingStatusAtTime22 = _slicedToArray(_getPlaylistPlayingStatusAtTime2, 3);

	            var toPlay = _getPlaylistPlayingStatusAtTime22[0];
	            var currentlyPlaying = _getPlaylistPlayingStatusAtTime22[1];
	            var finishedPlaying = _getPlaylistPlayingStatusAtTime22[2];

	            toPlay = this._sortMediaSourcesByStartTime(toPlay);

	            //Check if we've finished playing and then stop
	            if (toPlay.length === 0 && currentlyPlaying.length === 0) {
	                this.pause();
	                var endedEvent = new CustomEvent('ended', { detail: { data: this.currentTime, instance: this } });
	                this.currentTime = 0;
	                this._canvas.dispatchEvent(endedEvent);
	                return;
	            }

	            // //Preload mediaSources
	            // for (let i = 0; i < this._mediaSourcePreloadNumber; i++) {
	            //     if (i === toPlay.length) break;
	            //     if (this._mediaSources.has(toPlay[i].id) === false){
	            //         this._loadMediaSource(toPlay[i]);
	            //     }
	            // }

	            for (var i = 0; i < toPlay.length; i++) {
	                //if (i === toPlay.length) break;
	                if (!this._mediaSources.has(toPlay[i].id)) {
	                    if (toPlay[i].start < this._currentTime + this._mediaSourcePreloadLookaheadTime) {
	                        this._loadMediaSource(toPlay[i]);
	                    }
	                }
	            }

	            //Clean-up any mediaSources which have already been played
	            for (var i = 0; i < finishedPlaying.length; i++) {
	                var mediaSourceReference = finishedPlaying[i];
	                if (this._mediaSources.has(mediaSourceReference.id)) {
	                    var mediaSource = this._mediaSources.get(mediaSourceReference.id);
	                    if (mediaSource.start + mediaSource.duration < this._currentTime - this._mediaSourcePostPlayLifetime) {
	                        mediaSource.destroy();
	                        this._mediaSources["delete"](mediaSourceReference.id);
	                    }
	                }
	            }

	            //Make sure all mediaSources are ready to play
	            var ready = true;
	            for (var i = 0; i < currentlyPlaying.length; i++) {
	                var mediaSourceID = currentlyPlaying[i].id;
	                //check that currently playing mediaSource exists
	                if (!this._mediaSources.has(mediaSourceID)) {
	                    //if not load it
	                    this._loadMediaSource(currentlyPlaying[i]);
	                    ready = false;
	                    continue;
	                }
	                if (!this._mediaSources.get(mediaSourceID).isReady()) ready = false;
	            }
	            //if all the sources aren't ready, exit function before rendering or advancing clock.
	            if (ready === false) {
	                return;
	            }

	            //Update the effects
	            this._effectManager.updateEffects(this._playlist.effects);

	            //Update the audio
	            this._audioManger.update(this._mediaSources, currentlyPlaying);

	            //Play mediaSources on the currently playing queue.
	            currentlyPlaying.reverse(); //reverse the currently playing queue so track 0 renders last

	            //let activeTransitions = this._calculateActiveTransitions(currentlyPlaying, this._currentTime);
	            this._ctx.viewport(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
	            this._ctx.clear(this._ctx.COLOR_BUFFER_BIT | this._ctx.DEPTH_BUFFER_BIT);

	            for (var i = 0; i < currentlyPlaying.length; i++) {
	                var mediaSourceID = currentlyPlaying[i].id;
	                var mediaSource = this._mediaSources.get(mediaSourceID);
	                //We must update the MediaSource object with any changes made to the MediaSourceReference
	                //Currently the only parameters we update are start,duration

	                mediaSource.play();
	                var progress = (this._currentTime - currentlyPlaying[i].start) / currentlyPlaying[i].duration;
	                //get the base render parameters
	                var renderParameters = { "playback_rate": this._playbackRate, "progress": progress, "duration": mediaSource.duration, "source_resolution": [mediaSource.width, mediaSource.height], "output_resolution": [this._canvas.width, this._canvas.height] };
	                //find the effect associated with the current mediasource
	                var effect = this._effectManager.getEffectForInputId(mediaSourceID);
	                //merge the base parameters with any custom ones
	                for (var key in effect.parameters) {
	                    renderParameters[key] = effect.parameters[key];
	                }

	                mediaSource.render(effect.program, renderParameters, effect.textures);
	            }
	            this._currentTime += dt * this._playbackRate;
	        }

	        /**
	        * Calculate the duration of the passed playlist track.
	        *
	        * Will return the time that the last media source in the track stops playing.
	        * @param {Array} track - this is track which consists of an array object of MediaSourceReferences (typically a track from a playlist object).
	        * @return {number} The duration in seconds of the given track.
	        * @example
	        * var playlist = {
	        *   tracks:[
	        *       [{type:"video", start:0, duration:4, src:"video1.mp4", id:"video1"},{type:"video", start:4, duration:4, src:"video2.mp4", id:"video2"}],
	        *       [{type:"video", start:6, duration:4, src:"video3.mp4", id:"video3"}]
	        *   ]
	        * }
	        * var track0Duration = VideoCompositor.calculateTrackDuration(playlist.tracks[0]);
	        * var track1Duration = VideoCompositor.calculateTrackDuration(playlist.tracks[1]);
	        * //track0Duration === 8
	        * //track1Duration === 10
	        *
	        * @todo Beacuse media source reference are stored in order this could implemented be far quicker.
	        */
	    }, {
	        key: "preloadTime",
	        set: function set(time) {
	            this._mediaSourcePreloadLookaheadTime = time;
	        },
	        get: function get() {
	            return this._mediaSourcePreloadLookaheadTime;
	        }

	        /**
	        * Sets how long mediasources will exist for after they have been .
	        */
	    }, {
	        key: "postPlayTime",
	        set: function set(time) {
	            this._mediaSourcePostPlayLifetime = time;
	        },
	        get: function get() {
	            return this._mediaSourcePostPlayLifetime;
	        }

	        /** 
	        * Sets the playback rate of the video compositor. Msut be greater than 0.
	        * @example
	        * 
	        * var playlist = {
	        *   tracks:[
	        *       [{type:"video", start:0, duration:4, src:"video1.mp4", id:"video1"}]
	        *   ]
	        * }
	        * var canvas = document.getElementById('canvas');
	        * var videoCompositor = new VideoCompositor(canvas);
	        * videoCompositor.playlist = playlist;
	        * videoCompositor.playbackRate = 2.0; //Play at double speed
	        * videoCompositor.play();
	        */
	    }, {
	        key: "playbackRate",
	        set: function set(playbackRate) {
	            if (typeof playbackRate === 'string' || playbackRate instanceof String) {
	                playbackRate = parseFloat(playbackRate);
	            }
	            if (playbackRate < 0) playbackRate = 0;
	            this._playbackRate = playbackRate;
	        },

	        /**
	        * Gets the playback rate.
	        *
	        * @example
	        * var canvas = document.getElementById('canvas');
	        * var videoCompositor = new VideoCompositor(canvas);
	        * console.log(videoCompositor. playbackRate); // will print 1.0.
	        */
	        get: function get() {
	            return this._playbackRate;
	        }

	        /**
	        * Sets the current time through the playlist.
	        *
	        * Setting this is how you seek through the content. Should be frame accurate, but probably slow.
	        * @param {number} time - The time to seek to in seconds.
	        * 
	        * @example
	        * 
	        * var playlist = {
	        *   tracks:[
	        *       [{type:"video", start:0, duration:4, src:"video1.mp4", id:"video1"},{type:"video", start:4, duration:4, src:"video2.mp4", id:"video2"}]
	        *   ]
	        * }
	        * var canvas = document.getElementById('canvas');
	        * var videoCompositor = new VideoCompositor(canvas);
	        * videoCompositor.playlist = playlist;
	        * videoCompositor.currentTime = 3; //Skip three seconds in.
	        * videoCompositor.play();
	        */
	    }, {
	        key: "currentTime",
	        set: function set(currentTime) {
	            if (typeof currentTime === 'string' || currentTime instanceof String) {
	                currentTime = parseFloat(currentTime);
	            }

	            console.debug("Seeking to", currentTime);
	            if (this._playlist === undefined) {
	                return;
	            }

	            var _getPlaylistPlayingStatusAtTime3 = this._getPlaylistPlayingStatusAtTime(this._playlist, currentTime);

	            var _getPlaylistPlayingStatusAtTime32 = _slicedToArray(_getPlaylistPlayingStatusAtTime3, 3);

	            var toPlay = _getPlaylistPlayingStatusAtTime32[0];
	            var currentlyPlaying = _getPlaylistPlayingStatusAtTime32[1];
	            var finishedPlaying = _getPlaylistPlayingStatusAtTime32[2];

	            //clean up any nodes in the audioManager
	            this._audioManger.clearAudioNodeCache();

	            //clean-up any currently playing mediaSources
	            var _this = this;
	            this._mediaSources.forEach(function (mediaSource) {
	                var shouldDestory = false;

	                //check if the media source matches one in the new currently playing or list.
	                for (var i = 0; i < finishedPlaying.length; i++) {
	                    if (mediaSource.id === finishedPlaying[i].id) {
	                        shouldDestory = true;
	                    }
	                }

	                //check it the media source has already been played a littlebit
	                if (mediaSource.playing === true) shouldDestory = true;

	                if (shouldDestory) {
	                    _this._mediaSources["delete"](mediaSource.id);
	                    mediaSource.destroy();
	                }
	            });
	            //this._mediaSources.clear();

	            //Load mediaSources
	            for (var i = 0; i < currentlyPlaying.length; i++) {
	                var mediaSourceID = currentlyPlaying[i].id;
	                //If the media source isn't loaded then we start loading it.
	                if (this._mediaSources.has(mediaSourceID) === false) {
	                    this._loadMediaSource(currentlyPlaying[i], function (mediaSource) {
	                        mediaSource.seek(currentTime);
	                    });
	                } else {
	                    //If the mediaSource is loaded then we seek to the proper bit
	                    this._mediaSources.get(mediaSourceID).seek(currentTime);
	                }
	            }

	            this._currentTime = currentTime;
	            var seekEvent = new CustomEvent('seek', { detail: { data: currentTime, instance: this } });
	            this._canvas.dispatchEvent(seekEvent);
	        },

	        /**
	        * Get how far through the playlist has been played.
	        *
	        * Getting this value will give the current playhead position. Can be used for updating timelines.
	        * @return {number} The time in seconds through the current playlist.
	        * 
	        * @example
	        * 
	        * var playlist = {
	        *   tracks:[
	        *       [{type:"video", start:0, duration:4, src:"video1.mp4", id:"video1"},{type:"video", start:4, duration:4, src:"video2.mp4", id:"video2"}]
	        *   ]
	        * }
	        * var canvas = document.getElementById('canvas');
	        * var videoCompositor = new VideoCompositor(canvas);
	        * videoCompositor.playlist = playlist;
	        * var time = videoCompositor.currentTime;
	        * //time === 0
	        */
	        get: function get() {
	            return this._currentTime;
	        }

	        /**
	        * Set the playlist object to be played.
	        *
	        * Playlist objects describe a sequence of media sources to be played along with effects to be applied to them. They can be modified as they are being played to create dynamic or user customizable content.
	        * 
	        * At the top level playlist consist of tracks and effects. A track is an array of MediaSourceReferences. MediaSourceReference are an object which describe a piece of media to be played, the three fundamental MediaSourceRefernce types are "video", "image", and "canvas". Internally MediaSoureReferences are used to create MediaSources which are object that contain the underlying HTML element as well as handling loading and rendering of that element ot the output canvas.
	        *
	        * The order in which simultaneous individual tracks get rendered is determined by there index in the overall tracks list. A track at index 0 will be rendered after a track at index 1.
	        *
	        * Effects are objects consisting of GLSL vertex and fragment shaders, and a list of MediaSource ID's for them to be applied to.
	        * Effects get applied independently to any MediaSources in their input list.
	        *
	        * @param {Object} playlist - The playlist object to be played.
	        * 
	        * @example <caption>A simple playlist with a single track of a single 4 second video</caption>
	        * 
	        * var playlist = {
	        *   tracks:[
	        *       [{type:"video", start:0, duration:4, src:"video.mp4", id:"video"}]
	        *   ]
	        * }
	        * var canvas = document.getElementById("canvas");
	        * var videoCompositor = new VideoCompositor(canvas);
	        * videoCompositor.playlist = playlist;
	        * videoCompositor.play();
	        *
	        * @example <caption>Playing the first 4 seconds of two videos, one after the other</caption>
	        * 
	        * var playlist = {
	        *   tracks:[
	        *       [{type:"video", start:0, duration:4, src:"video.mp4", id:"video"}, {type:"video", start:4, duration:4, src:"video1.mp4", id:"video1"}]
	        *   ]
	        * }
	        *
	        * @example <caption>Playing a 4 second segment from within a video (not the use of sourceStart)</caption>
	        * 
	        * var playlist = {
	        *   tracks:[
	        *       [{type:"video", start:0, sourceStart:10, duration:4, src:"video.mp4", id:"video"}]
	        *   ]
	        * }
	        * 
	        * @example <caption>A playlist with a 4 second video with a greenscreen effect applied rendered over a background image</caption>
	        * 
	        * var playlist = {
	        *   tracks:[
	        *       [{type:"video", start:0, duration:10, src:"video.mp4", id:"gs-video"}],
	        *       [{type:"image", start:0, duration:10, src:"background.png", id:"background"}]
	        *   ]
	        *   effects:{
	        *       "green-screen":{                                  //A unique ID for this effect.
	        *           "inputs":["gs-video"],                        //The id of the video to apply the effect to.
	        *           "effect": VideoCompositor.Effects.GREENSCREEN //Use the built-in greenscreen effect shader.
	        *       }
	        *   }
	        * }
	        *
	        * @example <caption>A pseudo 2 second cross-fade between two videos.</caption>
	        * 
	        * var playlist = {
	        *   tracks:[
	        *       [{type:"video", start:0, duration:10, src:"video1.mp4", id:"video1"}],
	        *       [                                                  {type:"video", start:8, duration:10, src:"video2.mp4", id:"video2"}]
	        *   ]
	        *   effects:{
	        *       "fade-out":{                                      //A unique ID for this effect.
	        *           "inputs":["video1"],                          //The id of the video to apply the effect to.
	        *           "effect": VideoCompositor.Effects.FADEOUT2SEC //Use the built-in fade-out effect shader.
	        *       },
	        *       "fade-in":{                                      //A unique ID for this effect.
	        *           "inputs":["video2"],                          //The id of the video to apply the effect to.
	        *           "effect": VideoCompositor.Effects.FADEIN2SEC //Use the built-in fade-in effect shader.
	        *       }
	        *   }
	        * }
	        */
	    }, {
	        key: "playlist",
	        set: function set(playlist) {
	            VideoCompositor.validatePlaylist(playlist);
	            this.duration = VideoCompositor.calculatePlaylistDuration(playlist);
	            this._playlist = playlist;
	            //clean-up any currently playing mediaSources
	            this._mediaSources.forEach(function (mediaSource) {
	                mediaSource.destroy();
	            });
	            this._mediaSources.clear();
	            this.currentTime = this._currentTime;
	        },

	        /**
	        * Get the playlist object.
	        * @return {Object} The playlist object
	        */
	        get: function get() {
	            return this._playlist;
	        }
	    }], [{
	        key: "calculateTrackDuration",
	        value: function calculateTrackDuration(track) {
	            var maxPlayheadPosition = 0;
	            for (var j = 0; j < track.length; j++) {
	                var playheadPosition = track[j].start + track[j].duration;
	                if (playheadPosition > maxPlayheadPosition) {
	                    maxPlayheadPosition = playheadPosition;
	                }
	            }
	            return maxPlayheadPosition;
	        }

	        /**
	        * Calculate the duration of the passed playlist.
	        *
	        * Will return the time that the last media source in the longest track stops playing.
	        * @param {Object} playlist - This is a playlist object.
	        * @return {number} The duration in seconds of the given playlist.
	        * @example
	        * var playlist = {
	        *   tracks:[
	        *       [{type:"video", start:0, duration:4, src:"video1.mp4", id:"video1"},{type:"video", start:4, duration:4, src:"video2.mp4", id:"video2"}],
	        *       [{type:"video", start:6, duration:4, src:"video3.mp4", id:"video3"}]
	        *   ]
	        * }
	        * var playilstDuration = VideoCompositor.calculateTrackDuration(playlist);
	        * //playlistDuration === 10
	        *
	        */
	    }, {
	        key: "calculatePlaylistDuration",
	        value: function calculatePlaylistDuration(playlist) {
	            var maxTrackDuration = 0;

	            for (var i = 0; i < playlist.tracks.length; i++) {
	                var track = playlist.tracks[i];
	                var trackDuration = VideoCompositor.calculateTrackDuration(track);
	                if (trackDuration > maxTrackDuration) {
	                    maxTrackDuration = trackDuration;
	                }
	            }

	            return maxTrackDuration;
	        }

	        /**
	        * Validate that the playlist is correct and playable.
	        *
	        * This static function will analyze a playlist and check for common errors. on encountering an error it will throw an exception. The errors it currently checks for are:
	        *
	        * Error 1. MediaSourceReferences have a unique ID        
	        *
	        * Error 2. The playlist media sources have all the expected properties.
	        *
	        * Error 3. MediaSourceReferences in single track are sequential.
	        *
	        * Error 4. MediaSourceReferences in single track don't overlap
	        *
	        * @param {Object} playlist - This is a playlist object.
	        *
	        * @example
	        * var playlist = {
	        *   tracks:[
	        *       [{type:"video", start:0, duration:4, src:"video1.mp4", id:"video1"},{type:"video", start:2, duration:4, src:"video2.mp4", id:"video2"}],
	        *   ]
	        * }
	        * var playilstDuration = VideoCompositor.validatePlaylist(playlist);
	        * //Will throw error 4 becuase mediaSourceReference video1 and video2 overlap by 2 seconds.
	        *
	        * @todo Better coverage of possible errors in a playlist.
	        */
	    }, {
	        key: "validatePlaylist",
	        value: function validatePlaylist(playlist) {
	            /*     
	            This function validates a passed playlist, making sure it matches a 
	            number of properties a playlist must have to be OK.
	             * Error 1. MediaSourceReferences have a unique ID        
	            * Error 2. The playlist media sources have all the expected properties.
	            * Error 3. MediaSourceReferences in single track are sequential.
	            * Error 4. MediaSourceReferences in single track don't overlap
	            */

	            //Error 1. MediaSourceReferences have a unique ID
	            var IDs = new Map();
	            for (var i = 0; i < playlist.tracks.length; i++) {
	                var track = playlist.tracks[i];
	                for (var j = 0; j < track.length; j++) {
	                    var MediaSourceReference = track[j];
	                    if (IDs.has(MediaSourceReference.id)) {
	                        throw { "error": 1, "msg": "MediaSourceReference " + MediaSourceReference.id + " in track " + i + " has a duplicate ID.", toString: function toString() {
	                                return this.msg;
	                            } };
	                    } else {
	                        IDs.set(MediaSourceReference.id, true);
	                    }
	                }
	            }

	            //Error 2. The playlist MediaSourceReferences have all the expected properties.
	            for (var i = 0; i < playlist.tracks.length; i++) {
	                var track = playlist.tracks[i];
	                for (var j = 0; j < track.length; j++) {
	                    var MediaSourceReference = track[j];
	                    if (MediaSourceReference.id === undefined) throw { "error": 2, "msg": "MediaSourceReference " + MediaSourceReference.id + " in track " + i + " is missing a id property", toString: function toString() {
	                            return this.msg;
	                        } };
	                    if (MediaSourceReference.start === undefined) throw { "error": 2, "msg": "MediaSourceReference " + MediaSourceReference.id + " in track " + i + " is missing a start property", toString: function toString() {
	                            return this.msg;
	                        } };
	                    if (MediaSourceReference.duration === undefined) throw { "error": 2, "msg": "MediaSourceReference " + MediaSourceReference.id + " in track " + i + " is missing a duration property", toString: function toString() {
	                            return this.msg;
	                        } };
	                    if (MediaSourceReference.type === undefined) throw { "error": 2, "msg": "MediaSourceReference " + MediaSourceReference.id + " in track " + i + " is missing a type property", toString: function toString() {
	                            return this.msg;
	                        } };
	                    if (MediaSourceReference.src !== undefined && MediaSourceReference.element !== undefined) throw { "error": 2, "msg": "MediaSourceReference " + MediaSourceReference.id + " in track " + i + " has both a src and element, it must have one or the other", toString: function toString() {
	                            return this.msg;
	                        } };
	                    if (MediaSourceReference.src === undefined && MediaSourceReference.element === undefined) throw { "error": 2, "msg": "MediaSourceReference " + MediaSourceReference.id + " in track " + i + " has neither a src or an element, it must have one or the other", toString: function toString() {
	                            return this.msg;
	                        } };
	                }
	            }

	            // Error 3. MediaSourceReferences in single track are sequential.
	            for (var i = 0; i < playlist.tracks.length; i++) {
	                var track = playlist.tracks[i];
	                var time = 0;
	                for (var j = 0; j < track.length; j++) {
	                    var MediaSourceReference = track[j];
	                    if (MediaSourceReference.start < time) {
	                        throw { "error": 3, "msg": "MediaSourceReferences " + MediaSourceReference.id + " in track " + i + " starts before previous MediaSourceReference", toString: function toString() {
	                                return this.msg;
	                            } };
	                    }
	                    time = MediaSourceReference.start;
	                }
	            }

	            //Error 4. MediaSourceReferences in single track don't overlap
	            for (var i = 0; i < playlist.tracks.length; i++) {
	                var track = playlist.tracks[i];
	                var previousMediaSourceReference = undefined;
	                for (var j = 0; j < track.length; j++) {
	                    var MediaSourceReference = track[j];
	                    if (previousMediaSourceReference === undefined) {
	                        previousMediaSourceReference = MediaSourceReference;
	                        continue;
	                    }
	                    var previousEnd = previousMediaSourceReference.start + previousMediaSourceReference.duration;
	                    var currentStart = MediaSourceReference.start;
	                    if (previousEnd > currentStart) {
	                        throw { "error": 4, "msg": "Track MediaSourceReferences overlap. MediaSourceReference " + previousMediaSourceReference.id + " in track " + i + " finishes after MediaSourceReference " + MediaSourceReference.id + " starts.", toString: function toString() {
	                                return this.msg;
	                            } };
	                    }
	                }
	            }
	        }

	        /**
	        * Render a graphical representation of a playlist to a canvas.
	        *
	        * This function is useful for rendering a graphical display of a playlist to check MediaSourceReferences are aligned on tracks as you'd expect. It can also be called in an update loop with the currentTime of a VideoCompositor instance passed in to create a live timeline viewer.
	        *
	        *
	        * @param {Object} playlist - This is a playlist object.
	        * @param {Canvas} canvas - This is the canvas to render to.
	        * @param {number} currentTime - The time at wich to render a playhead.
	        *
	        * @example
	        * var playlist = {
	        *   tracks:[
	        *       [{type:"video", start:0, duration:4, src:"video1.mp4", id:"video1"},{type:"video", start:2, duration:4, src:"video2.mp4", id:"video2"}],
	        *   ]
	        * }
	        * var visualisationCanvas = document.getElementById("vis-canvas");
	        * VideoCompositor.renderPlaylist(playlist, visualisationCanvas, 0);
	        *
	        */
	    }, {
	        key: "renderPlaylist",
	        value: function renderPlaylist(playlist, canvas, currentTime) {
	            var ctx = canvas.getContext('2d');
	            var w = canvas.width;
	            var h = canvas.height;
	            var trackHeight = h / playlist.tracks.length;
	            var playlistDuration = VideoCompositor.calculatePlaylistDuration(playlist);
	            var pixelsPerSecond = w / playlistDuration;
	            var mediaSourceStyle = {
	                "video": ["#572A72", "#3C1255"],
	                "image": ["#7D9F35", "#577714"],
	                "canvas": ["#AA9639", "#806D15"]
	            };

	            ctx.clearRect(0, 0, w, h);
	            ctx.fillStyle = "#999";
	            for (var i = 0; i < playlist.tracks.length; i++) {
	                var track = playlist.tracks[i];
	                for (var j = 0; j < track.length; j++) {
	                    var mediaSource = track[j];
	                    var msW = mediaSource.duration * pixelsPerSecond;
	                    var msH = trackHeight;
	                    var msX = mediaSource.start * pixelsPerSecond;
	                    var msY = trackHeight * i;
	                    ctx.fillStyle = mediaSourceStyle[mediaSource.type][j % mediaSourceStyle[mediaSource.type].length];
	                    ctx.fillRect(msX, msY, msW, msH);
	                    ctx.fill();
	                }
	            }

	            if (currentTime !== undefined) {
	                ctx.fillStyle = "#000";
	                ctx.fillRect(currentTime * pixelsPerSecond, 0, 1, h);
	            }
	        }
	    }, {
	        key: "VertexShaders",
	        get: function get() {
	            return {
	                DEFAULT: "\
	                uniform float progress;\
	                uniform float duration;\
	                uniform vec2 source_resolution;\
	                uniform vec2 output_resolution;\
	                attribute vec2 a_position;\
	                attribute vec2 a_texCoord;\
	                varying vec2 v_texCoord;\
	                varying float v_progress;\
	                varying float v_duration;\
	                varying vec2 v_source_resolution;\
	                varying vec2 v_output_resolution;\
	                void main() {\
	                    v_progress = progress;\
	                    v_duration = duration;\
	                    v_source_resolution = source_resolution;\
	                    v_output_resolution = output_resolution;\
	                    gl_Position = vec4(vec2(2.0,2.0)*a_position-vec2(1.0, 1.0), 0.0, 1.0);\
	                    v_texCoord = a_texCoord;\
	                }",
	                OFFSETSCALEINOUT: "\
	                uniform float progress;\
	                uniform float duration;\
	                uniform vec2 source_resolution;\
	                uniform vec2 output_resolution;\
	                uniform float inTime;\
	                uniform float outTime;\
	                uniform float scaleX;\
	                uniform float scaleY;\
	                uniform float offsetX;\
	                uniform float offsetY;\
	                attribute vec2 a_position;\
	                attribute vec2 a_texCoord;\
	                varying vec2 v_texCoord;\
	                varying float v_progress;\
	                varying float v_duration;\
	                varying float v_inTime;\
	                varying float v_outTime;\
	                varying vec2 v_source_resolution;\
	                varying vec2 v_output_resolution;\
	                void main() {\
	                    v_progress = progress;\
	                    v_duration = duration;\
	                    v_inTime = inTime;\
	                    v_outTime = outTime;\
	                    v_source_resolution = source_resolution;\
	                    v_output_resolution = output_resolution;\
	                    gl_Position = vec4(vec2(2.0*scaleX,2.0*scaleY)*a_position-vec2(1.0+offsetX, 1.0+offsetY), 0.0, 1.0);\
	                    v_texCoord = a_texCoord;\
	                }",
	                INOUT: "\
	                uniform float progress;\
	                uniform float duration;\
	                uniform vec2 source_resolution;\
	                uniform vec2 output_resolution;\
	                uniform float inTime;\
	                uniform float outTime;\
	                attribute vec2 a_position;\
	                attribute vec2 a_texCoord;\
	                varying vec2 v_texCoord;\
	                varying float v_progress;\
	                varying float v_duration;\
	                varying float v_inTime;\
	                varying float v_outTime;\
	                varying vec2 v_source_resolution;\
	                varying vec2 v_output_resolution;\
	                void main() {\
	                    v_progress = progress;\
	                    v_duration = duration;\
	                    v_inTime = inTime;\
	                    v_outTime = outTime;\
	                    v_source_resolution = source_resolution;\
	                    v_output_resolution = output_resolution;\
	                    gl_Position = vec4(vec2(2.0,2.0)*a_position-vec2(1.0, 1.0), 0.0, 1.0);\
	                    v_texCoord = a_texCoord;\
	                }",
	                OFFSETSCALE: "\
	                uniform float progress;\
	                uniform float duration;\
	                uniform vec2 source_resolution;\
	                uniform vec2 output_resolution;\
	                uniform float scaleX;\
	                uniform float scaleY;\
	                uniform float offsetX;\
	                uniform float offsetY;\
	                attribute vec2 a_position;\
	                attribute vec2 a_texCoord;\
	                varying vec2 v_texCoord;\
	                varying float v_progress;\
	                varying float v_duration;\
	                varying vec2 v_source_resolution;\
	                varying vec2 v_output_resolution;\
	                void main() {\
	                    v_progress = progress;\
	                    v_duration = duration;\
	                    v_source_resolution = source_resolution;\
	                    v_output_resolution = output_resolution;\
	                    gl_Position = vec4(vec2(2.0*scaleX,2.0*scaleY)*a_position-vec2(1.0+offsetX, 1.0+offsetY), 0.0, 1.0);\
	                    v_texCoord = a_texCoord;\
	                }"
	            };
	        }
	    }, {
	        key: "FragmentShaders",
	        get: function get() {
	            return {
	                DEFAULT: "\
	                    precision mediump float;\
	                    uniform sampler2D u_image;\
	                    varying vec2 v_texCoord;\
	                    varying float v_progress;\
	                    varying float v_duration;\
	                    varying vec2 v_source_resolution;\
	                    varying vec2 v_output_resolution;\
	                    void main(){\
	                        gl_FragColor = texture2D(u_image, v_texCoord);\
	                    }",
	                PRESERVEASPECTRATIO: "\
	                    precision mediump float;\
	                    uniform sampler2D u_image;\
	                    varying vec2 v_texCoord;\
	                    varying float v_progress;\
	                    varying float v_duration;\
	                    varying vec2 v_source_resolution;\
	                    varying vec2 v_output_resolution;\
	                    void main(){\
	                        float scale = 1.0;\
	                        float source_aspect_ratio = v_source_resolution[0]/v_source_resolution[1];\
	                        float output_aspect_ratio = v_output_resolution[0]/v_output_resolution[1];\
	                        if(output_aspect_ratio > source_aspect_ratio){\
	                            scale = v_output_resolution[1]/v_source_resolution[1];\
	                        } else {\
	                            scale = v_output_resolution[0]/v_source_resolution[0];\
	                        };\
	                        vec2 source_resolution = v_source_resolution * scale;\
	                        vec2 oCord = vec2(v_texCoord[0] * v_output_resolution[0], v_texCoord[1] * v_output_resolution[1]);\
	                        vec2 sCord = vec2(oCord[0] - (v_output_resolution[0]/2.0 - source_resolution[0]/2.0), oCord[1] - (v_output_resolution[1]/2.0 - source_resolution[1]/2.0));\
	                        if (sCord[0] < 0.0 || sCord[0] > source_resolution[0]||sCord[1] < 0.0 || sCord[1] > source_resolution[1]){\
	                            gl_FragColor = vec4(0.0,0.0,0.0,0.0);\
	                        }else{\
	                            gl_FragColor = texture2D(u_image, (sCord/source_resolution));\
	                        }\
	                    }",
	                PRESERVEASPECTRATIOFILL: "\
	                    precision mediump float;\
	                    uniform sampler2D u_image;\
	                    varying vec2 v_texCoord;\
	                    varying float v_progress;\
	                    varying float v_duration;\
	                    varying vec2 v_source_resolution;\
	                    varying vec2 v_output_resolution;\
	                    void main(){\
	                        float scale = 1.0;\
	                        float source_aspect_ratio = v_source_resolution[0]/v_source_resolution[1];\
	                        float output_aspect_ratio = v_output_resolution[0]/v_output_resolution[1];\
	                        if(output_aspect_ratio > source_aspect_ratio){\
	                            scale = v_output_resolution[1]/v_source_resolution[1];\
	                        } else {\
	                            scale = v_output_resolution[0]/v_source_resolution[0];\
	                        };\
	                        vec2 source_resolution = v_source_resolution * scale;\
	                        vec2 oCord = vec2(v_texCoord[0] * v_output_resolution[0], v_texCoord[1] * v_output_resolution[1]);\
	                        vec2 sCord = vec2(oCord[0] - (v_output_resolution[0]/2.0 - source_resolution[0]/2.0), oCord[1] - (v_output_resolution[1]/2.0 - source_resolution[1]/2.0));\
	                        gl_FragColor = texture2D(u_image, (sCord/source_resolution));\
	                    }",
	                MONOCHROME: "\
	                precision mediump float;\
	                uniform sampler2D u_image;\
	                varying vec2 v_texCoord;\
	                varying float v_progress;\
	                varying vec2 v_source_resolution;\
	                varying vec2 v_output_resolution;\
	                void main(){\
	                    vec4 pixel = texture2D(u_image, v_texCoord);\
	                    float avg = (pixel[0]*0.2125 + pixel[1]*0.7154 + pixel[2]*0.0721)/3.0;\
	                    pixel = vec4(avg*1.5, avg*1.5, avg*1.5, pixel[3]);\
	                    gl_FragColor = pixel;\
	                }",
	                SEPIA: "\
	                precision mediump float;\
	                uniform sampler2D u_image;\
	                varying vec2 v_texCoord;\
	                varying float v_progress;\
	                varying vec2 v_source_resolution;\
	                varying vec2 v_output_resolution;\
	                void main(){\
	                    vec4 pixel = texture2D(u_image, v_texCoord);\
	                    float avg = (pixel[0]*0.2125 + pixel[1]*0.7154 + pixel[2]*0.0721)/3.0;\
	                    pixel = vec4(avg*2.0, avg*1.6, avg, pixel[3]);\
	                    gl_FragColor = pixel;\
	                }",
	                BITCRUNCH: "\
	                precision mediump float;\
	                uniform sampler2D u_image;\
	                varying vec2 v_texCoord;\
	                varying float v_progress;\
	                varying vec2 v_source_resolution;\
	                varying vec2 v_output_resolution;\
	                void main(){\
	                    vec4 pixel = texture2D(u_image, v_texCoord);\
	                    pixel = floor(pixel*vec4(8.0,8.0,8.0,8.0));\
	                    pixel = pixel/vec4(8.0,8.0,8.0,8.0);\
	                    gl_FragColor = pixel*vec4(1.0,1.0,1.0,1.0);\
	                }",
	                "FADEINOUT": "\
	                precision mediump float;\
	                uniform sampler2D u_image;\
	                varying vec2 v_texCoord;\
	                varying float v_progress;\
	                varying float v_duration;\
	                varying float v_inTime;\
	                varying float v_outTime;\
	                varying vec2 v_source_resolution;\
	                varying vec2 v_output_resolution;\
	                void main(){\
	                    float alpha = 1.0;\
	                    if (v_progress * v_duration < v_inTime){\
	                        alpha = (v_progress * v_duration)/(v_inTime+0.001);\
	                    }\
	                    if ((v_progress * v_duration) > (v_duration - v_outTime)){\
	                        alpha = (v_outTime - ((v_progress * v_duration) - (v_duration - v_outTime)))/(v_outTime+0.001);\
	                    }\
	                    gl_FragColor = texture2D(u_image, v_texCoord) * vec4(1.0,1.0,1.0,alpha);\
	                }",
	                "LUTSQAURE64X64": "\
	                    precision mediump float;\
	                    uniform sampler2D u_image;\
	                    uniform sampler2D lut;\
	                    varying vec2 v_texCoord;\
	                    varying float v_progress;\
	                    varying float v_duration;\
	                    varying vec2 v_source_resolution;\
	                    varying vec2 v_output_resolution;\
	                    void main(){\
	                        vec4 original_color = texture2D(u_image, v_texCoord);\
	                        original_color = clamp(original_color, vec4(0.01,0.01,0.01,0.01), vec4(0.99,0.99,0.99,0.99));\
	                        vec2 red_offset = vec2(original_color[0]/8.0 ,0.0);\
	                        vec2 green_offset = vec2(0.0,(1.0/8.0)-(original_color[1]/8.0));\
	                        \
	                        float b = floor((original_color[2] * 63.0) + 0.5);\
	                        float b_x = mod(b, 8.0);\
	                        float b_y = floor((b / 8.0) + 0.5);\
	                        vec2 blue_offset = vec2(b_x/8.0, 1.0 - b_y/8.0);\
	                        vec4 lut_color = texture2D(lut, (blue_offset + red_offset + green_offset));\
	                        gl_FragColor = lut_color;\
	                    }"
	            };
	        }
	    }, {
	        key: "Effects",
	        get: function get() {
	            return {
	                "OFFSETSCALE": {
	                    "fragmentShader": VideoCompositor.FragmentShaders.DEFAULT,
	                    "vertexShader": VideoCompositor.VertexShaders.OFFSETSCALE,
	                    "defaultParameters": {
	                        "scaleX": 1.0,
	                        "scaleY": 1.0,
	                        "offsetX": 0.0,
	                        "offsetY": 0.0
	                    }
	                },
	                "MONOCHROME": {
	                    "fragmentShader": VideoCompositor.FragmentShaders.MONOCHROME
	                },
	                "SEPIA": {
	                    "fragmentShader": VideoCompositor.FragmentShaders.SEPIA
	                },
	                "BITCRUNCH": {
	                    "fragmentShader": VideoCompositor.FragmentShaders.BITCRUNCH
	                },
	                //Green screen color =  r = 62, g = 178, b = 31
	                //Normalised         = r = 0.243, g= 0.698, b = 0.122
	                "GREENSCREENMAD": {
	                    "fragmentShader": "\
	                    precision mediump float;\
	                    uniform sampler2D u_image;\
	                    varying vec2 v_texCoord;\
	                    varying float v_progress;\
	                    void main(){\
	                        vec4 pixel = texture2D(u_image, v_texCoord);\
	                        float alpha = 1.0;\
	                        float r = pixel[0];\
	                        float g = pixel[1];\
	                        float b = pixel[2];\
	                        float y =  0.299*r + 0.587*g + 0.114*b;\
	                        float u = -0.147*r - 0.289*g + 0.436*b;\
	                        float v =  0.615*r - 0.515*g - 0.100*b;\
	                        ;\
	                        alpha = (v+u)*10.0 +2.0;\
	                        \
	                        pixel = floor(pixel*vec4(2.0,2.0,2.0,2.0));\
	                        pixel = pixel/vec4(2.0,2.0,2.0,2.0);\
	                        pixel = vec4(pixel[2]*2.0, pixel[1]*2.0, pixel[0]*2.0, alpha);\
	                        gl_FragColor = pixel;\
	                    }"
	                },
	                "GREENSCREEN": {
	                    "fragmentShader": "\
	                    precision mediump float;\
	                    uniform sampler2D u_image;\
	                    varying vec2 v_texCoord;\
	                    varying float v_progress;\
	                    varying float v_yUpperThreshold;\
	                    varying float v_yLowerThreshold;\
	                    void main(){\
	                        vec4 pixel = texture2D(u_image, v_texCoord);\
	                        float alpha = 1.0;\
	                        float r = pixel[0];\
	                        float g = pixel[1];\
	                        float b = pixel[2];\
	                        float y =  0.299*r + 0.587*g + 0.114*b;\
	                        float u = -0.147*r - 0.289*g + 0.436*b;\
	                        float v =  0.615*r - 0.515*g - 0.100*b;\
	                        if (y > v_yLowerThreshold && y < v_yUpperThreshold){\
	                            alpha = (v+u)*40.0 +2.0;\
	                        }\
	                        pixel = vec4(pixel[0], pixel[1], pixel[2], alpha);\
	                        gl_FragColor = pixel;\
	                    }",
	                    "vertexShader": "\
	                    uniform float progress;\
	                    uniform float duration;\
	                    uniform float yLowerThreshold;\
	                    uniform float yUpperThreshold;\
	                    uniform vec2 source_resolution;\
	                    uniform vec2 output_resolution;\
	                    attribute vec2 a_position;\
	                    attribute vec2 a_texCoord;\
	                    varying vec2 v_texCoord;\
	                    varying float v_progress;\
	                    varying float v_duration;\
	                    varying float v_yLowerThreshold;\
	                    varying float v_yUpperThreshold;\
	                    varying vec2 v_source_resolution;\
	                    varying vec2 v_output_resolution;\
	                    void main() {\
	                        v_progress = progress;\
	                        v_duration = duration;\
	                        v_yLowerThreshold = yLowerThreshold;\
	                        v_yUpperThreshold = yUpperThreshold;\
	                        v_source_resolution = source_resolution;\
	                        v_output_resolution = output_resolution;\
	                        gl_Position = vec4(vec2(2.0,2.0)*a_position-vec2(1.0, 1.0), 0.0, 1.0);\
	                        v_texCoord = a_texCoord;\
	                    }",
	                    "defaultParameters": {
	                        "yLowerThreshold": 0.2,
	                        "yUpperThreshold": 0.8
	                    }
	                },
	                "FADEINOUT": {
	                    "fragmentShader": VideoCompositor.FragmentShaders.FADEINOUT,
	                    "vertexShader": VideoCompositor.VertexShaders.INOUT,
	                    "defaultParameters": {
	                        "inTime": 1.0,
	                        "outTime": 1.0
	                    }
	                },
	                "FADEINOUT1SEC": {
	                    "fragmentShader": VideoCompositor.FragmentShaders.FADEINOUT,
	                    "vertexShader": VideoCompositor.VertexShaders.INOUT,
	                    "defaultParameters": {
	                        "inTime": 1.0,
	                        "outTime": 1.0
	                    }
	                },
	                "FADEINOUT2SEC": {
	                    "fragmentShader": VideoCompositor.FragmentShaders.FADEINOUT,
	                    "vertexShader": VideoCompositor.VertexShaders.INOUT,
	                    "defaultParameters": {
	                        "inTime": 2.0,
	                        "outTime": 2.0
	                    }
	                },
	                "FADEIN1SEC": {
	                    "fragmentShader": VideoCompositor.FragmentShaders.FADEINOUT,
	                    "vertexShader": VideoCompositor.VertexShaders.INOUT,
	                    "defaultParameters": {
	                        "inTime": 1.0,
	                        "outTime": 0.0
	                    }
	                },
	                "FADEIN2SEC": {
	                    "fragmentShader": VideoCompositor.FragmentShaders.FADEINOUT,
	                    "vertexShader": VideoCompositor.VertexShaders.INOUT,
	                    "defaultParameters": {
	                        "inTime": 2.0,
	                        "outTime": 0.0
	                    }
	                },
	                "FADEOUT1SEC": {
	                    "fragmentShader": VideoCompositor.FragmentShaders.FADEINOUT,
	                    "vertexShader": VideoCompositor.VertexShaders.INOUT,
	                    "defaultParameters": {
	                        "inTime": 0.0,
	                        "outTime": 1.0
	                    }
	                },
	                "FADEOUT2SEC": {
	                    "fragmentShader": VideoCompositor.FragmentShaders.FADEINOUT,
	                    "vertexShader": VideoCompositor.VertexShaders.INOUT,
	                    "defaultParameters": {
	                        "inTime": 0.0,
	                        "outTime": 2.0
	                    }
	                },
	                "LUTSQAURE64X64": {
	                    "fragmentShader": VideoCompositor.FragmentShaders.LUTSQAURE64X64
	                }
	            };
	        }
	    }]);

	    return VideoCompositor;
	})();

	exports["default"] = VideoCompositor;
	module.exports = exports["default"];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	//Matthew Shotton, R&D User Experince,© BBC 2015
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _mediasource = __webpack_require__(2);

	var _mediasource2 = _interopRequireDefault(_mediasource);

	function eventOneTime(element, type, callback) {
	    var handleEvent = function handleEvent(e) {
	        e.target.removeEventListener(e.type, handleEvent);
	        return callback(e);
	    };

	    element.addEventListener(type, handleEvent, false);
	}

	var VideoSource = (function (_MediaSource) {
	    _inherits(VideoSource, _MediaSource);

	    /**
	    * Video playback source. Inherits from MediaSource 
	    *
	    * A VideoSource is the manifestation of a mediaSourceReference from a playlist object which has type "video". 
	    * 
	    * A VideoSource exists for a period slightly before a VideoSource is to play in order to give it time to preload and
	    * is destroyed as soon as the VideoSource has finished playing. You can define an offset into the original video to 
	    * start playing by passing in a sourceStart value in the properties.
	    *
	    * @param {Object} properties - An object with the following attributes: id, duration, start, sourceStart, and src or element. 
	    * Where src is the URL of a video, or element is a DOM Video element.
	    * 
	    * @param {WebGLContext} gl - a webGl context to render too.
	    */

	    function VideoSource(properties, gl) {
	        _classCallCheck(this, VideoSource);

	        _get(Object.getPrototypeOf(VideoSource.prototype), "constructor", this).call(this, properties, gl);
	        this.sourceStart = 0;
	        this._volume = 1.0;
	        if (properties.sourceStart !== undefined) {
	            this.sourceStart = properties.sourceStart;
	        }
	        if (properties.volume !== undefined) {
	            this._volume = properties.volume;
	        }
	    }

	    /**
	    * Set the VideoSource playing.
	    */

	    _createClass(VideoSource, [{
	        key: "play",
	        value: function play() {
	            _get(Object.getPrototypeOf(VideoSource.prototype), "play", this).call(this);
	            var _this = this;

	            var playVideo = function playVideo() {
	                if (_this.element.readyState > 3) {
	                    _this.ready = true;
	                    _this.element.play();
	                } else {
	                    console.debug("Can't play video due to readyState");
	                    _this.ready = false;
	                    eventOneTime(_this.element, "canplay", playVideo);
	                }
	            };

	            playVideo();
	        }

	        /**
	        * Seek the VideoSource to an appropriate point for the passed time.
	        * @param {number} seekTime - The time to seek too, this is the overall time for the whole playlist.
	        */
	    }, {
	        key: "seek",
	        value: function seek(time) {
	            _get(Object.getPrototypeOf(VideoSource.prototype), "seek", this).call(this);
	            var _this = this;

	            var seekVideo = function seekVideo() {
	                if (_this.element.readyState > 3) {
	                    _this.ready = true;
	                    if (time - _this.start < 0 || time > _this.start + _this.duration) {
	                        _this.element.currentTime = _this.sourceStart;
	                    } else {
	                        _this.element.currentTime = time - _this.start + _this.sourceStart;
	                    }
	                } else {
	                    //If the element isn't ready to seek create a one-time event which seeks the element once it is ready.
	                    console.debug("Can't seek video due to readyState");
	                    _this.ready = false;
	                    eventOneTime(_this.element, "canplay", seekVideo);
	                }
	            };

	            seekVideo();
	        }

	        /**
	        * Pause the VideoSource if it is playing.
	        */
	    }, {
	        key: "pause",
	        value: function pause() {
	            _get(Object.getPrototypeOf(VideoSource.prototype), "pause", this).call(this);
	            this.element.pause();
	        }

	        /**
	        * Set the VideoSource loading, when it's ready isReady() will return true.
	        */
	    }, {
	        key: "load",
	        value: function load() {
	            //check if we're using an already instatiated element, if so don't do anything.

	            if (_get(Object.getPrototypeOf(VideoSource.prototype), "load", this).call(this)) {
	                //this.element.currentTime = this.sourceStart;
	                this.seek(0);
	                this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.element);
	                this.ready = true;
	                this.width = this.element.videoWidth;
	                this.height = this.element.videoHeight;
	                this.onready(this);
	                return;
	            }
	            //otherwise begin the loading process for this mediaSource
	            this.element = document.createElement('video');
	            this.element.setAttribute("crossorigin", "anonymous");
	            //construct a fragement URL to cut the required segment from the source video
	            this.element.src = this.src;
	            this.element.volume = this._volume;
	            this.element.preload = "auto";
	            this.element.load();
	            var _this = this;
	            this.element.addEventListener('loadeddata', function () {
	                _this.element.currentTime = _this.sourceStart;
	                _this.seek(0);
	                _this.gl.texImage2D(_this.gl.TEXTURE_2D, 0, _this.gl.RGBA, _this.gl.RGBA, _this.gl.UNSIGNED_BYTE, _this.element);
	                _this.ready = true;
	                _this.width = _this.element.videoWidth;
	                _this.height = _this.element.videoHeight;
	                _this.onready(_this);
	            }, false);
	            /*this.element.addEventListener('seeked', function(){
	                console.log("SEEKED");
	                _this.ready = true;
	                _this.onready(_this);
	            })*/
	        }

	        /**
	        * Render the VideoSource to the WebGL context passed into the constructor.
	        */
	    }, {
	        key: "render",
	        value: function render(program, renderParameters, textures) {
	            this.element.playbackRate = renderParameters["playback_rate"];
	            _get(Object.getPrototypeOf(VideoSource.prototype), "render", this).call(this, program, renderParameters, textures);
	        }

	        /**
	        * Clean up the VideoSource for detruction.
	        */
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            this.element.pause();
	            if (this.disposeOfElementOnDestroy) {
	                this.element.src = "";
	                this.element.removeAttribute("src");
	            }
	            _get(Object.getPrototypeOf(VideoSource.prototype), "destroy", this).call(this);
	        }
	    }]);

	    return VideoSource;
	})(_mediasource2["default"]);

	exports["default"] = VideoSource;
	module.exports = exports["default"];

/***/ },
/* 2 */
/***/ function(module, exports) {

	//Matthew Shotton, R&D User Experince,© BBC 2015

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var MediaSource = (function () {
	    /**
	    * Parent class of all MediaSources 
	    *
	    * A MediaSource is the manifestation of a mediaSourceReference from a playlist object. It typically contains the 
	    * original DOM element to be composited along with a number of functions to load, play, pause, seek and render that 
	    * element to the webgl context.
	    * 
	    * A MediaSource exists for a period slightly before a MediaSource is to play in order to give it time to preload and
	    * is destroyed as soon as the MediaSource has finished playing.
	    *
	    * @param {Object} properties - An object with the following attributes: id, duration, start, and src or element. 
	    * Where src is the URL of something that can be used to create a DOM element that can be rendered to canvas, or 
	    * element is a DOM element that can be rendered to a canvas.
	    * 
	    * @param {WebGLContext} gl - a webGl context to render too.
	    */

	    function MediaSource(properties, gl) {
	        _classCallCheck(this, MediaSource);

	        this.gl = gl;
	        this.id = properties.id;
	        this.duration = properties.duration;
	        this.start = properties.start;
	        this.playing = false;
	        this.ready = false;
	        this.element = undefined;
	        this.src = undefined;
	        this.texture = undefined;
	        this.width = undefined;
	        this.height = undefined;
	        this.mediaSourceListeners = [];

	        this.disposeOfElementOnDestroy = false;

	        //If the mediaSource is created from a src string then it must be resonsible for cleaning itself up.
	        if (properties.src !== undefined) {
	            this.disposeOfElementOnDestroy = true;
	            this.src = properties.src;
	        } else {
	            //If the MediaSource is created from an element then it should not clean the element up on destruction as it may be used elsewhere.
	            this.disposeOfElementOnDestroy = false;
	            this.element = properties.element;
	        }

	        /*let positionLocation = gl.getAttribLocation(program, "a_position");
	        let texCoordLocation = gl.getAttribLocation(program, "a_texCoord");*/

	        //Hard Code these for now, but this is baaaaaad
	        var positionLocation = 0;
	        var texCoordLocation = 1;

	        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	        gl.enable(gl.BLEND);
	        // Create a texture.
	        this.texture = gl.createTexture();
	        gl.bindTexture(gl.TEXTURE_2D, this.texture);
	        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	        // Set the parameters so we can render any size image.
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

	        var buffer = gl.createBuffer();
	        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	        gl.enableVertexAttribArray(positionLocation);
	        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

	        gl.bufferData(gl.ARRAY_BUFFER,
	        /*new Float32Array([
	            1.0, 1.0,
	             -1.0, 1.0,
	            1.0,  -1.0,
	            1.0,  -1.0,
	            -1.0, 1.0,
	            -1.0, -1.0]),*/
	        new Float32Array([1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0]), gl.STATIC_DRAW);
	        gl.enableVertexAttribArray(texCoordLocation);
	        gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);
	    }

	    /**
	    * Set the MediaSource playing.
	    */

	    _createClass(MediaSource, [{
	        key: 'play',
	        value: function play() {
	            //console.log("Playing", this.id);
	            if (this.playing === false) {
	                for (var i = 0; i < this.mediaSourceListeners.length; i++) {
	                    if (typeof this.mediaSourceListeners[i].play === 'function') this.mediaSourceListeners[i].play(this);
	                }
	            }
	            this.playing = true;
	        }

	        /**
	        * Pause the MediaSource if it is playing.
	        */
	    }, {
	        key: 'pause',
	        value: function pause() {
	            console.debug("Pausing", this.id);
	            this.playing = false;
	            for (var i = 0; i < this.mediaSourceListeners.length; i++) {
	                if (typeof this.mediaSourceListeners[i].pause === 'function') this.mediaSourceListeners[i].pause(this);
	            }
	        }

	        /**
	        * Seek the MediaSource to an appropriate point for the passed time.
	        * @param {number} seekTime - The time to seek too, this is the overall time for the whole playlist.
	        */
	    }, {
	        key: 'seek',
	        value: function seek(seekTime) {
	            //this.currentTime = seekTime;
	            for (var i = 0; i < this.mediaSourceListeners.length; i++) {
	                if (typeof this.mediaSourceListeners[i].seek === 'function') this.mediaSourceListeners[i].seek(this, seekTime);
	            }
	        }

	        /**
	        * Check if the MediaSource is ready to start playing.
	        */
	    }, {
	        key: 'isReady',
	        value: function isReady() {
	            var listenerReady = true;
	            for (var i = 0; i < this.mediaSourceListeners.length; i++) {
	                if (typeof this.mediaSourceListeners[i].isReady === 'function') {
	                    if (this.mediaSourceListeners[i].isReady(this) === false) {
	                        listenerReady = false;
	                    }
	                }
	            }
	            if (listenerReady === true && this.ready === true) return true;
	            return false;
	        }

	        /**
	        * Set the MediaSource loading, when it's ready isReady() will return true.
	        */
	    }, {
	        key: 'load',
	        value: function load() {
	            console.debug("Loading", this.id);
	            for (var i = 0; i < this.mediaSourceListeners.length; i++) {
	                if (typeof this.mediaSourceListeners[i].load === 'function') this.mediaSourceListeners[i].load(this);
	            }
	            if (this.element !== undefined) {
	                return true;
	            }
	            return false;
	        }

	        /**
	        * Clean up the MediaSource for detruction.
	        */
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            console.debug("Destroying", this.id);
	            for (var i = 0; i < this.mediaSourceListeners.length; i++) {
	                if (typeof this.mediaSourceListeners[i].destroy === 'function') this.mediaSourceListeners[i].destroy(this);
	            }
	            if (this.disposeOfElementOnDestroy) {
	                delete this.element;
	            }
	        }

	        /**
	        * Render the MediaSource to the WebGL context passed into the constructor.
	        */
	    }, {
	        key: 'render',
	        value: function render(program, renderParameters, textures) {
	            //renders the media source to the WebGL context using the pased program
	            var overriddenElement = undefined;
	            for (var i = 0; i < this.mediaSourceListeners.length; i++) {
	                if (typeof this.mediaSourceListeners[i].render === 'function') {
	                    var result = this.mediaSourceListeners[i].render(this, renderParameters);
	                    if (result !== undefined) overriddenElement = result;
	                }
	            }

	            this.gl.useProgram(program);
	            var renderParametersKeys = Object.keys(renderParameters);
	            var textureOffset = 1;
	            for (var index in renderParametersKeys) {
	                var key = renderParametersKeys[index];
	                var parameterLoctation = this.gl.getUniformLocation(program, key);
	                if (parameterLoctation !== -1) {
	                    if (typeof renderParameters[key] === "number") {
	                        this.gl.uniform1f(parameterLoctation, renderParameters[key]);
	                    } else if (Object.prototype.toString.call(renderParameters[key]) === '[object Array]') {
	                        var array = renderParameters[key];
	                        if (array.length === 1) {
	                            this.gl.uniform1fv(parameterLoctation, array);
	                        } else if (array.length === 2) {
	                            this.gl.uniform2fv(parameterLoctation, array);
	                        } else if (array.length === 3) {
	                            this.gl.uniform3fv(parameterLoctation, array);
	                        } else if (array.length === 4) {
	                            this.gl.uniform4fv(parameterLoctation, array);
	                        } else {
	                            console.debug("Shader parameter", key, "is too long and array:", array);
	                        }
	                    } else {
	                        //Is a texture
	                        this.gl.activeTexture(this.gl.TEXTURE0 + textureOffset);
	                        this.gl.uniform1i(parameterLoctation, textureOffset);
	                        this.gl.bindTexture(this.gl.TEXTURE_2D, textures[textureOffset - 1]);
	                    }
	                }
	            }

	            this.gl.activeTexture(this.gl.TEXTURE0);
	            var textureLocation = this.gl.getUniformLocation(program, "u_image");
	            this.gl.uniform1i(textureLocation, 0);
	            this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
	            if (overriddenElement !== undefined) {
	                this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, overriddenElement);
	            } else {
	                this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.element);
	            }
	            this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
	        }
	    }, {
	        key: 'onready',
	        value: function onready(mediaSource) {}
	    }]);

	    return MediaSource;
	})();

	exports['default'] = MediaSource;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	//Matthew Shotton, R&D User Experince,© BBC 2015
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _mediasource = __webpack_require__(2);

	var _mediasource2 = _interopRequireDefault(_mediasource);

	var ImageSource = (function (_MediaSource) {
	    _inherits(ImageSource, _MediaSource);

	    /**
	    * Image playback source. Inherits from MediaSource 
	    *
	    * A ImageSource is the manifestation of a mediaSourceReference from a playlist object which has type "image". 
	    * 
	    * A ImageSource exists for a period slightly before a ImageSource is to play in order to give it time to preload and
	    * is destroyed as soon as the ImageSource has finished playing.
	    *
	    * @param {Object} properties - An object with the following attributes: id, duration, start, and src or element. 
	    * Where src is the URL of a video, or element is a DOM Video element.
	    * 
	    * @param {WebGLContext} gl - a webGl context to render too.
	    */

	    function ImageSource(properties, gl) {
	        _classCallCheck(this, ImageSource);

	        _get(Object.getPrototypeOf(ImageSource.prototype), "constructor", this).call(this, properties, gl);
	    }

	    /**
	    * Set the ImageSource playing.
	    */

	    _createClass(ImageSource, [{
	        key: "play",
	        value: function play() {
	            _get(Object.getPrototypeOf(ImageSource.prototype), "play", this).call(this);
	        }

	        /**
	        * Seek to playlist time and do something appropriate with this ImageSource. This has little effect on the image as it's 
	        * static but can affect any effect shaders applied to this image and any MediaSourceListeners listening to the Id of 
	        * this source.
	        * @param {number} seekTime - The time to seek too, this is the overall time for the whole playlist.
	        */
	    }, {
	        key: "seek",
	        value: function seek(time) {
	            _get(Object.getPrototypeOf(ImageSource.prototype), "seek", this).call(this, time);
	        }

	        /**
	        * Pause the ImageSource if it is playing.
	        */
	    }, {
	        key: "pause",
	        value: function pause() {
	            _get(Object.getPrototypeOf(ImageSource.prototype), "pause", this).call(this);
	        }

	        /**
	        * Set the ImageSource loading, when it's ready isReady() will return true.
	        */
	    }, {
	        key: "load",
	        value: function load() {
	            //check if we're using an already instatiated element, if so don't do anything.
	            if (_get(Object.getPrototypeOf(ImageSource.prototype), "load", this).call(this)) {
	                this.seek(0);
	                this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.element);
	                this.ready = true;
	                // Upload the image into the texture.
	                this.width = this.element.width;
	                this.height = this.element.height;
	                this.onready(this);
	                return;
	            }

	            //otherwise begin the loading process for this mediaSource
	            this.element = new Image();
	            var _this = this;
	            this.element.onload = function () {
	                _this.gl.texImage2D(_this.gl.TEXTURE_2D, 0, _this.gl.RGBA, _this.gl.RGBA, _this.gl.UNSIGNED_BYTE, _this.element);
	                _this.ready = true;
	                _this.onready(_this);
	                _this.width = _this.element.width;
	                _this.height = _this.element.height;
	            };
	            this.element.src = this.src;
	        }
	    }, {
	        key: "render",
	        value: function render(program, renderParameters, textures) {
	            _get(Object.getPrototypeOf(ImageSource.prototype), "render", this).call(this, program, renderParameters, textures);
	        }
	    }]);

	    return ImageSource;
	})(_mediasource2["default"]);

	exports["default"] = ImageSource;
	module.exports = exports["default"];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	//Matthew Shotton, R&D User Experince,© BBC 2015
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _mediasource = __webpack_require__(2);

	var _mediasource2 = _interopRequireDefault(_mediasource);

	var CanvasSource = (function (_MediaSource) {
	    _inherits(CanvasSource, _MediaSource);

	    /**
	    * Canvas playback source. Inherits from MediaSource 
	    *
	    * A CanvasSource is the manifestation of a mediaSourceReference from a playlist object which has type "canvas". 
	    * 
	    * A CanvasSource exists for a period slightly before a CanvasSource is to play in order to give it time to preload and
	    * is destroyed as soon as the CanvasSource has finished playing.
	    *
	    * @param {Object} properties - An object with the following attributes: id, duration, start, and element. 
	    * Where src is the URL of a video, or element is a DOM Video element.
	    * 
	    * @param {WebGLContext} gl - a webGl context to render too.
	    */

	    function CanvasSource(properties, gl) {
	        _classCallCheck(this, CanvasSource);

	        _get(Object.getPrototypeOf(CanvasSource.prototype), "constructor", this).call(this, properties, gl);
	        this.width = properties.width;
	        this.height = properties.height;
	    }

	    /**
	    * Set the CanvasSource playing.
	    */

	    _createClass(CanvasSource, [{
	        key: "play",
	        value: function play() {
	            _get(Object.getPrototypeOf(CanvasSource.prototype), "play", this).call(this);
	        }

	        /**
	        * Seek to playlist time and do something appropriate with this CavnasSource. This can effect shaders applied to this 
	        * canvas and any MediaSourceListeners listening to the Id of this source.
	        * @param {number} seekTime - The time to seek too, this is the overall time for the whole playlist.
	        */
	    }, {
	        key: "seek",
	        value: function seek(time) {
	            _get(Object.getPrototypeOf(CanvasSource.prototype), "seek", this).call(this, time);
	        }

	        /**
	        * Pause the CanvasSource if it is playing.
	        */
	    }, {
	        key: "pause",
	        value: function pause() {
	            _get(Object.getPrototypeOf(CanvasSource.prototype), "pause", this).call(this);
	        }

	        /**
	        * Set the CanvasSource loading, when it's ready isReady() will return true.
	        */
	    }, {
	        key: "load",
	        value: function load() {
	            //check if we're using an already instatiated element, if so don't do anything.
	            if (_get(Object.getPrototypeOf(CanvasSource.prototype), "load", this).call(this)) {
	                this.seek(0);
	                this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.element);
	                this.ready = true;
	                this.width = this.element.width;
	                this.height = this.element.height;
	                this.onready(this);
	                return;
	            }

	            //otherwise begin the loading process for this mediaSource
	            this.element = document.createElement("canvas");
	            this.element.width = this.width;
	            this.element.height = this.height;
	            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.element);
	            this.ready = true;
	            this.onready(this);
	        }
	    }, {
	        key: "render",
	        value: function render(program, renderParameters, textures) {
	            _get(Object.getPrototypeOf(CanvasSource.prototype), "render", this).call(this, program, renderParameters, textures);
	        }
	    }]);

	    return CanvasSource;
	})(_mediasource2["default"]);

	exports["default"] = CanvasSource;
	module.exports = exports["default"];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _effectJs = __webpack_require__(6);

	var _effectJs2 = _interopRequireDefault(_effectJs);

	var EffectManager = (function () {
	    function EffectManager(gl) {
	        _classCallCheck(this, EffectManager);

	        this.effects = new Map();
	        this.gl = gl;
	        //Setup the default effect
	        this.newEffect("default", { "effect": {} });
	    }

	    _createClass(EffectManager, [{
	        key: "newEffect",
	        value: function newEffect(id, playlistEffectObject) {
	            //The playlist effect object is the representation of the effect stored in the playlist object
	            var effect = new _effectJs2["default"](playlistEffectObject, this.gl);
	            this.effects.set(id, effect);
	        }
	    }, {
	        key: "updateEffects",
	        value: function updateEffects(playlistEffectObjects) {
	            if (playlistEffectObjects === undefined) return;
	            for (var key in playlistEffectObjects) {
	                if (this.effects.has(key)) {
	                    //udpate the effect
	                    this.effects.get(key).update(playlistEffectObjects[key]);
	                } else {
	                    //create the effect
	                    this.newEffect(key, playlistEffectObjects[key]);
	                }
	            }
	            //TODO clean-up effects that don't exist
	        }
	    }, {
	        key: "getEffectForInputId",
	        value: function getEffectForInputId(inputId) {
	            var effectIdList = this.effects.keys();
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = effectIdList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var key = _step.value;

	                    var effect = this.effects.get(key);
	                    if (effect.inputs.indexOf(inputId) > -1) {
	                        return effect;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator["return"]) {
	                        _iterator["return"]();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            return this.effects.get("default");
	        }
	    }]);

	    return EffectManager;
	})();

	exports["default"] = EffectManager;
	module.exports = exports["default"];

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function refreshTextures(playlistEffectObject, textures, gl) {
	    var textureOffset = 1;

	    if (playlistEffectObject.parameters === undefined) return;

	    var parameterKeys = Object.keys(playlistEffectObject.parameters);
	    for (var i = 0; i < parameterKeys.length; i++) {
	        var key = parameterKeys[i];
	        var parameter = playlistEffectObject.parameters[key];
	        if (typeof parameter !== "number") {
	            var texture = textures[textureOffset - 1];
	            gl.activeTexture(gl.TEXTURE0 + textureOffset);
	            gl.bindTexture(gl.TEXTURE_2D, texture);
	            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, parameter);
	            textureOffset += 1;
	        }
	    }
	}

	function loadTextures(playlistEffectObject, gl) {
	    if (playlistEffectObject.parameters === undefined) return [];
	    var parameterKeys = Object.keys(playlistEffectObject.parameters);
	    var textures = [];
	    for (var i = 0; i < parameterKeys.length; i++) {
	        var key = parameterKeys[i];
	        var parameter = playlistEffectObject.parameters[key];
	        if (typeof parameter !== "number") {
	            var texture = gl.createTexture();
	            textures.push(texture);
	        }
	    }
	    refreshTextures(playlistEffectObject, textures, gl);
	    return textures;
	}

	function compileShader(gl, shaderSource, shaderType) {
	    var shader = gl.createShader(shaderType);
	    gl.shaderSource(shader, shaderSource);
	    gl.compileShader(shader);
	    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	    if (!success) {
	        throw "could not compile shader:" + gl.getShaderInfoLog(shader);
	    }
	    return shader;
	}

	function createShaderProgram(gl, vertexShaderSource, fragmentShaderSource) {
	    var vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
	    var fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
	    var program = gl.createProgram();

	    gl.attachShader(program, vertexShader);
	    gl.attachShader(program, fragmentShader);
	    gl.linkProgram(program);

	    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
	        throw { "error": 4, "msg": "Can't link shader program for track", toString: function toString() {
	                return this.msg;
	            } };
	    }
	    return program;
	}

	var Effect = (function () {
	    function Effect(playlistEffectObject, gl) {
	        _classCallCheck(this, Effect);

	        this.gl = gl;
	        this.vertexShaderSrc = playlistEffectObject.effect.vertexShader;
	        if (this.vertexShaderSrc === undefined) {
	            this.vertexShaderSrc = "\
	                uniform float progress;\
	                uniform float duration;\
	                uniform vec2 source_resolution;\
	                uniform vec2 output_resolution;\
	                attribute vec2 a_position;\
	                attribute vec2 a_texCoord;\
	                varying vec2 v_texCoord;\
	                varying float v_progress;\
	                varying float v_duration;\
	                varying vec2 v_source_resolution;\
	                varying vec2 v_output_resolution;\
	                void main() {\
	                    v_progress = progress;\
	                    v_duration = duration;\
	                    v_source_resolution = source_resolution;\
	                    v_output_resolution = output_resolution;\
	                    gl_Position = vec4(vec2(2.0,2.0)*a_position-vec2(1.0, 1.0), 0.0, 1.0);\
	                    v_texCoord = a_texCoord;\
	                }";
	        }
	        this.fragmentShaderSrc = playlistEffectObject.effect.fragmentShader;
	        if (this.fragmentShaderSrc === undefined) {
	            this.fragmentShaderSrc = "\
	            precision mediump float;\
	            uniform sampler2D u_image;\
	            varying vec2 v_texCoord;\
	            varying float v_progress;\
	            varying float v_duration;\
	            varying vec2 v_source_resolution;\
	            varying vec2 v_output_resolution;\
	            void main(){\
	                gl_FragColor = texture2D(u_image, v_texCoord);\
	            }";
	        }

	        this.parameters = playlistEffectObject.parameters;
	        if (this.parameters === undefined) {
	            this.parameters = {};
	        }
	        if (playlistEffectObject.effect.defaultParameters !== undefined) {
	            for (var key in playlistEffectObject.effect.defaultParameters) {
	                if (this.parameters[key] === undefined) {
	                    this.parameters[key] = playlistEffectObject.effect.defaultParameters[key];
	                }
	            }
	        }
	        this.inputs = playlistEffectObject.inputs;
	        if (this.inputs === undefined) {
	            this.inputs = [];
	        }

	        this.textures = loadTextures(playlistEffectObject, this.gl);
	        this.program = createShaderProgram(this.gl, this.vertexShaderSrc, this.fragmentShaderSrc);
	    }

	    _createClass(Effect, [{
	        key: "update",
	        value: function update(playlistEffectObject) {
	            refreshTextures(playlistEffectObject, this.textures, this.gl);
	            this.inputs = playlistEffectObject.inputs;
	            if (this.inputs === undefined) {
	                this.inputs = [];
	            }
	        }
	    }]);

	    return Effect;
	})();

	exports["default"] = Effect;
	module.exports = exports["default"];

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function isIdInTrack(id, track) {
	    for (var i = 0; i < track.length; i++) {
	        if (track[i].id === id) {
	            return true;
	        }
	    }
	    return false;
	}

	function getTrackIndexsForId(id, tracks) {
	    var trackIndexs = [];
	    for (var i = 0; i < tracks.length; i++) {
	        var track = tracks[i];
	        if (isIdInTrack(id, track)) {
	            trackIndexs.push(i);
	        }
	    }
	    return trackIndexs;
	}

	var AudioManager = (function () {
	    function AudioManager(audioCtx) {
	        _classCallCheck(this, AudioManager);

	        this.audioCtx = audioCtx;
	        this.tracks = [];
	        this.audioNodes = new Map();
	        this.audioOutputNodes = [];
	    }

	    _createClass(AudioManager, [{
	        key: "createAudioNodeFromTrack",
	        value: function createAudioNodeFromTrack(track) {
	            if (this.audioCtx === undefined) {
	                // There can only be a max of 6 AudioContexts in most browsers, so only instantiate it here rather than in
	                // constructor as it's genuinley needed. Otherwise having >6 VideoCompositor instances running will break
	                // the browser.
	                this.audioCtx = new AudioContext();
	            }
	            this.tracks.push(track);
	            var trackBus = this.audioCtx.createGain();
	            this.audioOutputNodes.push(trackBus);
	            return trackBus;
	        }
	    }, {
	        key: "getAudioContext",
	        value: function getAudioContext() {
	            if (this.audioCtx === undefined) {
	                // There can only be a max of 6 AudioContexts in most browsers, so only instantiate it here rather than in
	                // constructor as it's genuinley needed. Otherwise having >6 VideoCompositor instances running will break
	                // the browser.
	                this.audioCtx = new AudioContext();
	            }
	            return this.audioCtx;
	        }
	    }, {
	        key: "removeFromCacheById",
	        value: function removeFromCacheById(id) {
	            var node = this.audioNodes.get(id);
	            node.disconnect();
	            this.audioNodes["delete"](id);
	        }
	    }, {
	        key: "clearAudioNodeCache",
	        value: function clearAudioNodeCache() {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.audioNodes.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var id = _step.value;

	                    this.removeFromCacheById(id);
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator["return"]) {
	                        _iterator["return"]();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }, {
	        key: "update",
	        value: function update(mediaSources, currentlyPlaying) {
	            var currentlyPlayingIds = [];
	            for (var i = 0; i < currentlyPlaying.length; i++) {
	                var mediaSourceRef = currentlyPlaying[i];
	                currentlyPlayingIds.push(mediaSourceRef.id);
	            }

	            if (mediaSources === undefined) return;
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = mediaSources.keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var id = _step2.value;

	                    var mediaSource = mediaSources.get(id);
	                    var trackIndexs = getTrackIndexsForId(id, this.tracks);
	                    if (trackIndexs.length === 0) {
	                        continue; //No mappings for this id
	                    }
	                    if (!this.audioNodes.has(id)) {
	                        //if an AudioNode for this id does not exist, create it.
	                        var audioNode = undefined;
	                        try {
	                            audioNode = this.audioCtx.createMediaElementSource(mediaSource.element);
	                        } catch (err) {
	                            continue;
	                        }

	                        this.audioNodes.set(id, audioNode);
	                        //make the connections from the audio node to the appropriate output tracks
	                        for (var i = 0; i < trackIndexs.length; i++) {
	                            var trackIndex = trackIndexs[i];
	                            audioNode.connect(this.audioOutputNodes[trackIndex]);
	                        }
	                    } else {}
	                }
	                //TODO add test to make sure all id's for audio nodes stored in this.audioNodes exist in the current mediaSources, otherwise delete them.
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
	                        _iterator2["return"]();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	        }
	    }]);

	    return AudioManager;
	})();

	exports["default"] = AudioManager;
	module.exports = exports["default"];

/***/ }
/******/ ]);