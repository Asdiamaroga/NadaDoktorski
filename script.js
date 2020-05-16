(function() {	
	// TODO after its all done re add it here so it does not polute the global namespace I think
})();


var numberOfEvenNumbers = 8;
const numberOfButtons = 24;
const buttonsPerRow = 6;
const patterns = ['REPEATING', 'CHANGING']
const predefinedButtonGrids = [
	// ANALOG
	{
		name: 'A1.1',
		colors: ['ANALOG-C11', 'ANALOG-C12', 'ANALOG-C13'],
		pattern: patterns[0]
	},
	{
		name: 'A2.1',
		colors: ['ANALOG-C11', 'ANALOG-C12', 'ANALOG-C13'],
		pattern: patterns[1]
	},
	{
		name: 'A1.2',
		colors: ['ANALOG-C21', 'ANALOG-C22', 'ANALOG-C23'],
		pattern: patterns[0]
	},
	{
		name: 'A2.2',
		colors: ['ANALOG-C21', 'ANALOG-C22', 'ANALOG-C23'],
		pattern: patterns[1]
	},
	{
		name: 'A1.3',
		colors: ['ANALOG-C31', 'ANALOG-C32', 'ANALOG-C33'],
		pattern: patterns[0]
	},
	{
		name: 'A2.3',
		colors: ['ANALOG-C31', 'ANALOG-C32', 'ANALOG-C33'],
		pattern: patterns[1]
	},
	{
		name: 'A1.4',
		colors: ['ANALOG-C41', 'ANALOG-C42', 'ANALOG-C43'],
		pattern: patterns[0]
	},
	{
		name: 'A2.4',
		colors: ['ANALOG-C41', 'ANALOG-C42', 'ANALOG-C43'],
		pattern: patterns[1]
	},
	// // complementary -------------------------------------
	{
		name: 'S1.1',
		colors: ['COMP-C11', 'COMP-C12', 'COMP-C13'],
		pattern: patterns[0]
	},
	{
		name: 'S2.1',
		colors: ['COMP-C11', 'COMP-C12', 'COMP-C13'],
		pattern: patterns[1]
	},
	{
		name: 'S1.2',
		colors: ['COMP-C21', 'COMP-C22', 'COMP-C23'],
		pattern: patterns[0]
	},
	{
		name: 'S2.2',
		colors: ['COMP-C21', 'COMP-C22', 'COMP-C23'],
		pattern: patterns[1]
	},
	{
		name: 'S1.3',
		colors: ['COMP-C31', 'COMP-C32', 'COMP-C33'],
		pattern: patterns[0]
	},
	{
		name: 'S2.3',
		colors: ['COMP-C31', 'COMP-C32', 'COMP-C33'],
		pattern: patterns[1]
	},
	{
		name: 'S1.4',
		colors: ['COMP-C41', 'COMP-C42', 'COMP-C43'],
		pattern: patterns[0]
	},
	{
		name: 'S2.4',
		colors: ['COMP-C41', 'COMP-C42', 'COMP-C43'],
		pattern: patterns[1]
	},
	// TRIADIC
	{
		name: 'T1.1',
		colors: ['TRIADIC-C11', 'TRIADIC-C12', 'TRIADIC-C13'],
		pattern: patterns[0]
	},
	{
		name: 'T2.1',
		colors: ['TRIADIC-C11', 'TRIADIC-C12', 'TRIADIC-C13'],
		pattern: patterns[1]
	},
	{
		name: 'T1.2',
		colors: ['TRIADIC-C21', 'TRIADIC-C22', 'TRIADIC-C23'],
		pattern: patterns[0]
	},
	{
		name: 'T2.2',
		colors: ['TRIADIC-C21', 'TRIADIC-C22', 'TRIADIC-C23'],
		pattern: patterns[1]
	},
	{
		name: 'T1.3',
		colors: ['TRIADIC-C31', 'TRIADIC-C32', 'TRIADIC-C33'],
		pattern: patterns[0]
	},
	{
		name: 'T2.3',
		colors: ['TRIADIC-C31', 'TRIADIC-C32', 'TRIADIC-C33'],
		pattern: patterns[1]
	},
	{
		name: 'T1.4',
		colors: ['TRIADIC-C41', 'TRIADIC-C42', 'TRIADIC-C43'],
		pattern: patterns[0]
	},
	{
		name: 'T2.4',
		colors: ['TRIADIC-C41', 'TRIADIC-C42', 'TRIADIC-C43'],
		pattern: patterns[1]
	},
	// CONTROL
	{
		name: 'K',
		colors: ['CONTROL-C11', 'CONTROL-C11', 'CONTROL-C11'],
		pattern: patterns[1]
	}
]


