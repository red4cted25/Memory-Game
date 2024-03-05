let errors = 0;
let score = 0;
let cardList = [
    "Crowbar",
    "Energy_Drink",
    "Gasoline",
    "Harvester's_Scythe",
    "Lens-Maker's_Glasses",
    "Medkit",
    "Paul's_Goat_Hoof",
    "Predatory_Instincts",
    "Shattering_Justice",
    "Shatterspleen",
    "Tougher_Times",
    "Ukulele",
    "Unstable_Tesla_Coil",
    "Volcanic_Egg",
    "Will-o'-the-wisp"
]

let cardSet;
let board = [];
let rows = 4;
let columns =5;

let card1Selected;
let card2Selected;

window.onload = function() {
    shuffleCards();
    startGame();
}

function shuffleCards() {
    cardSet = cardList.concat(cardList); // Two of each card
    console.log(cardSet);
    // Shuffle
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length); // Get random index
        // Swap
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
    console.log(cardSet);
}

function startGame() {
    // Arrange the board 4x5
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg); //JS
            // <img id="0-0" class="card" src="water.jpg">
            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = "./Images/" + cardImg + ".png";
            card.classList.add("card");
            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card);
        }
        board.push(row);
    }

    console.log(board);
    setTimeout(hideCards, 1000);
}

function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "./Images/pattern.svg";
        }
    }
}

function selectCard() {

    if (this.src.includes("pattern")) {
        if (!card1Selected) {
            card1Selected = this;

            let coords = card1Selected.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1Selected.src = "./Images/" + board[r][c] + ".png";
        }
        else if (!card2Selected && this != card1Selected) {
            card2Selected = this;

            let coords = card2Selected.id.split("-"); //"0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2Selected.src = "./Images/" + board[r][c] + ".png";
            setTimeout(update, 1000);
        }
    }

}

function update() {
    //if cards aren't the same, flip both back
    if (card1Selected.src != card2Selected.src) {
        card1Selected.src = "./Images/pattern.svg";
        card2Selected.src = "./Images/pattern.svg";
        errors += 1;
        document.getElementById("errors").innerText = errors;
    }
    card1Selected = null;
    card2Selected = null;
}