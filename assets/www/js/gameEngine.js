var lg = lg || {};

lg.gameEngine = new function(){
	return {
		start: function() {
			playDeckObj.init(1, true);
			playDeckObj.shuffleCard();
			var cards = playDeckObj.getDeckCard();
			var cardStr = '';
			for(var i = 0; i < 13; i++){
				cardStr += '<img id="cards' + i +'" class="cardsInHand" src="./img/cards/'+ (cards[i].rank + 1) + '_of_' + cards[i].color + '.png"/>';
			}
			$('#playerContent').html(cardStr);
		}
		
	}
};