var lg = lg || {},
	cardWidth = 120,
	cardHeight = 169,
	numofPlayer = 4,
	rowWidth = $(window).width() - cardHeight * 2,
	rowHeight = $(window).height() - cardHeight * 2,
	drawCardSpeed = 1000,
	firstPlayer = 3,
	mainPlayer = 3,
	cardsLeft = 0,
	numSetofCards = 1,
	waitForRemainTimer = 500,
	isGameFinished = false,
	gamePlayTurn = 0;

var animateBottomObj = {
		bottom: '5px',
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
		right: '5px',
		opacity: 0
	};

var NUMOFCARDSINONESET = 52;
var NUMOFJOKERINONESET = 2;
var COLORFORCARDS = ['hearts', 'spades', 'clubs', 'diamonds'];
var COLORFORJOKERS = ['black', 'red'];

