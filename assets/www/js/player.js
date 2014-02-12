var player = function(agressive) {
	'use strict'
	this.cardsInHands = [];
	this.position = 0;
	this.agressive = agressive;
};

player.prototype.insertCards = function(card) {
	var cardLength = this.cardsInHands.length;
	var i = 0;
	if (cardLength === 0) {
		this.cardsInHands.push(card);
		return 0;
	} else {
		for (i = 0; i < cardLength; i++) {
			if (card.rank < this.cardsInHands[i].rank) {
				this.cardsInHands.splice(i, 0, card);
				return i;
			}
		}
		if (i == cardLength) {
			this.cardsInHands.push(card);
			return i;
		}
	}
};
player.prototype.getCards = function() {
	return this.cardsInHands;
};

player.prototype.getNumofCards = function() {
	return this.cardsInHands.length;
}
player.prototype.aiPlayFirstPlay = function(players) {
	var minCards = 100;
	var i = 0;
	for (i = 0; i < players.length; i++) {
		var thisPlayerNumofCards = players[i].getNumofCards();
		minCards = minCards > thisPlayerNumofCards ? thisPlayerNumofCards : minCards;
	}



};
player.prototype.removeCards = function(cards) {
	this.cardsInHands = _.without(this.cardsInHands, cards);
};