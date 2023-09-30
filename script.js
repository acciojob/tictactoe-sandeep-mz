//your JS code here. If required.
document.addEventListener("DOMContentLoaded", function () {
    const player1Input = document.getElementById("player-1");
    const player2Input = document.getElementById("player-2");
    const submitButton = document.getElementById("submit");
    const board = document.getElementById("board");
    const message = document.querySelector(".message");

    let currentPlayer = "X";
    let player1Name = "";
    let player2Name = "";
    let gameOver = false;

    function initializeGame() {
        player1Name = player1Input.value || "Player 1";
        player2Name = player2Input.value || "Player 2";

        player1Input.disabled = true;
        player2Input.disabled = true;
        submitButton.disabled = true;

        message.textContent = `${player1Name}, you're up!`;
        createBoard();
    }

    function createBoard() {
        for (let i = 1; i <= 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = i;
            cell.addEventListener("click", () => handleCellClick(cell));
            board.appendChild(cell);
        }
    }

    function handleCellClick(cell) {
        if (!cell.textContent && !gameOver) {
            cell.textContent = currentPlayer;
            checkWin();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            message.textContent = currentPlayer === "X" ? `${player1Name}, you're up!` : `${player2Name}, you're up!`;
        }
    }

    function checkWin() {
        const cells = document.querySelectorAll(".cell");
        const winPatterns = [
            [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
            [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
            [1, 5, 9], [3, 5, 7] // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (cells[a - 1].textContent && cells[a - 1].textContent === cells[b - 1].textContent && cells[a - 1].textContent === cells[c - 1].textContent) {
                message.textContent = `${currentPlayer === "X" ? player1Name : player2Name}, congratulations you won!`;
                gameOver = true;
                return;
            }
        }
    }

    submitButton.addEventListener("click", initializeGame);
});
