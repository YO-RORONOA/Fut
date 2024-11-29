

export function dragdrop(fieldPlaceholders, checkPosition = true) {
    fieldPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        placeholder.addEventListener('drop', (e) => {
            e.preventDefault();
            const playerData = JSON.parse(e.dataTransfer.getData('text/plain'));
            console.log(playerData);

            // Perform position check only if checkPosition is true
            if (!checkPosition || playerData.position === placeholder.querySelector('.add-player-btn').classList[0].toUpperCase()) {
                placeholder.innerHTML = ''; // Clear placeholder content
                placeholder.classList.add('filled');

                // Create and append the player card
                const playerCard = document.createElement('div');
                playerCard.className = 'player-container';

                rendrPlayerHtml(playerCard, playerData, 'drag-image');
                placeholder.appendChild(playerCard);
            }
        });
    });
}
