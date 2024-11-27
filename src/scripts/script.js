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
            modal.style.display = 'block';
        })
    }

    displaymodal();


    function renderplayersmodal()
    {
        let storedData = JSON.parse(localStorage.getItem("datastorage"));
        let players = storedData.players;
        const modal = document.querySelector('.modal');
        const cardscontainer = document.querySelector('.cards-container');


        cardscontainer.innerHTML = '';

        for (let i = 0; i < players.length; i++) {
            const player = players[i];
        
            // Create a div element for the player card
            const renderdiv = document.createElement('div');
            renderdiv.classList.add('placeholder');
        
            // Populate the card with player data using template literals
            renderdiv.innerHTML = `
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
                        <div class="player-stats-collumns">
                            <p>Pac</p>
                            <p>${player.pace}</p>
                        </div>
                        <div class="player-stats-collumns">
                            <p>Sho</p>
                            <p>${player.shooting}</p>
                        </div>
                        <div class="player-stats-collumns">
                            <p>Pas</p>
                            <p>${player.passing}</p>
                        </div>
                        <div class="player-stats-collumns">
                            <p>Dri</p>
                            <p>${player.dribbling}</p>
                        </div>
                        <div class="player-stats-collumns">
                            <p>Def</p>
                            <p>${player.defending}</p>
                        </div>
                        <div class="player-stats-collumns">
                            <p>Phy</p>
                            <p>${player.physical}</p>
                        </div>
                    </div>
                         <div class="icons">
                    <img src="${player.flag}" alt="${player.nationality} Flag" class="flag-icon">
                    <img src="${player.logo}" alt="${player.club} Logo" class="club-logo">
                        </div>
                </div>
                
            `;
        
            // Append the created card to the cards container
            cardscontainer.appendChild(renderdiv);
        }
        
        
    }
    renderplayersmodal()

});