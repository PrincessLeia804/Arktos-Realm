// set up game class and logic

class Maze {
    constructor() {
        this.startScreen = document.getElementById("start-screen");
        this.gameScreen = document.getElementById("game-screen");
        this.gameEndScreen = document.getElementById("end-screen");
        this.player = null;
        this.gameModeEasy = true;
        this.sizeOfMaze = 30;
        this.mazeSolution = [] //hexagon ids - randomly chosen
        this.timeCount = 60;
        this.lives = 3;
        this.isGameOver = false; // true, when all ids have been clicked in the correct order
    }

    start() {
        // change screens
        /* to be added later: different size game containers for difficulty levels */
        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "flex";

        if (!this.gameModeEasy) {
            this.sizeOfMaze = 60;
        }

        this.createMaze();
    }

    createMaze() {
        // create tiles
        for(let i = 1; i <= this.sizeOfMaze; i++){
            let addDiv = document.createElement('div');
            addDiv.setAttribute("id", i);

            document.getElementById("game-container").appendChild(addDiv);
        }


        // create array for possible tile-connections to randomly create a way through the maze
        let mazeCalcArr = [];
         
        // 1. calc amount of tiles per row
        // const tilesPerRow = document.getElementByClass("container").style.width
        // console.log(tilesPerRow);
    }
}

