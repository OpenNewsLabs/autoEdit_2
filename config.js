var path               = require('path');
// https://nodejs.org/api/path.html#path_path_resolve_paths
// var appDir = path.resolve("./package.json");

// const {app} = require('electron');
var ffmpegPath        = require('ffmpeg-static-electron').path;
var ffprobePath       = require('ffprobe-static-electron').path;

module.exports = {
  serverUrl: 'http://localhost:3000/api',
  // appName: 'autoEdit 2',
  ffmpegPath: ffmpegPath,
  ffprobePath: ffprobePath,
  links: {
    donate: 'https://donorbox.org/c9762eef-0e08-468e-90cb-2d00643697f8?recurring=true',
    projectPage: 'http://www.autoedit.io',
    mailingList: 'http://eepurl.com/cMzwSX',
    twitter: 'https://twitter.com/autoEdit2',
    facebook: 'https://www.facebook.com/autoEdit.io/',
    email: 'mailto:pietro@autoEdit.io?Subject=autoEdit%202'  ,
    userManual: 'https://autoedit.gitbook.io/user-manual',
    sttSetup: 'https://autoedit.gitbook.io/user-manual/setup-stt-apis',
    sttSetupIBM: 'https://autoedit.gitbook.io/user-manual/setup-stt-apis/setup-stt-apis-ibm'
  }
};
