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

xal.on('xi.event.output.text', function(state, next) {
    //Getting the first one
    var text = state.get('xi.event.output.text')[0].value;
    var voice;
    if(config.voice){
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
    say.speak(voice ,text);
});

xal.start({name: 'Speak'});
