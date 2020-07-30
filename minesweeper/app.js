document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const flagsLeft = document.querySelector('#flags-left');
    const result = document.querySelector('#result');
    let width = 10;
    let bombAmount = 20;
    let flags = 0;
    let isGameOver = false;
    let squares = [];

    function toggleFlag(square) {
        if (isGameOver) return;
        if (!square.classList.contains('checked') && flags < bombAmount) {
            if (!square.classList.contains('flag')) {
                square.classList.add('flag');
                square.innerHTML = '🚩';
                flags++;
                flagsLeft.innerHTML = bombAmount - flags;
                checkForWin();
            } else {
                square.classList.remove('flag');
                square.innerHTML = '';
                flags--;
                flagsLeft.innerHTML = bombAmount - flags;
            }
        }
    }

    function gameOver(square) {
        result.innerHTML = 'Boom, Game Over!';
        isGameOver = true;

        squares.forEach((square) => {
            if (square.classList.contains('bomb')) {
                square.innerHTML = '💣';
            }
        });
    }

    function checkForWin() {
        let matches = 0;
        for (let index = 0; index < squares.length; index++) {
            if (squares[index].classList.contains('flag') && squares[index].classList.contains('bomb')) {
                matches++;
            }
        }
        if (matches === bombAmount) {
            result.innerHTML = 'YOU WIN!';
            isGameOver = true;
        }
    }

    function checkSquare(id) {
        const isLeftEdge = id % width === 0;
        const isRightEdge = id % width === width - 1;

        setTimeout(() => {
            if (id > 0 && !isLeftEdge) {
                const newId = squares[parseInt(id) - 1].id;
                //const newId = parseInt(id) - 1   ....refactor
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (id > 9 && !isRightEdge) {
                const newId = squares[parseInt(id) + 1 - width].id;
                //const newId = parseInt(id) +1 -width   ....refactor
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (id > 10) {
                const newId = squares[parseInt(id - width)].id;
                //const newId = parseInt(id) -width   ....refactor
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (id > 11 && !isLeftEdge) {
                const newId = squares[parseInt(id) - 1 - width].id;
                //const newId = parseInt(id) -1 -width   ....refactor
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (id < 98 && !isRightEdge) {
                const newId = squares[parseInt(id) + 1].id;
                //const newId = parseInt(id) +1   ....refactor
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (id < 90 && !isLeftEdge) {
                const newId = squares[parseInt(id) - 1 + width].id;
                //const newId = parseInt(id) -1 +width   ....refactor
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (id < 88 && !isRightEdge) {
                const newId = squares[parseInt(id) + 1 + width].id;
                //const newId = parseInt(id) +1 +width   ....refactor
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (id < 89) {
                const newId = squares[parseInt(id) + width].id;
                //const newId = parseInt(id) +width   ....refactor
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
        }, 10);
    }

    function click(square) {
        if (isGameOver) return;
        if (square.classList.contains('checked') || square.classList.contains('flag')) return;
        if (square.classList.contains('bomb')) {
            gameOver(square);
        } else {
            let total = square.getAttribute('total');
            if (total != 0) {
                square.classList.add('checked');
                if (total == 1) square.classList.add('one');
                if (total == 2) square.classList.add('two');
                if (total == 3) square.classList.add('three');
                if (total == 4) square.classList.add('four');
                square.innerHTML = total;
                return;
            }
            checkSquare(square.id);
        }
        square.classList.add('checked');
    }

    function createBoard() {
        flagsLeft.innerHTML = bombAmount;
        const bombArray = Array(bombAmount).fill('bomb');
        const emptyArray = Array(width * width - bombAmount).fill('valid');
        const gameArray = emptyArray.concat(bombArray);
        const shuffleArray = gameArray.sort(() => Math.random() - 0.5);

        for (let index = 0; index < width * width; index++) {
            const square = document.createElement('div');
            square.setAttribute('id', index);
            square.setAttribute('class', shuffleArray[index]);
            grid.appendChild(square);
            squares.push(square);

            square.addEventListener('click', function (e) {
                click(square);
            });

            square.addEventListener('contextmenu', function (e) {
                e.preventDefault();
                toggleFlag(square);
            });
        }

        for (let index = 0; index < squares.length; index++) {
            let total = 0;
            const isLeftEdge = index % width === 0;
            const isRightEdge = index % width === width - 1;

            if (squares[index].classList.contains('valid')) {
                if (index > 0 && !isLeftEdge && squares[index - 1].classList.contains('bomb')) total++;
                if (index > 9 && !isRightEdge && squares[index + 1 - width].classList.contains('bomb')) total++;
                if (index > 10 && squares[index - width].classList.contains('bomb')) total++;
                if (index > 11 && !isLeftEdge && squares[index - 1 - width].classList.contains('bomb')) total++;
                if (index < 98 && !isRightEdge && squares[index + 1].classList.contains('bomb')) total++;
                if (index < 90 && !isLeftEdge && squares[index - 1 + width].classList.contains('bomb')) total++;
                if (index < 88 && !isRightEdge && squares[index + 1 + width].classList.contains('bomb')) total++;
                if (index < 89 && squares[index + width].classList.contains('bomb')) total++;
                squares[index].setAttribute('total', total);
            }
        }
    }
    createBoard();
});
