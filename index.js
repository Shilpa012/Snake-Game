//game constants and variables
let inputDir = {
    x: 0, y: 0
}
const eat = new Audio("music/eat.mp3");
const kill = new Audio("music/kill.mp3");
const turn = new Audio("music/turn.mp3");
const walk = new Audio("music/walking.mp3");
let lastTime = 0;
let speed = 5;
let snakearr = [
    { x: 16, y: 13 }
];
let food = {
    x: 6, y: 3
};
let score = 0;

//game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastTime) / 1000 < 1 / speed) {
        return;
    }
    lastTime = ctime;
    gameEngine();

}

function isColapse(sarr) {
    //snake head collide with body
    for (let i = 1; i < snakearr.length; i++) {
        if (snakearr[i].x === snakearr[0].x && snakearr[i].y === snakearr[0].y) {
            return true;
        }
    }

    //snake head collide with wall 
    if (snakearr[0].x >= 30 || snakearr[0].x <= 0 || snakearr[0].y >= 18 || snakearr[0].y <= 0) {
        return true;
    }
}



function gameEngine() {
    //updating snake array and food
    walk.play();
    if (isColapse(snakearr)) {

        walk.pause();
        inputDir = {
            x: 0, y: 0
        }
        kill.play();
        alert("Game over press any key to play again :(")
        snakearr = [
            { x: 16, y: 13 }
        ];
        walk.play();
        score = 0;
    }

    // increament the score and regenerate the food after eating
    if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
        eat.play();
        score = score + 1;

        if (score > hiscore) {
            hiscorevalue = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscorevalue));
            HiScoreBox.innerHTML = "High Score :" + hiscorevalue;
        }
        ScoreBox.innerHTML = "Score : " + score;
        snakearr.unshift({ x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y });
        let a = 2;
        let b = 17;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }

    }

    //moving the snake
    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = { ...snakearr[i] };
    }
    snakearr[0].x += inputDir.x;
    snakearr[0].y += inputDir.y;


    //display the food and snake

    //display snake
    board.innerHTML = " ";
    snakearr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snakebody');
        }
        board.appendChild(snakeElement);
    })
    //display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


//game logic
let hiscore = localStorage.getItem("hiscore");

if (hiscore === null) {
    hiscorevalue = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscorevalue));
}
else {
    hiscorevalue = JSON.parse(hiscore);
    HiScoreBox.innerHTML = "High Score :" + hiscorevalue;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };
    turn.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;

            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;

    }
})
