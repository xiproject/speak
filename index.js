var xal = require('../../xal-javascript');
var os = require('os');
var fs = require('fs');

var speaking = true;
var speakingQueue = [];
var config = {};

var speaker = {
    speak: null,
    stop: function() {}
};

if (os.platform() === 'linux') {
    var say = require('say');
    speaker.speak = function(text) {
        return say.speak('tts', text);
    };
    speaker.stop = say.stop;
} else if (os.platform() === 'darwin') {
    say = require('say');
    speaker.speak = function(text) {
        return say.speak('Vicki', text);
    };
    speaker.stop = say.stop;
} else if (os.platform() === 'win32') {
    var edge = require('./src/edge');
    speaker.speak = function(text) {
        return edge.speak(text);
    };
}

xal.on('xi.event.output.text', function(state, next) {
    //Getting the first one
    var text = state.get('xi.event.output.text')[0].value;
    speaker.speak(text);
});

xal.on('xi.event.input.text', function(state, next) {
    var text = state.get('xi.event.input.text')[0].value;
    if (text.match(/stop speaking|shut up|silent|quiet/i)) {
        speaker.stop();
    }
});

xal.start({name: 'Speak'});
