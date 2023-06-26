// set up game class and logic

class Maze {
    constructor() {
        this.startScreen = document.getElementById("start-screen");
        this.gameScreen = document.getElementById("game-screen");
        this.gameEndScreen = document.getElementById("end-screen");
        this.player = null;
        this.mazeSolution = [] //hexagon ids - randomly chosen
        this.timeCount = 60;
        this.lives = 3;
        this.isGameOver = false; // true, when all ids have been clicked in the correct order
    }

    start() {
        // change screens
        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "flex";
    }
}

