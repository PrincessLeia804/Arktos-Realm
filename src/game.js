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

        this.createMaze();
    }

    createMaze() {


        // 1. create maze grid based on user's screen size (width, height of game container) 
        const containerWidth = document.getElementById("game-container").offsetWidth;
        const containerHeight = document.getElementById("game-container").offsetHeight;
        this.hexagonsPerRow = Math.floor(containerWidth / 108) + 1
        this.hexagonsPerColumn = Math.floor(containerHeight / 115) + 1
        console.log(containerHeight, containerWidth, this.hexagonsPerRow, this.hexagonsPerColumn);

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

        for (let i = 1; i <= this.sizeOfMaze; i += hexagonsPerRow) {
            startTilesId.push(i)
        }


        // 2. collect all possible ending-points (hexagon-ids)
        const endTilesId = []

        for (let i = hexagonsPerRow; i < this.sizeOfMaze; i += hexagonsPerRow) {
            endTilesId.push(i)
        }


        // 3. create array with possible tile-connections for each next step (important: connection-difference between even and odd rowsa)
        const nextStepOddRow = [-(hexagonsPerRow), 1, (hexagonsPerRow)];
        const nextStepEvenRow = [-(hexagonsPerRow - 1), 1, (hexagonsPerRow + 1)];



        // build random path
        const wayThroughMaze = []



        // 1. Choose random starting point out of startTiles Array
        wayThroughMaze.push(startTilesId[Math.floor(Math.random() * startTilesId.length)])


        // 2. Create random next step based on nextStep-Arrays for even/odd rows

        // create random Index-Id
        let randomArrId;
        // create boolean to track which row the current hexagon is and which nextStep-Array needs to be used
        let isOddRow;


        // repeatedly get tile-connections until an endTileId is selected
        for (let i = 0; i < this.sizeOfMaze; i++) {

            // 1. create random index to chose the next step
            randomArrId = [Math.floor(Math.random() * mazeCalcArr.length)]

            // 2. check the current row


            // add or subtract the next move from the last position
            if (wayThroughMaze[wayThroughMaze.length - 1] % 2 === 0 && randomArrId === 0) {
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
            } else {
                continue;
            }
            console.log(wayThroughMaze);
        }

        // let solution;
        // for(let i = 0; i < wayThroughMaze.length; i++){
        //     solution = document.querySelector(`[id="${wayThroughMaze[i]}"]`)
        //     solution.style.background = "rgb(231, 19, 164)";
        // }
    }
}

