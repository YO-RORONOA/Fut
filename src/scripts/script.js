import { rendrPlayerHtml } from "./rendrPlayerHtml.js";
import { validation } from "./validation.js";



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

    // The image button and form elements
    const addButton = document.querySelector('.add-button');
    const addPlayerForm = document.querySelector('.add-player-form');
    const closeModalBtn = document.querySelector('.close-modal');
    const playerForm = document.getElementById('playerForm');

    // hide add the form
    addPlayerForm.style.display = 'none';

    //*************************New Player FORM **************************/

    // Event listener for the Add Player image button to show the form
    addButton.addEventListener('click', function () {
        addPlayerForm.style.display = 'block';
    });

    // Event listener for Close button in the form to hide the form
    closeModalBtn.addEventListener('click', function () {
        addPlayerForm.style.display = 'none';
    });

    // Form stats Based on position GK/players
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

        // GK-playersspecific stats
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

        storedData.players.push(newPlayer);

        localStorage.setItem('datastorage', JSON.stringify(storedData));

        playerForm.reset();
        addPlayerForm.style.display = 'none';

        renderfilteredPlayers();
    });

    validation(); //validate form


    //************************toggle-players-Modal ***************************/

    function toggleModal() {

        console.log("test 1");

        const closeModal = document.querySelector('.close-modal');
        const modal = document.querySelector('.modal');
        const displayModal = document.querySelector('.display-button');

        closeModal.addEventListener('click', function () {
            console.log("test 2");
            modal.style.display = 'none';
        });

        displayModal.addEventListener('click', function () {
            console.log("test 3");
            modal.style.display = 'block';
        });
    }


    //************************Filter-position ***************************/
    function filterPlayers(players, position) {
        if (position === 'all') return players;
        return players.filter(player => player.position === position);
    }


    //************************Render-players ***************************/
    function renderPlayers(players) {


        console.log("test 7");

        const cardsContainer = document.querySelector('.cards-container');
        cardsContainer.innerHTML = '';

        addPlayerForm.style.display = 'none';


        players.forEach(player => {
            const renderDiv = document.createElement('div');
            renderDiv.classList.add('placeholder');
            renderDiv.draggable = true;

            // drag start event
            renderDiv.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', JSON.stringify(player));
                // Hide modal but keep the dragged element visible
                setTimeout(() => {
                    document.querySelector('.modal').style.display = 'none';
                }, 0);
            });


            rendrPlayerHtml(renderDiv, player, '');

            cardsContainer.appendChild(renderDiv);
        });
    }



    function renderfilteredPlayers() {
        const storedData = JSON.parse(localStorage.getItem("datastorage"));
        const players = storedData.players;
        const positionFilter = document.getElementById('positionFilter');

        console.log("test 6");

        renderPlayers(players);

        positionFilter.addEventListener('change', () => {
            const selectedPosition = positionFilter.value;
            const filteredPlayers = filterPlayers(players, selectedPosition);
            renderPlayers(filteredPlayers);
        });
    }
//*****************************Placeholder-Add-button Display modal*******************************/
    function fieldaddbutton() {
        const positionButtons = document.querySelectorAll('.add-player-btn');
        const modal = document.querySelector('.modal');

        console.log("test 4");


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


    fetchPlayers();
    toggleModal();
    fieldaddbutton();
    renderfilteredPlayers();




    // **********************************DRAG&drop**************************************


    
    function setupFieldPlaceholders() {
        const fieldPlaceholders = document.querySelectorAll('.field-positions .placeholder');
        const subcards = document.querySelectorAll('.sub-card');

        // Handle dragover for fields
        fieldPlaceholders.forEach(placeholder => {
            placeholder.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            placeholder.addEventListener('drop', (e) => {
                e.preventDefault();
                const playerData = JSON.parse(e.dataTransfer.getData('text/plain'));
                console.log(playerData);

                const placeholderPosition = placeholder.querySelector('.add-player-btn').classList[0].toUpperCase();
                if (playerData.position === placeholderPosition && !placeholder.classList.contains('filled')) {
                    placeholder.innerHTML = ''; 
                    placeholder.classList.add('filled');

                    const playerCard = document.createElement('div');
                    playerCard.className = 'player-container';

                    rendrPlayerHtml(playerCard, playerData, 'drag-image');
                    placeholder.appendChild(playerCard);
                }
            });
        });

        // Handle dragstart for sub cards
        subcards.forEach(subcard => {
            subcard.addEventListener('dragstart', (e) => {
                const playerData = JSON.parse(e.target.dataset.player);  
                e.dataTransfer.setData('text/plain', JSON.stringify(playerData));
            });

            subcard.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            subcard.addEventListener('drop', (e) => {
                e.preventDefault();
                const playerData = JSON.parse(e.dataTransfer.getData('text/plain'));
                console.log('Dropped on subcard:', playerData);

               
                if (!subcard.classList.contains('filled')) {
                    subcard.classList.add('filled'); 
                    subcard.innerHTML = ''; 


                    const playerCard = document.createElement('div');
                    playerCard.className = 'player-container';

                    rendrPlayerHtml(playerCard, playerData, 'drag-image');
                    subcard.appendChild(playerCard);
                }
            });
        });
    }


    setupFieldPlaceholders();

});









// function categorizePlayers() {
    //     const storedData = JSON.parse(localStorage.getItem("datastorage"));
    //     const categorizedPlayers = {
    //         ST: [], RW: [], LW: [], CM: [], CB: [], 
    //         GK: [], CDM: [], LB: [], RB: []
    //     };

    //     for (let i = 0; i < storedData.players.length; i++) {
    //         const player = storedData.players[i];
    //         if (categorizedPlayers[player.position]) {
    //             categorizedPlayers[player.position].push(player);
    //         }
    //     }

    //     localStorage.setItem("categorizedPlayers", JSON.stringify(categorizedPlayers));
    // }