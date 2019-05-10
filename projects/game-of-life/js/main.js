const listPointCanvas = [];
let listPointforAnimation = [];

function copyToCanvas(list) {

    if (list != undefined) {
        for (let i = 0; i < list.length; i++) {
            const canvasCoordinate = {
                posX: (list[i].x * widthPoint) + getPosArrow().pX,
                posY: (list[i].y * heightPoint) + getPosArrow().pY,
            }
            listPointCanvas.push(canvasCoordinate);
        }
    }
    listYourPatterns.removeSelectionPatterns();
}

function removeDuplicates(list) {
    for (let del = 0; del < list.length; del++) {
        for (let d = del + 1; d < list.length; d++) {
            if (list[del].posX === list[d].posX && list[del].posY === list[d].posY) {
                list[d].forDel = true;
            }
        }
    }
    for (let act = 0; act < list.length; act++) {
        if (list[act].active === true) {
            list[act].forDel = false;
        }
    }
    temporaryList = list.filter(function (el) {
        return el.forDel != true;
    });
    //rugi etap filtracji-----------------
    for (let del = 0; del < temporaryList.length; del++) {
        for (let d = del + 1; d < temporaryList.length; d++) {
            if (temporaryList[del].posX === temporaryList[d].posX && temporaryList[del].posY === temporaryList[d].posY) {
                temporaryList[del].forDel = true;
            }
        }
    }
    return listAllPossibilities = temporaryList.filter(function (el) {
        return el.forDel != true;
    });
}

function createListPossibilities(listPoint, i) {
    const listPossibilities = [];
    for (let j = 0; j < 9; j++) {
        const possibilities = {
            forDel: false,
            active: false,
            posX: 0,
            posY: 0
        }
        switch (j) {
            case 0:
                possibilities.posX = listPoint[i].posX - widthPoint;
                possibilities.posY = listPoint[i].posY - heightPoint;
                break;
            case 1:
                possibilities.posX = listPoint[i].posX;
                possibilities.posY = listPoint[i].posY - heightPoint;
                break;
            case 2:
                possibilities.posX = listPoint[i].posX + widthPoint;
                possibilities.posY = listPoint[i].posY - heightPoint;
                break;
            case 3:
                possibilities.posX = listPoint[i].posX - widthPoint;
                possibilities.posY = listPoint[i].posY + heightPoint;
                break;
            case 4:
                possibilities.posX = listPoint[i].posX;
                possibilities.posY = listPoint[i].posY + heightPoint;
                break;
            case 5:
                possibilities.posX = listPoint[i].posX + widthPoint;
                possibilities.posY = listPoint[i].posY + heightPoint;
                break;
            case 6:
                possibilities.posX = listPoint[i].posX - widthPoint;
                possibilities.posY = listPoint[i].posY;
                break;
            case 7:
                possibilities.posX = listPoint[i].posX + 10;
                possibilities.posY = listPoint[i].posY;
                break;
            case 8:
                possibilities.posX = listPoint[i].posX;
                possibilities.posY = listPoint[i].posY;
                possibilities.active = true;
        }
        listPossibilities.push(possibilities);
    }
    return listPossibilities;
}

function createListAllPossibilities(listPoint) {
    let temporaryList = [];
    for (let i = 0; i < listPointCanvas.length; i++) {
        temporaryList = temporaryList.concat(createListPossibilities(listPoint, i));
    }
    return removeDuplicates(temporaryList)
}

function checkPossibilities(listPoint, i) {
    let x = listPoint[i].posX;
    let y = listPoint[i].posY;
    cell = {
        active: false,
        posX: x,
        posY: y,
        forDel: false,
    }
    let numberEquels = 0;
    for (let j = 0; j < listPoint.length; j++) {
        if (x - widthPoint === listPoint[j].posX && y - heightPoint === listPoint[j].posY && listPoint[j].active) numberEquels++;
        if (x === listPoint[j].posX && y - heightPoint === listPoint[j].posY && listPoint[j].active) numberEquels++;
        if (x + widthPoint === listPoint[j].posX && y - heightPoint === listPoint[j].posY && listPoint[j].active) numberEquels++;
        if (x - widthPoint === listPoint[j].posX && y + heightPoint === listPoint[j].posY && listPoint[j].active) numberEquels++;
        if (x === listPoint[j].posX && y + heightPoint === listPoint[j].posY && listPoint[j].active) numberEquels++;
        if (x + widthPoint === listPoint[j].posX && y + heightPoint === listPoint[j].posY && listPoint[j].active) numberEquels++;
        if (x - widthPoint === listPoint[j].posX && y === listPoint[j].posY && listPoint[j].active) numberEquels++;
        if (x + widthPoint === listPoint[j].posX && y === listPoint[j].posY && listPoint[j].active) numberEquels++;
    }
    if ((!listPoint[i].active) && numberEquels === 3) {
        cell.active = true;
    } else if (listPoint[i].active && (numberEquels === 3 || numberEquels === 2)) {
        cell.active = true;
    } else if (listPoint[i].active && numberEquels > 3 || numberEquels < 2) {
        cell.active = false;
    }
    return cell;
}

