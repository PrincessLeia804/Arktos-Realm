// set up game class and logic

class Maze {
    constructor() {
        this.startScreen = document.getElementById("start-screen");
        this.gameScreen = document.getElementById("game-screen");
        this.gameEndScreen = document.getElementById("end-screen");
        this.player = null;
        this.gameModeEasy = true;
        this.sizeOfMaze = 0;
        this.hexagonSize = 0;
        this.hexagonsPerRow = 9;
        this.hexagonsPerColumn = 5;
        this.path = [] //hexagon ids - randomly chosen
        this.countdown = 60;
        this.lives = 5;
        this.clickedTileCount = 0;
        this.helpCount = 2;
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
        let containerWidth = document.getElementById("game-container").offsetWidth;
        const containerHeight = document.getElementById("game-container").offsetHeight;


        // update for hard-mode and add tiles
        if (!this.gameModeEasy) {
            this.hexagonsPerRow + 5;
        }

        // calculate size of hexagon - 10px for equally sized rows
        this.hexagonSize = Math.ceil((containerWidth - ((containerWidth / this.hexagonsPerRow) / 2)) / this.hexagonsPerRow)

        // 3. set amount of hexagons based on the calculation before
        this.sizeOfMaze = (this.hexagonsPerColumn) * (this.hexagonsPerRow)


        // 3. add hexagon-divs based on the calculated grid and add IDs to each hexagon
        for (let i = 1; i <= this.sizeOfMaze; i++) {
            let addDiv = document.createElement('div')
            addDiv.setAttribute("id", i)
            addDiv.setAttribute("class", "hexagon")
            document.getElementById("game").style.setProperty("--s", `${this.hexagonSize - 10}px`)

            document.getElementById("game-container").appendChild(addDiv);
        }
        this.createPlayerScreen();
        this.createPath();
    }

    createPlayerScreen() {
        document.getElementById("playerLives").innerHTML = `${this.lives}`
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
            switch (true) {
                case this.path[this.path.length - 1] / this.hexagonsPerRow <= 1:
                case this.path[this.path.length - 1] / this.hexagonsPerRow > 2 && this.path[this.path.length - 1] / this.hexagonsPerRow <= 3:
                case this.path[this.path.length - 1] / this.hexagonsPerRow > 4 && this.path[this.path.length - 1] / this.hexagonsPerRow <= 5:
                case this.path[this.path.length - 1] / this.hexagonsPerRow > 6 && this.path[this.path.length - 1] / this.hexagonsPerRow <= 7:
                case this.path[this.path.length - 1] / this.hexagonsPerRow > 8 && this.path[this.path.length - 1] / this.hexagonsPerRow <= 9:
                    isOddRow = true;
                    break;
                default:
                    isOddRow = false;
            }


            // 1. create random index to chose the next step, both arrays have the same length
            randomArrId = [Math.floor(Math.random() * nextStepOddRow.length)]

            // 2. update next step based on even/odd row
            if (isOddRow) {
                nextStep = this.path[this.path.length - 1] + nextStepOddRow[randomArrId]
            } else {
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

    startTimer() {
        this.countdown;

        const intervalId2 = setInterval(() => {
            document.getElementById("game-timer").innerHTML = `<p>Time left: ${this.countdown} seconds</p>`
            this.countdown--;

            if (this.countdown == 0) {
                clearInterval(intervalId2)
                this.lostGame();
            }
        }, 1000);

    }

    previewSolution() {     //light the way at the beginning of the game

        let solution;
        let counter = 0

        // show each tile after another with a delay
        const intervalId1 = setInterval(() => {
            solution = document.querySelector(`[id="${this.path[counter]}"]`)
            solution.setAttribute("class", "tileClicked")
            solution.style.background = "rgb(231, 19, 164)"

            counter++;

            if (counter >= this.path.length) {
                clearInterval(intervalId1)

                // return the path to normal colors after 3 seconds
                const timeoutId = setTimeout(() => {
                    // select by class to return color
                    let hexagonContainer = document.querySelectorAll(".tileClicked")
                    hexagonContainer.forEach(element => {
                        element.removeAttribute("style")
                        element.setAttribute("class", "hexagon")
                    })
                    this.startTimer();

                }, 1500);
            }
        }, 200);
        this.play()
    }

    getHelp() {
        this.helpCount
        const helpButton = document.getElementById("help")

        // Click event listener
        const clickForHelp = (e) => {
            this.helpCount--

            if(this.helpCount < 0){
                helpButton.removeEventListener("click", clickForHelp)
            } else {
            let nextTile = document.querySelector(`[id="${this.path[this.clickedTileCount]}"]`)
            console.log(nextTile);
            nextTile.style["background-color"] = "rgb(231, 19, 164)";
            this.clickedTileCount++
            }
        }

        // Add event listeners for game buttons
        helpButton.addEventListener("click", clickForHelp);
    }

    giveUp() {
        const giveUpButton = document.getElementById("give-up")

        // Click event listener
        const clickGoodbye = (e) => {
           this.lostGame()
        }

        // Add event listeners for game buttons
        giveUpButton.addEventListener("click", clickGoodbye);
    }



    play() {
        this.getHelp()
        this.giveUp()

        let allHexagons = document.querySelectorAll(".hexagon")
        this.clickedTileCount

        // Remove all event listeners
        const removeListeners = () => {
            for (let j = 0; j < allHexagons.length; j++) {
                allHexagons[j].removeEventListener("click", clickHandler);
            }
        }

        // Click event listener
        const clickHandler = (e) => {
            this.clickedTileCount += 1


            if (this.path[this.clickedTileCount - 1] === (parseInt(e.target.id))) {
                e.currentTarget.style["background-color"] = "rgb(231, 19, 164)";
            } else {
                this.lives -= 1
                if (this.lives === 0) {
                    removeListeners();
                    this.lostGame();
                }
                this.clickedTileCount -= 1
                document.getElementById("playerLives").innerHTML = `${this.lives}`
            }
        }


        // Add event listeners
        for (let i = 0; i < allHexagons.length; i++) {
            allHexagons[i].addEventListener("click", clickHandler);
        }
    }

    lostGame() {
        this.gameScreen.style.display = "none";
        this.gameEndScreen.style.display = "flex";

        if (this.lives === 0){
            this.gameEndScreen.innerHTML = `
            <h2>You didn't make it</h2>
            <div id="out-of-live">
                <p>you ran out of lives</p>
            </div>`
        } else if (this.countdown === 0) {
            this.gameEndScreen.innerHTML = `
            <h2>You didn't make it</h2>
            <div id="out-of-live">
                <p>you ran out of time</p>
            </div>`
        } else {
            this.gameEndScreen.innerHTML = `
            <h2>Well, that didn't work out</h2>
            <div id="loser">
            <p>Do you want to try again?</p>
            </div>`
        }

    }
}

