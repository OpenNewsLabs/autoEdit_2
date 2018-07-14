
/**
 * @todo: this function is repeated from Rev conversion. absract as own module
 * @param {stirng} timecodeStringHHMMSSFFF, eg '00:33:19,470' 
 * as described in their documentation https://www.rev.com/api/attachmentsgetcontent
 * timestamp format is hh:mm:sss,fff
 * where fff represents milliseconds 
 * @returns {number} - timecode in seconds 
 */
function timecodesToSeconds(timecodeStringHHMMSSFFF){
    var tcArray = timecodeStringHHMMSSFFF.split(":");
    var hoursInSeconds = parseInt(tcArray[0],10) * 60 * 60;
    var minutesInSeconds = parseInt(tcArray[1],10) * 60;
    // seconds and milliseconds are joined together for this calculation by replacing the comma with a full stop.
    var secondsAndMilliseconds = parseFloat(tcArray[2].replace(/,/,'.'));
    return hoursInSeconds+minutesInSeconds+secondsAndMilliseconds;
}

module.exports = timecodesToSeconds;