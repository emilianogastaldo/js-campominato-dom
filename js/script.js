// Recupero i componenti html

const playButton = document.querySelector('button');
const playForm = document.querySelector('form');
const difficulty = document.getElementById('difficulty');
const grid = document.querySelector('.grid');
const scoreText = document.getElementById('score');

// Funzione per creare una nuova cella e ne decido la grandezza in base alla difficoltà
const getNewCell = content => {
    const newCell = document.createElement('div');
    newCell.innerText = content;
    newCell.classList.add('cell');

    return newCell;
}

// Funzione per generare le bombe
const getBombs = (maxNum, bombQuantity) => {
    //Array che conterrà le bombe
    const bombs = [];
    while (bombs.length < bombQuantity) {
        const bomb = Math.floor(Math.random() * maxNum) + 1;
        if (!bombs.includes(bomb)) bombs.push(bomb);
    }
    return bombs;
};

//Funzione per capire se il gioco è finito
const endGame = (text, score, won) => {
    const message = won
        ? `Hai vinto!`
        : `Hai perso! Hai totalizzato ${score} punti`;
    text.innerText = message;
    isGameOver = true;
}

//Creo l'evento per creare le celle e far iniziare il gioco
playForm.addEventListener('submit', e => {
    e.preventDefault();
    //Rinomino il bottone
    playButton.innerText = 'Rigioca!';

    //Preparo un flag
    let isGameOver = false;

    //Se esiste una griglia la cancello.
    grid.innerText = '';

    //Recupero il valore della difficoltà e decido quante colonne e righe    
    const difficultyValue = difficulty.value;

    //aggiungo la classe a grid per la grandezza delle celle
    grid.classList.add(difficultyValue);


    //Decido la quantità di colonne e di righe e di bombe 
    let rows = 3;
    let cols = 3;
    let bombQuantity = 1;
    switch (difficultyValue) {
        case 'hard':
            rows = 7;
            cols = 7;
            break;
        case 'medium':
            rows = 9;
            cols = 9;
            break;
    }

    const totalCells = rows * cols;

    //Creo la variabile per aggiornare lo score.
    let playerScore = 0;
    scoreText.innerText = `Punteggio: ${playerScore}`;

    //Creo le bombe
    const bombs = getBombs(totalCells, bombQuantity);
    console.log(bombs);

    //Calcolo il punteggio massimo
    const maxScore = totalCells - bombQuantity;

    //Creo le celle
    for (let i = 1; i <= totalCells; i++) {

        //Creo una nuova cella
        const cell = getNewCell(i);

        //Aggiungo l'interazione delle celle
        cell.addEventListener('click', () => {
            //Controllo se è già strato clickata o se ha finito la partita
            if (isGameOver || cell.classList.contains('clicked')) return;

            //Do la classe clicked
            cell.classList.add('clicked');

            //Verifico se ho colpito una bomba
            hasHitBomb = bombs.includes(parseInt(cell.innerText));

            //Se premo una bomba
            if (hasHitBomb) {
                cell.classList.add('bomb');
                endGame(scoreText, playerScore, false);
            } else {
                //Se non è una bomba aumento il punteggio di uno e aggiorno il punteggio.
                playerScore = ++playerScore;
                score.innerText = 'Punteggio: ' + playerScore;
            }
            if (playerScore === maxScore) {
                endGame(scoreText, playerScore, true);
            }

        });
        grid.appendChild(cell);
    }
});