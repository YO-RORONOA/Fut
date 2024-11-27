document.addEventListener('DOMContentLoaded', function() {

let data = [];


async function fetchPlayers() {
    let respo  = await fetch("./src/scripts/players.json")
    data = await respo.json()
     datastorage = data
     localStorage.setItem("datastorage" , JSON.stringify(datastorage));
    categorizeplayers();
}

fetchPlayers();



function categorizeplayers() {

    let storedData = JSON.parse(localStorage.getItem("datastorage"));
    
    let categorizedPlayers = {
        ST: [],  
        RW: [],  
        LW: [],  
        CM: [],  
        CB: [],  
        GK: [],  
        CDM: [], 
        LB: [],  
        RB: [], 
    };

    
    for (let i = 0; i < storedData.players.length; i++) {
        let player = storedData.players[i];
        if (categorizedPlayers[player.position]) {
            categorizedPlayers[player.position].push(player);
        }  
    };

    localStorage.setItem("categorizedPlayers", JSON.stringify(categorizedPlayers));
}



    function displaymodal()
    {
        const closemodal = document.querySelector('.close-modal');
        const modal = document.querySelector('.modal');
        const displaymodal = document.querySelector('.display-button');

        closemodal.addEventListener('click', function()
        {
            modal.style.display = 'none';
        })

        displaymodal.addEventListener('click', function()
        {
            // get span trext
            // let value = 'LM'

            // renderFilteredPlayers(value);

            modal.style.display = 'block';
        })
    }

    displaymodal();


    function renderPlayersModal() {
        const storedData = JSON.parse(localStorage.getItem("datastorage"));
        const players = storedData.players;
        const cardsContainer = document.querySelector('.cards-container');
        const positionFilter = document.getElementById('positionFilter');
    
        function renderFilteredPlayers(position) {
            cardsContainer.innerHTML = ''; 
    
            const filteredPlayers = position === 'all' ? players : players.filter(player => player.position === position);
    
            filteredPlayers.forEach(player => {
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
                        <button class="modal-player-btn">+</button>
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
                        <button class="modal-player-btn">+</button>
                    </div>`;
                }
    
                cardsContainer.appendChild(renderDiv);
            });
        }
        renderFilteredPlayers('all');
    
        positionFilter.addEventListener('change', () => {
            const selectedPosition = positionFilter.value;
            renderFilteredPlayers(selectedPosition);
        });
    }
    
    renderPlayersModal();

    








});


