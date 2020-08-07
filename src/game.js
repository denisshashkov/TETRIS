export default class Game {
  static points = {
    '1': 40,
    '2': 100,
    '3': 300,
    '4': 1200
  }

  score = 0;
  lines = 0;

  playfield = this.createPlayfield();
  activePiece = this.createPiece();
  nextPiece = this.createPiece();


  //Метод увелечения уровня
  get level() {
    return Math.floor(this.lines * 0.1);
  }


  //Создадим метод который возвращает состояние игрового поля
  getState() {
    //Получим копию игрового поля
    const playfield = this.createPlayfield();
    const {
      y: pieceY,
      x: pieceX,
      blocks
    } = this.activePiece;

    for (let y = 0; y < this.playfield.length; y++) {
      playfield[y] = [];

      for (let x = 0; x < this.playfield[y].length; x++) {
        playfield[y][x] = this.playfield[y][x];
      }
    }

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (blocks[y][x]) {
          playfield[pieceY + y][
            pieceX + x
          ] = blocks[y][x];
        }
      }
    }
    return {
      playfield,
    };
  }

  //Метод создания поля
  createPlayfield() {
    const playfield = [];
    for (let y = 0; y < 20; y++) {
      playfield[y] = [];

      for (let x = 0; x < 10; x++) {
        playfield[y][x] = 0;
      }
    }
    return playfield;
  }

  //Метод создания фигуры
  createPiece() {
    const index = Math.floor(Math.random() * 7); // Семь фигур тетриса
    const type = 'IJLOSTZ' [index]; // Каждая буква означает определенную фигуру
    const piece = {

    };

    switch (type) {
      case 'I':
        piece.blocks = [
          [0, 0, 0, 0],
          [1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ];
        break;
      case 'J':
        piece.blocks = [
          [0, 0, 0],
          [2, 2, 2],
          [0, 0, 2]

        ];
        break;
      case 'L':
        piece.blocks = [
          [0, 0, 0],
          [3, 3, 3],
          [3, 0, 0]

        ];
        break;
      case 'O':
        piece.blocks = [
          [0, 0, 0, 0],
          [0, 4, 4, 0],
          [0, 4, 4, 0],
          [0, 0, 0, 0]
        ];
        break;
      case 'S':
        piece.blocks = [
          [0, 0, 0],
          [0, 5, 5],
          [5, 5, 0]
        ];
        break;
      case 'T':
        piece.blocks = [
          [0, 0, 0],
          [6, 6, 6],
          [0, 6, 0]
        ];
        break;
      case 'Z':
        piece.blocks = [
          [0, 0, 0],
          [7, 7, 0],
          [0, 7, 7]
        ];
        break;
      default:
        throw new Error('Неизвестный тип фигуры');
    }

    piece.x = Math.floor((10 - piece.blocks[0].length) / 2); //Из ширины поля вычитаем ширину фигуры и делим на 2, чтобы фигура появлялась по центру
    piece.y = -1;

    return piece;
  }

  //Метод движения фигуры влево
  movePieceLeft() {
    this.activePiece.x -= 1;

    if (this.hasCollision()) {
      this.activePiece.x += 1;
    }
  }
  //Метод движения фигуры вправо
  movePieceRight() {
    this.activePiece.x += 1;

    if (this.hasCollision()) {
      this.activePiece.x -= 1;
    }
  }
  //Метод движения фигуры вниз
  movePieceDown() {
    this.activePiece.y += 1;

    if (this.hasCollision()) {
      this.activePiece.y -= 1;
      this.lockPiece();
      const clearedLines = this.clearLines();
      this.updateScore(clearedLines);
      this.updatePieces();
    }
  }

  //Метод поворота фигуры
  rotatePiece() {
    const blocks = this.activePiece.blocks;
    const length = blocks.length;
    //Получим пустой массив состоящий из нулей
    const temp = [];
    for (let i = 0; i < length; i++) {
      temp[i] = new Array(length).fill(0);
    }
    //В пустой массив вставим значения ротации фигуры
    for (let y = 0; y < length; y++) {
      for (let x = 0; x < length; x++) {
        temp[x][y] = blocks[length - 1 - y][x];
      }
    }
    //Заменим значение blocks у объекта activePiece
    this.activePiece.blocks = temp;
    //При столкновении фигура не поворачивается
    if (this.hasCollision()) {
      this.activePiece.blocks = blocks;
    }
  }
  //Метод если часть фигуры окажется за пределами поля или наличие фигуры снизу
  hasCollision() {
    const {
      y: pieceY,
      x: pieceX,
      blocks
    } = this.activePiece;

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (
          blocks[y][x] &&
          //Проверка находится ли блок в пределах игрового поля
          (this.playfield[pieceY + y] === undefined ||
            this.playfield[pieceY + y][pieceX + x] === undefined ||
            //Проверка есть ли с низу другой блок
            this.playfield[pieceY + y][pieceX + x])
        ) {
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

  //Метод удаления линий
  clearLines() {
    const rows = 20; // 20 рядов
    const columns = 10; // 10 колонок
    let lines = [];

    for (let y = rows - 1; y >= 0; y--) {
      let numberOfBlocks = 0;

      for (let x = 0; x < columns; x++) {
        if (this.playfield[y][x]) {
          numberOfBlocks += 1;
        }

        if (numberOfBlocks === 0) {
          break;
        } else if (numberOfBlocks < columns) {
          continue;
        } else if (numberOfBlocks === columns) {
          lines.unshift(y);
        }

      }

    }

    for (let index of lines) {
      this.playfield.splice(index, 1);
      this.playfield.unshift(new Array(columns).fill(0));
    }

    return lines.length;
  }

  //Метод изменения счета
  updateScore(clearedLines) {
    if (clearedLines > 0) {
      this.score += Game.points[clearedLines] * (this.level + 1); // Влияние кол-ва удаленных линий на уровень игры
      this.lines += clearedLines;
    }
  }

  //Метод обновления фигуры
  updatePieces() {
    this.activePiece = this.nextPiece;
    this.nextPiece = this.createPiece();
  }
}