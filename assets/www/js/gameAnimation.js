lg.gameAnimation = new function(){
	'use strict'

	var _drawCards = function(cardDom, animateObj, drawCardSpeed, callBackFun){
		$(cardDom).animate(animateObj, drawCardSpeed, callBackFun);
	};
	return {
		drawCards : _drawCards
	};
};