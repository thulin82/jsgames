document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let width = 10;
    let bombAmount = 20;
    let squares = [];

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
        }
    }
    createBoard();
});
