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
//PRIMA MILESTONE
function createGrid() {
    const grid = document.getElementById("grid");
    const scoreElement = document.getElementById("score");
    const endMessageElement = document.getElementById("endMessage");
    let score = 0;
    const maxScore = 84; // Punteggio massimo per vincere

    if (!grid || !scoreElement || !endMessageElement) {
        console.error("Grid, elemento punteggio o elemento messaggio fine partita non trovati.");
        return;
    }

    //TERZA E QUARTA MILESTONE
    // Resetta il contenuto della griglia e del messaggio di fine partita
    grid.innerHTML = "";
    endMessageElement.textContent = ""; // Reset del messaggio di fine partita
    // Aggiungi la classe "visible" per attivare l'animazione
    grid.classList.add("visible");

    // Genera 16 numeri casuali unici per le bombe
    const bombs = generateUniqueRandomNumbers(16, 1, 100);
    console.log("Numeri delle bombe:", bombs);

    for (let i = 1; i <= 100; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.textContent = i;

        cell.addEventListener("click", () => {
            if (!cell.classList.contains("clicked")) {
                cell.classList.add("clicked");

                if (bombs.includes(i)) {
                    // Se la cella è una bomba
                    cell.classList.add("bomb");
                    console.log("Hai cliccato su una bomba. Fine partita!");
                    // Termina il gioco in caso di bomba
                    endGame(score, false);
                } else {
                    // Se la cella non è una bomba
                    cell.classList.add("highlight");
                    score++;
                    scoreElement.textContent = `Punteggio: ${score}`;
                    console.log("Hai cliccato sulla cella:", cell.textContent);

                    // Controlla se il punteggio massimo è stato raggiunto
                    if (score === maxScore) {
                        console.log("Hai vinto! Punteggio massimo raggiunto.");
                        endGame(score, true);
                    }
                }
            }
        });

        grid.appendChild(cell);
    }
}

//SECONDA MILESTONE
// Funzione per generare numeri casuali unici
function generateUniqueRandomNumbers(count, min, max) {
    const numbers = new Set();
    while (numbers.size < count) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        numbers.add(randomNumber);
    }
    return Array.from(numbers);
}

//QUINTA MILESTONE
// Funzione per terminare il gioco
function endGame(finalScore, isVictory) {
    const endMessageElement = document.getElementById("endMessage");
    const message = isVictory ? `Hai vinto! Punteggio finale: ${finalScore}` : `Hai perso. Punteggio finale: ${finalScore}`;

    // Mostra il messaggio di fine partita sulla pagina
    endMessageElement.textContent = message;

    // Mostra un messaggio nella console e un alert
    console.log(message);
    alert(message);

    // Disabilita ulteriori clic sulle celle
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.classList.add('clicked'));
}
