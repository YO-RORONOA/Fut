

export function validation() {
    const nameInput = document.getElementById('name');
    const nationalityInput = document.getElementById('nationality');
    const clubInput = document.getElementById('club');
    const logoInput = document.getElementById('logo');
    const photoInput = document.getElementById('photo');
    const ratingInput = document.getElementById('rating');
    const positionInput = document.getElementById('position');
    const statInputs = document.querySelectorAll('#pace, #shooting, #passing, #dribbling, #defending, #physical, #diving, #handling, #kicking, #reflexes, #speed, #positioning');
    const buttonAdd = document.querySelector('button[type="submit"]');
    
    function validateTextLength(input, minLength, maxLength) {
        const value = input.value.trim();
        if (value.length >= minLength && value.length <= maxLength) {
            input.style.border = "";
            return true;
        } else {
            input.style.border = "2px solid red";
            return false;
        }
    }
    
    function validateHttps(input) {
        const value = input.value.trim();
        if (value.startsWith("https")) {
            input.style.border = "";
            return true;
        } else {
            input.style.border = "2px solid red";
            return false;
        }
    }
    
    function validateNumberRange(input, min, max) {
        const value = input.value.trim();
        const numberValue = Number(value);
        if (value !== "" && numberValue >= min && numberValue <= max) {
            input.style.border = "";
            return true;
        } else {
            input.style.border = "2px solid red";
            return false;
        }
    }
    
    function validateForm() {
        const position = positionInput.value;
        let isValid = true;
    
        if (!validateTextLength(nameInput, 3, 30)) {
            isValid = false;
        }
    
        if (!validateTextLength(nationalityInput, 3, 30)) {
            isValid = false;
        }
    
        if (!validateHttps(clubInput) || !validateHttps(logoInput) || !validateHttps(photoInput)) {
            isValid = false;
        }
    
        if (!validateNumberRange(ratingInput, 10, 99)) {
            isValid = false;
        }
    
        if (position === 'GK') {
            const gkStats = ['diving', 'handling', 'kicking', 'reflexes', 'speed', 'positioning'];
            gkStats.forEach(stat => {
                const statInput = document.getElementById(stat);
                if (!validateNumberRange(statInput, 10, 99)) {
                    isValid = false;
                }
            });
        } else {
            const playerStats = ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'];
            playerStats.forEach(stat => {
                const statInput = document.getElementById(stat);
                if (!validateNumberRange(statInput, 10, 99)) {
                    isValid = false;
                }
            });
        }
    
        if (isValid) {
            buttonAdd.disabled = false;
        } else {
            buttonAdd.disabled = true;
        }
    }
    
    function handleInput(event) {
        const input = event.target;
    
        if (input.value.trim() !== "") {
            validateInput(input);
        } else {
            input.style.border = "";
        }
    }
    
    function validateInput(input) {
        if (input === nameInput || input === nationalityInput) {
            validateTextLength(input, 3, 30);
        } else if (input === clubInput || input === logoInput || input === photoInput) {
            validateHttps(input);
        } else if (input === ratingInput) {
            validateNumberRange(input, 10, 99);
        } else {
            validateNumberRange(input, 10, 99);
        }
    }
    
    positionInput.addEventListener('change', validateForm);
    statInputs.forEach(statInput => {
        statInput.addEventListener('input', handleInput);
    });
    nameInput.addEventListener('input', handleInput);
    nationalityInput.addEventListener('input', handleInput);
    clubInput.addEventListener('input', handleInput);
    logoInput.addEventListener('input', handleInput);
    photoInput.addEventListener('input', handleInput);
    ratingInput.addEventListener('input', handleInput);
    
}