let count = 0;
function scrollDown() {
    const rep = setInterval(function () {
        count++;
        let can = false;
        if (listPatterns.length * heightItemList + 400 > height && (0 - shiftListY - 150) < listPatterns.length * heightItemList - height) {
            shiftListY -= 3;
        } else can = true;

        // updateParametersScroll()
        if (count > 120 || can) {
            clearInterval(rep)
            count = 0;
        }
    }, 1);
}

function scrollUp() {
    const rep = setInterval(function () {
        count++;
        let can = false;
        if (shiftListY < 330) {
            shiftListY += 3;
        } else can = true;

        // updateParametersScroll()
        if (count > 120 || can) {
            clearInterval(rep)
            count = 0;
        }
    }, 1);
}

document.querySelector('.arrow-up').addEventListener('click', function (e) {
    e.stopPropagation();
    scrollUp();
})

document.querySelector('.arrow-down').addEventListener('click', function (e) {
    e.stopPropagation();
    scrollDown();
})



// let counterScroll = 0;

// function updateParametersScroll() {
    // lenghtScrollbar = (Math.floor((720 / (listPatterns.length * heightItemList) * height) * 10)) / 10;
    // shiftScrollbar = ((shiftListY * ( lenghtScrollbar-height)) / ((listPatterns.length * heightItemList) - height)) * 1;
// }