var withPause;
var currentButtonGridIndex = -1;
var buttonGrids;




function changeVisibilityOfPauseStep(visibility) {
	document.querySelector('.pause-step').style.display = visibility;
}

function changeVisibilityOfButtonGridStep(visibility) {
	document.querySelector('.buttons-step').style.display = visibility;
}

function selectExperiment(pause) {
	withPause = pause;
	if (pause) {
		numberOfEvenNumbers = -1;
	}
	document.querySelector('.choose-mode-step').style.display = 'none';

	buttonGrids = shuffleArray(predefinedButtonGrids);

	goToNextGrid();
}


function goToNextGrid() {
	changeVisibilityOfPauseStep('none');
	changeVisibilityOfButtonGridStep('none');
	currentButtonGridIndex++;
	const currentGrid = buttonGrids[currentButtonGridIndex];
	currentGrid.startTimeOnGrid = new Date();

	if(withPause) {
		let num = getRandomNumberNotAlreadyContinedInArray([], 100, 999, true);
		createButtonGrid(currentGrid.pattern, currentGrid.colors, num);
		changeVisibilityOfButtonGridStep('none');

		const style =findTheGridButtonColor(num);

		changeVisibilityOfPauseStep('grid');
		createThePauseButtonGrid(num, style);
	} else {
		changeVisibilityOfButtonGridStep('grid');
		createButtonGrid(currentGrid.pattern, currentGrid.colors);
	}
}


function findTheGridButtonColor(numToFind) {
	const buttonGrid = document.querySelector('.buttons-step');
	const buttons = buttonGrid.childNodes;
	for(let i = 0; i < buttons.length; i++) {
		if(numToFind == parseInt(buttons[i].innerHTML)) {
			return buttons[i].classList;
		}
	}

	return "";
}


function createThePauseButtonGrid(num, style) {
	const currentGrid = buttonGrids[currentButtonGridIndex];
	const buttonGrid = document.querySelector('.pause-step');
	buttonGrid.innerHTML = ''

	
	let btn = createButton(num);
	btn.classList = style;

	currentGrid.numberToFind = num;

	btn.onclick = function(event) {
		// createButtonGrid(pattern, colors, num);
		changeVisibilityOfPauseStep('none');
		changeVisibilityOfButtonGridStep('grid');
	}

	//TODO ask Nadacolors
	// setPatternAndColors([btn], pattern, colors, 1);
	buttonGrid.appendChild(btn);
}


function createButtonGrid(pattern, colors, numberToAdd) {

	let buttonGrid = document.querySelector('.buttons-step');
	buttonGrid.innerHTML = '';
	let collectionOfNumbers = [];
	let colletionOfButtons = [];
	let evenNumberCounter = numberOfEvenNumbers;

	for(let i = 0; i < numberOfButtons; i++) {		
		let num;
		if (numberToAdd) {
			num = numberToAdd;
			numberToAdd = undefined;
		} else {
			//TODO rework this its ugly AF
			let evenNumber = evenNumberCounter > 0 ? evenNumberCounter-- : evenNumberCounter;
			num = getRandomNumberNotAlreadyContinedInArray(collectionOfNumbers, 100, 999, numberOfEvenNumbers != -1 ? evenNumber : undefined);
		}
		let btn = createButton(num);
		colletionOfButtons.push(btn);
	}
	8
	colletionOfButtons = shuffleArray(colletionOfButtons);

	setPatternAndColors(colletionOfButtons, pattern, colors, buttonsPerRow);

	colletionOfButtons.forEach(element => {
		buttonGrid.appendChild(element);  
	})
	
	if(withPause) {
		changeVisibilityOfPauseStep('none');
		changeVisibilityOfButtonGridStep('grid');
	}
}

function setPatternAndColors(colletionOfButtons, pattern, colors, buttonsPerRow) {

	let numberOfColors = (colors.length);
	let correctColorIndex;

	let sameColors = 0;
	let helperIndex = 0;

	for(let i = 0; i < colletionOfButtons.length; i++) {
		if (pattern === 'CHANGING') {
			correctColorIndex = i % numberOfColors;
			// console.log(i, ' % ', numberOfColors, ' > ', correctColorIndex);
			colletionOfButtons[i].classList.add(colors[correctColorIndex]);
			if(i !== 0 && (i + 1) % buttonsPerRow == 0) {
				lastColor = colors.pop();
				colors = [lastColor, ...colors];
			}
		} else if (pattern == 'REPEATING') {
			if(sameColors == 2) {
				helperIndex++;
				sameColors = 0;
			}
			correctColorIndex = helperIndex % numberOfColors;
			colletionOfButtons[i].classList.add(colors[correctColorIndex]);
			sameColors++;
		}
		
	}

}

