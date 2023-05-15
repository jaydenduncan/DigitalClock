/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//														Tab Functions
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

function openTab(evt, tabName){
	// Declare all variables
	var i, tabcontent, tablinks;
	
	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	
	for(i = 0; i < tabcontent.length; i++){
		tabcontent[i].style.display = 'none';
	}
	
	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName('tablinks');
	
	for(i = 0; i < tablinks.length; i++){
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	
	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//														Time Functions
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function time(){
	var currentTimeDiv = document.getElementById("currentTimeDiv");
	
	var d = new Date();
	var s = d.getSeconds();
	var m = d.getMinutes();
	var h = d.getHours();
	
	currentTimeDiv.innerHTML = formatCurrentTime(s, m, h);
	
}

setInterval(time, 200);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//														Stopwatch Functions
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Stopwatch global variables

var swTime;
var swMinutes = 0;
var swSeconds = 0;
var swMilliseconds = 0;

function printStopwatch(){
	var timeSpace = document.getElementById("swTimeDiv");
	
	swMilliseconds++;
	
	if(swMilliseconds > 99){
		swMilliseconds = 0;
		swSeconds++;
	}
	
	if(swSeconds > 59){
		swSeconds = 0;
		swMinutes++;
	}
	
	//Format Time 
	var stringMinute;
	var stringSecond;
	var stringMillisecond;
	
	if(swMinutes < 10){
		stringMinute = formatTime(swMinutes);
	}
	else{
		stringMinute = swMinutes.toString();
	}
	
	if(swSeconds < 10){
		stringSecond = formatTime(swSeconds);
	}
	else{
		stringSecond = swSeconds.toString();
	}
	
	if(swMilliseconds < 10){
		stringMillisecond = formatTime(swMilliseconds);
	}
	else{
		stringMillisecond = swMilliseconds.toString();
	}
	
	//Print Time to Document
	timeSpace.innerHTML = stringMinute + ":" + stringSecond + "." + stringMillisecond;
	
}

function startStopwatch(){
	
	document.getElementById("startButton").onclick = "";
	
	swTime = setInterval(printStopwatch, 9.999999999999999908999);
}

function stopStopwatch(){
	clearInterval(swTime);
	
	document.getElementById("startButton").onclick = function(){
		startStopwatch();
	};
}

function resetStopwatch(){
	clearInterval(swTime);
	
	swMinutes = 0;
	swSeconds = 0;
	swMilliseconds = 0;
	
	var timeSpace = document.getElementById("swTimeDiv");
	timeSpace.innerHTML = "00:00.00";
	
	document.getElementById("startButton").onclick = function(){
		startStopwatch();
	};
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//														Timer Functions
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Timer global variables

var timerTime;
var timerMinutes = 0;
var timerSeconds = 0;
var timerMilliseconds = 0;

function setStartTime(){
	timerMinutes = document.getElementById("minutesInput").value;
	timerSeconds = document.getElementById("secondsInput").value;
	
	timerMilliseconds = 99;
	
	if(timerMinutes == null){
		timerMinutes = 0;
	}
	if(timerSeconds == null){
		timerSeconds = 0;
	}
	
	var timeSpace = document.getElementById("timerTimeDiv");
	var stringMinute = formatTime(timerMinutes);
	var stringSecond = formatTime(timerSeconds);
	var stringMillisecond = formatTime(timerMilliseconds);

	timeSpace.innerHTML = stringMinute + ":" + stringSecond;
	
	startTimer();
}

function printTimer(){
	var timeSpace = document.getElementById("timerTimeDiv");
	
	if((timerMinutes <= 0) && (timerSeconds <= 0)){
		flashTimer();
	}
	
	if((timerMinutes <= 0) && (timerSeconds <= 0) && (timerMilliseconds <= 0)){ 
		timeSpace.innerHTML = "00:00";
		stopTimer();
		return 0;
	}
	
	timerMilliseconds--;
	
	if(timerMilliseconds < 0){
		timerMilliseconds = 99;
		
		if(timerSeconds >= 0){
			timerSeconds--;
		}
	}
	
	if(timerSeconds < 0){
		timerSeconds = 59;
		
		if(timerMinutes > 0){
			timerMinutes--;
		}
	}
	
	//Format Time
	var stringMinute;
	var stringSecond;
	var stringMillisecond;
	
	if(timerMinutes < 10){
		stringMinute = formatTime(timerMinutes);
	}
	else{
		stringMinute = timerMinutes.toString();
	}
	
	if(timerSeconds < 10){
		stringSecond = formatTime(timerSeconds);
	}
	else{
		stringSecond = timerSeconds.toString();
	}
	
	if(timerMilliseconds < 10){
		stringMillisecond = formatTime(timerMilliseconds);
	}
	else{
		stringMillisecond = timerMilliseconds.toString();
	}
	
	//Print Time to Document
	timeSpace.innerHTML = stringMinute + ":" + stringSecond;
	
}

function startTimer(){
	
	clearFlash();
	
	document.getElementById("timerStartButton").onclick = "";
	
	timerTime = setInterval(printTimer, 9.999999999999999908999);
}

function stopTimer(){
	clearInterval(timerTime);
	
	document.getElementById("timerStartButton").onclick = function(){
		startTimer();
	};
}

function resetTimer(){
	clearInterval(timerTime);
	clearFlash();
	
	timerMinutes = 0;
	timerSeconds = 0;
	timerMilliseconds = 0;
	
	var timeSpace = document.getElementById("timerTimeDiv");
	
	//Print Time to Document
	timeSpace.innerHTML = "00:00";
	
	document.getElementById("timerStartButton").onclick = function(){
		setStartTime();
	};
}

//Make the timer blink upon ending
function flashTimer(){
	var timeDiv = document.getElementById("timerTimeDiv");
	
	timeDiv.style.animationName = "timerComplete";
	timeDiv.style.animationDuration = "0.2s";
	timeDiv.style.animationIterationCount = "infinite";
}

//Stop the blinking of the timer
function clearFlash(){
	var timeDiv = document.getElementById("timerTimeDiv");
	
	timeDiv.style.animationName = "";
}

//Function to help format the time
function formatTime(num){
	var timePiece = "";
	
	switch(num){
		case "0": case 0: case "":
			timePiece = "00";
			break;
		case "1": case 1:
			timePiece = "01";
			break;
		case "2": case 2:
			timePiece = "02";
			break;
		case "3": case 3:
			timePiece = "03";
			break;
		case "4": case 4:
			timePiece = "04";
			break;
		case "5": case 5:
			timePiece = "05";
			break;
		case "6": case 6:
			timePiece = "06";
			break;
		case "7": case 7:
			timePiece = "07";
			break;
		case "8": case 8:
			timePiece = "08";
			break;
		case "9": case 9:
			timePiece = "09";
			break;
		default:
			timePiece = num;
	}
	
	return timePiece;
}

function formatCurrentTime(secs, mins, hours){
	var currentTimeString = "";
	var s;
	var m;
	var h;
	var meridian = "";
	
	if(hours >= 12){
		meridian = "PM";
	}
	else{
		meridian = "AM";
	}
	
	if(secs < 10){
		s = "0" + secs;
	}
	else{
		s = secs;
	}
	
	if(mins < 10){
		m = "0" + mins;
	}
	else{
		m = mins;
	}
	
	hours = String(hours);
	
	switch(hours){
		case "0":
			h = "12";
			break;
		case "1": case "13":
			h = "1";
			break;
		case "2": case "14":
			h = "2";
			break;
		case "3": case "15":
			h = "3";
			break;
		case "4": case "16":
			h = "4";
			break;
		case "5": case "17":
			h = "5";
			break;
		case "6": case "18":
			h = "6";
			break;
		case "7": case "19":
			h = "7";
			break;
		case "8": case "20":
			h = "8";
			break;
		case "9": case "21":
			h = "9";
			break;
		case "22":
			h = "10";
			break;
		case "23":
			h = "11";
			break;
		default:
			h = hours;
	}
	
	currentTimeString += h + ":" + m + ":" + s + " " + meridian;
	
	return currentTimeString;
	
}