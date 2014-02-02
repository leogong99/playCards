lg.gameStart = new function(){
	'use strict'

	var buildPlayerCardStr = function(card, className) {
		var myCards = '<li data-cardrank="' + card.rank + '" data-cardcolor="' + card.color + '" class="' + className + '">';
		myCards += '<img src="./img/cards/'+ (card.rank + 1) + '_of_' + card.color + '.png"/>';
		myCards += '</li>';
		return myCards;
	}

	var displayPlayerCards = function(cards, pos) {
		var myCards = '';
		var numberOfCards = cards.length;

		myCards = buildPlayerCardStr(cards[pos], 'cardsInHand');
		if($('.bottomContent .cardsInHand').length === 0) {
			$('.bottomContent .cardContent').html(myCards);
		} else if (pos === 0) {
			$(myCards).insertBefore('.bottomContent .cardsInHand:nth-child(1)');
		} else {
			$(myCards).insertAfter('.bottomContent .cardsInHand:nth-child(' + pos + ')');
		}
	};
	var removePlayerCards = function(removeCards) {
		for(var i = 0; i < removeCards.length; i++) {
			$(removeCards[i]).remove();
		}
		
	};
	var buildBackCardStr = function(className) {
		var cardImg = '';
		if(className == 'cardsInSide') {
			cardImg = 'cardBack2.png';
		} else {
			cardImg = 'cardBack1.png';
		}
		var myCards = '<li class="'+ className +'">';
		myCards += '<img src="./img/cards/' + cardImg + '"/>';
		myCards += '</li>';
		return myCards;
	}

	var displayTopCards = function(cards, pos, isRemain) {
		var myCards = '';
		var numberOfCards = cards.length;

		var numofCardsPerPlayer = Math.round((NUMOFCARDSINONESET  * numSetofCards - cardsLeft) / numofPlayer);
		if(isRemain) {
			numofCardsPerPlayer += cardsLeft;
		}
		var margin = (rowWidth - cardWidth)/ numofCardsPerPlayer - cardWidth  +'px';

		for(var i = 0; i < numberOfCards; i++){
			myCards += buildBackCardStr('cardsInHand');
		}
		$('.topContent .cardContent').html(myCards);
		$('.topContent .cardsInHand:not(:first-of-type)').css('margin-left', margin);
	};

	var displayLeftCards = function(cards, pos, isRemain) {
		var myCards = '';
		var numberOfCards = cards.length;
		var numofCardsPerPlayer = Math.round((NUMOFCARDSINONESET  * numSetofCards - cardsLeft) / numofPlayer);
		if(isRemain) {
			numofCardsPerPlayer += cardsLeft;
		}
		var margin = (rowHeight - cardWidth)/ numofCardsPerPlayer - cardWidth;

		for(var i = 0; i < numberOfCards; i++){
			myCards += buildBackCardStr('cardsInSide');
		}
		$('.leftContent .cardContent').html(myCards);
		$('.leftContent').css('padding-top', (cardHeight + 15) + 'px');
		$('.leftContent .cardsInSide:not(:first-of-type)').css('margin-top', margin + 'px');
	};

	var displayRightCards = function(cards, pos, isRemain) {
		var myCards = '';
		var numberOfCards = cards.length;
		var numofCardsPerPlayer = Math.round((NUMOFCARDSINONESET * numSetofCards - cardsLeft) / numofPlayer);
		if(isRemain) {
			numofCardsPerPlayer += cardsLeft;
		}
		var margin = (rowHeight - cardWidth)/ numofCardsPerPlayer - cardWidth  +'px';

		for(var i = 0; i < numberOfCards; i++){
			myCards += buildBackCardStr('cardsInSide');
		}
		$('.rightContent .cardContent').html(myCards);
		$('.rightContent').css('padding-top',  (cardHeight + 15) + 'px');
		$('.rightContent .cardsInSide:not(:first-of-type)').css('margin-top', margin);
	};
	var displayCenterPlayedCards = function(cards) {
		var myCards = '';
		var numberOfCards = cards.length;

		for(var i = numberOfCards - 1; i >= 0; i--){
			myCards += buildPlayerCardStr(cards[i], 'cardsInMiddle');
		}
		$('.centerContent ul').empty().html(myCards);
		$.each($('.centerContent li'), function(i, val){
			$(val).css({display:'block', top: ($(window).height() - cardHeight) / 2, left: ($(window).width() - cardWidth) / 2 + i * 20});
		})
		
	};

	var displayCenterCards = function(cards) {
		var myCards = '';
		var numberOfCards = cards.length;

		for(var i = 0; i < numberOfCards; i++){
			myCards += buildBackCardStr('cardsInMiddle');
		}
		$('.centerContent ul').html(myCards);
		$('.centerContent .cardsInMiddle').css({display:'block', top: ($(window).height() - cardHeight) / 2, left: ($(window).width() - cardWidth) / 2});
	};

	var drawPlayerCardsCallBack = function(player, playDeckObj, isRemain) {
		var pos = player.insertCards(playDeckObj.releaseCard());
		var numofCardsPerPlayer = Math.round((NUMOFCARDSINONESET  * numSetofCards - cardsLeft) / numofPlayer);
		if(isRemain) {
			numofCardsPerPlayer += cardsLeft;
		}
		displayPlayerCards(player.getCards(), pos);
		var margin = (rowWidth - cardWidth)/ numofCardsPerPlayer - cardWidth  +'px';
		var my_css_class = { 'margin-left': margin };
		$('.bottomContent .cardsInHand:not(:first-of-type)').css(my_css_class);
	};

	var drawRemainCards = function(players, playDeckObj) {
		var middleCardsContents = $('.centerContent .cardsInMiddle');
		var remainCards = playDeckObj.getDeckCard();
		var i = remainCards.length - 1;
		var pos = 0;
		
		if(remainCards.length > 0) {
			if((mainPlayer + 1) % numofPlayer === 0) {
				lg.gameAnimation.drawCards(middleCardsContents[i], animateBottomObj, drawCardSpeed, function(){
					drawPlayerCardsCallBack(players[0], playDeckObj, true);
					drawRemainCards(players, playDeckObj);
				});
			} else if((mainPlayer + 1) % numofPlayer === 1) {
				lg.gameAnimation.drawCards(middleCardsContents[i], animateLeftObj, drawCardSpeed, function(){
					pos = players[1].insertCards(playDeckObj.releaseCard());
					displayLeftCards(players[1].getCards(), pos, true);
					drawRemainCards(players, playDeckObj);
				});
			} else if((mainPlayer + 1) % numofPlayer === 2) {
				lg.gameAnimation.drawCards(middleCardsContents[i], animateTopObj, drawCardSpeed, function(){
					pos = players[2].insertCards(playDeckObj.releaseCard());
					displayTopCards(players[2].getCards(), pos, true);
					drawRemainCards(players, playDeckObj);
				});
			} else {
				lg.gameAnimation.drawCards(middleCardsContents[i], animateRightObj, drawCardSpeed, function(){
					pos = players[3].insertCards(playDeckObj.releaseCard());
					displayRightCards(players[3].getCards(), pos, true);
					drawRemainCards(players, playDeckObj);
				});
			}
		} else {
			assignEventListener(players);
		}
	};

	var drawCards = function(players, playDeckObj) {

		var middleCardsContents = $('.centerContent .cardsInMiddle');
		var cards = playDeckObj.getDeckCard();
		var i = cards.length - 1;
		var pos = 0;

		if(i >= cardsLeft){
			if((i + firstPlayer) % numofPlayer === 0) {
				lg.gameAnimation.drawCards(middleCardsContents[i], animateBottomObj, drawCardSpeed, function(){
					drawPlayerCardsCallBack(players[0], playDeckObj);
					drawCards(players, playDeckObj);
				});
			} else if((i + firstPlayer) % numofPlayer === 1) {
				lg.gameAnimation.drawCards(middleCardsContents[i], animateLeftObj, drawCardSpeed, function(){
					pos = players[1].insertCards(playDeckObj.releaseCard());
					displayLeftCards(players[1].getCards(), pos);
					drawCards(players, playDeckObj);
				});
			} else if((i + firstPlayer) % numofPlayer === 2) {
				lg.gameAnimation.drawCards(middleCardsContents[i], animateTopObj, drawCardSpeed, function(){
					pos = players[2].insertCards(playDeckObj.releaseCard());
					displayTopCards(players[2].getCards(), pos);
					drawCards(players, playDeckObj);
				});
			} else {
				lg.gameAnimation.drawCards(middleCardsContents[i], animateRightObj, drawCardSpeed, function(){
					pos = players[3].insertCards(playDeckObj.releaseCard());
					displayRightCards(players[3].getCards(), pos);
					drawCards(players, playDeckObj);
				});
			}
			
		} else {
			setTimeout(function(){
				drawRemainCards(players, playDeckObj);
			}, waitForRemainTimer);
		}

	};
	var assignEventListener = function(players) {
		var selectCard = [];
		var selectCardsDom = [];
		$('.bottomContent .cardsInHand').on('click', function(){
			var card = {
				rank: $(this).data('cardrank'),
				color: $(this).data('cardcolor')
			}
			var imgObj = $(this).children()[0];
			if(isArrayHas(selectCard, card) < 0) {
				$(imgObj).css('margin-top', '-30px');
				selectCard.push(card);
				selectCardsDom.push($(this));
			} else {
				var inx = isArrayHas(selectCard, card);
				if(inx > -1) {
					selectCard.splice(inx, 1);
					selectCardsDom.splice(inx, 1);
					$(imgObj).css('margin-top', '0px');
				}
			}
			if(selectCard.length > 0) {
				$('#callButton').removeClass('hidden');
			} else {
				$('#callButton').addClass('hidden');
			}
			
		});
		$('#callButton').on('click', function(){
			//players[0].removeCards(selectCard);
			lg.gameEngine.playerTurn(players, selectCard);
			removePlayerCards(selectCardsDom);

			displayCenterPlayedCards(lg.gameEngine.getCardsonTable());
			$('#callButton').addClass('hidden');
			//gamePlayTurn = 1;
			//aiTurn(players);
			selectCard = [];
			selectCardsDom = [];
		});

	};

	return {
		start: function() {
			playDeckObj.init(numSetofCards, true);
			playDeckObj.shuffleCard();
			var cards = playDeckObj.getDeckCard();
			var players = [];
			
			for(var i = 0; i < numofPlayer; i++) {
				players[i] = new player();
			}
			displayCenterCards(cards);
			drawCards(players, playDeckObj);

		}
	}
};