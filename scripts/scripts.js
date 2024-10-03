$(document).ready(function() {
  let score = 0;
  const gridSize = 5;  // 5x5 grid
  const cellSize = 50; // Each grid cell is 50x50 pixels
  let playerPosition = { row: 0, col: 0 }; // Initial position of the game piece
  let targetPosition = generateRandomPosition(); // Random target position

  // Function to move the game piece on the grid
  function updateGamePiecePosition() {
    $('#game-piece').css({
      top: playerPosition.row * cellSize + 'px',
      left: playerPosition.col * cellSize + 'px'
    });
  }

  // Function to move the target to a random grid cell
  function updateTargetPosition() {
    $('#target').css({
      top: targetPosition.row * cellSize + 'px',
      left: targetPosition.col * cellSize + 'px'
    });
  }

  // Generate a random position within the 5x5 grid
  function generateRandomPosition() {
    return {
      row: Math.floor(Math.random() * gridSize),
      col: Math.floor(Math.random() * gridSize)
    };
  }

  // Initial target position setup
  updateGamePiecePosition();
  updateTargetPosition();

  // Keydown event to move the game piece with arrow keys
  $(document).keydown(function(e) {
    switch (e.key) {
      case "ArrowUp":
        if (playerPosition.row > 0) {
          playerPosition.row--;
        }
        break;
      case "ArrowDown":
        if (playerPosition.row < gridSize - 1) {
          playerPosition.row++;
        }
        break;
      case "ArrowLeft":
        if (playerPosition.col > 0) {
          playerPosition.col--;
        }
        break;
      case "ArrowRight":
        if (playerPosition.col < gridSize - 1) {
          playerPosition.col++;
        }
        break;
    }

    // Update the game piece position on the board
    updateGamePiecePosition();

    // Check if the player has reached the target
    if (playerPosition.row === targetPosition.row && playerPosition.col === targetPosition.col) {
      score++;
      $('#score').text('Score: ' + score);
      alert('You scored! A new target has been generated.');
      targetPosition = generateRandomPosition(); // Generate a new random target
      updateTargetPosition();
    }
  });

  // Reset button event
  $('#reset-btn').click(function() {
    playerPosition = { row: 0, col: 0 }; // Reset to top-left corner
    targetPosition = generateRandomPosition(); // New random target
    score = 0;
    $('#score').text('Score: ' + score);
    updateGamePiecePosition();
    updateTargetPosition();
  });
});
