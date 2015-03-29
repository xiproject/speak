var xal = require('../../xal-javascript');
var os = require('os');
var fs = require('fs');
var config = require('./config.json');
var speaking = true;
var speakingQueue = [];
var speaker = {
    speak: null,
    stop: function() {}
};

if (os.platform() === 'linux') {
    var say = require('say');
    var i, stt;
    for (i = 0; i < config.linux.length; i += 1) {
        if (config.linux[i].use) {
            stt = config.linux[i];
        }
    }
    if (!stt) {
        xal.log.fatal('Implementation not set for speak. Please check config.json');
    }

    if (stt.implementation === 'festival') {
        speaker.speak = function(text) {
            return say.speak(stt.voice, text);
        };
    } else if (stt.implementation === 'google') {
        speaker.speak = function(text) {
            return say.speak(stt.implementation, text);
        };

    } else {
        xal.log.fatal('Given implementation does not exist');
    }

    speaker.stop = say.stop;
} else if (os.platform() === 'darwin') {
    say = require('say');
    speaker.speak = function(text) {
        return say.speak(config.darwin.voice, text);
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
    next(state);
});

xal.on('xi.event.input.text', function(state, next) {
    var text = state.get('xi.event.input.text')[0].value;
    if (text.match(/stop speaking|shut up|be silent|be quiet/i)) {
        speaker.stop();
    }
    next(state);
});

xal.start({
    name: 'Speak'
});
