app.factory('TabFactory', function() {
	var baseNotes = [82.41, 110, 146.8, 196, 246.9, 329.6].reverse()
	var transport = Tone.Transport
	var TabFactory = {}
	TabFactory.play = function(tabList) {
		for (var note=0; note<tabList[0].length; note++) {
			var durationStr;
			for (var string=0; string<tabList.length; string++) {
				if (tabList[string][note].duration) {
					durationStr = tabList[string][note].duration.toString() + "n"
					if (tabList[string][note].fret) {
						var alteredPitch = baseNotes[string]*Math.pow(2, (tabList[string][note].fret)/12)
						var tone = new Tone.SimpleSynth().toMaster();
						tone.triggerAttackRelease(alteredPitch, durationStr)
					}
				}
			}
		}
	}
	return TabFactory
})