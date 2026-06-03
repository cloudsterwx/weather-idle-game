let stormArray = ["Thunderstorm", "Hurricane", "Tornado", "Blizzard", "Flood"];
let stormLevels = ["", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5"];
let allPurchases = [];

let coins = 0;
let multiplier = 1;
let defense = 0;
let level = 1;
let idle = 0;

document.getElementById("start-button").addEventListener("click", function(){
    document.getElementById("start-container").style.display = "none";
    generateStorm();
    continuousStorms();
});

document.getElementById("load-save-button").addEventListener("click", function(){
    const savedState = JSON.parse(localStorage.getItem("weatherIdleGameSave"));
    if(savedState){
    document.getElementById("start-container").style.display = "none";
    localStorageLoad();
    continuousStorms();
    } else{
        alert("No save file found.");
    }
});

// idle coins + saving
let idleInterval = setInterval(() => {
    coins = coins + idle;
    document.getElementById("balance-counter-text").innerHTML = `Balance: ${Math.floor(coins)} Coins`;
    localStorageSave();
}, 1000);

// click = add coins
document.getElementById("main-button").addEventListener("click", function(){
    coins = coins + 1 * multiplier;
    if(coins === 1){
       document.getElementById("balance-counter-text").innerHTML = `Balance: ${Math.floor(coins)} Coin`;
    }
    else{
        document.getElementById("balance-counter-text").innerHTML = `Balance: ${Math.floor(coins)} Coins`;
    }
});

// object list for shop
const shopItems = {
    "Brick": {cost: 2, defense: 2},
    "Sandbag": {cost: 10, defense: 11},
    "Barricade": {cost: 50, defense: 55},
    "Wall": {cost: 200, defense: 220},
    "Floodgate": {cost: 1000, defense: 1100},
    "Levee": {cost: 5000, defense: 5500},
    "Hospital": {cost: 25000, defense: 27500},
    "Dam": {cost: 100000, defense: 110000}
}

function purchaseItem(name){
    let item = shopItems[name];
    let multiplier = 1 + (0.01 * findTotalPurchases(name));
    if(coins >= item.cost){
        coins = coins - item.cost
        defense = defense + item.defense;
        document.getElementById("defense-counter-text").innerHTML = `Defense: ${Math.floor(defense)} Units`;
        document.getElementById("balance-counter-text").innerHTML = `Balance: ${Math.floor(coins)} Coins`;
        allPurchases.push(name);
    } else {
        alert("Not enough coins to purchase this item!");
    }
    findTotalPurchases(name);
}

Object.keys(shopItems).forEach(item => {
    document.getElementById(`${item.toLowerCase()}-buy`).addEventListener("click", function(){
        purchaseItem(item);
    });
});

// start button: wave starts when clicked or after 30s cooldown ends
let canClickStart = true;
document.getElementById("start-wave").addEventListener("click", function(){
    if(!canClickStart) {
        alert("Clicking too fast! Please wait a moment before starting the next wave.");
    return;
    } canClickStart = false;
    setTimeout(() => {
        canClickStart = true;
    }, 2500);

    let stormType = document.getElementById("storm1").innerHTML.split(" - ")[0];
    stormImpact(stormType, level);
});

// starts a storm every 30 seconds to increase game difficulty
function continuousStorms(){
    let count = 30;
    let cooldown = setInterval(() => {
        if (count > 0){
            count--;
            document.getElementById("start-wave").innerHTML = `Start Wave (or in ${count}s)`;
        } else {
            let stormType = document.getElementById("storm1").innerHTML.split(" - ")[0];
            stormImpact(stormType, level);
            clearInterval(cooldown);
        }
    }, 1000)
}

// avoid repeated storms, run every time the game starts or the level changes
function generateStorm(){
    let updatingStormArray = stormArray;
    let randomStorm = Math.floor(Math.random() * updatingStormArray.length);
    document.getElementById("storm1").innerHTML = `${updatingStormArray[randomStorm]} - ${stormLevels[level]}`;
    updatingStormArray = updatingStormArray.filter(storm => storm !== stormArray[randomStorm]);
    let randomStorm2 = Math.floor(Math.random() * updatingStormArray.length);
    document.getElementById("storm2").innerHTML = `${updatingStormArray[randomStorm2]} - ${stormLevels[level]}`;
    updatingStormArray = updatingStormArray.filter(storm => storm !== updatingStormArray[randomStorm2]);
    let randomStorm3 = Math.floor(Math.random() * updatingStormArray.length);
    document.getElementById("storm3").innerHTML = `${updatingStormArray[randomStorm3]} - ${stormLevels[level]}`;
    return [`${updatingStormArray[randomStorm]} - ${stormLevels[level]}`, `${updatingStormArray[randomStorm2]} - ${stormLevels[level]}`, `${updatingStormArray[randomStorm3]} - ${stormLevels[level]}`];
}

// updates storms (shifts storms up and generates a new storm at the end of the queue - no repeats)
function updateStorm(){
    document.getElementById("storm1").innerHTML = document.getElementById("storm2").innerHTML;
    document.getElementById("storm2").innerHTML = document.getElementById("storm3").innerHTML;
    let updatingStormArray = stormArray.filter(storm => storm !== document.getElementById("storm1").innerHTML.split(" - ")[0])
    .filter(storm => storm !== document.getElementById("storm2").innerHTML.split(" - ")[0]);
    let randomStorm = Math.floor(Math.random() * updatingStormArray.length);
    document.getElementById("storm3").innerHTML = `${updatingStormArray[randomStorm]} - ${stormLevels[level]}`;
}

function findTotalPurchases(type){
    const count = allPurchases.filter(purchase => purchase === type).length;
    document.getElementById(`${type.toLowerCase()}-purchased`).innerHTML = `Purchased: ${count}`;
    return count;
}

// calculates stuff based on the storm
function stormImpact(type, level){
    let defenseSubtract = level * 10
    document.getElementById("storm-info").innerHTML = `Current Storm Wave: ${type} - ${stormLevels[level]}`;
    if(type === "Tornado"){
        document.body.style.backgroundColor = "rgb(112, 112, 112)";
        defenseSubtract = defenseSubtract * 1.5;
    } else if (type === "Hurricane"){
        document.body.style.backgroundColor = "rgb(0, 106, 255)";
        defenseSubtract = defenseSubtract * 1.25;
    } else if (type === "Blizzard"){
        document.body.style.backgroundColor = "rgb(227, 227, 227)";
        defenseSubtract = defenseSubtract * 1.1;
    } else if (type === "Flood"){
        document.body.style.backgroundColor = "rgba(255,0,0,0.5)";
        defenseSubtract = defenseSubtract * 1.05;
    } else if (type === "Thunderstorm"){
        document.body.style.backgroundColor = "rgb(67, 67, 67)";
    }
    let count = 0;
    let stormInterval = setInterval(() => {
        defense = defense - defenseSubtract / 10;
        document.getElementById("defense-counter-text").innerHTML = `Defense: ${Math.floor(defense)} Units`;
        if(defense <= 0){
            clearInterval(stormInterval);
            document.body.style.backgroundColor = "rgb(81, 0, 0)";
            setTimeout(() => {
                alert("Game Over! Your defense has been breached by the storm.");
                resetGame();
            }, 1000);
        }
        count++;
        if(count >= 10){
            clearInterval(stormInterval);
            document.body.style.backgroundColor = "rgb(135, 206, 235)";
            updateStorm();
            multiplier = multiplier + (level * 0.1);
            idle = idle + (level * 0.05);
            document.getElementById("storm-info").innerHTML = `Current Storm Wave: N/A`;
            document.getElementById("multiplier").innerHTML = `Clicking Multiplier: ${multiplier.toFixed(2)}x | Idle: ${idle.toFixed(2)} coins per second`;
            continuousStorms();
        }
    }, 250);
}

function resetGame(){
    coins = 0;
    defense = 0;
    level = 1;
    multiplier = 1;
    idle = 0;
    allPurchases = [];
    document.getElementById("balance-counter-text").innerHTML = `Balance: ${Math.floor(coins)} Coins`;
    document.getElementById("defense-counter-text").innerHTML = `Defense: ${Math.floor(defense)} Units`;
    document.getElementById("multiplier").innerHTML = `Clicking Multiplier: ${multiplier.toFixed(2)}x | Idle: ${idle.toFixed(2)} coins per second`;
    generateStorm();
    document.body.style.backgroundColor = "rgb(135, 206, 235)";
    continuousStorms();
}

function localStorageSave(){
    const storm1 = document.getElementById("storm1").innerHTML.split(" - ")[0];
    const storm2 = document.getElementById("storm2").innerHTML.split(" - ")[0];
    const storm3 = document.getElementById("storm3").innerHTML.split(" - ")[0];
    let storms = [storm1,storm2,storm3];
    if(storm1 === "Storm 1") {
        return("a");
    }

    const gameState = {
        coins: coins,
        multiplier: multiplier,
        idle: idle,
        allPurchases: allPurchases,
        defense: defense,
        level: level,
        storms: storms
    }

console.log (storms);

    localStorage.setItem("weatherIdleGameSave", JSON.stringify(gameState));
}

function localStorageLoad(){
    const savedState = JSON.parse(localStorage.getItem("weatherIdleGameSave"));
    if(savedState){
        coins = savedState.coins;
        multiplier = savedState.multiplier;
        idle = savedState.idle;
        allPurchases = savedState.allPurchases;
        defense = savedState.defense;
        level = savedState.level;
        let storms = savedState.storms;
        if(storms.length < 0){
        storms = savedState.storms;
        } document.getElementById("balance-counter-text").innerHTML = `Balance: ${Math.floor(coins)} Coins`;
        document.getElementById("defense-counter-text").innerHTML = `Defense: ${Math.floor(defense)} Units`;
        document.getElementById("multiplier").innerHTML = `Clicking Multiplier: ${multiplier.toFixed(2)}x | Idle: ${idle.toFixed(2)} coins per second`;
        document.getElementById("storm1").innerHTML = `${storms[0]} - Level ${level}`;
        document.getElementById("storm2").innerHTML = `${storms[1]} - Level ${level}`;
        document.getElementById("storm3").innerHTML = `${storms[2]} - Level ${level}`;
        if(storms.length === 0){
        generateStorm();
        }


        Object.keys(shopItems).forEach(item => {
            document.getElementById(`${item.toLowerCase()}-purchased`).innerHTML = `Purchased: ${findTotalPurchases(item)}`;
        });
    }
}