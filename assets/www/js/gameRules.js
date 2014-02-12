lg.gameRules = new function() {
	var _isValidSingle = function(selectCard) {
		return selectCard.length === 1;
	};

	var _isValidPair = function(selectCard) {
		var selectCardLength = selectCard.length;
		return selectCardLength > 1 && selectCard[0].rank === selectCard[selectCardLength - 1].rank;
	};

	var _isValidPlane = function(selectCard) {
		var selectCardLength = selectCard.length;
		if (selectCardLength < 6) {
			return false;
		} else if (selectCard[0].rank === selectCard[1].rank) {
			var numofSame = 1;
			var findMax = false;
			for (var i = 1; i < selectCardLength; i++) {
				if (selectCard[i - 1].rank === selectCard[i].rank) {
					numofSame = findMax ? numofSame : numofSame++;
				} else if (selectCard[i - 1].rank == selectCard[i].rank - 1) {
					findMax = true;
					if ((i % numofSame) !== 0) {
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
		if (selectCardLength !== 5) {
			return false;
		} else if (selectCard[0].rank === selectCard[2].rank && selectCard[3].rank == selectCard[4].rank) {
			return true;
		} else if (selectCard[2].rank === selectCard[4].rank && selectCard[0].rank == selectCard[1].rank) {
			return true;
		}
		return false;
	};
	var _isValidStraight = function(selectCard) {
		var selectCardLength = selectCard.length;
		if (selectCardLength < 5) {
			return false;
		} else {
			for (var i = 1; i < selectCardLength; i++) {
				if (selectCard[i - 1].rank != selectCard[i].rank - 1) {
					return false;
				}
			}
			return true;
		}
		return false;
	};
	var _isValidBomb = function(selectCard) {
		var selectCardLength = selectCard.length;
		if (selectCardLength === 4) {
			if (selectCard[0].rank === selectCard[3].rank) {
				return true;
			}
		} else if (selectCard[0].color == 'black' && selectCard[1].color == 'red') {
			return true;
		}
		return false;
	}

	var _isValidFirstPlay = function(selectCard) {
		var selectCardLength = selectCard.length;
		if (selectCardLength === 1) {
			return 'single';
		} else if (_isValidPair(selectCard)) {
			return 'pair';
		} else if (_isValidBomb(selectCard)) {
			return 'bomb';
		} else if (_isValidStraight(selectCard)) {
			return 'straight';
		} else if (_isValidTriplePlusTwo(selectCard)) {
			return 'fullHouse';
		} else if (_isValidPlane(selectCard)) {
			return 'plain';
		}
		return false;
	};

	var _isValidPlay = function(selectCard, playCase) {
		var selectCardLength = selectCard.length;
		//If only one card.
		switch (playCase) {
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

	var _isLargerthanTableCards = function(selectCard, tableCard, playCase) {
		if (_isValidBomb(selectCard) && playCase !== bomb) {
			return true;
		}
		switch (playCase) {
			case 'single':
			case 'bomb':
			case 'straight':
			case 'plain':
			case 'pair':
				return selectCard[0].rank > tableCard[0].rank;
			case 'fullHouse':
				return selectCard[2].rank > tableCard[2].rank;
		}
		return false;
	};
	var _rebuildCards = function(cardsinHand) {
		var i = 0;
		var m = 0;
		var cardObj = [{
			card: [cardsinHand[i]],
			count: 1
		}];

		for (i = 1; i < cardsinHand.length; i++) {
			if (cardObj[m].card[0].rank === cardsinHand[i].rank) {
				cardObj.push(cardsinHand[i]);
				cardObj[m].count++;
			} else {
				cardObj.push({
					card: [cardsinHand[i]],
					count: 1
				});
			}
		}

		return cardObj;
	};

	var _isTherePlain = function(cardObj) {
		var count = 0;
		var inx = 0;
		var cards = [];
		for (inx = 0; inx < cardObj.length; i++) {
			if (cardObj[inx].count === 3) {
				count++;
				cards.concate(cardObj[inx].card);
			} else if (count > 1) {
				if (inx > cardObj.length - 3 && cardObj.length > 5) {
					return [];
				} else {
					return cards;
				}
			} else {
				cards = [];
				count = 0;
			}
		}

		return cards;
	};

	var _isThereFullHouse = function(cardObj) {
		var countforThree = 0;
		var countforTwo = 0;
		var inx = 0;
		var cards = [];
		for (inx = 0; inx < cardObj.length; i++) {
			if (cardObj[inx].count === 3 && countforThree === 0) {
				countforThree = inx;
				cards.concate(cardObj[inx].card);
			} else if (cardObj[inx].count === 2 && countforTwo === 0) {
				countforTwo = inx;
				cards.concate(cardObj[inx].card);
			} else if (countforTwo && countforThree) {
				if ((countforTwo > cardObj.length - 3 && cardObj.length > 5) ||
					(countforThree > cardObj.length - 3 && cardObj.length > 5)) {
					return [];
				} else {
					return cards;
				}
			} else {
				cards = [];
				count = 0;
			}
		}
		return cards;
	};

	var _isThereStraight = function(cardObj) {
		var count = 0;
		var inx = 0;
		var cards = [cardObj[0].card[0]];
		for (inx = 1; inx < cardObj.length; i++) {
			if (cardObj[inx - 1].card[0].rank === cardObj[inx - 1].card[0].rank - 1) {
				count++;
				cards.push(cardObj[inx].card[0]);
			} else if (count >= 5) {
				if (inx > cardObj.length - 2 && cardObj.length > 5) {
					return [];
				} else {
					return cards;
				}
			} else {
				cards = [];
				count = 0;
			}
		}
		return cards;
	};

	var _findBestCardsinHandtoPlay = function(cardsinHand, minNum) {
		var cardObj = _rebuildCards(cardsinHand);
		var cards = _isTherePlain(cardsinHand);
		if (cards.length >= 6) {
			return cards;
		}
		cards = _isThereFullHouse(cardsinHand);
		if (cards.length == 5) {
			return cards;
		}
		cards = _isThereStraight(cardsinHand);
		if (cards.length >= 5) {
			return cards;
		}
	};
	return {
		isValidPlay: _isValidPlay,
		isValidFirstPlay: _isValidFirstPlay,
		isLargerthanTableCards: _isLargerthanTableCards
	};
};