function createLife(listPoint) {
    let temporaryList1 = [];
    let temporaryList2 = [];
    let temporaryList3 = [];
    for (let i = 0; i < listPoint.length; i++) {
        temporaryList1.push(checkPossibilities(listPoint, i));
    }
    temporaryList2 = temporaryList1.filter(function (el) {
        return el.active === true;
    });
    for (let j = 0; j < temporaryList2.length; j++) {
        temporaryList3 = temporaryList3.concat(createListPossibilities(temporaryList2, j));
    }
    return removeDuplicates(temporaryList3)
}

function prepareListForAnimation(list) {
    listPointforAnimation = list.filter(function (el) {
        return el.active === true;
    });
}



let canDrawFirstPattern = true;

let speedValue = document.querySelector('.range');

function get() {
    return 1000 / speedValue.value;
}

function end(){
    console.log(n);
    console.log('game over');
}

let canReset = false;

let pauseLife = true;
let changeSpeed = get();
let n = 0;

function life(list) {
    let check = true;
    let flag = true;


    repeater = setInterval(repeaterFn, get());

    function repeaterFn() {
        setTimeout(function () {
            check = false;
            canDrawFirstPattern = false;
        }, 0)
        n++;
        if (listPointforAnimation.length === 0 && n>2) {
            end();
            location.reload();
        }
      
      

        if (check) {
            teporaryList1 = createLife(list);
        }
        if (pauseLife) {
            if (flag) {
                prepareListForAnimation(teporaryList1);
                teporaryList2 = createLife(teporaryList1);
                flag = !flag;
            } else {
                prepareListForAnimation(teporaryList2);
                teporaryList1 = createLife(teporaryList2);
                flag = !flag;
            }
        }
        if (changeSpeed != get()) {
            clearInterval(repeater);
            repeater = setInterval(repeaterFn, get());
        }
    }
}

let canStart = true;
document.querySelector('.button-start').addEventListener('click', function (e) {
    e.stopPropagation();
    if (canStart) {
        life(createListAllPossibilities(listPointCanvas));
    } else alert('Animacja została już uruchomiona. Podziwiaj efekty lub naciśnij przycisk RESTART')
    canStart = false;
})

document.querySelector('.button-pause').addEventListener('click', function (e) {
    e.stopPropagation();
    pauseLife = !pauseLife;
})

document.querySelector('.button-reset').addEventListener('click', function (e) {
    e.stopPropagation();
    location.reload();

})

function drawCanvas() {
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
}

function drawTitle() {
    ctx.fillStyle = 'white';
    ctx.font = "18px Montserrat";
    ctx.textBaseline = "middle";
    ctx.fillText("John Conway's  Game of Life", 20, height - 20);

}

function drawFirstPattern() {
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < listPointCanvas.length; i++) {
        ctx.fillRect(listPointCanvas[i].posX, listPointCanvas[i].posY, widthPoint, heightPoint);
    }
}

function drawLife() {
    for (let i = 0; i < listPointforAnimation.length; i++) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(listPointforAnimation[i].posX, listPointforAnimation[i].posY, widthPoint, heightPoint);

    }
}


document.querySelector('.side-display').addEventListener('click', function (e) {
    e.stopPropagation();
})

//Pierwszy etap animacji==========================================
document.addEventListener('click', function (e) {
    if (canStart) {
        copyToCanvas(listYourPatterns.getPatternToAnimation());
    }
    if (!canStart && getPosCursor().pX > width) alert('Animacja została już uruchomiona. Podziwiaj efekty lub naciśnij przycisk RESTART')
})

window.requestAnimFrame = (function () {
    return (window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 50);
        })
})();






function animation() {
    drawCanvas();
    drawTitle();
    drawArrow.drawArrow();
    if (canDrawFirstPattern) {
        drawFirstPattern();
    }
    drawLife();
    listYourPatterns.drawPatternsOnCanvas(); // bład
    window.requestAnimFrame(animation);
}
requestAnimationFrame(animation);