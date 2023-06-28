//  script to start & end the game 
window.addEventListener('load', () => {
    const startBtnEasy = document.getElementById("start-easy")
    const startBtnHard = document.getElementById("start-hard")


    let game = new Maze();

    function startGame (){
        game.start()
    }

    startBtnEasy.addEventListener('click', () => {
        game.gameModeEasy = true;
        startGame()
    })

    startBtnHard.addEventListener('click', () => {
        game.gameModeEasy = false;
        startGame()
    })

})