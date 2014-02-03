lg.gameEngine = new function(){
	'use strict'
	var currentTurn = 0;
	var cardsonTable = [];
	var _initGame = function() {		
		$('#gameStartBtn').addClass('hidden');
		$('#gamePage').removeClass('hidden');
		lg.gameStart.start();
	};

	var _setCurrentTurn = function(turn) {
		currentTurn = turn;
	};
	var _setCardsonTable = function(cards) {
		cardsonTable = cards;
	};

	var _playerTurn = function(players, selectCard) {
		_sortCardsonTable(selectCard);
		if(cardsonTable.length === 0 && lg.gameRules.isValidFirstPlay(selectCard)) {
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
		selectCard =  _.sortBy(selectCard, function(card){
			return card.rank * -1;
		})
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