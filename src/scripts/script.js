import { rendrPlayerHtml } from "./rendrPlayerHtml.js";
import { validation } from "./validation.js";



document.addEventListener('DOMContentLoaded', function () {

    let data = [];

    async function fetchPlayers() {
        try {
            const storedData = JSON.parse(localStorage.getItem("datastorage"));
    
            if (storedData && storedData.players && storedData.players.length > 0) {
                data = storedData;
            } else {
                const respo = await fetch("./src/scripts/players.json");
                data = await respo.json();
                localStorage.setItem("datastorage", JSON.stringify(data));
            }
    
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

    // form submission
    playerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        let storedData = JSON.parse(localStorage.getItem('datastorage')) || { players: [] };

        // new player object with all the form data
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

    validation();


    //************************toggle-players-Modal ***************************/

    function toggleModal() {

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


    //************************Filter-position ***************************/
    function filterPlayers(players, position) {
        if (position === 'all') return players;
        return players.filter(player => player.position === position);
    }


    //************************Render-players ***************************/
    function renderPlayers(players) {

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


    //************************Render-filtred-players ***************************/
    

    function renderfilteredPlayers() {
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

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-player-btn')) {
            const modalCard = e.target.closest('.player-container');
    
            if (modalCard.closest('.cards-container')) {
                const playerName = modalCard.querySelector('.player-name').textContent;
    
                const storedData = JSON.parse(localStorage.getItem('datastorage'));
                storedData.players = storedData.players.filter(player => player.name !== playerName);
                localStorage.setItem('datastorage', JSON.stringify(storedData));
    
                modalCard.remove();
    
                renderfilteredPlayers();
            }
        }
    });


    fetchPlayers();
    toggleModal();
    fieldaddbutton();
    renderfilteredPlayers();




    // **********************************DRAG&drop**************************************


    
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-player-btn')) {
            const modalCard = e.target.closest('.player-container');
    
            if (modalCard.closest('.cards-container')) {
                const playerName = modalCard.querySelector('.player-name').textContent;
    
                const storedData = JSON.parse(localStorage.getItem('datastorage'));
                storedData.players = storedData.players.filter(player => player.name !== playerName);
                localStorage.setItem('datastorage', JSON.stringify(storedData));
    
                modalCard.remove();
    
                renderfilteredPlayers();
            }
        }
    });
    
    // ********************************** DRAG & DROP **************************************
    
    function setupFieldPlaceholders() {
        const fieldPlaceholders = document.querySelectorAll('.field-positions .placeholder');
        const subcards = document.querySelectorAll('.sub-card');
    
        fieldPlaceholders.forEach(placeholder => {
            placeholder.addEventListener('dragover', (e) => {
                e.preventDefault();
            });
    
            placeholder.addEventListener('drop', (e) => {
                e.preventDefault();
                const playerData = JSON.parse(e.dataTransfer.getData('text/plain'));
    
                const modalCard = document.querySelector(`[data-player-id="${playerData.name}"]`);
    
                if (modalCard) {
                    modalCard.classList.add('display-none');
                } else {
                    console.error('Modal card not found for:', playerData.name);
                }
    
                const placeholderPosition = placeholder.querySelector('.add-player-btn').classList[0].toUpperCase();
                if (playerData.position === placeholderPosition && !placeholder.classList.contains('filled')) {
                    placeholder.style.display = 'none';
    
                    
                    const playerCard = document.createElement('div');
                    playerCard.className = 'player-container';
                    rendrPlayerHtml(playerCard, playerData, 'drag-image');
    
                    
                    const deleteBtn = playerCard.querySelector('.delete-player-btn');
                    deleteBtn.addEventListener('click', () => {
                        
                        playerCard.remove();
    
                        // Restore the placeholder
                        placeholder.style.display = '';
                        placeholder.classList.remove('filled');
    
                        
                        if (modalCard) {
                            modalCard.classList.remove('display-none');
                        }
                    });
    
                    
                    placeholder.after(playerCard);
                    placeholder.classList.add('filled'); // class to use for dropped cards field as filled
                }
            });
        });
    
        // drag and drop for substitute cards
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
                    subcard.innerHTML = ''; // Clear previous content
    
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
