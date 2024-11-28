document.addEventListener('DOMContentLoaded', function () {
    let data = [];

    async function fetchPlayers() {
        try {
            const respo = await fetch("./src/scripts/players.json");
            data = await respo.json();
            localStorage.setItem("datastorage", JSON.stringify(data));
            categorizePlayers();
        } catch (error) {
            console.error("Error fetching players:", error);
        }
    }

    fetchPlayers();

    function categorizePlayers() {
        const storedData = JSON.parse(localStorage.getItem("datastorage"));
        const categorizedPlayers = {
            ST: [],
            RW: [],
            LW: [],
            CM: [],
            CB: [],
            GK: [],
            CDM: [],
            LB: [],
            RB: []
        };

        for (let i = 0; i < storedData.players.length; i++) {
            const player = storedData.players[i];
            if (categorizedPlayers[player.position]) {
                categorizedPlayers[player.position].push(player);
            }
        }

        localStorage.setItem("categorizedPlayers", JSON.stringify(categorizedPlayers));
    }


    function displayModal() {
        const closeModal = document.querySelector('.close-modal');
        const modal = document.querySelector('.modal');
        const displayModal = document.querySelector('.display-button');

        closeModal.addEventListener('click', function () {
            modal.style.display = 'none';
        });

        displayModal.addEventListener('click', function () {
            modal.style.display = 'block';
        });
    }

    displayModal();

    function filterPlayers(players, position) {
        if (position === 'all') return players;

        const filteredPlayers = [];
        for (let i = 0; i < players.length; i++) {
            if (players[i].position === position) {
                filteredPlayers.push(players[i]);
            }
        }
        return filteredPlayers;
    }

    // Render 
    function renderPlayers(players) {
        const cardsContainer = document.querySelector('.cards-container');
        cardsContainer.innerHTML = '';

        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            const renderDiv = document.createElement('div');
            renderDiv.classList.add('placeholder');

            if (player.position === 'GK') {
                renderDiv.innerHTML = `
                <div class="player-container">
                    <img src="src/assets/images/badge_gold.webp" alt="Empty Card" class="card-image">
                    <div class="player-photo">
                        <img src="${player.photo}" alt="${player.name}">
                        <div class="rating">
                            <h4 class="rating-number">${player.rating}</h4>
                            <p class="position">${player.position}</p>
                        </div>
                    </div>
                    <h5 class="player-name">${player.name}</h5>
                    <div class="player-stats">
                        <div class="player-stats-collumns"><p>Div</p><p>${player.diving}</p></div>
                        <div class="player-stats-collumns"><p>Han</p><p>${player.handling}</p></div>
                        <div class="player-stats-collumns"><p>Kic</p><p>${player.kicking}</p></div>
                        <div class="player-stats-collumns"><p>Ref</p><p>${player.reflexes}</p></div>
                        <div class="player-stats-collumns"><p>Spd</p><p>${player.speed}</p></div>
                        <div class="player-stats-collumns"><p>Pos</p><p>${player.positioning}</p></div>
                    </div>
                    <div class="icons">
                        <img src="${player.flag}" alt="${player.nationality} Flag" class="flag-icon">
                        <img src="${player.logo}" alt="${player.club} Logo" class="club-logo">
                    </div>
                    <button class="${player.position} modal-player-btn">+</button>
                </div>`;
            } else {
                renderDiv.innerHTML = `
                <div class="player-container">
                    <img src="src/assets/images/badge_gold.webp" alt="Empty Card" class="card-image">
                    <div class="player-photo">
                        <img src="${player.photo}" alt="${player.name}">
                        <div class="rating">
                            <h4 class="rating-number">${player.rating}</h4>
                            <p class="position">${player.position}</p>
                        </div>
                    </div>
                    <h5 class="player-name">${player.name}</h5>
                    <div class="player-stats">
                        <div class="player-stats-collumns"><p>Pac</p><p>${player.pace}</p></div>
                        <div class="player-stats-collumns"><p>Sho</p><p>${player.shooting}</p></div>
                        <div class="player-stats-collumns"><p>Pas</p><p>${player.passing}</p></div>
                        <div class="player-stats-collumns"><p>Dri</p><p>${player.dribbling}</p></div>
                        <div class="player-stats-collumns"><p>Def</p><p>${player.defending}</p></div>
                        <div class="player-stats-collumns"><p>Phy</p><p>${player.physical}</p></div>
                    </div>
                    <div class="icons">
                        <img src="${player.flag}" alt="${player.nationality} Flag" class="flag-icon">
                        <img src="${player.logo}" alt="${player.club} Logo" class="club-logo">
                    </div>
                    <button class="${player.position} modal-player-btn">+</button>
                </div>`;
            }

            cardsContainer.appendChild(renderDiv);
        }
    }

    // Modal setup and filtering
    function renderPlayersModal() {
        const storedData = JSON.parse(localStorage.getItem("datastorage"));
        const players = storedData.players;
        const positionFilter = document.getElementById('positionFilter');

        // Render all players
        renderPlayers(players);

        // listner filter change
        positionFilter.addEventListener('change', () => {
            const selectedPosition = positionFilter.value;
            const filteredPlayers = filterPlayers(players, selectedPosition);
            renderPlayers(filteredPlayers);
        });
    }

    renderPlayersModal();


    function setupPositionButtons() {
        const positionButtons = document.querySelectorAll('.add-player-btn');
        const modal = document.querySelector('.modal');

        positionButtons.forEach(button => {
            button.addEventListener('click', function () {
                const position = button.classList[0].toUpperCase();
                const storedData = JSON.parse(localStorage.getItem("datastorage"));
                const filteredPlayers = filterPlayers(storedData.players, position);

                renderPlayers(filteredPlayers);
                modal.style.display = 'block';
            });
        });

        // Close modal logic
        const closeModal = document.querySelector('.close-modal');
        closeModal.addEventListener('click', function () {
            modal.style.display = 'none';
        });
    }

    // Initialize functionality
    setupPositionButtons();














});



