lg.gameRules = new function(){
	var _isValidSingle = function(selectCard) {
		return selectCard.length === 1;
	};

	var _isValidPair = function(selectCard) {
		var selectCardLength = selectCard.length;
		return selectCardLength > 1 && selectCard[0].rank === selectCard[selectCardLength - 1].rank;
	};

	var _isValidPlane = function(selectCard) {
		var selectCardLength = selectCard.length;
		if(selectCardLength < 6) {
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
		var selectCardLength = selectCard.length;
		if(selectCardLength !== 5) {
			return false;
		} else if(selectCard[0].rank === selectCard[2].rank && selectCard[3].rank == selectCard[4].rank) {
			return true;
		} else if(selectCard[2].rank === selectCard[4].rank && selectCard[0].rank == selectCard[1].rank) {
			return true;
		}
		return false;
	};
	var _isValidStraight = function(selectCard) {
		var selectCardLength = selectCard.length;
		if(selectCardLength < 6) {
			return false;
		} else {
			for(var i = 1; i < selectCardLength; i++) {
				if(selectCard[i - 1].rank != selectCard[i].rank + 1) {
					return false;
				}
			}
			return true;
		}
		return false;
	};
	var _isValidBomb = function(selectCard) {
		var selectCardLength = selectCard.length;
		if(selectCardLength === 4) {
			if(selectCard[0].rank === selectCard[3].rank) {
				return true;
			}
		} else if(selectCard[0].color == 'black' && selectCard[1].color == 'red'){
			return true;
		}
		return false;
	}

	var _isValidFirstPlay = function(selectCard) {
		var selectCardLength = selectCard.length;
		if(selectCardLength === 1) {
			return 'single';
		} else if(_isValidPair(selectCard)) {
			return 'pair';
		} else if(_isValidBomb(selectCard)) {
			return 'bomb';
		} else if(_isValidStraight(selectCard)) {
			return 'straight';
		} else if(_isValidTriplePlusTwo(selectCard)) {
			return 'fullHouse';
		} else if(_isValidPlane(selectCard)) {
			return 'plain';
		}
		return false;
	};

	var _isValidPlay = function(selectCard, playCase) {
		var selectCardLength = selectCard.length;
		//If only one card.
		switch(playCase) {
			case 'single':
				return _isValidSingle(selectCard);
			case 'pair':
				return _isValidPair(selectCard);
			case 'fullHouse':
				return _isValidTriplePlusTwo(selectCard);
			case 'bomb':
				return _isValidBomb(selectCard);
			case 'straight':
				return _isValidStraight(selectCard);
			case 'plain':
				return _isValidPlane(selectCard);
		}
		return false;
	};
	return {
		isValidPlay: _isValidPlay,
		isValidFirstPlay: _isValidFirstPlay
	};
};