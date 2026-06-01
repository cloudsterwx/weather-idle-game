let coins = 0;
let multiplier = 1;
let defense = 0;
let level = 1;
let idle = 0;
let stormArray = ["Thunderstorm", "Hurricane", "Tornado", "Blizzard", "Flood"];
let stormLevels = ["", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5"];
let allPurchases = [];

// idle coins generator
let idleInterval = setInterval(() => {
    coins = coins + idle;
    document.getElementById("balance-counter-text").innerHTML = `Balance: ${Math.floor(coins)} Coins`;
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

// shop items (i should turn this into a function somehow)
document.getElementById("brick-buy").addEventListener("click", function(){
    if(coins >= 2){
        coins = coins - 2;
        defense = defense + 2;
        document.getElementById("defense-counter-text").innerHTML = `Defense: ${Math.floor(defense)} Units`;
        document.getElementById("balance-counter-text").innerHTML = `Balance: ${Math.floor(coins)} Coins`;
        allPurchases.push("Brick");
    }
    findTotalPurchases("Brick");
});

document.getElementById("sandbag-buy").addEventListener("click", function(){
    if(coins >= 10){
        coins = coins - 10;
        defense = defense + 11;
        document.getElementById("defense-counter-text").innerHTML = `Defense: ${Math.floor(defense)} Units`;
        document.getElementById("balance-counter-text").innerHTML = `Balance: ${Math.floor(coins)} Coins`;
        allPurchases.push("Sandbag");
    }
    findTotalPurchases("Sandbag");
});

document.getElementById("barricade-buy").addEventListener("click", function(){
    if(coins >= 50){
        coins = coins - 50;
        defense = defense + 55;
        document.getElementById("defense-counter-text").innerHTML = `Defense: ${Math.floor(defense)} Units`;
        document.getElementById("balance-counter-text").innerHTML = `Balance: ${Math.floor(coins)} Coins`;
        allPurchases.push("Barricade");
    }
    findTotalPurchases("Barricade");
});

document.getElementById("wall-buy").addEventListener("click", function(){
    if(coins >= 200){
        coins = coins - 200;
        defense = defense + 220;
        document.getElementById("defense-counter-text").innerHTML = `Defense: ${Math.floor(defense)} Units`;
        document.getElementById("balance-counter-text").innerHTML = `Balance: ${Math.floor(coins)} Coins`;
        allPurchases.push("Wall");
    }
    findTotalPurchases("Wall");
});

document.getElementById("floodgate-buy").addEventListener("click", function(){
    if(coins >= 1000){
        coins = coins - 1000;
        defense = defense + 1100;
        document.getElementById("defense-counter-text").innerHTML = `Defense: ${Math.floor(defense)} Units`;
        document.getElementById("balance-counter-text").innerHTML = `Balance: ${Math.floor(coins)} Coins`;
        allPurchases.push("Floodgate");
    }
    findTotalPurchases("Floodgate");
});

document.getElementById("levee-buy").addEventListener("click", function(){
    if(coins >= 5000){
        coins = coins - 5000;
        defense = defense + 5500;
        document.getElementById("defense-counter-text").innerHTML = `Defense: ${Math.floor(defense)} Units`;
        document.getElementById("balance-counter-text").innerHTML = `Balance: ${Math.floor(coins)} Coins`;
        allPurchases.push("Levee");
    }
    findTotalPurchases("Levee");
});

document.getElementById("hospital-buy").addEventListener("click", function(){
    if(coins >= 25000){
        coins = coins - 25000;
        defense = defense + 27500;
        document.getElementById("defense-counter-text").innerHTML = `Defense: ${Math.floor(defense)} Units`;
        document.getElementById("balance-counter-text").innerHTML = `Balance: ${Math.floor(coins)} Coins`;
        allPurchases.push("Hospital");
    }
    findTotalPurchases("Hospital");
});

document.getElementById("dam-buy").addEventListener("click", function(){
    if(coins >= 100000){
        coins = coins - 100000;
        defense = defense + 110000;
        document.getElementById("defense-counter-text").innerHTML = `Defense: ${Math.floor(defense)} Units`;
        document.getElementById("balance-counter-text").innerHTML = `Balance: ${Math.floor(coins)} Coins`;
        allPurchases.push("Dam");
    }
    findTotalPurchases("Dam");
});

// start button, 2.5s timeout (same time it takes for the wave to end)
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

let originalStorms = generateStorm();

// avoid repeated storms, run every time the game starts
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
}

// calculates stuff based on the storm
function stormImpact(type, level){
    let defenseSubtract = level * 10
    document.getElementById("storm-info").innerHTML = `Current Storm Wave: ${type} - ${stormLevels[level]}`;
    if(type === "Tornado"){
        defenseSubtract = defenseSubtract * 1.5;
    } else if (type === "Hurricane"){
        defenseSubtract = defenseSubtract * 1.25;
    } else if (type === "Blizzard"){
        defenseSubtract = defenseSubtract * 1.1;
    } else if (type === "Flood"){
        defenseSubtract = defenseSubtract * 1.05;
    }
    let count = 0;
    let stormInterval = setInterval(() => {
        document.body.style.backgroundColor = "rgba(255,0,0,0.5)";
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
}