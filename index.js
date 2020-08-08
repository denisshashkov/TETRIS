import Game from './src/game.js';
import View from './src/view.js';

const root = document.querySelector('#root');

const game = new Game();

//width = 320px
//height = 640px
//row = 20
// columns = 10
const view = new View(root, 480, 640, 20, 10);


window.game = game;
window.view = view;

document.addEventListener('keydown', event => {
  switch (event.keyCode) {
    case 37: // Left Arrow
      game.movePieceLeft();
      view.render(game.getState());
      break;
    case 38: // Up Arrow
      game.rotatePiece();
      view.render(game.getState());
      break;
    case 39: // Right Arrow
      game.movePieceRight();
      view.render(game.getState());
      break;
    case 40: // Down Arrow
      game.movePieceDown();
      view.render(game.getState());
      break;
  }
});