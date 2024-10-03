$(document).ready(function() {
  let score = 0;
  const step = 10;
  const gamePiece = $('#game-piece');
  const target = $('#target');
  const gameBoard = $('#game-board');

  // Function to randomly position the target
  function generateRandomPosition() {
    const maxLeft = gameBoard.width() - target.width();
    const maxTop = gameBoard.height() - target.height();
    
    const randomLeft = Math.floor(Math.random() * maxLeft);
    const randomTop = Math.floor(Math.random() * maxTop);

    target.css({ top: randomTop + 'px', left: randomLeft + 'px' });
  }

  // Initialize the game by generating the first target position
  generateRandomPosition();

  // Move the game piece with arrow keys
  $(document).keydown(function(e) {
    let position = gamePiece.position();

    switch (e.key) {
      case "ArrowUp":
        if (position.top > 0) {
          gamePiece.css('top', position.top - step + 'px');
        }
        break;
      case "ArrowDown":
        if (position.top < gameBoard.height() - gamePiece.height()) {
          gamePiece.css('top', position.top + step + 'px');
        }
        break;
      case "ArrowLeft":
        if (position.left > 0) {
          gamePiece.css('left', position.left - step + 'px');
        }
        break;
      case "ArrowRight":
        if (position.left < gameBoard.width() - gamePiece.width()) {
          gamePiece.css('left', position.left + step + 'px');
        }
        break;
    }

    // Check if the game piece has reached the target
    if (isCollision(gamePiece, target)) {
      score++;
      $('#score').text('Score: ' + score);
      alert('You scored! A new target has been generated.');
      generateRandomPosition(); // Generate a new random target
    }
  });

  // Collision detection between game piece and target
  function isCollision($div1, $div2) {
    const d1Offset = $div1.offset();
    const d2Offset = $div2.offset();
    
    return !(
      ((d1Offset.top + $div1.height()) < d2Offset.top) ||
      (d1Offset.top > (d2Offset.top + $div2.height())) ||
      ((d1Offset.left + $div1.width()) < d2Offset.left) ||
      (d1Offset.left > (d2Offset.left + $div2.width()))
    );
  }

  // Reset button event
  $('#reset-btn').click(function() {
    gamePiece.css({ top: '0', left: '0' });
    score = 0;
    $('#score').text('Score: ' + score);
    generateRandomPosition(); // Generate a new random target
  });
});
