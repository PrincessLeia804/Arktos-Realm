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
        for (let i = 1; i <= this.sizeOfMaze; i++) {
            let addDiv = document.createElement('div');
            addDiv.setAttribute("id", i);
            addDiv.innerHTML = `${i}`
        
            document.getElementById("game-container").appendChild(addDiv);
        }



        // 1. calc amount of tiles per row   !!! limit to equal-length rows
        const containerWidth = document.getElementById("game-container").offsetWidth
        const hexagonWidth = document.getElementById("1").offsetWidth + 8

        // create array for possible tile-connections to randomly create a way through the maze
        const hexagonsPerRow = Math.floor(containerWidth / hexagonWidth)
        let mazeCalcArr = [-(hexagonsPerRow), 1, (hexagonsPerRow)];

        // define start-ids - ?? set grid limitation - equal amount of tiles per row
        let startTilesId = []

        for (let i = 1; i <= this.sizeOfMaze; i += hexagonsPerRow) {
            startTilesId.push(i)
        }

        // define end-ids
        let endTilesId = []
        for (let i = hexagonsPerRow; i < this.sizeOfMaze; i += hexagonsPerRow) {
            endTilesId.push(i)
        }

        // create random way through the maze, set the starting point
        let wayThroughMaze = []
        wayThroughMaze.push(startTilesId[Math.floor(Math.random() * startTilesId.length)]) //works
        
        //not uodating: let wayArrLength = wayThroughMaze.length - 1


        let randomArrId;
        // repeatedly get random index-nr between 0 - 3 in this case
        for (let i = 0; i < this.sizeOfMaze; i++) {

            // create random index to chose the next move
            randomArrId = [Math.floor(Math.random() * mazeCalcArr.length)]
            // add or subtract the next move from the last position
            if(wayThroughMaze[wayThroughMaze.length - 1]%2 === 0 && randomArrId === 0 ){
                randomArrId = wayThroughMaze[wayThroughMaze.length - 1] + mazeCalcArr[randomArrId] + 1
            } else {
                randomArrId = wayThroughMaze[wayThroughMaze.length - 1] + mazeCalcArr[randomArrId]
            }

            if (!wayThroughMaze.includes(randomArrId) && 0 < randomArrId && randomArrId < this.sizeOfMaze) {
                if (endTilesId.includes(randomArrId)) { // check doesnt seem to work always
                    wayThroughMaze.push(randomArrId);
                    break;
                } else {
                    wayThroughMaze.push(randomArrId);
                }
            } else {``
                continue;
            }
            console.log(wayThroughMaze);
        }

        let solution;
        for(let i = 0; i < wayThroughMaze.length; i++){
            solution = document.querySelector(`[id="${wayThroughMaze[i]}"]`)
            solution.style.background = "rgb(231, 19, 164)";
        }
    }
}

