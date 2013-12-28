var lg = lg || {};

lg.gameEngine = new function(){
	return {
		start: function() {
			playDeckObj.init(1, true);
			playDeckObj.shuffleCard();
			var cards = playDeckObj.getDeckCard();
			var cardStr = '';
			var rowWidth = $(window).width() * 0.8;
			var numberOfCards = 13;
			for(var i = 0; i < numberOfCards; i++){
				cardStr += '<img id="cards' + i +'" style="left:' + ( i * rowWidth / numberOfCards + rowWidth * 0.1) + 'px" class="cardsInHand" src="./img/cards/'+ (cards[i].rank + 1) + '_of_' + cards[i].color + '.png"/>';
			}
			$('#playerContent .cardContent').html(cardStr).width(rowWidth);
		}
		
	}
};