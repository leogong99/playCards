lg.gameEngine = new function(){
	'use strict'
	var currentTurn = 0;
	var cardsonTable = [];
	var playCase = null;
	var cards = [];
	var players = [];

	var _initGame = function() {		
		$('#gameStartBtn').addClass('hidden');
		$('#gamePage').removeClass('hidden');
		playDeckObj.init(numSetofCards, true);
		playDeckObj.shuffleCard();
		var cards = playDeckObj.getDeckCard();
		var players = [];
		
		for(var i = 0; i < numofPlayer; i++) {
			players[i] = new player();
		}
		lg.gameStart.start(cards, players, playDeckObj);
	};

	var _setCurrentTurn = function(turn) {
		currentTurn = turn;
	};
	var _setCurrentCase = function(currentCase) {
		playCase = currentCase;
	};

	var _setCardsonTable = function(cards) {
		cardsonTable = cards;
	};

	var _playerTurn = function(players, selectCard) {
		_sortCardsonTable(selectCard);
		var currentCase = lg.gameRules.isValidFirstPlay(selectCard);
		if(cardsonTable.length === 0 && currentCase) {
			_setCurrentCase(currentCase);
			_setCardsonTable(selectCard);
			players[currentTurn].removeCards(selectCard);
			while(currentTurn !== 0) {
				players[currentTurn].aiPlay();
				currentTurn = (currentTurn == players.length - 1) ? 0 : (currentTurn + 1);
			}
			return true;
		} else if(lg.gameRules.isValidPlay(selectCard, playCase) && lg.gameRules.isLargerthanTableCards(selectCard, cardsonTable, playCase)){ // TODO: CHANGE HERE
			_setCardsonTable(selectCard);
			players[currentTurn].removeCards(selectCard);
			while(currentTurn !== 0) {
				players[currentTurn].aiPlay();
				currentTurn = (currentTurn == players.length - 1) ? 0 : (currentTurn + 1);
			}
			return true;
		} else {
			return false;
		}
	};

	var _sortCardsonTable = function(selectCard) {
		selectCard.sort(function(card1, card2){
			return card1.rank - card2.rank;
		});
	};

	var _getCardsonTable = function() {
		return cardsonTable;
	};

	return {
		start: function() {
			$('#gameStartBtn').bind('click', _initGame);
		},
		setCurrentTurn: _setCurrentTurn,
		setCardsonTable: _setCardsonTable,
		getCardsonTable: _getCardsonTable,
		playerTurn: _playerTurn,
		sortCardsonTable: _sortCardsonTable
	}
};