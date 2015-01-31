var xal = require('../../xal-javascript');
var os = require('os');
var fs = require('fs');

var speaking = true;
var speakingQueue = [];
var config = {};

var speaker = {
    speak: null
};

if (os.platform() === 'linux') {
    var say = require('say');
    speaker.speak = function(text) {
        return say('voice_default', text);
    }
} else if (os.platform() === 'darwin') {
    var say = require('say');
    speaker.speak = function(text) {
        return say('Vicki', text);
    }
} else if (os.platform() === 'win32') {
    var edge = require('./src/edge');
    speaker.speak = function(text) {
        return edge.speak(text);
    }
}

xal.on('xi.event.output.text', function(state, next) {
    //Getting the first one
    var text = state.get('xi.event.output.text')[0].value;
    speaker.speak(text);
});

xal.start({name: 'Speak'});
