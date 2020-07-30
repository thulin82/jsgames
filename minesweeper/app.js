document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let width = 10;
    let bombAmount = 20;
    let squares = [];

    function click(square) {
        console.log(square.getAttribute('id'));
    }

    function createBoard() {
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
