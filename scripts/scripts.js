$(document).ready(function() {
  let score = 0;

  // Move the game piece with arrow keys
  $(document).keydown(function(e) {
    const gamePiece = $('#game-piece');
    const step = 10;
    let position = gamePiece.position();

    switch (e.key) {
      case "ArrowUp":
        if (position.top > 0) {
          gamePiece.css('top', position.top - step + 'px');
        }
        break;
      case "ArrowDown":
        if (position.top < $('#game-board').height() - gamePiece.height()) {
          gamePiece.css('top', position.top + step + 'px');
        }
        break;
      case "ArrowLeft":
        if (position.left > 0) {
          gamePiece.css('left', position.left - step + 'px');
        }
        break;
      case "ArrowRight":
        if (position.left < $('#game-board').width() - gamePiece.width()) {
          gamePiece.css('left', position.left + step + 'px');
        }
        break;
    }

    // Check if the game piece has reached the target (bottom right corner)
    if (position.left >= 250 && position.top >= 250) {
      score++;
      $('#score').text('Score: ' + score);
      alert('You scored! Resetting game...');
      resetGame();
    }
  });

  // Reset game function
  function resetGame() {
    $('#game-piece').css({ top: '0', left: '0' });
    score = 0;
    $('#score').text('Score: ' + score);
  }

  // Reset button event
  $('#reset-btn').click(function() {
    resetGame();
  });
});
