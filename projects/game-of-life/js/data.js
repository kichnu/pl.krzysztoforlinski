const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d', {
    alpha: false
});

const widthPoint = 10;
const heightPoint = 10;
const shiftListX = -310;//położenie
let leftSiteList = 20;

let listPatterns = [];

let width = 0;
let height = 0;

const widthList = 120;
const heightItemList = 120;

function createData() {
    canvas.width = width = window.innerWidth;
    canvas.height = height = window.innerHeight;
    leftSiteList = width + shiftListX;
}

window.onresize = function () {
    createData();
}

window.onload = function () {
    if (listPatterns.length === 0) {
        if (JSON.parse(localStorage.getItem('myElement') != null)) {
            listPatterns = JSON.parse(localStorage.getItem('myElement'));
        } else listPatterns = [];
    };
    createData();
}

const colorPattern = {
    basic: '#ffffff',
    remove: '#FFD600',
    animate: "#2196F3",
}

let pX;
let pY;

document.querySelector('body').addEventListener('mousemove', function (e) {
    pX = (Math.floor(e.clientX / 10) * 10);
    pY = (Math.floor(e.clientY / 10) * 10);
});

function getPosArrow() {
    return {
        pX: pX-100,
        pY: pY-100
    }
}

function getPosCursor() {
    return {
        pX: pX,
        pY: pY
    }
}

let shiftListY = 340;
let lenghtScrollbar = 0;
let shiftScrollbar = 0;




