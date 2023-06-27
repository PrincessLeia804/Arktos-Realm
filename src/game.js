// set up game class and logic

class Maze {
    constructor() {
        this.startScreen = document.getElementById("start-screen");
        this.gameScreen = document.getElementById("game-screen");
        this.gameEndScreen = document.getElementById("end-screen");
        this.player = null;
        this.gameModeEasy = true;
        this.sizeOfMaze = 0;
        this.hexagonsPerRow = 0;
        this.hexagonsPerColumn = 0;
        this.path = [] //hexagon ids - randomly chosen
        this.timeCount = 60;
        this.lives = 3;
        this.isGameOver = false; // true, when all ids have been clicked in the correct order
    }

    start() {
        // change screens
        /* to be added later: different size game containers for difficulty levels */
        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "flex";

        this.createMaze();
    }

    createMaze() {


        // 1. create maze grid based on user's screen size (width, height of game container) 
        const containerWidth = document.getElementById("game-container").offsetWidth;
        const containerHeight = document.getElementById("game-container").offsetHeight;
        this.hexagonsPerRow = Math.floor(containerWidth / 108) + 1
        this.hexagonsPerColumn = Math.floor(containerHeight / 115) + 1


        // 2. set amount of hexagons based on the calculation before
        this.sizeOfMaze = (this.hexagonsPerColumn) * (this.hexagonsPerRow)

        // 3. add hexagon-divs based on the calculated grid and add IDs to each hexagon
        for (let i = 1; i <= this.sizeOfMaze; i++) {
            let addDiv = document.createElement('div');
            addDiv.setAttribute("id", i);
            addDiv.innerHTML = `${i}`

            document.getElementById("game-container").appendChild(addDiv);
        }

        this.createPath();
    }


    createPath() {
        // 1. collect all possible starting-points (hexagon-ids)
        const startTilesId = []

        for (let i = 1; i <= this.sizeOfMaze; i += this.hexagonsPerRow) {
            startTilesId.push(i)
        }


        // 2. collect all possible ending-points (hexagon-ids)
        const endTilesId = []

        for (let i = this.hexagonsPerRow; i <= this.sizeOfMaze; i += this.hexagonsPerRow) {
            endTilesId.push(i)
        }

        // 3. create array with possible tile-connections for each next step (important: connection-difference between even and odd rowsa)
        const nextStepOddRow = [-(this.hexagonsPerRow), 1, (this.hexagonsPerRow)];
        const nextStepEvenRow = [-(this.hexagonsPerRow - 1), 1, (this.hexagonsPerRow + 1)];



        // build random path and store in this.path

        // 1. Choose random starting point out of startTiles Array
        this.path.push(startTilesId[Math.floor(Math.random() * startTilesId.length)])


        // 2. Create random next step based on nextStep-Arrays for even/odd rows

        // create random Index-Id
        let randomArrId;
        // create boolean to track which row the current hexagon is and which nextStep-Array needs to be used
        let isOddRow;
        // create variable to hold next step
        let nextStep;


        // repeatedly get tile-connections until an endTileId is selected
        for (let i = 0; i < this.sizeOfMaze; i++) {

            // 1. check the current row
            switch(true) {
                case this.path[this.path.length - 1] / this.hexagonsPerRow <= 1:
                case this.path[this.path.length - 1] / this.hexagonsPerRow > 2 && this.path[this.path.length - 1] /this.hexagonsPerRow <= 3 :
                case this.path[this.path.length - 1] / this.hexagonsPerRow > 4 && this.path[this.path.length - 1] /this.hexagonsPerRow <= 5 :
                case this.path[this.path.length - 1] / this.hexagonsPerRow > 6 && this.path[this.path.length - 1] /this.hexagonsPerRow <= 7 :
                case this.path[this.path.length - 1] / this.hexagonsPerRow > 8 && this.path[this.path.length - 1] /this.hexagonsPerRow <= 9 :
                    isOddRow = true;
                    break;
                default:
                    isOddRow = false;    
            }


            // 1. create random index to chose the next step, both arrays have the same length
            randomArrId = [Math.floor(Math.random() * nextStepOddRow.length)]
            
            // 2. update next step based on even/odd row
            if(isOddRow) {
                nextStep = this.path[this.path.length - 1] + nextStepOddRow[randomArrId]
            }else{
                nextStep = this.path[this.path.length - 1] + nextStepEvenRow[randomArrId]
            }
            



            // 3. check if nextStep keeps inside the boundaries (above 0, below grid-size), and doesn't build 3 hexagon clusters
            if (!this.path.includes(nextStep) && 0 < nextStep && nextStep < this.sizeOfMaze && this.path[this.path.length - 2] !== nextStep - 1) {
                // check also if the end was reached. If so add last step and break the loop
                if (endTilesId.includes(nextStep)) { 
                    this.path.push(nextStep);
                    break;
                } else {
                    this.path.push(nextStep);
                }
            } else {
                continue;
            }
        }
        this.previewSolution();
    }

    previewSolution() {     //light the way at the beginning of the game
        
        let solution;
        let counter = 1

        // show each tile after another with a 1sec delay
        const intervalId1 = setInterval (() => {
            solution = document.querySelector(`[id="${this.path[counter]}"]`)
            solution.style.background = "rgb(231, 19, 164)";

            counter++;

            if (counter >= this.path.length){
                clearInterval(intervalId1);
            }
        }, 1000);


        // return the path to normal colors after 3 seconds
        
        // const timeoutId = setTimeout (() => {
        //     // select by class to return color
        //     solution = document.querySelector()
        //     solution.style.background = "rgb(66, 104, 186)";

        // }, 3000);
    }
}

