var lg = lg || {},
	cardWidth = 120,
	cardHeight = 169,
	numofPlayer = 4,
	rowWidth = $(window).width() - cardHeight * 2,
	rowHeight = $(window).height() - cardHeight * 2,
	drawCardSpeed = 100,
	firstPlayer = 3,
	mainPlayer = 3,
	cardsLeft = 6,
	numSetofCards = 1,
	waitForRemainTimer = 500,
	isGameFinished = false,
	gamePlayTurn = 0;

var animateBottomObj = {
		top: $(window).height() - cardHeight - 5 + 'px',
		opacity: 0
	};
var animateLeftObj = {
		left: '5px',
		opacity: 0
	};
var animateTopObj = {
		top: '5px',
		opacity: 0
	};
var animateRightObj = {
		left: $(window).width() - cardHeight - 5 + 'px',
		opacity: 0
	};

var NUMOFCARDSINONESET = 52;
var NUMOFJOKERINONESET = 2;
var CARDSTARTNUM = 3;
var COLORFORCARDS = ['hearts', 'spades', 'clubs', 'diamonds'];
var COLORFORJOKERS = ['black', 'red'];

var isArrayHas = function(array, item) {
	for(var i = 0; i < array.length; i++) {
		if(_.isEqual(array[i], item)) {
			return i;
		}
	}
	return -1;
};
