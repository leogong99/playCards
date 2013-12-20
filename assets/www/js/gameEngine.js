var lg = lg || {};

lg.gameEngine = new function(){
	return {
		start: function() {
			playDeckObj.init(1, true);
			playDeckObj.shuffleCard();
			var cards = playDeckObj.getDeckCard();
			for(var i = 0; i < 13; i++){

			}
		}
		
	}
};