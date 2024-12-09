import { Grid } from "./grid";
import { type CellValueType } from "./cell";
import * as readline from "readline";

export type Coordinate = [number, number];
export type CoordinateGroup = Coordinate[];

export class Game {
  //   private winner: CellValueType;
  private playerXCoords: CoordinateGroup;
  private playerOCoords: CoordinateGroup;
  private playerTurn: CellValueType;
  private winCoordinates: CoordinateGroup[];
  private prompt: string;
  private grid: Grid;
  private rl: readline.Interface;
  public inputRow: number | null;
  public inputCol: number | null;

  constructor() {
    // this.winner = null;
    this.playerXCoords = [];
    this.playerOCoords = [];
    this.playerTurn = "X";
    this.winCoordinates = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];
    this.prompt = `It is now ${this.playerTurn}'s turn.\n`;
    this.grid = new Grid();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.inputRow = null;
    this.inputCol = null;
  }

  startGame() {
    console.log("A new Tic-Tac-Toe game has begun!\n");
    this.grid.printDemoGrid();
    console.log("\nAs the board seen above, each square has a 2 digits defining it's position. \nWhen it is your turn, enter your desired position as so --> 'row col'\n")
    for (let i = 0; i < 9; i++) {
      if (this.playerTurn === "X") {
        // this.getInput();
        (async () => {
          try {
            await this.getInput();
          } catch (err) {
            console.error("Invalid input.");
          } finally {
            this.close(); // Close the readline interface here
          }
        })();
        console.log('input received');
        this.xTurn();
        this.checkWin();
      }
      if (this.playerTurn === "O") {
        this.getInput();
        this.oTurn();
        this.checkWin();
      }
    }
    if (this.grid.checkFullGrid()) {
      this.displayTie();
    }
  }

  async getInput(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.rl.question(this.prompt, (answer: string) => {
        const [row, col] = answer.split(" ").map(Number);

        if (
          !isNaN(row) &&
          !isNaN(col) &&
          row >= 0 &&
          row <= 2 &&
          col >= 0 &&
          col <= 2
        ) {
          this.inputRow = row;
          this.inputCol = col;
          resolve(); // Resolves when valid input is provided
        } else {
          console.error(
            "Invalid input. Please enter two numbers separated by a space."
          );
          reject(new Error("Invalid input."));
        }
      });
    });
  }

  close() {
    this.rl.close(); // Explicitly close the readline interface
  }

  xTurn() {
    if (
      typeof this.inputRow === "number" &&
      typeof this.inputCol === "number"
    ) {
      if (this.grid.gridItems[this.inputRow][this.inputCol].isValid()) {
        this.grid.gridItems[this.inputRow][this.inputCol].value = "X";
        this.grid.printGrid();
        this.playerXCoords.push([this.inputRow, this.inputCol]);
        this.playerTurn = "O";
      }
    }
  }

  oTurn() {
    if (
      typeof this.inputRow === "number" &&
      typeof this.inputCol === "number"
    ) {
      if (this.grid.gridItems[this.inputRow][this.inputCol].isValid()) {
        this.grid.gridItems[this.inputRow][this.inputCol].value = "O";
        this.grid.printGrid();
        this.playerOCoords.push([this.inputRow, this.inputCol]);
        this.playerTurn = "X";
      }
    }
  }

  checkWin() {
    for (let i = 0; i < this.winCoordinates.length; i++) {
      if (this.winCoordinates[i] === this.playerXCoords.sort()) {
        this.displayWin("X");
        break;
      } else if (this.winCoordinates[i] === this.playerOCoords.sort()) {
        this.displayWin("O");
        break;
      }
    }
  }

  displayWin(winner?: CellValueType) {
    console.log(`${winner} has won the game!`);
  }

  displayTie() {
    console.log("Game is a tie.");
  }
}

let game = new Game();
// console.log(game);
// game.displayTie();
// game.displayWin();
game.startGame();