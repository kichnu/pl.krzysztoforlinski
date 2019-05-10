let randomNumber = '';
let playerSelection = '';
let statisticsOfGame = ['', 0, 0, 0, 0];
let asideDescription = ['Statystyki', 'Nr. gry', 'Zwycięstwa', 'Remisy', 'Przegrane']

const round = document.querySelector(".round");
const rotatingElements = [...document.querySelectorAll('.round>div')];
const display = document.querySelector('.display');
const asides = [...document.querySelectorAll('aside>div')];
const resetButton = document.querySelector('button');

for (let i = 0; i < asides.length; i++) {
    asides[i].textContent = `${asideDescription[i]}  ${statisticsOfGame[i]}`
}

function showPlayerSelection() {
    removeListeners();
    playerSelection = this.dataset.option;
    if (playerSelection != 'centre') {
        if (playerSelection === 'scissors') display.textContent = 'Nożyczki';
        else if (playerSelection === 'paper') display.textContent = 'Papier';
        else display.textContent = 'Kamień';
        window.setTimeout(startDraw, 1000);
    }
}

function removeListeners() {
    resetButton.removeEventListener('click', reset);
    resetButton.style.color = '#ccc';
    resetButton.style.borderColor = '#ccc';
    resetButton.style.transition = '1s';
    rotatingElements.forEach(rotatingElement => {
        console.log('removeEventListener');
        rotatingElement.removeEventListener('click', showPlayerSelection);
    });
    window.setTimeout(function () {
        resetButton.addEventListener('click', reset);
        resetButton.style.color = 'black';
        resetButton.style.borderColor = 'black';
        rotatingElements.forEach(rotatingElement => {
            console.log('addEventListener');
            rotatingElement.addEventListener('click', showPlayerSelection)
        });
    }, 9000);
}


function startDraw() {
    display.textContent = '';
    computerDraw();
    rotationRight();
    window.setTimeout(rotationLeft, 6000);
}

function computerDraw() {
    randomNumber = Math.floor(Math.random() * 3 + 1);
    switch (randomNumber) {
        case 1:
            drawResult = 1140;
            break;
        case 2:
            drawResult = 1260;
            break;
        case 3:
            drawResult = 1380;
            break;
    }
}

function rotationRight() {
    round.style.transform = `rotate(${drawResult}deg)`;
    round.style.transition = '2s';
    rotatingElements.forEach(rotatingElement => {
        rotatingElement.style.transform = `rotate(${drawResult*(-1)}deg)`;
        rotatingElement.style.transition = '2s';
    });
    window.setTimeout(showComputerDraw, 2000)
    window.setTimeout(showResultGame, 4000)
}

function rotationLeft() {
    round.style.transform = `rotate(0deg)`;
    round.style.transition = '0.5s';
    rotatingElements.forEach(rotatingElement => {
        rotatingElement.style.transform = `rotate(0deg)`;
        rotatingElement.style.transition = '0.5s';
    });
    window.setTimeout(function () {
        display.textContent = 'Wybierz';
    }, 800);
}

function showComputerDraw() {
    switch (randomNumber) {
        case (1):
            display.textContent = 'Nożyczki';
            break;
        case 2:
            display.textContent = 'Kamień';
            break;
        case 3:
            display.textContent = 'Papier';
            break;
    }
}

function showResultGame() {
    statisticsOfGame[1]++;

    asides[1].textContent = `${asideDescription[1]}  ${statisticsOfGame[1]}`;
    if (playerSelection != 'centre') {
        if (((playerSelection === "scissors" && randomNumber === 3)) || ((playerSelection === "stone" && randomNumber === 1)) || ((playerSelection === "paper" && randomNumber === 2))) {
            statisticsOfGame[2]++;
            display.textContent = 'Wygrałeś';
            asides[2].textContent = `${asideDescription[2]}  ${statisticsOfGame[2]}`;
        } else if (((playerSelection === "scissors" && randomNumber === 2)) || ((playerSelection === "stone" && randomNumber === 3)) || ((playerSelection === "paper" && randomNumber === 1))) {
            statisticsOfGame[4]++;
            display.textContent = 'Przegrałeś';
            asides[4].textContent = `${asideDescription[4]}  ${statisticsOfGame[4]}`;
        } else {
            statisticsOfGame[3]++;
            display.textContent = 'Remis';
            asides[3].textContent = `${asideDescription[3]}  ${statisticsOfGame[3]}`;
        }
    }

}

function reset() {
    for (let i = 1; i < statisticsOfGame.length; i++) {
        statisticsOfGame[i] = 0;
        asides[i].textContent = `${asideDescription[i]}  ${statisticsOfGame[i]}`;
    }
}

resetButton.addEventListener('click', reset);

rotatingElements.forEach(rotatingElement => {
    rotatingElement.addEventListener('click', showPlayerSelection);

})