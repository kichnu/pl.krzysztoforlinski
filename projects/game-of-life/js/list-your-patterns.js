const listYourPatterns = (function () {

    function selectPatternToRemove() {
        for (let i = 0; i < listPatterns.length; i++) {

            if (i * heightItemList + 8 + shiftListY < getPosCursor().pY && i * heightItemList + (heightItemList - 8) + shiftListY > getPosCursor().pY && getPosCursor().pX > leftSiteList && getPosCursor().pX < leftSiteList + 100) {

                for (let j = 0; j < listPatterns[i].length; j++) {
                    if (listPatterns[i][j].color === colorPattern.basic) {
                        listPatterns[i][j].color = colorPattern.remove;
                    } else(listPatterns[i][j].color = colorPattern.basic);
                }
            }
        }
    }

    function removePattern() {
        for (let i = listPatterns.length - 1; i >= 0; i--) {
            if (listPatterns[i][0].color === colorPattern.remove) {
                listPatterns.splice(i, 1);
            };
        }
        localStorage.removeItem('myElement');
        localStorage.setItem('myElement', JSON.stringify(listPatterns));
    }

    function selectPatternToAnimation() {
        for (let i = 0; i < listPatterns.length; i++) {

            const colorOk = listPatterns[i].every(function (el) {
                return el.color === colorPattern.remove;
            });

            if (colorOk) {
                for (let j = 0; j < listPatterns[i].length; j++) {
                    if (listPatterns[i][j].color === colorPattern.remove) {
                        listPatterns[i][j].color = colorPattern.animate;
                    }
                }
                return 0;
            }


        }
    }

    function getPatternToAnimation() {

        if (getPosCursor().pX < leftSiteList - 110) {
            for (let i = 0; i < listPatterns.length; i++) {
                for (let j = 0; j < listPatterns[i].length; j++) {

                    const colorOk = listPatterns[i].every(function (el) {
                        return el.color === colorPattern.animate;
                    });

                    if (colorOk) {
                        return listPatterns[i];
                    }
                }
            }
        }
    }

    function removeSelectionPatterns() {
        if (getPosCursor().pX < leftSiteList - 110) {
            for (let i = 0; i < listPatterns.length; i++) {
                for (let j = 0; j < listPatterns[i].length; j++) {
                    listPatterns[i][j].color = colorPattern.basic;
                }
            }
        }
    }

    function drawPatternsOnCanvas() {

        //draw pattern
        for (let i = 0; i < listPatterns.length; i++) {
            for (let j = 0; j < listPatterns[i].length; j++) {
                ctx.fillStyle = listPatterns[i][j].color;
                ctx.fillRect(leftSiteList + (listPatterns[i][j].x * 10), (listPatterns[i][j].y * 10) + (i * heightItemList + 10 + shiftListY), 10, 10)
            }
        }

        // draw scrollbar
        // if (1) {
        //     //scrollbar
        //     ctx.fillStyle = '#fff';
        //     ctx.fillRect(leftSiteList + widthList - 4, shiftScrollbar, 10, lenghtScrollbar);
        // }


        // draw  vertical line of list
        ctx.fillStyle = '#fff';
        ctx.fillRect(leftSiteList - 10, 0, 1, height);
        // ctx.fillRect(leftSiteList + 110, 0, 1, height);

        //draw horizontal line of list
        for (let k = 0; k < listPatterns.length; k++) {
            ctx.fillStyle = '#fff';
            ctx.fillRect(leftSiteList, ((k + 1) * heightItemList) + shiftListY, 100, 1);
        }
        if (listPatterns.length > 0) ctx.fillRect(leftSiteList, shiftListY, 100, 1);
    }

    function addPatternToList() {

        if (pattern.getListActiveCells().length > 0) {
            listPatterns.push(JSON.parse(JSON.stringify(pattern.getListActiveCells())));
        } else {
            alert('Musisz stworzyć jakiś wzór');
        }
        localStorage.removeItem('myElement');
        localStorage.setItem('myElement', JSON.stringify(listPatterns));
    }

    document.querySelector('.button-add').addEventListener('click', function (e) {
        e.stopPropagation();
        addPatternToList();
    })

    document.querySelector('.button-remove').addEventListener('click', function (e) {
        e.stopPropagation();
        removePattern();
    })

    window.addEventListener('click', function (e) {
        selectPatternToRemove();
    });

    document.querySelector('.button-animate').addEventListener('click', function (e) {
        e.stopPropagation();
        selectPatternToAnimation();
    });

    return {
        drawPatternsOnCanvas: drawPatternsOnCanvas,
        getPatternToAnimation: getPatternToAnimation,
        removeSelectionPatterns: removeSelectionPatterns,


    }

})();