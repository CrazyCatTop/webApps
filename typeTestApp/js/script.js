const quoteApiUrl = 'https://api.quotable.io/random?minLength=80&maxLength=100';
const quoteSection = document.querySelector('#quote');
const userInput = document.querySelector('#quote-input');

let quote = '';
let time = 60;
let timer = '';
let mistakes = 0;

const renderNewQuote = async () => {
    const response = await fetch(quoteApiUrl);
    let data = await response.json();
    quote = data.content;

    let arr = quote.split('').map((value) => {
        return `<span class="quote-chars">${value}</span>`
    });
    quoteSection.innerHTML += arr.join('');
}

userInput.addEventListener('input', () => {
    let quoteChars = document.querySelectorAll('.quote-chars');
    quoteChars = Array.from(quoteChars);

    let userInputChars = userInput.value.split('');
    quoteChars.forEach((char, index) => {
        if (char.innerText == userInputChars[index]) {
            char.classList.add('success');
        } else if (userInputChars[index] == null) {
            if (char.classList.contains('success')) {
                char.classList.remove('success');
            } else {
                char.classList.remove('fail');
            }
        } else {
            if (!char.classList.contains('fail')) {
                mistakes++;
                char.classList.add('fail');
            }
            document.querySelector('#mistakes').innerText = mistakes;
        }

        let check = quoteChars.every((element) => {
            return element.classList.contains('success');
        });

        if (check) {
            displayResult();
        }
    });
});

function updateTimer() {
    if (time == 0) {
        displayResult();
    } else {
        document.querySelector('#timer').innerText = --time + 's';
    }
}

const timeReduce = () => {
    time = 60;
    timer = setInterval(updateTimer, 1000);
};

const displayResult = () => {
    document.querySelector('.result').style.display = 'block';
    clearInterval(timer);
    document.querySelector('#stop-test').style.display = 'none';
    userInput.disabled = true;
    let timeTaken = 1;
    if (time != 0) {
        timeTaken = (60 - time) / 100;
    }
    document.querySelector('#wpm').innerText = (userInput.value.length / 5.4 / timeTaken).toFixed(2) + 'wpm';
    document.querySelector('#accuracy').innerText = Math.round(((userInput.value.length - mistakes) / userInput.value.length) * 100) + '%';
};

const startTest = () => {
    mistakes = 0;
    timer = '';
    userInput.disabled = false;
    timeReduce();
    document.querySelector('#start-test').style.display = 'none';
    document.querySelector('#stop-test').style.display = 'block';
}

window.onload = () => {
    userInput.value = '';
    document.querySelector('#start-test').style.display = 'block';
    document.querySelector('#stop-test').style.display = 'none';
    userInput.disabled = true;
    renderNewQuote();
}