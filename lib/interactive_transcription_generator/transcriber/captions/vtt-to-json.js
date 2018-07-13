const fs = require('fs');

function convert(filePath){
    console.log(openFile(filePath));
    // return openFile(filePath);
}

function openFile(filePath){
    return fs.readFileSync(filePath).toString('utf8');
}

module.exports = convert;


const vttSamplePath = '/Users/pietropassarelli/Movies/Panel\ -\ Tools\ for\ Reporting\ \&\ Storytelling-esWq8z9G-24.en.vtt';
convert(vttSamplePath);