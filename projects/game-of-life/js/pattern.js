const pattern = (function () {

    const panel = document.querySelector('.panel-squares');
    for (let i = 0; i < 100; i++) {
        const element = document.createElement('div');
        element.classList.add('element');
        panel.appendChild(element);
    }

    function createCoordinate(index) {
        const coordinate = {
            index: index,
            color: '#ffffff',
            x: index - (Math.floor(index / 10) * 10),
            y: Math.floor(index / 10)
        }
        return coordinate;
    }

    let listActiveCells = [];
    const elements = document.querySelectorAll('.element');
    for (let i = 0; i < elements.length; i++) {

        elements[i].onclick = function (e) {

            e.stopPropagation();
            let canRemove = false;
            if (!(elements[i].classList.contains(`ele${i}`))) {
                this.classList.add('blue');
                this.classList.add(`ele${i}`);
                listActiveCells.push(createCoordinate(i))
                canRemove = false;
            } else canRemove = true;

            if (canRemove && (elements[i].classList.contains(`ele${i}`))) {
                this.classList.remove('blue');
                this.classList.remove(`ele${i}`);

                for (let j = 0; j < listActiveCells.length; j++) {
                    if (listActiveCells[j].index === i) {
                        listActiveCells.splice(j, 1);
                    }
                }
            }
        }
    }

    function getListActiveCells() {
        return listActiveCells;
    }

    function cleanListActiveCells() {
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].classList.contains(`ele${i}`)) {
                elements[i].classList.remove('blue');
                elements[i].classList.remove(`ele${i}`);
            }
        }
        listActiveCells = [];
    }

    document.querySelector('.button-clean').addEventListener('click', function (e) {
        e.stopPropagation();
        cleanListActiveCells();
    })

    return {
        getListActiveCells: getListActiveCells,
    };
})();