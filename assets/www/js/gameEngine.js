var lg = lg || {};
var cardWidth = 70;
var cardHeight = 102;
var numofPlayer = 4;
var rowWidth = $(window).width() * 0.8;
var rowHeight = ($(window).height() - cardHeight * 2 - 53) * 0.8;


lg.gameEngine = new function(){
	'use strict'
	var displayPlayerCards = function(cards) {
		var myCards = '';
		var numberOfCards = cards.length;
		var margin = (rowWidth - cardWidth)/ (numberOfCards - 1) - cardWidth  +'px';
		for(var i = 0; i < numberOfCards; i++){
			myCards += '<li class="cardsInHand">';
			myCards += '<img id="cards' + i +'"  src="./img/cards/'+ (cards[i].rank + 1) + '_of_' + cards[i].color + '.png"/>';
			myCards += '</li>';
		}
		$('.bottomContent .cardContent').html(myCards);
		$('.bottomContent').css('padding-left', $(window).width() * 0.1 + 'px');
		$('.bottomContent .cardsInHand:not(:first-of-type)').css('margin-left', margin);
	};

	var displayTopCards = function(cards) {
		var myCards = '';
		var numberOfCards = cards.length;
		var margin = (rowWidth - cardWidth)/ (numberOfCards - 1) - cardWidth  +'px';

		for(var i = 0; i < numberOfCards; i++){
			myCards += '<li class="cardsInHand">';
			myCards += '<img id="cards' + i +'"  src="./img/cards/cardBack1.png"/>';
			myCards += '</li>';
		}
		$('.topContent .cardContent').html(myCards);
		$('.topContent').css('padding-left', $(window).width() * 0.1 + 'px');
		$('.topContent .cardsInHand:not(:first-of-type)').css('margin-left', margin);
	};

	var displayLeftCards = function(cards, margin) {
		var myCards = '';
		var numberOfCards = cards.length;
		var margin = (rowHeight - cardWidth)/ (numberOfCards - 1) - cardWidth  +'px';

		for(var i = 0; i < numberOfCards; i++){
			myCards += '<li class="cardsInSide">';
			myCards += '<img id="cards' + i +'"  src="./img/cards/cardBack2.png"/>';
			myCards += '</li>';
		}
		$('.leftContent .cardContent').html(myCards);
		$('.leftContent').css('padding-top', $(window).height() * 0.1 + cardHeight - 10 + 'px');
		$('.leftContent .cardsInSide:not(:first-of-type)').css('margin-top', margin);
	};

	var displayRightCards = function(cards, margin) {
		var myCards = '';
		var numberOfCards = cards.length;
		var margin = (rowHeight - cardWidth)/ (numberOfCards - 1) - cardWidth  +'px';

		for(var i = 0; i < numberOfCards; i++){
			myCards += '<li class="cardsInSide">';
			myCards += '<img id="cards' + i +'"  src="./img/cards/cardBack2.png"/>';
			myCards += '</li>';
		}
		$('.rightContent .cardContent').html(myCards);
		$('.rightContent').css('padding-top', $(window).height() * 0.1 + cardHeight - 10 + 'px');
		$('.rightContent .cardsInSide:not(:first-of-type)').css('margin-top', margin);
	};

	return {
		start: function() {
			playDeckObj.init(1, true);
			playDeckObj.shuffleCard();
			var cards = playDeckObj.getDeckCard();
			var players = [];
			var i = 0;
			var len = cards.length;

			for(i = 0; i < numofPlayer; i++) {
				players[i] = new player();
			}
			for(i = 0; i < len; i++) {
				players[i % numofPlayer].insertCards(playDeckObj.releaseCard());
			}
			
			var selectCard = null;
			
			displayPlayerCards(players[0].getCards());
			displayTopCards(players[1].getCards());
			displayLeftCards(players[2].getCards());
			displayRightCards(players[3].getCards());

			$('.bottomContent .cardsInHand').click(function(){
				if(selectCard != this) {
					$(this).css('margin-top', '-30px');
					$(selectCard).css('margin-top', '0px');
					selectCard = this;
				} else {
					$(selectCard).css('margin-top', '0px');
					selectCard = null;
				}
				
			})
		}
	}
};