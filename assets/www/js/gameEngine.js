var lg = lg || {};
var cardWidth = 70;
var cardHeight = 102;
var numofPlayer = 4;
var rowWidth = $(window).width() * 0.8;
var rowHeight = ($(window).height() - cardHeight * 2 - 53) * 0.8;
var drawCardSpeed = 100;


lg.gameEngine = new function(){
	'use strict'
	var displayPlayerCards = function(cards, pos) {
		var myCards = '';
		var numberOfCards = cards.length;
		
		console.log('a');
		//for(var i = 0; i < numberOfCards; i++){
			myCards = '<li class="cardsInHand">';
			myCards += '<img src="./img/cards/'+ (cards[pos].rank + 1) + '_of_' + cards[pos].color + '.png"/>';
			myCards += '</li>';
			if($('.bottomContent .cardsInHand').length === 0) {
				$('.bottomContent .cardContent').html(myCards);
			} else if (pos === 0) {
				console.log(numberOfCards + ' ' + pos + myCards.toString());
				$(myCards).insertBefore('.bottomContent .cardsInHand:nth-child(1)');
			} else if (pos === numberOfCards - 1) {
				console.log(numberOfCards + ' ' + pos+ myCards.toString());
				$(myCards).insertAfter('.bottomContent .cardsInHand:nth-child(' + pos + ')');
				
			} else {
				console.log(numberOfCards + ' ' + pos+ myCards.toString());
				$(myCards).insertAfter('.bottomContent .cardsInHand:nth-child(' + pos + ')');
			}

			/*} else {
				myCards += '<li class="cardsInHand" >';
				myCards += '<img id="cards' + pos +'"  src="./img/cards/'+ (cards[pos].rank + 1) + '_of_' + cards[pos].color + '.png"/>';
				myCards += '</li>';
				$('.bottomContent .cardContent').html(myCards);
			}*/
		//}
		
		
		//$('.bottomContent .cardsInHand:not(:first-of-type)').css('margin-left', margin);
	};

	var displayTopCards = function(cards, pos) {
		var myCards = '';
		var numberOfCards = cards.length;
		var margin = (rowWidth - cardWidth)/ 13 - cardWidth  +'px';

		for(var i = 0; i < numberOfCards; i++){
			myCards += '<li class="cardsInHand">';
			myCards += '<img id="cards' + i +'"  src="./img/cards/cardBack1.png"/>';
			myCards += '</li>';
		}
		$('.topContent .cardContent').html(myCards);
		$('.topContent').css('padding-left', $(window).width() * 0.1 + 'px');
		$('.topContent .cardsInHand:not(:first-of-type)').css('margin-left', margin);
	};

	var displayLeftCards = function(cards, pos) {
		var myCards = '';
		var numberOfCards = cards.length;
		var margin = (rowHeight - cardWidth)/ 13 - cardWidth  +'px';

		for(var i = 0; i < numberOfCards; i++){
			myCards += '<li class="cardsInSide">';
			myCards += '<img id="cards' + i +'"  src="./img/cards/cardBack2.png"/>';
			myCards += '</li>';
		}
		$('.leftContent .cardContent').html(myCards);
		$('.leftContent').css('padding-top', $(window).height() * 0.1 + cardHeight - 10 + 'px');
		$('.leftContent .cardsInSide:not(:first-of-type)').css('margin-top', margin);
	};

	var displayRightCards = function(cards, pos) {
		var myCards = '';
		var numberOfCards = cards.length;
		var margin = (rowHeight - cardWidth)/ 13 - cardWidth  +'px';

		for(var i = 0; i < numberOfCards; i++){
			myCards += '<li class="cardsInSide">';
			myCards += '<img id="cards' + i +'"  src="./img/cards/cardBack2.png"/>';
			myCards += '</li>';
		}
		$('.rightContent .cardContent').html(myCards);
		$('.rightContent').css('padding-top', $(window).height() * 0.1 + cardHeight - 10 + 'px');
		$('.rightContent .cardsInSide:not(:first-of-type)').css('margin-top', margin);
	};

	var displayCenterCards = function(cards) {
		var myCards = '';
		var numberOfCards = cards.length;

		for(var i = 0; i < numberOfCards; i++){
			myCards += '<div class="cardsInMiddle">';
			myCards += '<img id="cards' + i +'"  src="./img/cards/cardBack1.png"/>';
			myCards += '</div>';
		}
		$('.centerContent').html(myCards);
		//$('.centerContent').css({'margin-top': ($(window).height() - cardHeight - 50) / 2 + 'px','margin-left': cardWidth / -2 - cardHeight +'px'});
		$('.centerContent .cardsInMiddle').css({top: ($(window).height() - cardHeight) / 2, left: ($(window).width() - cardWidth) / 2});
	};

	var drawCards = function(players, playDeckObj) {

		var middleCardsContents = $('.centerContent .cardsInMiddle');
		var cards = playDeckObj.getDeckCard();
		var i = cards.length - 1;
		var pos = 0;
		if(i >= 0){
			if((i + 3) % 4 === 0) {
				$(middleCardsContents[i]).animate({
					bottom: '5px',
					opacity: 0
				}, drawCardSpeed, function(){
					pos = players[0].insertCards(playDeckObj.releaseCard());
					displayPlayerCards(players[0].getCards(), pos);
					$('.bottomContent').css('padding-left', $(window).width() * 0.1 + 'px');
					var margin = (rowWidth - cardWidth)/ 13 - cardWidth  +'px';
					var my_css_class = { 'margin-left': margin };
					$('.bottomContent .cardsInHand:not(:first-of-type)').css(my_css_class);
					drawCards(players, playDeckObj)

				});
			} else if((i + 3) % 4 === 1) {
				$(middleCardsContents[i]).animate({
					left: '5px',
					opacity: 0
				}, drawCardSpeed, function(){
					pos = players[1].insertCards(playDeckObj.releaseCard());
					displayLeftCards(players[1].getCards(), pos);
					drawCards(players, playDeckObj)
				});
			} else if((i + 3) % 4 === 2) {
				$(middleCardsContents[i]).animate({
					top: '50px',
					opacity: 0
				}, drawCardSpeed, function(){
					pos = players[2].insertCards(playDeckObj.releaseCard());
					displayTopCards(players[2].getCards(), pos);
					drawCards(players, playDeckObj)
				});
			} else {
				$(middleCardsContents[i]).animate({
					right: '5px',
					opacity: 0
				}, drawCardSpeed, function(){
					pos = players[3].insertCards(playDeckObj.releaseCard());
					displayRightCards(players[3].getCards(), pos);

					drawCards(players, playDeckObj)
				});
			}
		};

	};

	var initGame = function() {
		playDeckObj.init(1, true);
		playDeckObj.shuffleCard();
		var cards = playDeckObj.getDeckCard();
		var players = [];
		var i = 0;
		//var len = cards.length;
		for(i = 0; i < numofPlayer; i++) {
			players[i] = new player();
		}
		
		displayCenterCards(cards);
		

		
		/*for(i = 0; i < len; i++) {
			players[i % numofPlayer].insertCards(playDeckObj.releaseCard());
		}*/
		drawCards(players, playDeckObj);

		var selectCard = null;
		$('.bottomContent .cardsInHand').click(function(){
			if(selectCard != this) {
				$(this).css('margin-top', '-30px');
				$(selectCard).css('margin-top', '0px');
				selectCard = this;
			} else {
				$(selectCard).css('margin-top', '0px');
				selectCard = null;
			}
			
		});
	}

	return {
		start: function() {
			initGame();
		}
	}
};