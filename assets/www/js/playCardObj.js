var playCardObj = function(){
	'use strict'
	this.rank = null,
	this.color = null;
};

playCardObj.prototype.initial = function(num, color){
		this.rank = num;
		this.color = color;
};
/*
 * compare card,
 * If this card number is larger than compare card number return positive
 * If this card number is equal to compare card number return 0
 * If this card number is less than compare card number return native
 */
playCardObj.prototype.isCardRankBigger= function(card){
	return this.rank - card.rank;
};
playCardObj.prototype.isCardSameColor= function(card){
	return this.color !== null && card.color !== null && this.color === card.color;
};