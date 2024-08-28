console.log(`JS OK`);

function createGrid() {
    const grid = document.getElementById("grid");

    // Pulisci la grid in caso di clic ripetuti
    grid.innerHTML = "";

    // Aggiungi la classe "visible" per attivare l'animazione
    grid.classList.add("visible");

    for (let i = 1; i <= 100; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.textContent = i;

        cell.addEventListener("click", () => {
            cell.style.backgroundColor = "lightblue";
            //cell.classList.toggle("blue");
            console.log("Hai cliccato sulla cella:", cell.textContent);
        });
        grid.appendChild(cell);
    }
}