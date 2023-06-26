//  script to start & end the game 
window.addEventListener('load', () => {
    const startBtnEasy = document.getElementById("start-easy")
    // const startBtnHard = document.getElementById("start-hard")
    // const restartBtn = document.getElementById("restart")

    let game;

    function startGame (){
        console.log("game starts");
        game = new Maze()
        game.start()
    }

    startBtnEasy.addEventListener('click', () => {
        startGame()
    })

    // restartBtn.addEventListener('click', () => {
    //     location.reload;
    // })
})