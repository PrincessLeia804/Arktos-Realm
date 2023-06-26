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
        // create tiles-matrix
        for(let i = 1; i <= this.sizeOfMaze; i++){
            let addDiv = document.createElement('div');
            addDiv.setAttribute("id", i);

            document.getElementById("game-container").appendChild(addDiv);
        }


         
        // 1. calc amount of tiles per row   !!! limit to equal-length rows
        const containerWidth = document.getElementById("game-container").offsetWidth
        const hexagonWidth = document.getElementById("1").offsetWidth + 8

        // create array for possible tile-connections to randomly create a way through the maze
        const hexagonsPerRow = Math.floor(containerWidth / hexagonWidth)
        let mazeCalcArr = [-(hexagonsPerRow - 1), 1, (hexagonsPerRow - 1), hexagonsPerRow];

        // define start-ids - ?? set grid limitation - equal amount of tiles per row
        let startTilesId = []
        for (let i = 1; i <= this.sizeOfMaze; i + hexagonsPerRow){
                startTilesId.push(i)
        }

        // define end-ids
        let endTilesId = []
        for (let i = hexagonsPerRow; i < this.sizeOfMaze; i + hexagonsPerRow){
            startTilesId.push(i)
        }

        // create random way through the maze, set the starting point
        let wayThroughMaze = [startTilesId[Math.floor(Math.random() * startTilesId.length)]]
        
        // create random way based on options. Stop, when outer tile has been reached
        let randomStepId = Math.floor(Math.random() * 4);

        do {
            wayThroughMaze.push(mazeCalcArr[randomStepId]);
        } while (!endTilesId.includes(randomStepId))

    }
}

