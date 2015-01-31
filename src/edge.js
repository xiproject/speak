var edge = require('edge');
var edgeSpeech = edge.func('cs', {
   	source: function() {/*

   	    #r "C:\Program Files\Reference Assemblies\Microsoft\Framework\v3.0\System.Speech.dll"
   	    
   	    using System.Speech.Synthesis;
	   
   	    async (input) => {
	       SpeechSynthesizer synth = new SpeechSynthesizer();
	       synth.Speak(input.ToString());
      	   return "Speech successfully played";
	    }
	*/}
});

module.exports.speak = function speak(input) {
	edgeSpeech(input, function(err, res) {
		if (err) throw err;
	});
};
