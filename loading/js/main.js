var disco = document.getElementById("disco");
var reflection = document.getElementById("reflection");

disco.onmousedown = function(){
	TweenMax.to(disco, .2, {scale:.8, onComplete:fullsizedisco});
}

disco.onmouseup = function(){
	TweenMax.to(disco, 2, {top:700, ease:Back.easeOut.config(1), onComplete:returndisco});
	TweenMax.to(reflection, 2, {top:700, ease:Back.easeOut.config(1), onComplete:returnreflection});
}

function fullsizedisco(){
	TweenMax.to(disco, .2, {scale:1});
}

function returndisco(){
	TweenMax.to(disco, 1, {top:10, ease:Back.easeInOut});
}

function returnreflection(){
	TweenMax.to(reflection, 1, {top:10, ease:Back.easeInOut});
}