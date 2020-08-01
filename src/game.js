export default class Game {
  score = 0;
  lines = 0;
  level = 0;
  //Создадим игровое поле
  playfield = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  //Зададим координаты фигуры
  activePiece = {
    x: 0,
    y: 0,
    blocks: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ]
  };

  //Метод движения фигуры влево
  movePieceLeft() {
    this.activePiece.x -= 1;

    if (this.isPieceOutOfBounds()) {
      this.activePiece.x += 1;
    }
  }
  //Метод движения фигуры вправо
  movePieceRight() {
    this.activePiece.x += 1;

    if (this.isPieceOutOfBounds()) {
      this.activePiece.x -= 1;
    }
  }
  //Метод движения фигуры вниз
  movePieceDown() {
    this.activePiece.y += 1;

    if (this.isPieceOutOfBounds()) {
      this.activePiece.y -= 1;
      this.lockPiece();
    }
  }
  //Если часть фигуры окажется за пределами поля или наличие фигуры снизу
  hasCollision() {
    const {
      y: pieceY,
      x: pieceX,
      blocks
    } = this.activePiece;

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (blocks[y][x] &&
          //Проверка находится ли блок в пределах игрового поля
          ((this.playfield[pieceY + y] === undefined || this.playfield[pieceY + y][pieceX + x] === undefined) ||
            //Проверка есть ли с низу другой блок
            this.playfield[pieceY + y][pieceX + x])) {
          return true;
        }

      }
    }
    return false;
  }
  //Перенесем значения из activePiece на игровое поле
  //используем этод метод если достигли края поля или другой фигуры
  lockPiece() {
    const {
      y: pieceY,
      x: pieceX,
      blocks
    } = this.activePiece;

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (blocks[y][x]) {
          this.playfield[pieceY + y][pieceX + x] = blocks[y][x];
        }
      }
    }
  }
}