'use strict';

const timerWrapper = document.querySelector('.timer__wrapper'),
    timerDays = timerWrapper.querySelector('#days'),
    timerHours = timerWrapper.querySelector('#hours'),
    timerMinutes = timerWrapper.querySelector('#minutes'),
    timerSeconds = timerWrapper.querySelector('#seconds'),
    timerButtons = timerWrapper.querySelectorAll('.timer__button'),
    timerClear = document.querySelector('#clear'),
    timerStart = document.querySelector('#start'),
    timerStop = document.querySelector('#stop');

let time;
let timerInterval;

function getTimeRemaining() {
    
    if (time !== 0) {
        time = +(timerSeconds.innerHTML) + +(timerMinutes.innerHTML) * 60 + +(timerHours.innerHTML) * 60 * 60 + +(timerDays.innerHTML) * 60 * 60 * 24 - 1;
    }
    
    let days, hours, minutes, seconds;

    if (time <= 0) {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
        
        timerClear.classList.add('disabled');
        timerStart.classList.add('disabled');
        timerStop.classList.add('disabled');
    } else {
        days = Math.floor(time / (60 * 60 * 24)),
        hours = Math.floor((time / (60 * 60)) % 24),
        minutes = Math.floor((time / (60)) % 60),
        seconds = Math.floor(time % 60);
    }

    return {
        'total': time,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function getZero(number) {
    if (number >= 0 && number < 10) {
        return `0${number}`;
    } else {
        return number;
    }
} 

function setTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const t = getTimeRemaining();

    timerDays.innerText = getZero(t.days);
    timerHours.innerText = getZero(t.hours);
    timerMinutes.innerText = getZero(t.minutes);
    timerSeconds.innerText = getZero(t.seconds);

    if (t.total <= 0) {
        clearInterval(timerInterval);
        timerButtons.forEach((button) => {
            button.classList.remove('disabled');
        });
    }
}

timerStart.addEventListener('click', () => {
    if (!timerStart.classList.contains('disabled')) {
        setTimer();
        timerStart.classList.add('disabled');
        timerStop.classList.remove('disabled');
        timerButtons.forEach((button) => {
            button.classList.add('disabled');
        });
    }
});

timerStop.addEventListener('click', () => {
    if (!timerStop.classList.contains('disabled')) {
        clearInterval(timerInterval);
        timerStop.classList.add('disabled');
        timerStart.classList.remove('disabled');
        timerButtons.forEach((button) => {
            button.classList.remove('disabled');
        });
    }    
});

timerClear.addEventListener('click', () => {
    if (!timerClear.classList.contains('disabled')) {
        time = 0;
        updateTimer();
        clearInterval(timerInterval);
        timerClear.classList.add('disabled');
        timerButtons.forEach((button) => {
            button.classList.remove('disabled');
        });
    }
});

timerButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (!button.classList.contains('disabled')) {
            const valueField = button.parentElement.parentElement.querySelector('.timer__value');
            let value = +(valueField.innerHTML);
            if (button.innerHTML == '+') {
                value++;
            } else {
                value--;
            }
            if (valueField.id == 'days') {
                if (value > 99) {
                    value = 0;
                } else if (value < 0) {
                    value = 99;
                }
            } else if (valueField.id == 'hours') {
                if (value > 23) {
                    value = 0;
                } else if (value < 0) {
                    value = 23;
                }
            } else if (value > 59) {
                value = 0;
            } else if (value < 0) {
                value = 59;
            }
            valueField.innerText = getZero(value);
            time = +(timerSeconds.innerHTML) + +(timerMinutes.innerHTML) * 60 + +(timerHours.innerHTML) * 60 * 60 + +(timerDays.innerHTML) * 60 * 60 * 24 - 1;
            if (time === -1) {
                timerStart.classList.add('disabled');
                timerClear.classList.add('disabled');
            } else {
                timerStart.classList.remove('disabled');
                timerClear.classList.remove('disabled');
            }
        }
    });
});