var player = function() {
	'use strict'
	this.cardsInHands = [];
	this.position = 0;
};

player.prototype.insertCards = function(card) {
	var cardLength = this.cardsInHands.length;
	var i = 0;
	if(cardLength === 0) {
		this.cardsInHands.push(card);
	} else {
		for(i = 0; i < cardLength; i++) {
			if(card.rank < this.cardsInHands.rank) {
				this.cardsInHands.splice(i, 0, card);
			}
		}
		if(i == cardLength) {
			this.cardsInHands.push(card);
		}
	}
};

player.prototype.getCards = function() {
	return this.cardsInHands;
};