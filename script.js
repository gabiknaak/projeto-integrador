let container = document.querySelector("#container");
let player = document.querySelector("#player");
let block = document.querySelector("#block");
let road = document.querySelector("#road");

let score = document.querySelector("#score");
let gameOver = document.querySelector("#gameOver");
let interval = null;
let playerScore = 0;
let scoreCounter = () => {
    playerScore++;
    score.innerHTML = `Score <b>${playerScore}</b>`;
};
window.addEventListener("keydown", (event) => {
    if (event.code === "Space" && gameOver.style.display === "block") {
        resetGame();
    } else if (event.code === "Space") {
        gameOver.style.display = "none";
        block.classList.add("blockActive");
        road.firstElementChild.style.animation = "roadAnimate 6s linear infinite";
       
        playerScore = 0;
        interval = setInterval(scoreCounter, 20);
    } else if (event.key === "ArrowUp") {
        if (!player.classList.contains("playerActive")) {
            player.classList.add("playerActive");
            setTimeout(() => {
                player.classList.remove("playerActive");
            }, 500);
        }
    }
});
let result = setInterval(() => {
    let playerBottom = parseInt(getComputedStyle(player).getPropertyValue("bottom"));
    let blockLeft = parseInt(getComputedStyle(block).getPropertyValue("left"));
    if (playerBottom <= 90 && blockLeft >= 20 && blockLeft <= 145) {
        gameOver.style.display = "block";
        block.classList.remove("blockActive");
        road.firstElementChild.style.animation = "none";
       
        clearInterval(interval);
    }
}, 10);
function resetGame() {
    gameOver.style.display = "none";
    playerScore = 0;
    score.innerHTML = `Score <b>00</b>`;
    block.style.animation = "";
    
    road.firstElementChild.style.animation = "none";
    setTimeout(() => {
        block.classList.add("blockActive");
        road.firstElementChild.style.animation = "roadAnimate 6s linear infinite";
        
        interval = setInterval(scoreCounter, 20);
    }, 100);
}