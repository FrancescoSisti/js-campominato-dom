/*Il computer deve generare 16 numeri casuali nello stesso range della difficltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell'array delle bombe non potranno esserci due numeri uguali
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati abbiamo calpestato una bomba. La cella si colora di rosso e la partita termina. Altrimenti, la cella cliccata si colora di azzurro e l'utente può continuare  a cliccare sulle altre celle.
LA partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita, il software deve comunicare il punteggio, cioè il numero di volte che l'utente ha cliccato su una cella che non era una bomba
# MILESTONE 1
Prepariamo "Qualcosa" per tenere il punteggio dell'utente.
Quando l'utente clicca su una cella, incrementiamo il punteggio.
Se riusciamo, facciamo anche in modo da non poter più cliccare sulla stessa cella
# MILESTONE 2
Facciamo in modo di generare 16 numeri casuali (tutti diversi) compresi tra 1 e il massimo di caselle disponibili.
Generiamoli e stampiamo in console per essere certi che siano corretti
# MILESTONE 3
Quando l'utente clicca su una cella, verifichiamo se ha calpestato una bomba, controllando se il numero di cella è presente nell'array di bombe.
Se si, la cella diventa rossa (raccogliamo il punteggio e scriviamo in console che la patita termina) altrimenti diventa azzurra e dobbiamo incrementare il punteggio.
# MILESTONE 4
Quando l'utente clicca su una cella, e questa non è una bomba, dobbiamo controllare se il punteggio incrementato ha raggiunto il punteggio massimo, perchè in quel caso la partita termina. Raccogliamo quindi il punteggio e scriviamo un messaggio appropriato.
# MILESTONE 5
Quando la partita termina dobbiamo capire se è terminata perchè è stata cliccata una bomba o seperchè l'utente ha raggiunto il punteggio massimo(ossia ha vinto). Dobbiamo poi in ogni caso stampare lin pagina il punteggio raggiunto ed il messaggio adeguato in caso di vittoria o sconfitta.
# BONUS
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà (come le istruzioni di ieri se non già fatto)
# SUPERBONUS
Colorare tutte le celle bomba quando la partita finisce*/
// -----------------------------------------------------------------------------------------------------------------------------


console.log(`JS OK`);

// Funzione per generare numeri casuali unici
function generateUniqueRandomNumbers(count, min, max) {
    const numbers = new Set();
    while (numbers.size < count) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        numbers.add(randomNumber);
    }
    return Array.from(numbers);
}

// Funzione per colorare tutte le celle bomba
function revealBombs(bombs) {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        if (bombs.includes(index + 1)) {
            cell.classList.add('bomb');
        }
    });
}

// Funzione per terminare il gioco
function endGame(finalScore, isVictory, bombs) {
    const endMessageElement = document.getElementById("endMessage");
    const message = isVictory ? `Hai vinto! Punteggio finale: ${finalScore}` : `Hai perso. Punteggio finale: ${finalScore}`;

    endMessageElement.textContent = message;
    console.log(message);
    alert(message);

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.classList.add('clicked'));

    // Colora tutte le celle bomba alla fine del gioco
    revealBombs(bombs);
}

// Funzione per ottenere il numero di celle in base alla difficoltà
function getCellCount(difficulty) {
    switch (difficulty) {
        case 'facile': return 100;
        case 'medio': return 81;
        case 'difficile': return 49;
        default: return 100;
    }
}

// Funzione principale per creare la griglia
function createGrid() {
    const grid = document.getElementById("grid");
    const scoreElement = document.getElementById("score");
    const endMessageElement = document.getElementById("endMessage");
    const difficultySelect = document.querySelector('.difficulty-select');
    const difficulty = difficultySelect.value;
    const cellCount = getCellCount(difficulty);
    const bombCount = 16;
    let score = 0;
    const maxScore = cellCount - bombCount;

    if (!grid || !scoreElement || !endMessageElement) {
        console.error("Elementi della griglia non trovati.");
        return;
    }

    grid.innerHTML = "";
    endMessageElement.textContent = "";
    scoreElement.textContent = "Punteggio: 0";
    grid.classList.add("visible");

    const bombs = generateUniqueRandomNumbers(bombCount, 1, cellCount);
    console.log("Numeri delle bombe:", bombs);

    const columns = Math.sqrt(cellCount);
    grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    for (let i = 1; i <= cellCount; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.textContent = i;

        cell.addEventListener("click", () => {
            if (!cell.classList.contains("clicked")) {
                cell.classList.add("clicked");

                if (bombs.includes(i)) {
                    cell.classList.add("bomb");
                    endGame(score, false, bombs);
                } else {
                    cell.classList.add("highlight");
                    score++;
                    scoreElement.textContent = `Punteggio: ${score}`;

                    if (score === maxScore) {
                        endGame(score, true, bombs);
                    }
                }
            }
        });

        grid.appendChild(cell);
    }
}

// Aggiungi l'event listener al bottone "Gioca!"
document.querySelector('.btn').addEventListener('click', createGrid);
