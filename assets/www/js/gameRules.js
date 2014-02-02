lg.gameRules = new function(){
	var _isValidSingle = function(selectCard) {
		if(cardsonTableLength === 0) {
			return true;
		} else if(cardsonTableLength === 1) {
			return selectCard[0].rank > cardsonTable[0].rank;
		} else {
			return false;
		}
	};

	var _isValidPair = function(selectCard) {
		if(cardsonTableLength === 0) {
			return true;
		} else if(selectCardLength !== cardsonTableLength) {
			return false;
		} else {
			return selectCard[0].rank > cardsonTable[0].rank;
		}
	};

	var _isValidPlane = function(selectCard) {
		if(cardsonTableLength < 6 || selectCardLength < 6 || cardsonTableLength !== selectCardLength) {
			return false;
		} else if (selectCard[0].rank <= cardsonTable[0].rank) {
			return false;
		} else if(selectCard[0].rank === selectCard[1].rank) {
			var numofSame = 1;
			var findMax = false;
			for(var i = 1; i < selectCardLength; i++) {
				if(selectCard[i - 1].rank === selectCard[i].rank) {
					numofSame = findMax? numofSame : numofSame++;
				} else if(selectCard[i - 1].rank == selectCard[i].rank - 1){
					findMax = true;
					if((i % numofSame) !== 0) {
						return false;
					}
				} else {
					return false;
				}
			}
			return true;
		} else {
			return false;
		}
	};

	var _isValidTriplePlusTwo = function(selectCard) {
		if(cardsonTableLength !== 5 || selectCardLength !== 5) {
			return false;
		} else if(selectCard[0].rank !== selectCard[2].rank && selectCard[2].rank !== selectCard[4].rank) {
			return false;
		} else if (cardsonTable[0].rank !== cardsonTable[2].rank && cardsonTable[2].rank !== cardsonTable[4].rank) {
			return false;
		} else if(cardsonTable[2].rank >= selectCard[2].rank) {
			return false;
		}
		return true;
	}

	var _isValidPlay = function(selectCard) {
		var selectCardLength = selectCard.length;
		var cardsonTableLength = cardsonTable.length;

		//If only one card.
		if(selectCardLength === 1) {
			return _isValidSingle(selectCard);
			
		} else if(selectCard[0].rank === selectCard[selectCardLength - 1]) { //pair, triple or all same number cards.
			return _isValidPair(selectCard);
		} else if(selectCardLength === 5) {
			return _isValidTriplePlusTwo(selectCard);
		} else if(selectCard[0].rank === selectCard[1].rank && selectCard[1].rank === selectCard[2].rank) { //if is 778899 or 777888
			return _isValidPlane(selectCard);
		}
	};
	return {
		isValidPlay: _isValidPlay
	};
};