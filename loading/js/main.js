var disco = document.getElementById("disco");
var reflection = document.getElementById("reflection");

disco.onmousedown = function(){
	TweenMax.to(disco, .2, {scale:.8, onComplete:fullsizedisco});
	TweenMax.to(reflection, .2, {scale:1.7, onComplete:fullsizereflection});
}

disco.onmouseup = function(){
	TweenMax.to(disco, 2, {top:700, ease:Back.easeOut.config(1), onComplete:returndisco});
	TweenMax.to(reflection, 2, {top:720, ease:Back.easeOut.config(1), onComplete:returnreflection});
}

function fullsizedisco(){
	TweenMax.to(disco, .2, {scale:1});
}

function fullsizereflection(){
	TweenMax.to(reflection, .2, {scale:1.5});
}

function returndisco(){
	TweenMax.to(disco, 1, {top:10, ease:Back.easeInOut});
}

function returnreflection(){
	TweenMax.to(reflection, 1, {top:20, ease:Back.easeInOut});
}

var botSpin = document.querySelector("#botSpin");
var botTalk = document.querySelector("#botTalk");
var bot = document.querySelector("#bot");
var pulseDark = document.querySelector("#pulseDark");
var pulseLight = document.querySelector("#pulseLight");

var spin = TweenMax.from(botSpin, 0.8, {backgroundPosition:"1840px", paused:true, ease:SteppedEase.config(23)});

var showtalk = TweenMax.from(botTalk, 0, {opacity:0, paused:true, delay:0.7});
var starttalk = TweenMax.from(botTalk, 0.8, {repeat:2, backgroundPosition:"1520px", paused:true, ease:SteppedEase.config(19), delay:.7});
var hidetalk = TweenMax.to(botTalk, 0, {opacity:0, paused:true, delay:3.2});

var showbot = TweenMax.from(bot, 0, {opacity:0, paused:true, delay:3.2});
var hidebot = TweenMax.to(bot, 2, {opacity:0, paused:true, delay:5});

var showpulsedark = TweenMax.from(pulseDark, 2, {opacity:0, paused:true, delay:2});
var hidepulsedark = TweenMax.to(pulseDark, 2, {opacity:0, paused:true, delay:5});

var showpulselight = TweenMax.from(pulseLight, 2, {opacity:0, paused:true, delay:2});
var hidepulselight = TweenMax.to(pulseLight, 2, {opacity:0, paused:true, delay:5});


botbutt.onmousedown = function(){
	spin.restart();
	starttalk.restart(true);
	showtalk.restart(true);
	hidetalk.restart(true);
	showbot.restart(true);
	hidebot.restart(true);
	showpulsedark.restart(true);
	showpulselight.restart(true);
	hidepulsedark.restart(true);
	hidepulselight.restart(true);
}




// var tl = new TimelineMax();
// 
// tl.from(botSpin, 0.8, {backgroundPosition:"1840px", paused:true, ease:SteppedEase.config(23)});	
// tl.to(botSpin, 0.8, {backgroundPosition:"-1840px", paused:true, ease:SteppedEase.config(23)});	
// 
// tl.to(botTalk, 0, {opacity:1});
// tl.from(botTalk, 0.8, {repeat:2, backgroundPosition:"1520px", paused:true, ease:SteppedEase.config(19), delay:0.8});
// 
// 
// botbutt.onmousedown = function(){
// 	tl.play();
// }
