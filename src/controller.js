export default class controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;
    this.intervalId = null;
    this.isPlaying = false;

    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));

    this.view.renderStartScreen();
  }

  update() {
    this.game.movePieceDown();
    this.updateView();
  }

  play() {
    this.isPlaying = true;
    this.startTimer();
    this.updateView();
  }

  pause() {
    this.isPlaying = false;
    this.stopTimer();
    this.updateView();
  }

  reset() {
    this.game.reset();
    this.play();
  }

  updateView() {
    const state = this.game.getState();

    if (state.isGameOver) {
      this.view.renderEndScreen(state);
    } else if (!this.isPlaying) {
      this.view.renderPauseScreen();
    } else {
      this.view.renderMainScreen(state);
    }

  }

  startTimer() {
    const speed = 1000 - this.game.getState().level * 100; //Уменьшаем setInterval на 100 м/с в зависимости от level
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.update();
      }, speed > 0 ? speed : 100); //Максимальная скорость 100 м/с
    }
  }

  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }


  handleKeyDown(event) {
    const state = this.game.getState();

    switch (event.keyCode) {
      case 13: // Enter
        if (state.isGameOver) {
          this.reset();
        } else if (this.isPlaying) {
          this.pause();
        } else {
          this.play();
        }
        break;
      case 37: // Left Arrow
        this.game.movePieceLeft();
        this.updateView();
        break;
      case 38: // Up Arrow
        this.game.rotatePiece();
        this.updateView();
        break;
      case 39: // Right Arrow
        this.game.movePieceRight();
        this.updateView();
        break;
      case 40: // Down Arrow
        this.stopTimer();
        this.game.movePieceDown();
        this.updateView();
        break;
    }
  }

  handleKeyUp(event) {
    switch (event.keyCode) {
      case 40: // Down Arrow
        this.startTimer();
        break;
    }
  }
}