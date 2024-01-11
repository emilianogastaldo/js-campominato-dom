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
const getBombs = (maxNum, manyBomb) => {
    //Array che conterrà le bombe
    const bombs = [];
    while (bombs.length < manyBomb) {
        const bomb = Math.floor(Math.random() * maxNum) + 1;
        if (!bombs.includes(bomb)) bombs.push(bomb);
    }
    return bombs;
};


//Creo l'evento per creare le celle e far iniziare il gioco
playForm.addEventListener('submit', e => {
    e.preventDefault();

    //Creo la variabile per aggiornare lo score.
    let playerScore = 0;

    //Se esiste una griglia la cancello.
    grid.innerText = '';

    //Recupero il valore della difficoltà e decido quante colonne e righe    
    const difficultyValue = difficulty.value;

    //aggiungo la classe a grid per la grandezza delle celle
    grid.classList.add(difficultyValue);


    //Decido la quantità di colonne e righe
    let rows = 10;
    let cols = 10;
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

    //Creo le celle
    for (let i = 1; i <= totalCells; i++) {

        //Creo una nuova cella
        const cell = getNewCell(i);

        //Aggiungo l'interazione delle celle
        cell.addEventListener('click', () => {
            //Controllo se è già strato clickata
            if (cell.classList.contains('clicked')) return;

            //Se non è stata cliccata do la classe e aumento il punteggio di uno.
            cell.classList.add('clicked');
            playerScore = ++playerScore;
            score.innerText = 'Punteggio: ' + playerScore;
            console.log("Il numero all'interno è: " + i);
        });
        grid.appendChild(cell);
    }
});