const cardsArray = [
    'icons/clock-three.png', 'icons/clock-three.png',
    'icons/coins.png', 'icons/coins.png',
    'icons/laptop-code.png', 'icons/laptop-code.png',
    'icons/mobile-button.png', 'icons/mobile-button.png',
    'icons/puzzle-piece.png', 'icons/puzzle-piece.png',
    'icons/rocket-lunch.png', 'icons/rocket-lunch.png',
    'icons/smile-beam.png', 'icons/smile-beam.png',
    'icons/video-camera-alt.png', 'icons/video-camera-alt.png'
];

let gameBoard = document.getElementById('game-board');
let flippedCards = [];
let matchedCards = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(cardsArray);

cardsArray.forEach(card => {
    let cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.value = card;
    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
});

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        let imgElement = document.createElement('img');
        imgElement.src = this.dataset.value;
        imgElement.classList.add('icon');
        this.appendChild(imgElement);
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 1000);
        }
    }
}

function checkForMatch() {
    let [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards += 2;
        if (matchedCards === cardsArray.length) {
            setTimeout(() => alert('Vyhráli jste!'), 100);
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.innerHTML = '';
        card2.innerHTML = '';
    }
    flippedCards = [];
}