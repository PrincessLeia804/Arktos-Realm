/* create random indices for the given array*/
function randomIndex (arr){
    return Math.floor(Math.random() * arr.length)          
}

/* check the current tile position for odd row with hexagons per row  */
function checkOddRow (arr, hex){
    switch (true) {
        case arr[arr.length - 1] / hex <= 1:
        case arr[arr.length - 1] / hex > 2 && arr[arr.length - 1] / hex <= 3:
        case arr[arr.length - 1] / hex > 4 && arr[arr.length - 1] / hex <= 5:
        case arr[arr.length - 1] / hex > 6 && arr[arr.length - 1] / hex <= 7:
        case arr[arr.length - 1] / hex > 8 && arr[arr.length - 1] / hex <= 9:
            return true;
        default:
            return false;
    }
}


/* check nextMove for exceptions (out of bound, already picked) */
function checkNextMove(newPos, arr, gridSize, endArr) {
    switch(true) {
        case newPos <= 0 || newPos > gridSize:
        case arr[arr.length - 2] === newPos - 1:
            return false;
        default:
            return true;
    }
}

 