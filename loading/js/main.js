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

var bubblebutt = document.querySelector("#typingBubbleSmall");
var checkBlack = document.querySelector("#checkBlack");
var checkWhite = document.querySelector("#checkWhite");
var failBlack = document.querySelector("#failBlack");
var failWhite = document.querySelector("#failWhite");
var reactAngry = document.querySelector(".react-angry");


var emitterSize = 500,
    dotQuantity = 10,
    dotSizeMin = 80,
    dotSizeMax = 80,
    explosionQuantity = 5;

var emitters = document.querySelectorAll(".emitter");

//just for this demo, we're making the emitters' size dynamic and we set xPercent/yPercent to -50 to accurately center it. Then we offset each by 100px in opposite directions.
TweenMax.set(emitters, {width:emitterSize, height:emitterSize, xPercent:-50, yPercent:-50});
TweenMax.set(emitters[0]);
// TweenMax.set(emitters[1], {x:100});

//the explosion array will store data for each explosion: the container element which we create, and the TimelineLite instance (the animation). That way, we can position the explosion whereve we want, and control the entire animation, like restart(), pause(), reverse(), whatever.
var explosions = [],
    currentExplosion = 0, //index number in the array corresponding to the current explosion. We'll increment it each time we play one.
    container, i;
for (i = 0; i < explosionQuantity; i++) {
  container = document.createElement("div");
  container.style.cssText = "position:absolute; left:0; top:0; overflow:visible; z-index:5000; pointer-events:none;";
  document.body.appendChild(container);
  explosions.push({
    container: container,
    animation: createExplosion(container)
  });
}

//this function does all the magic, creating dots, dropping them into the container, setting their initial properties and animation, then ultimately returning a TimelineLite instance.
function createExplosion(container) {
  var tl = new TimelineLite({paused:true}),
      dots = [],
      angle, length, dot, i, size;
  //create all the dots
  for (i = 0; i < dotQuantity; i++) {
    dot = document.createElement("div");
    dots.push(dot);
    dot.className = "react-angry";
    size = getRandom(dotSizeMin, dotSizeMax);
    container.appendChild(dot);
    angle = Math.random() * Math.PI * 2; //random angle
    //figure out the maximum distance from the center, factoring in the size of the dot (it must never go outside the circle), and then pick a random spot along that length where we'll plot the point. 
    length = Math.random() * (emitterSize / 2 - size / 2); 
    //place the dot at a random spot within the emitter, and set its size.
    TweenMax.set(dot, {
      x:Math.cos(angle) * length, 
      y:Math.sin(angle) * length, 
      width:size, 
      height:size, 
      xPercent:-50, 
      yPercent:-50,
      visibility:"hidden",
      force3D:true
    });
    //this is where we do the animation...
    tl.to(dot, 1 + Math.random(), {
      opacity:0,
      visibility:"visible",
      // physics2D:{
      //   angle:angle * 180 / Math.PI, //translate radians to degrees
      //   velocity:(100 + Math.random() * 300) * speed, //initial velocity
      //   gravity:700 * gravity
      // }
      x:Math.cos(angle) * length * 6, 
      y:Math.sin(angle) * length * 6
    }, 0);
  }
  tl.set(dots, {visibility:"hidden"}); //hide the dots at the end for improved performance (better than opacity:0 because the browser can ignore the elements)
  return tl;
}

//just pass in an element and it'll move the explosion container over its center and play the next explosion animation. 
function explode(element) {
  var bounds = element.getBoundingClientRect(),
      explosion;
  if (++currentExplosion === explosions.length) {
    currentExplosion = 0;
  }
  explosion = explosions[currentExplosion];
  TweenMax.set(explosion.container, {x:bounds.left + bounds.width / 2, y:bounds.top + bounds.height / 2});
  explosion.animation.restart();
}

function getRandom(min, max) {
  return min + Math.random() * (max - min);
}

//explode initially, and then whenever the user presses on the dot. 
reactAngry.onmousedown = function(){
	explode(emitters[0]);

}


