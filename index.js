let cards = []
let sum = 0

let hasBlackJack = false
let isAlive = false

let message = ""
let messageEl = document.getElementById("message-el")

let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")

let player = {
    name: "Per",
    chips: 100
}

let playerEl = document.getElementById("player-el")
playerEl.textContent = player.name + `: $` + player.chips

let buttonNewCardEl = document.getElementById("newCardButton")
let buttonTakeMoneyEl = document.getElementById("takeMoneyButton")
buttonNewCardEl.style.visibility = "hidden"
buttonTakeMoneyEl.style.visibility = "hidden"

function getRandomCard() {
    let randCard = Math.floor(Math.random() * 13) + 1
    if (randCard === 1) {
        return 11
    } else if (randCard > 10) {
        return 10
    } else {
        return randCard
    }
}

function startGame() {
    if ((!isAlive || hasBlackJack) && player.chips >= 10) {
        player.chips -= 10
        playerEl.textContent = player.name + `: $` + player.chips
        buttonNewCardEl.style.visibility = "visible"
        buttonTakeMoneyEl.style.visibility = "visible"
        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        sum = firstCard + secondCard
        cards.push(firstCard, secondCard)
        isAlive = true
        hasBlackJack = false
        renderGame()
    }
}

function renderGame() {
    sumEl.textContent = "Your Sum: " + sum
    cardsEl.textContent = "Your Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "Congrats, you've got Blackjack!"
        player.chips += 30
        playerEl.textContent = player.name + `: $` + player.chips
        hasBlackJack = true
        sum = 0
        cards = []
        buttonNewCardEl.style.visibility = "hidden"
        buttonTakeMoneyEl.style.visibility = "hidden"
    } else {
        message = "You lose!"
        isAlive = false
        sum = 0
        cards = []
        buttonNewCardEl.style.visibility = "hidden"
        buttonTakeMoneyEl.style.visibility = "hidden"
    }
    messageEl.textContent = message
}

function newCard() {
    if (isAlive && !hasBlackJack) {
        let newCard = getRandomCard()
        cards.push(newCard)
        sum += newCard
        renderGame()
    }
}

function takeMoney() {
    if (isAlive && !hasBlackJack && sum >= 15) {
        player.chips += sum - 5
        playerEl.textContent = player.name + `: $` + player.chips
        buttonNewCardEl.style.visibility = "hidden"
        buttonTakeMoneyEl.style.visibility = "hidden"
        isAlive = false
        messageEl.textContent = "Want to play a round?"
        sum = 0
        cards = []
    }
}