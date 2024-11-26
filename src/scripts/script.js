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


