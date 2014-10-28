var xal = require('../../xal-javascript');
var say = require('say');
var os = require('os');
var fs = require('fs');

var speaking = true;
var speakingQueue = [];
var config = {};

if(fs.existsSync("./config.json")){
    config = require("./config.json");
}

function speak () {
    if (!speaking) {
	speakingQueue = [];
	return;
    }
    if (speakingQueue.length === 0) {
	setTimeout(speak, 200);
	return;
    }
    else {
	console.log("Speak: ", speakingQueue[0].text);
        var voice;
        if( config.voice){
            voice = config.voice;
        }
        else{
            if(os.platform() === 'linux'){
                voice = "voice_default";
            }
            else if( os.platform() === 'darwin'){
                voice = "Vicki";
            }
        }
        say.speak(voice , speakingQueue[0].text);
	setTimeout(speak, speakingQueue[0].time);
	if (speakingQueue[0].cb)
	    setTimeout(speakingQueue[0].cb, speakingQueue[0].time * 0.95);
	speakingQueue.splice(0, 1);
    }
}

speak();

xal.on('xi.event.output.text', function(state, next) {
    //Getting the first one
    var text = state.get('xi.event.output.text')[0].value;
    var numWords = text.split(/ |\.|,|:|\d/).length;
    speakingQueue.push({
	text: text,
	time: (text.length / 4.0 * 300) + (numWords * 4000 / text.length)
    });
    next(state);
});

xal.start({name: 'Speak'});
