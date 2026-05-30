let defense = 0;
let multiplier = 1;

// click = add defense
document.getElementById("main-button").addEventListener("click", function(){
    defense = defense + 1 * multiplier;
    if(defense === 1){
       document.getElementById("defense-counter").innerHTML = `Defense: ${defense} unit`;
    }
    else{
        document.getElementById("defense-counter").innerHTML = `Defense: ${defense} units`;
    }
    console.log("a");
})

