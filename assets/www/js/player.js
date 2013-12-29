var player = function() {
	'use strict'
	var cardsInHands = [];
	var position = 0;
};

player.prototype.getCards = function(card) {
	this.cardsInHands.push(card);
};

player.prototype.insertCards = function(card) {
	var cardLength = this.cardsInHands.length;
	var i = 0;
	for(i = 0; i < cardLength; i++) {
		if(card.rank < this.cardsInHands.rank) {
			this.cardsInHands.splice(i, 0, card);
		}
	}
};