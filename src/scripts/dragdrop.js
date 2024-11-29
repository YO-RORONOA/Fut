

export function dragdrop(fieldPlaceholders, checkPosition = true) {
    fieldPlaceholders.forEach((placeholder, index) => {
        console.log(`Setting up placeholder #${index}`);

        placeholder.addEventListener('dragover', (e) => {
            e.preventDefault();
            console.log(`Dragover on placeholder #${index}`);
        });

        placeholder.addEventListener('drop', (e) => {
            e.preventDefault();
            const playerData = JSON.parse(e.dataTransfer.getData('text/plain'));
            console.log(`Drop on placeholder #${index}`, playerData);

            // Perform position check only if checkPosition is true
            const placeholderPosition = placeholder.querySelector('.add-player-btn')?.classList[0]?.toUpperCase();
            console.log(`Placeholder position: ${placeholderPosition}`);
            if (!checkPosition || playerData.position === placeholderPosition) {
                placeholder.innerHTML = ''; // Clear placeholder content
                placeholder.classList.add('filled');

                // Create and append the player card
                const playerCard = document.createElement('div');
                playerCard.className = 'player-container';

                rendrPlayerHtml(playerCard, playerData, 'drag-image');
                placeholder.appendChild(playerCard);

                console.log(`Player added to placeholder #${index}`);
            } else {
                console.log(`Position mismatch for placeholder #${index}`);
            }
        });
    });
}