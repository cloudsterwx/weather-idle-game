let coins = 0;
let multiplier = 1;
let defense = 0;
let level = 0;
let stormArray = ["Thunderstorm", "Hurricane", "Tornado", "Blizzard", "Flood"];
let stormLevels = ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"];
let allPurchases = [];

// click = add coins
document.getElementById("main-button").addEventListener("click", function(){
    coins = coins + 1 * multiplier;
    if(coins === 1){
       document.getElementById("balance-counter").innerHTML = `Balance: ${coins} Coin`;
    }
    else{
        document.getElementById("balance-counter").innerHTML = `Balance: ${coins} Coins`;
    }
    console.log("a");
});

// shop items
document.getElementById("sandbag-buy").addEventListener("click", function(){
    if(coins >= 10){
        coins = coins - 10;
        defense = defense + 1;
        document.getElementById("defense-counter").innerHTML = `Defense: ${defense} Units`;
        document.getElementById("balance-counter").innerHTML = `Balance: ${coins} Coins`;
        allPurchases.push("Sandbag");
    }
    findTotalPurchases("Sandbag");
});

document.getElementById("barricade-buy").addEventListener("click", function(){
    if(coins >= 50){
        coins = coins - 50;
        defense = defense + 6;
        document.getElementById("defense-counter").innerHTML = `Defense: ${defense} Units`;
        document.getElementById("balance-counter").innerHTML = `Balance: ${coins} Coins`;
        allPurchases.push("Barricade");
    }
    findTotalPurchases("Barricade");
});

document.getElementById("wall-buy").addEventListener("click", function(){
    if(coins >= 200){
        coins = coins - 200;
        defense = defense + 25;
        document.getElementById("defense-counter").innerHTML = `Defense: ${defense} Units`;
        document.getElementById("balance-counter").innerHTML = `Balance: ${coins} Coins`;
        allPurchases.push("Wall");
    }
    findTotalPurchases("Wall");
});

document.getElementById("start-wave").addEventListener("click", function(){
    updateStorm();
});

generateStorm();

// avoid repeated storms, run every time the level changes
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