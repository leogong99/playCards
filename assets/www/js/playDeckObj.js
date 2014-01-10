
var playDeckObj = new function(){
	'use strict'
	this.deckCard = [];
	this.isIncludeJoker = true;
	this.numOfSet = 0;
	
	this.shuffleRegularCard = function(numofColors){
		for(var n = 0; n < NUMOFCARDSINONESET; n++) {
			var card = new playCardObj();
			card.initial(parseInt(n/numofColors), COLORFORCARDS[n%numofColors]);
			this.deckCard.push(card);
		}
	};
	this.shuffleJokerCard = function(numofJokers){
		for(var n = 0; n < NUMOFJOKERINONESET; n++) {
			var joker = new playCardObj();
			joker.initial(14 + n, COLORFORJOKERS[n%numofJokers]);
			this.deckCard.push(joker);
		}
	};
	this.init = function(sets, isIncludeJoker) {
		var m = 0,
			n = 0,
			numofColors = COLORFORCARDS.length,
			numofJokers = COLORFORJOKERS.length;
		//setup each set
		for(m = 0; m < sets; m++) {
			//setup each card in one set
			this.shuffleRegularCard(numofColors);
			if(isIncludeJoker) {
				this.shuffleJokerCard(numofJokers);
			}
		}
		this.shuffleCard();
		return this.deckCard;
	};

	var swapArrayElement = function(arr, c1, c2) {
		var tmpCard = new playCardObj();
		tmpCard.initial(arr[c1].rank, arr[c1].color);
		arr[c1] = arr[c2];
		arr[c2] = tmpCard;
	}

	this.shuffleCard = function(){
		this.deckCard = _.shuffle(this.deckCard);
	};
	this.getDeckCard = function(){
		return this.deckCard;
	};
	this.releaseCard = function() {
		return this.deckCard.pop();
	};
	this.getNumofCardsLeft = function() {
		return this.deckCard.length;
	}
};