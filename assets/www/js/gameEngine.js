lg.gameEngine = new function(){
	'use strict'
	var initGame = function() {		
		$('#gameStartBtn').addClass('hidden');
		$('#gamePage').removeClass('hidden');
		lg.gameStart.start();
	}

	return {
		start: function() {
			$('#gameStartBtn').bind('click', initGame);
		}
	}
};