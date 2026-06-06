let stormArray = ["Thunderstorm", "Hurricane", "Tornado", "Blizzard", "Flood"];
let stormLevels = ["", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5"];
let allPurchases = [];

let globalCount = 30;
let coins = 0;
let multiplier = 1;
let defense = 0;
let idle = 0;
let intensity = [1,1.2,1.4];
let round = 1;

document.getElementById("start-button").addEventListener("click", function(){
    const container = document.getElementById("start-container")
    container.classList.toggle("fade");
        const startDelay = setTimeout(() => {
            container.style.display = "none";
        }, 200);
    generateStorm();
    continuousStorms();
});

document.getElementById("load-save-button").addEventListener("click", function(){
    const savedState = JSON.parse(localStorage.getItem("weatherIdleGameSave"));
    if(savedState){
    document.getElementById("start-container").classList.toggle("fade");
        const startDelay = setTimeout(() => {
            document.getElementById("start-container").style.display = "none";
        }, 200);
    localStorageLoad();
    continuousStorms();
    } else{
        alert("No save file found.");
    }
});

// Achievement, stats and options menus with animations
// add or remove past class lists to prevent bugs
document.getElementById("achievement-button").addEventListener("click", function(){
    const container = document.getElementById("achievement-container");
    container.style.display = "flex";
    container.classList.remove("remove");
    container.classList.remove("fade");

    const startDelay = setTimeout(() => {
    container.classList.add("fade");
    }, 100);
});

document.getElementById("options-button").addEventListener("click", function(){
    const container = document.getElementById("options-container");
    container.style.display = "flex";
    container.classList.remove("remove");
    container.classList.remove("fade");

    const startDelay = setTimeout(() => {
    container.classList.add("fade");
    }, 100);
});

document.getElementById("stats-button").addEventListener("click", function(){
    const container = document.getElementById("stats-container");
    container.style.display = "flex";
    container.classList.remove("remove");
    container.classList.remove("fade");

    const startDelay = setTimeout(() => {
    container.classList.add("fade");
    }, 100);
});

document.getElementById("pause-button").addEventListener("click", function(){
    const container = document.getElementById("pause-container");
    container.style.display = "flex";
    container.classList.remove("remove");
    container.classList.remove("fade");

    const startDelay = setTimeout(() => {
    container.classList.add("fade");
    }, 100);
});

// Function & animation with the achievement back button
document.getElementById("achievement-back-button").addEventListener("click", function(){
    const container = document.getElementById("achievement-container")
    container.classList.add("remove");
        const startDelay = setTimeout(() => {
            container.style.display = "none";
        }, 200);
});

// Function & animation with the options back button
document.getElementById("options-back-button").addEventListener("click", function(){
    const container = document.getElementById("options-container")
    container.classList.add("remove");
        const startDelay = setTimeout(() => {
            container.style.display = "none";
        }, 200);
});

document.getElementById("stats-back-button").addEventListener("click", function(){
    const container = document.getElementById("stats-container")
    container.classList.add("remove");
        const startDelay = setTimeout(() => {
            container.style.display = "none";
        }, 200);
});

document.getElementById("pause-back-button").addEventListener("click", function(){
    const container = document.getElementById("pause-container")
    container.classList.add("remove");
        const startDelay = setTimeout(() => {
            container.style.display = "none";
        }, 200);
});

// idle coins + saving
let idleInterval = setInterval(() => {
    coins = coins + idle;
    document.getElementById("balance-counter-text").innerHTML = `Balance: ${Math.floor(coins)} Coins`;
    localStorageSave();
}, 1000);

// click = add coins
// clicking animation: "click" keyframe list is added. when such animation ends, the class is removed & element is reset with void offsetWidth
document.getElementById("main-button").addEventListener("click", function(){
    const button = document.getElementById("main-button")
    button.classList.add("click");
    button.addEventListener("animationend", () => {
        void button.offsetWidth;
        button.classList.remove("click");
    }, {once: true});
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
    "Barricade": {cost: 200, defense: 220},
    "Wall": {cost: 1000, defense: 1100},
    "Floodgate": {cost: 10000, defense: 11000},
    "Levee": {cost: 100000, defense: 110000},
    "Hospital": {cost: 500000, defense: 550000},
    "Dam": {cost: 1000000, defense: 1100000}
}

function purchaseItem(name){
    let item = shopItems[name];
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
    const buttons = document.getElementById(`${item.toLowerCase()}-buy`)
    buttons.addEventListener("click", function(){
        purchaseItem(item);
        buttons.classList.add("click");
        buttons.addEventListener("animationend", () => {
        void buttons.offsetWidth;
        buttons.classList.remove("click");
    }, {once: true});
    });
});

// starts a storm every 30 seconds to increase game difficulty
function continuousStorms(){
    let cooldown = setInterval(() => {
        if (globalCount > 0){
            globalCount--;
            document.getElementById("start-wave").innerHTML = `Wave starting in ${globalCount}s...`;
            console.log(round);
        } else {
            let stormType = document.getElementById("storm1").innerHTML.split(" - ")[0];
            stormImpact(stormType, intensity);
            round++;
            intensity = intensity.map(intensity => intensity + 0.2);
            clearInterval(cooldown);
        }
    }, 1000)
}

// avoid repeated storms, run every time the game starts or the level changes
function generateStorm(){
    let updatingStormArray = stormArray;
    let randomStorm = Math.floor(Math.random() * updatingStormArray.length);
    document.getElementById("storm1").innerHTML = `${updatingStormArray[randomStorm]} - Intensity ${intensity[0].toFixed(1)}`;
    updatingStormArray = updatingStormArray.filter(storm => storm !== stormArray[randomStorm]);
    let randomStorm2 = Math.floor(Math.random() * updatingStormArray.length);
    document.getElementById("storm2").innerHTML = `${updatingStormArray[randomStorm2]} - Intensity ${intensity[1].toFixed(1)}`;
    updatingStormArray = updatingStormArray.filter(storm => storm !== updatingStormArray[randomStorm2]);
    let randomStorm3 = Math.floor(Math.random() * updatingStormArray.length);
    document.getElementById("storm3").innerHTML = `${updatingStormArray[randomStorm3]} - Intensity ${intensity[2].toFixed(1)}`;
}

// updates storms (shifts storms up and generates a new storm at the end of the queue - no repeats)
function updateStorm(){
    document.getElementById("storm1").innerHTML = document.getElementById("storm2").innerHTML;
    document.getElementById("storm2").innerHTML = document.getElementById("storm3").innerHTML;
    let updatingStormArray = stormArray.filter(storm => storm !== document.getElementById("storm1").innerHTML.split(" - ")[0])
    .filter(storm => storm !== document.getElementById("storm2").innerHTML.split(" - ")[0]);
    let randomStorm = Math.floor(Math.random() * updatingStormArray.length);
    document.getElementById("storm3").innerHTML = `${updatingStormArray[randomStorm]} - Intensity ${intensity[2].toFixed(1)}`;
}

function findTotalPurchases(type){
    const count = allPurchases.filter(purchase => purchase === type).length;
    document.getElementById(`${type.toLowerCase()}-purchased`).innerHTML = `Purchased: ${count}`;
    return count;
}

// calculates stuff based on the storm
function stormImpact(type, intensity){
    let defenseSubtract = intensity[0] * 10
    document.getElementById("storm-info").innerHTML = `Current Storm Wave: ${type} - Intensity ${intensity[0].toFixed(1)}`;
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
                window.location.reload();
            }, 1000);
        }
        count++;
        if(count >= 10){
            clearInterval(stormInterval);
            document.body.style.backgroundColor = "rgb(135, 206, 235)";
            updateStorm();
            multiplier = multiplier + (1.5 ** intensity[0]);
            idle = idle + (2.0 ** intensity[0]);
            document.getElementById("storm-info").innerHTML = `Current Storm Wave: N/A`;
            document.getElementById("multiplier").innerHTML = `Clicking Multiplier: ${multiplier.toFixed(2)}x | Idle: ${idle.toFixed(2)} coins per second`;
            globalCount = 30;
            continuousStorms();
        }
    }, 250);
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
        intensity: intensity,
        storms: storms,
        globalCount: globalCount
    }

    console.log(gameState);
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
        intensity = savedState.intensity;
        globalCount = savedState.globalCount;
        let storms = savedState.storms;
        document.getElementById("balance-counter-text").innerHTML = `Balance: ${Math.floor(coins)} Coins`;
        document.getElementById("defense-counter-text").innerHTML = `Defense: ${Math.floor(defense)} Units`;
        document.getElementById("multiplier").innerHTML = `Clicking Multiplier: ${multiplier.toFixed(2)}x | Idle: ${idle.toFixed(2)} coins per second`;
        document.getElementById("storm1").innerHTML = `${storms[0]} - Intensity ${intensity[0].toFixed(1)}`;
        document.getElementById("storm2").innerHTML = `${storms[1]} - Intensity ${intensity[1].toFixed(1)}`;
        document.getElementById("storm3").innerHTML = `${storms[2]} - Intensity ${intensity[2].toFixed(1)}`;
        if(storms.length === 0){
        generateStorm();
        }

        Object.keys(shopItems).forEach(item => {
            document.getElementById(`${item.toLowerCase()}-purchased`).innerHTML = `Purchased: ${findTotalPurchases(item)}`;
        });
    }
}

function updatePrices(){
    
}