var NUMOFCARDSINONESET = 52;
var NUMOFJOKERINONESET = 2;
var COLORFORCARDS = ['heart', 'spade', 'club', 'diamond'];
var COLORFORJOKERS = ['black', 'red'];
var playDeckObj = new function(){
	'use strict'
	this.deckCard = [];
	this.isIncludeJoker = true;
	this.numOfSet = 0;
	
	
	this.init = function(sets, isIncludeJoker) {
		var m = 0,
			n = 0,
			numofColors = COLORFORCARDS.length,
			numofJokers = COLORFORJOKERS.length;
		//setup each set
		for(m = 0; m < sets; m++) {
			//setup each card in one set
			for(n = 0; n < NUMOFCARDSINONESET; n++) {
				var card = new playCardObj();
				card.initial(parseInt(n/numofColors), COLORFORCARDS[n%numofColors]);
				this.deckCard.push(card);
			}
			if(isIncludeJoker) {
				for(n = 0; n < NUMOFJOKERINONESET; n++) {
					var joker = new playCardObj();
					joker.initial(parseInt(n/numofJokers), COLORFORJOKERS[n%numofJokers]);
					this.deckCard.push(joker);
				}
			}
		}
	};

	var swapArrayElement = function(arr, c1, c2) {
		var tmpCard = new playCardObj();
		tmpCard.initial(arr[c1].rank, arr[c1].color);
		arr[c1] = arr[c2];
		arr[c2] = tmpCard;
	}

	this.shuffleCard = function(){
		var i = 0,
			numofCardsLeft = this.deckCard.length;
		for(i = 0; i < numofCardsLeft; i++) {
			var randomCardInx = Math.floor(Math.random()*numofCardsLeft);
			swapArrayElement(this.deckCard, i, randomCardInx);
		}
	};
	this.getDeckCard = function(){
		return this.deckCard;
	};
};