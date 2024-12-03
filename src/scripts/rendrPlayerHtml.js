

export function rendrPlayerHtml(renderDiv, player, classname) {
    if (player.position === 'GK') {
        renderDiv.innerHTML = `
                <div class="player-container">
                    <img src="src/assets/images/badge_gold.webp" alt="Empty Card" class="query">
                <div class="player-photo">
            <img class="${classname}" src="${player.photo}" alt="${player.name}">
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
        <button class="delete-player-btn">x</button>
        
    </div>`;
    } else {
        renderDiv.innerHTML = `
    <div class="player-container">
        <img src="src/assets/images/badge_gold.webp" alt="Empty Card" class="query">
        <div class="player-photo">
            <img class="${classname}" src="${player.photo}" alt="${player.name}">
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
        <button class="delete-player-btn">x</button>

    </div>`;
    }
}