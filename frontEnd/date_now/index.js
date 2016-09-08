//date.now

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;//January is 0!
var yyyy = today.getFullYear();

if(dd<10){
    dd='0'+dd
} 
if(mm<10){
    mm='0'+mm
} 

var hours = today.getHours()
var minutes = today.getMinutes()
var milliseconds = today.getMilliseconds()

// var TODAY = dd+'-'+mm+'-'+yyyy+" "+hours+":"+minutes+":"+milliseconds;

// var TODAYFILENAME = dd+'_'+mm+'_'+yyyy+"_"+hours+"-"+minutes+"-"+milliseconds;


//TODO: change router pre-fill form with one of these functions so that is generated when opening form and not when starting app. 


function timeNowFileName(){
	var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;//January is 0!
var yyyy = today.getFullYear();

if(dd<10){
    dd='0'+dd
} 
if(mm<10){
    mm='0'+mm
} 

var hours = today.getHours()
var minutes = today.getMinutes()
var milliseconds = today.getMilliseconds()

// var TODAY = dd+'-'+mm+'-'+yyyy+" "+hours+":"+minutes+"."+milliseconds;

var TODAYFILENAME = dd+'_'+mm+'_'+yyyy+"_"+hours+"-"+minutes+"-"+milliseconds;



	return TODAYFILENAME;
}

function getTimeNow(){

	var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;//January is 0!
var yyyy = today.getFullYear();

if(dd<10){
    dd='0'+dd
} 
if(mm<10){
    mm='0'+mm
} 

var hours = today.getHours()
var minutes = today.getMinutes()
var milliseconds = today.getMilliseconds()

var TODAY = dd+'-'+mm+'-'+yyyy+" "+hours+":"+minutes+":"+milliseconds;

// var TODAYFILENAME = dd+'_'+mm+'_'+yyyy+"_"+hours+"-"+minutes+"-"+milliseconds;



	return TODAY;
}