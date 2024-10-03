$(document).ready(function() {
  let score = 0;
  const gridSize = 5; // 5x5 grid
  let playerPosition = { row: 1, col: 1 }; // Initial position of the game piece
  let targetPosition = generateRandomPosition(); // Random target position

  // Function to move the game piece on the grid
  function updateGamePiecePosition() {
    $('#game-piece').css({
      'grid-row': playerPosition.row,
      'grid-column': playerPosition.col
    });
  }

  // Function to move the target to a random grid cell
  function updateTargetPosition() {
    $('#target').css({
      'grid-row': targetPosition.row,
      'grid-column': targetPosition.col
    });
  }

  // Generate a random position within the 5x5 grid
  function generateRandomPosition() {
    let newPosition;

    do {
      newPosition = {
        row: Math.floor(Math.random() * gridSize) + 1,
        col: Math.floor(Math.random() * gridSize) + 1
      };
    } while (newPosition.row === playerPosition.row && newPosition.col === playerPosition.col); // Repeat if the position is the same as the player's

    return newPosition;
  }


  // Initial setup: position the game piece and target
  updateGamePiecePosition();
  updateTargetPosition();

  // Keydown event to move the game piece with arrow keys
  $(document).keydown(function(e) {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        if (playerPosition.row > 1) {
          playerPosition.row--;
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (playerPosition.row < gridSize) {
          playerPosition.row++;
        }
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (playerPosition.col > 1) {
          playerPosition.col--;
        }
        break;
      case "ArrowRight":
        e.preventDefault();
        if (playerPosition.col < gridSize) {
          playerPosition.col++;
        }
        break;
      default:
        return; // Exit if it's not an arrow key
    }

    // Update the game piece position on the grid
    updateGamePiecePosition();

    // Check if the player has reached the target
    if (playerPosition.row === targetPosition.row && playerPosition.col === targetPosition.col) {
      score++;
      $('#score').text('Score: ' + score);
      targetPosition = generateRandomPosition(); // Generate a new random target
      updateTargetPosition();
    }
  });

// Swipe detection
$('#game-board').on('touchstart', function(e) {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});

$('#game-board').on('touchend', function(e) {
  touchEndX = e.changedTouches[0].clientX;
  touchEndY = e.changedTouches[0].clientY;
  handleSwipe();
});

// Function to detect swipe direction and handle movement
function handleSwipe() {
  let deltaX = touchEndX - touchStartX;
  let deltaY = touchEndY - touchStartY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Horizontal swipe
    if (deltaX > 0) {
      handleMovement("ArrowRight");
    } else {
      handleMovement("ArrowLeft");
    }
  } else {
    // Vertical swipe
    if (deltaY > 0) {
      handleMovement("ArrowDown");
    } else {
      handleMovement("ArrowUp");
    }
  }
}

  // Reset button event
  $('#reset-btn').click(function() {
    playerPosition = { row: 1, col: 1 }; // Reset to top-left corner
    targetPosition = generateRandomPosition(); // New random target
    score = 0;
    $('#score').text('Score: ' + score);
    updateGamePiecePosition();
    updateTargetPosition();
  });
});
