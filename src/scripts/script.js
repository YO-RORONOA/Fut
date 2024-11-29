document.addEventListener('DOMContentLoaded', function () {
    // The image button and form elements
    const addButton = document.querySelector('.add-button');
    const addPlayerForm = document.querySelector('.add-player-form');
    const closeModalBtn = document.querySelector('.close-modal');
    const playerForm = document.getElementById('playerForm');

    // Initially hide the form
    addPlayerForm.style.display = 'none';

    // Event listener for the Add Player image button to show the form
    addButton.addEventListener('click', function () {
        addPlayerForm.style.display = 'block';
    });

    // Event listener for Close button in the form to hide the form
    closeModalBtn.addEventListener('click', function () {
        addPlayerForm.style.display = 'none';
    });

    // Dynamic stats display based on position
    document.getElementById('position').addEventListener('change', function () {
        const selectedPosition = this.value;
        const outfieldStats = document.getElementById('outfieldStats');
        const gkStats = document.getElementById('gkStats');

        if (selectedPosition === 'GK') {
            outfieldStats.style.display = 'none';
            gkStats.style.display = 'block';
        } else {
            outfieldStats.style.display = 'block';
            gkStats.style.display = 'none';
        }
    });

    // Handle form submission
    playerForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        // Get existing data
        let storedData = JSON.parse(localStorage.getItem('datastorage')) || { players: [] };
        
        // Create new player object with all the form data
        const newPlayer = {
            name: document.getElementById('name').value,
            position: document.getElementById('position').value,
            nationality: document.getElementById('nationality').value,
            club: document.getElementById('club').value,
            logo: document.getElementById('logo').value,
            flag: document.getElementById('flag').value,
            rating: document.getElementById('rating').value,
            photo: document.getElementById('photo').value,
        };

        // Add position-specific stats
        if (newPlayer.position === 'GK') {
            Object.assign(newPlayer, {
                diving: document.getElementById('diving').value,
                handling: document.getElementById('handling').value,
                kicking: document.getElementById('kicking').value,
                reflexes: document.getElementById('reflexes').value,
                speed: document.getElementById('speed').value,
                positioning: document.getElementById('positioning').value
            });
        } else {
            Object.assign(newPlayer, {
                pace: document.getElementById('pace').value,
                shooting: document.getElementById('shooting').value,
                passing: document.getElementById('passing').value,
                dribbling: document.getElementById('dribbling').value,
                defending: document.getElementById('defending').value,
                physical: document.getElementById('physical').value
            });
        }

        // Add to players array
        storedData.players.push(newPlayer);
        
        // Save back to localStorage
        localStorage.setItem('datastorage', JSON.stringify(storedData));
        
        // Reset form and hide it
        playerForm.reset();
        addPlayerForm.style.display = 'none';
        
        // Re-render the players
        renderPlayersModal();
    });

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
            ST: [], RW: [], LW: [], CM: [], CB: [], 
            GK: [], CDM: [], LB: [], RB: []
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

    function filterPlayers(players, position) {
        if (position === 'all') return players;
        return players.filter(player => player.position === position);
    }

    function renderPlayers(players) {
        const cardsContainer = document.querySelector('.cards-container');
        cardsContainer.innerHTML = '';

        players.forEach(player => {
            const renderDiv = document.createElement('div');
            renderDiv.classList.add('placeholder');
            renderDiv.draggable = true; // Make the card draggable
        
            // Add drag start event
            renderDiv.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', JSON.stringify(player));
                // Hide modal but keep the dragged element visible
                setTimeout(() => {
                    document.querySelector('.modal').style.display = 'none';
                }, 0);
            });

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
        });
    }

    function renderPlayersModal() {
        const storedData = JSON.parse(localStorage.getItem("datastorage"));
        const players = storedData.players;
        const positionFilter = document.getElementById('positionFilter');

        renderPlayers(players);

        positionFilter.addEventListener('change', () => {
            const selectedPosition = positionFilter.value;
            const filteredPlayers = filterPlayers(players, selectedPosition);
            renderPlayers(filteredPlayers);
        });
    }

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

        const closeModal = document.querySelector('.close-modal');
        closeModal.addEventListener('click', function () {
            modal.style.display = 'none';
        });
    }

    // Initialize functionality
    displayModal();
    setupPositionButtons();
    renderPlayersModal();




    function setupFieldPlaceholders() {
        const fieldPlaceholders = document.querySelectorAll('.field-positions .placeholder');
        
        fieldPlaceholders.forEach(placeholder => {
            placeholder.addEventListener('dragover', (e) => {
                e.preventDefault();
            });
    
            placeholder.addEventListener('drop', (e) => {
                e.preventDefault();
                const playerData = JSON.parse(e.dataTransfer.getData('text/plain'));
                console.log(playerData);
                
                // Check if positions match
                const placeholderPosition = placeholder.querySelector('.add-player-btn').classList[0].toUpperCase();
                if (playerData.position === placeholderPosition) {
                    placeholder.innerHTML = ''; // Clear placeholder content
                    placeholder.classList.add('filled');
                    
                    // Create and append the player card
                    const playerCard = document.createElement('div');
                    playerCard.className = 'player-container';

                    if (playerData.position === 'GK') {

                        playerCard.innerHTML = `
                    <img src="src/assets/images/badge_gold.webp" alt="Empty Card" class="card-image">
                        <div class="player-photo">
                            <img class="drag-image" src="${playerData.photo}" alt="${playerData.name}">
                            <div class="rating">
                                <h4 class="rating-number">${playerData.rating}</h4>
                                <p class="position">${playerData.position}</p>
                            </div>
                        </div>
                        <h5 class="player-name">${playerData.name}</h5>
                        <div class="player-stats">
                        <div class="player-stats-collumns"><p>Div</p><p>${playerData.diving}</p></div>
                        <div class="player-stats-collumns"><p>Han</p><p>${playerData.handling}</p></div>
                        <div class="player-stats-collumns"><p>Kic</p><p>${playerData.kicking}</p></div>
                        <div class="player-stats-collumns"><p>Ref</p><p>${playerData.reflexes}</p></div>
                        <div class="player-stats-collumns"><p>Spd</p><p>${playerData.speed}</p></div>
                        <div class="player-stats-collumns"><p>Pos</p><p>${playerData.positioning}</p></div>
                    </div>
                    <div class="icons">
                        <img src="${playerData.flag}" alt="${playerData.nationality} Flag" class="flag-icon">
                        <img src="${playerData.logo}" alt="${playerData.club} Logo" class="club-logo">
                    </div>
                    `;
                    }
                    else
                    {
                    playerCard.innerHTML = `
                    <img src="src/assets/images/badge_gold.webp" alt="Empty Card" class="card-image">
                        <div class="player-photo">
                            <img class="drag-image" src="${playerData.photo}" alt="${playerData.name}">
                            <div class="rating">
                                <h4 class="rating-number">${playerData.rating}</h4>
                                <p class="position">${playerData.position}</p>
                            </div>
                        </div>
                        <h5 class="player-name">${playerData.name}</h5>
                        <div class="player-stats">
                        <div class="player-stats-collumns"><p>Div</p><p>${playerData.pace}</p></div>
                        <div class="player-stats-collumns"><p>Han</p><p>${playerData.shooting}</p></div>
                        <div class="player-stats-collumns"><p>Kic</p><p>${playerData.passing}</p></div>
                        <div class="player-stats-collumns"><p>Ref</p><p>${playerData.dribbling}</p></div>
                        <div class="player-stats-collumns"><p>Spd</p><p>${playerData.defending}</p></div>
                        <div class="player-stats-collumns"><p>Pos</p><p>${playerData.physical}</p></div>
                    </div>
                    <div class="icons">
                        <img src="${playerData.flag}" alt="${playerData.nationality} Flag" class="flag-icon">
                        <img src="${playerData.logo}" alt="${playerData.club} Logo" class="club-logo">
                    </div>
                    `;
                    }
    placeholder.appendChild(playerCard);
                }
            });
        });
    }


    setupFieldPlaceholders();














    
});


