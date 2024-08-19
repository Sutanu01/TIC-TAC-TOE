const move = ['X', 'O'];
let curr = 0;
let gameOver=false;
let boxes = document.querySelectorAll('.box');
let grid = document.querySelector('.grid');
let popup = document.querySelector('.popup');
let wintext = document.querySelector('.wintext');
let restart = document.querySelector('.restart');

let GAME = [['', '', ''], ['', '', ''], ['', '', '']];

function check() {
    // ROW WISE CHECK
    for (let i = 0; i < 3; i++) {
        let flag = true;
        if (GAME[i][0] === 'X' || GAME[i][0] === 'O') {
            for (let j = 1; j < 3; j++) {
                if (GAME[i][j] !== GAME[i][0]) {
                    flag = false;
                    break;
                }
            }
            if (flag) return true;
        }
    }
    // COLUMN WISE CHECK
    for (let i = 0; i < 3; i++) {
        let flag = true;
        if (GAME[0][i] === 'X' || GAME[0][i] === 'O') {
            for (let j = 1; j < 3; j++) {
                if (GAME[j][i] !== GAME[0][i]) {
                    flag = false;
                    break;
                }
            }
            if (flag) return true;
        }
    }
    // DIAGONAL CHECK
    if ((GAME[0][0] === 'X' || GAME[0][0] === 'O') && (GAME[0][0] === GAME[1][1] && GAME[0][0] === GAME[2][2])) return true;
    if ((GAME[0][2] === 'X' || GAME[0][2] === 'O') && (GAME[0][2] === GAME[1][1] && GAME[0][2] === GAME[2][0])) return true;

    // DEFAULT
    return false;
}

function allFilled(){
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(GAME[i][j]==='')return false;
        }
    }
    return true;
}
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (!gameOver && box.innerHTML === '') {
            box.innerHTML = move[curr];
            let ID = box.id;
            let x = Math.floor((ID - 1) / 3);
            let y = ID - x * 3 - 1;
            GAME[x][y] = move[curr];
            
            if (check()) { // Call the check function correctly
                popup.style.display = 'flex';
                grid.classList.add('dim'); // Remove the dot before dim
                wintext.innerHTML = `${move[curr]} wins`;
                gameOver=true;
            }
            else if(allFilled()){ //DRAW
                popup.style.display = 'flex';
                grid.classList.add('dim');
                wintext.innerHTML = 'DRAW';
                gameOver=true;
            }
            curr = (curr ^ 1);
        }
    });
});

restart.addEventListener('click', () => {
    curr=0;
    gameOver=false;
    GAME = [['', '', ''], ['', '', ''], ['', '', '']];
    boxes.forEach((box) => {
        box.innerHTML = '';
    });
    popup.style.display = 'none';
    grid.classList.remove('dim'); // Remove the dot before dim
    wintext.innerHTML = '';
});
