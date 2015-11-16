app.factory('TabFactory', function() {
	var baseNotes = [82.41, 110, 146.8, 196, 246.9, 329.6].reverse()
	var transport = Tone.Transport
	var TabFactory = {}
	function playColumn(note, tabList) {
		for (var string=0; string<tabList.length; string++) {
			if (tabList[string][note].duration) {
				var durationStr = tabList[string][note].duration.toString() + "n"
				if (tabList[string][note].fret) {
					var alteredPitch = baseNotes[string]*Math.pow(2, (tabList[string][note].fret)/12)
					var tone = new Tone.SimpleSynth().toMaster();
					tone.triggerAttackRelease(alteredPitch, durationStr)
				}
			}
		}
	}
	TabFactory.play = function(tabList) {
		var note = 0
		var intervalId = setInterval(function() {
			playColumn(note, tabList)
			note++
			if (note > tabList[0].length) {
				clearInterval(intervalId)
			}
		}, 250)

	}
	return TabFactory
})