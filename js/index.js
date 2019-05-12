const listPhotos = {
    mainSite: [
        './photos/main-site/main-1.jpg',
        './photos/main-site/main-2.jpg',
        './photos/main-site/main-3.jpg',
        './photos/main-site/main-4.jpg'
    ],
}
const picture = document.querySelector('.js-picture');
const contactWrapperButtonClose = document.querySelector('.contact__button-close');
const contaktWrapper = document.querySelector('.js-contact-form')

const arrayElements = document.querySelectorAll('.js-main__nav');

for (let i = 0; i < arrayElements.length; i++) {
    arrayElements[i].addEventListener('mousemove', function () {
        if (innerWidth > 1248 && !contaktWrapper.classList.contains('js-contact-form--visibly')) {
            picture.style.backgroundImage = `url(${listPhotos.mainSite[i]})`;
        }
    })
}

const navContact = document.querySelector('.js-nav-contact');

navContact.addEventListener('click', function () {
    contaktWrapper.classList.add('js-contact-form--visibly')
})

contactWrapperButtonClose.addEventListener('click', function () {
    contaktWrapper.classList.remove('js-contact-form--visibly');
})

var navList = document.querySelectorAll('.js-nav__item');

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



//email form $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
{
    const form = document.querySelector('#contactForm');
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

    //wyłączamy domyślną walidację
    form.setAttribute('novalidate', true);

    const displayFieldError = function (elem) {
        const fieldRow = elem.closest('.form__row');
        const fieldError = fieldRow.querySelector('.field-error');
        if (fieldError === null) {
            const errorText = elem.dataset.error;
            const divError = document.createElement('div');
            divError.classList.add('field-error');
            divError.innerText = errorText;
            fieldRow.appendChild(divError);
        }
    };

    const hideFieldError = function (elem) {
        const fieldRow = elem.closest('.form__row');
        const fieldError = fieldRow.querySelector('.field-error');
        if (fieldError !== null) {
            fieldError.remove();
        }
    };

    [...inputs].forEach(elem => {
        elem.addEventListener('input', function () {
            if (!this.checkValidity()) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
                hideFieldError(this);
            }
        });

        if (elem.type === "checkbox") {
            elem.addEventListener('click', function () {
                const formRow = this.closest('.form__row');
                if (this.checked) {
                    this.classList.remove('error');
                    hideFieldError(this);
                } else {
                    this.classList.add('error');
                }
            });
        }
    });

    const checkFieldsErrors = function (elements) {
        //ustawiamy zmienną na true. Następnie robimy pętlę po wszystkich polach
        //jeżeli któreś z pól jest błędne, przełączamy zmienną na false.
        let fieldsAreValid = true;

        [...elements].forEach(elem => {
            if (elem.checkValidity()) {
                hideFieldError(elem);
                elem.classList.remove('error');
            } else {
                displayFieldError(elem);
                elem.classList.add('error');
                fieldsAreValid = false;
            }
        });

        return fieldsAreValid;
    };

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        //jeżeli wszystkie pola są poprawne...
        if (checkFieldsErrors(inputs)) {
            const elements = form.querySelectorAll('input:not(:disabled), textarea:not(:disabled), select:not(:disabled)');

            const dataToSend = new FormData();
            [...elements].forEach(el => dataToSend.append(el.name, el.value));

            const url = form.getAttribute('action');
            const method = form.getAttribute('method');

            const submit = form.querySelector('[type="submit"]');
            submit.disabled = true;
            submit.classList.add('element-is-busy');

            fetch(url, {
                    method: method.toUpperCase(),
                    body: dataToSend
                })
                .then(ret => ret.json())
                .then(ret => {
                    submit.disabled = false;
                    submit.classList.remove('element-is-busy');

                    if (ret.errors) {
                        ret.errors.map(function (el) {
                            return '[name="' + el + '"]'
                        });
                        const selector = ret.errors.join(',');
                        checkFieldsErrors(form.querySelectorAll(sekector));

                    } else {
                        if (ret.status === 'ok') {
                            //wyświetlamy komunikat powodzenia, cieszymy sie
                            const div = document.createElement('div');
                            div.classList.add('form-send-success');

                            div.innerHTML = '<strong>Wiadomość została wysłana</strong><span>Dziękuję za kontakt. </br> Postaram się odpowiedzieć jak najszybciej</span>';
                            form.parentElement.insertBefore(div, form);
                            form.remove();
                        }

                        if (ret.status === 'error') {
                            const div = document.createElement('div');
                            div.classList.add('send-error');
                            div.innerHTML = '<span>Upps... </br></span> Coś poszło źle.';
                            form.parentElement.insertBefore(div, form);
                            form.remove();
                        }
                    }
                }).catch(_ => {
                    submit.disabled = false;
                    submit.classList.remove('element-is-busy');
                });
        }
    });
}


// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&




// const listElements = [];
// const listRemoveElements = [];
// let numberCoverElements = 250;
// let coverAnimation = '';

// function createCoverAnimation() {
//     const container = document.querySelector('.container');
//     coverAnimation = document.createElement('div');
//     container.appendChild(coverAnimation);
//     coverAnimation.classList.add('cover-animation')

//     for (let i = 0; i < numberCoverElements; i++) {
//         const coverAnimationElement = document.createElement('div');
//         coverAnimationElement.classList.add('cover-animation-element')
//         listElements.push(coverAnimationElement);
//         coverAnimation.appendChild(coverAnimationElement);
//     }
// }

// function createItemNumberDelete() {
//     let flag = true;
//     let x = 0;

//     while (flag) {
//         flag = false;
//         x = Math.floor(Math.random() * (numberCoverElements - 0)) + 0;

//         for (let i = 0; i < listRemoveElements.length; i++) {
//             if (listRemoveElements[i] === x) {
//                 flag = true;
//             }
//         }
//     }
//     listRemoveElements.push(x);
//     return x;
// }

// function removeCoverAnimation() {
//     for (let i = 0; i < numberCoverElements.length; i++) {
//         coverAnimation.removeChild(listElements[i]);
//         listElements[i] = '';
//     }
//     coverAnimation.remove();
// }

// function rotateElement() {
//     const time = setInterval(function () {
//         listElements[createItemNumberDelete()].classList.add('rotate');
//         if (listRemoveElements.length === numberCoverElements) {
//             clearInterval(time);
//             removeCoverAnimation();
//         }
//     }, 7)
// }

// document.addEventListener("DOMContentLoaded", function () {
//             createCoverAnimation()
//             rotateElement()
// });