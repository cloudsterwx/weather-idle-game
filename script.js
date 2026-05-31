let coins = 0;
let multiplier = 1;

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

