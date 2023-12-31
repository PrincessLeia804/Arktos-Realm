//  script to start & end the game 
window.addEventListener('load', () => {
    const startBtnEasy = document.getElementById("start-easy")
    const startBtnHard = document.getElementById("start-hard")
    const restartBtn = document.getElementById("restart")
    const startOverBtn = document.getElementById("start-over")


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

    restartBtn.addEventListener('click', () => {
        location.reload();
    })

    startOverBtn.addEventListener('click', () => {
        location.reload();
    })

})