lg.gameEngine = new function(){
	'use strict'

	var buildPlayerCardStr = function(card) {
		var myCards = '<li class="cardsInHand">';
		myCards += '<img src="./img/cards/'+ (card.rank + 1) + '_of_' + card.color + '.png"/>';
		myCards += '</li>';
		return myCards;
	}

	var displayPlayerCards = function(cards, pos) {
		var myCards = '';
		var numberOfCards = cards.length;

		myCards = buildPlayerCardStr(cards[pos]);
		if($('.bottomContent .cardsInHand').length === 0) {
			$('.bottomContent .cardContent').html(myCards);
		} else if (pos === 0) {
			$(myCards).insertBefore('.bottomContent .cardsInHand:nth-child(1)');
		} else {
			$(myCards).insertAfter('.bottomContent .cardsInHand:nth-child(' + pos + ')');
		}
	};

	var buildBackCardStr = function(className) {
		var cardImg = '';
		if(className == 'cardsInHand') {
			cardImg = 'cardBack1.png';
		} else {
			cardImg = 'cardBack2.png';
		}
		var myCards = '<li class="'+ className +'">';
		myCards += '<img src="./img/cards/' + cardImg + '"/>';
		myCards += '</li>';
		return myCards;
	}

	var displayTopCards = function(cards, pos) {
		var myCards = '';
		var numberOfCards = cards.length;
		var margin = (rowWidth - cardWidth)/ 13 - cardWidth  +'px';

		for(var i = 0; i < numberOfCards; i++){
			myCards += buildBackCardStr('cardsInHand');
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
			myCards += buildBackCardStr('cardsInSide');
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
			myCards += buildBackCardStr('cardsInSide');
		}
		$('.rightContent .cardContent').html(myCards);
		$('.rightContent').css('padding-top', $(window).height() * 0.1 + cardHeight - 10 + 'px');
		$('.rightContent .cardsInSide:not(:first-of-type)').css('margin-top', margin);
	};

	var displayCenterCards = function(cards) {
		var myCards = '';
		var numberOfCards = cards.length;

		for(var i = 0; i < numberOfCards; i++){
			myCards += buildBackCardStr('cardsInMiddle');
		}
		$('.centerContent').html(myCards);
		$('.centerContent .cardsInMiddle').css({display:'block', top: ($(window).height() - cardHeight) / 2, left: ($(window).width() - cardWidth) / 2});
	};

	var drawPlayerCardsCallBack = function(player, playDeckObj) {
		var pos = player.insertCards(playDeckObj.releaseCard());
		displayPlayerCards(player.getCards(), pos);
		$('.bottomContent').css('padding-left', $(window).width() * 0.1 + 'px');
		var margin = (rowWidth - cardWidth)/ 13 - cardWidth  +'px';
		var my_css_class = { 'margin-left': margin };
		$('.bottomContent .cardsInHand:not(:first-of-type)').css(my_css_class);
	};

	var drawCards = function(players, playDeckObj) {

		var middleCardsContents = $('.centerContent .cardsInMiddle');
		var cards = playDeckObj.getDeckCard();
		var i = cards.length - 1;
		var pos = 0;
		if(i >= 0){
			if((i + firstPlayer) % numofPlayer === 0) {
				$(middleCardsContents[i]).animate({
					bottom: '5px',
					opacity: 0
				}, drawCardSpeed, function(){
					drawPlayerCardsCallBack(players[0], playDeckObj);
					drawCards(players, playDeckObj);
				});
			} else if((i + firstPlayer) % numofPlayer === 1) {
				$(middleCardsContents[i]).animate({
					left: '5px',
					opacity: 0
				}, drawCardSpeed, function(){
					pos = players[1].insertCards(playDeckObj.releaseCard());
					displayLeftCards(players[1].getCards(), pos);
					drawCards(players, playDeckObj);
				});
			} else if((i + firstPlayer) % numofPlayer === 2) {
				$(middleCardsContents[i]).animate({
					top: '50px',
					opacity: 0
				}, drawCardSpeed, function(){
					pos = players[2].insertCards(playDeckObj.releaseCard());
					displayTopCards(players[2].getCards(), pos);
					drawCards(players, playDeckObj);
				});
			} else {
				$(middleCardsContents[i]).animate({
					right: '5px',
					opacity: 0
				}, drawCardSpeed, function(){
					pos = players[3].insertCards(playDeckObj.releaseCard());
					displayRightCards(players[3].getCards(), pos);
					drawCards(players, playDeckObj);
				});
			}

		} else {
			assignEventListener();
		}

	};
	var assignEventListener = function() {
		var selectCard = [];
		$('.bottomContent .cardsInHand').on('click', function(){
			if(selectCard.indexOf(this) < 0) {
				$(this).css('margin-top', '-30px');
				$(selectCard).css('margin-top', '0px');
				selectCard.push($.extend({}, this));
			} else {
				$(selectCard).css('margin-top', '0px');
				var inx = shuffleCard.indexOf(this);
				if(inx > -1) {
					selectCard = selectCard.splice(inx, 1);
				}
			}
			
		});
	};
	var initGame = function() {
		playDeckObj.init(1, true);
		playDeckObj.shuffleCard();
		var cards = playDeckObj.getDeckCard();
		var players = [];
		
		for(var i = 0; i < numofPlayer; i++) {
			players[i] = new player();
		}
		
		displayCenterCards(cards);
		drawCards(players, playDeckObj);
	}

	return {
		start: function() {
			initGame();
		}
	}
};