let coins = 0;
let multiplier = 1;
let defense = 0;

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
})

document.getElementById("sandbag-buy").addEventListener("click", function(){
    if(coins >= 10){
        coins = coins - 10;
        defense = defense + 1;
        document.getElementById("defense-counter").innerHTML = `Defense: ${defense} Units`;
        document.getElementById("balance-counter").innerHTML = `Balance: ${coins} Coins`;
    }
})

document.getElementById("barricade-buy").addEventListener("click", function(){
    if(coins >= 50){
        coins = coins - 50;
        defense = defense + 6;
        document.getElementById("defense-counter").innerHTML = `Defense: ${defense} Units`;
        document.getElementById("balance-counter").innerHTML = `Balance: ${coins} Coins`;
    }
})