function createButton(content) {
	var btn = document.createElement("BUTTON");  
	btn.innerHTML = content;    
	btn.classList = 'grid-button';   

	btn.onclick = event => {
		console.log('clicked button but now disabling');
		event.currentTarget.disabled = true;
		const currentGrid = buttonGrids[currentButtonGridIndex];

		initializeSectionVariables(currentGrid);		

		const numberInButton = parseInt(event.currentTarget.innerHTML, 10);
		if(numberInButton % 2 === 0) {

			if ( currentGrid.firstCorrectButtonClikcedAt === undefined ) {
				currentGrid.firstCorrectButtonClikcedAt = calcTimeDifference(currentGrid.startTimeOnGrid);
			}

			if (!withPause) {
				currentGrid.evenNumbersClicked++;
			} else {
				console.log('mistake made with EVEN');
				currentGrid.numberOfMistakesMade++;
			}
		
			const foundTheNumber = (withPause && numberInButton == currentGrid.numberToFind);
			const foundAllEvenNumbers = (currentGrid.evenNumbersClicked == numberOfEvenNumbers);
			const lastStep = currentButtonGridIndex == buttonGrids.length - 1;
			if ((foundTheNumber || foundAllEvenNumbers) && !lastStep){

				calculateTimeSpentOnPageAndFixMistakesNumber(currentGrid);
				
				goToNextGrid();				
			} else if ((foundTheNumber || foundAllEvenNumbers) && lastStep) {
				changeVisibilityOfButtonGridStep('none');
				changeVisibilityOfPauseStep('none');
				
				calculateTimeSpentOnPageAndFixMistakesNumber(currentGrid);

				document.querySelector('.thank-you-step').style.display = 'block';
				console.log('result?????????', buttonGrids);

				let payload = {
					experiment: withPause ? 'EXPERIMENT2' : 'EXPERIMENT1',
					statisticsPerPage: buttonGrids 
				}

				// fetch('http://localhost:5000/sendStatistics', {
				fetch('https://nada-statistics.herokuapp.com/sendStatistics', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(payload)
				})
			}

		} else {
			console.log('mistake made with ODD');
			currentGrid.numberOfMistakesMade++;
		}
		
	}

	return btn;
}

function calculateTimeSpentOnPageAndFixMistakesNumber(currentGrid) {
	currentGrid.timeSpentOnPage = calcTimeDifference(currentGrid.startTimeOnGrid);
				//If we are here it was correct so not increasing this
				if (withPause) {
					currentGrid.numberOfMistakesMade--;
				}
}


function calcTimeDifference(start) {
	endTime = new Date();
	// time difference in milliseconds
	var timeDiff = endTime - start;
	// strip the ms
	timeDiff /= 1000;
	// round to two decimalschangeVisibilityOfButtonGridStep('none');
	var seconds = timeDiff.toFixed(4);
	return seconds; 
};

function initializeSectionVariables(currentGrid) {
	if ( currentGrid.evenNumbersClicked === undefined ) {
		currentGrid.evenNumbersClicked = 0;
	}

	if( currentGrid.numberOfMistakesMade === undefined ) {
		currentGrid.numberOfMistakesMade = 0;
	}
}

function getRandomNumberNotAlreadyContinedInArray(array, min, max, even) {
	let numberExistInArray = true;
	let num;

	while(numberExistInArray) {
		num = getNumberBetween(min, max);
		numberExistInArray = array.includes(num);
	}

	// //TODO not good really, idk
	// if (numberOfEvenNumbers == -1) {
	// 	return num;
	// }

	if ( even === undefined ) {
		return num;
	}

	//TODO rework, not so nice of a solution really
	if (even) {
		// console.log('EVEn ', num % 2 == 0 ? num : num + 1)
		return num % 2 == 0 ? num : num + 1;
	} else {
		// console.log('ODD ', num % 2 !== 0 ? num : num + 1)
		return num % 2 !== 0 ? num : num + 1;
	}
}

function getNumberBetween(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function shuffleArray(array) {
	return array.sort(function() {
		return Math.random() - 0.5
	});
}1