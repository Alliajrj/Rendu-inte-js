function changePage(accueil) {
	const pages = document.getElementsByClassName("page");
	for (let i = 0; i < pages.length; i++) {
		pages[i].style.display = "none";
	}

	const selectedPage = document.getElementById(accueil);
	if (selectedPage) {
        selectedPage.style.display = "flex";
	}

	const onglets = document.getElementsByClassName("onglet");

	for (let i = 0; i < onglets.length; i++) {
		onglets[i].addEventListener("click", () => {
			for (let j = 0; j < onglets.length; j++) {
				onglets[j].classList.remove("active");
			}

			onglets[i].classList.add("active");
		});
	}
}

fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
	.then((response) => response.json())
	.then((data) => {
		data.results.forEach((pokemon) => {
			fetch(pokemon.url)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					const detailsDiv = document.createElement("div");
					detailsDiv.classList.add("pokemon-card");

					let statsHTML = "";
					data.stats.forEach((stat) => {
						statsHTML += `<p>${stat.stat.name}: ${stat.base_stat}</p>`;
					});

                    detailsDiv.innerHTML = `
                        <img src="img/icons8-pokebag-100.png"  class="pokebag-icon" alt="Pokebag Icon">
                        <h3>${data.name}</h3>
                        <img src="${data.sprites.front_default}" alt="${data.name}">
                        <button class="details-button">Plus de détails</button>
                        <div class="pokemon-stats" style="display: none;">
                            ${statsHTML}
                        </div>
                    `;

					detailsDiv
						.querySelector(".details-button")
						.addEventListener("click", () => {
							const statsDiv =
								detailsDiv.querySelector(".pokemon-stats");
							if (statsDiv.style.display === "none") {
								statsDiv.style.display = "block";
							} else {
								statsDiv.style.display = "none";
							}
						});

					document
						.querySelector("#pokemon-container")
						.appendChild(detailsDiv);
				});
		});
    });
    
    const pokebagIcon = detailsDiv.querySelector(".pokebag-icon");
	pokebagIcon.addEventListener("click", () => {
		const panierDiv = document.querySelector("#panier");
		const pokemonInPanier = document.createElement("div");
		pokemonInPanier.classList.add("pokemon-in-panier");
		pokemonInPanier.innerHTML = `
        <h3>${data.name}</h3>
        <img src="${data.sprites.front_default}" alt="${data.name}">
    `;
		panierDiv.appendChild(pokemonInPanier);
	});