lg.gameAnimation = new function(){
	'use strict'

	var drawCards = function(cardDom, animateObj, drawCardSpeed, callBackFun){
		$(cardDom).animate(animateObj, drawCardSpeed, callBackFun);
	};
	return {
		drawCards : drawCards
	};
};