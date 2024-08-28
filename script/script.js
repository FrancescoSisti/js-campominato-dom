console.log(`JS OK`);

function createGrid() {
    const griglia = document.getElementById("grid");

    // Pulisci la griglia in caso di clic ripetuti
    griglia.innerHTML = "";

    // Aggiungi la classe "visible" per attivare l'animazione
    griglia.classList.add("visible");

    for (let i = 1; i <= 100; i++) {
        const cella = document.createElement("div");
        cella.classList.add("cella");
        cella.textContent = i;

        cella.addEventListener("click", () => {
            cella.style.backgroundColor = "lightblue";
            //cella.classList.toggle("blue");
            console.log("Hai cliccato sulla cella:", cella.textContent);
        });
        griglia.appendChild(cella);
    }
}