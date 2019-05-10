
const navList = document.querySelectorAll('.js-nav__item');

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        navList[0].classList.add('js-move')
    }, 400)

    setTimeout(function () {
        navList[1].classList.add('js-move')
    }, 300)

    setTimeout(function () {
        navList[2].classList.add('js-move')
    }, 200)

    setTimeout(function () {
        navList[3].classList.add('js-move')
    }, 100)

});