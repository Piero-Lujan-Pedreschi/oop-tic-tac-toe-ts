import { Grid } from "./grid";
import { type CellValueType } from "./cell";
import * as readline from "readline";

export type Coordinate = [number, number];
export type CoordinateGroup = Coordinate[];

export class Game {
  private playerXCoords: CoordinateGroup;
  private playerOCoords: CoordinateGroup;
  private playerTurn: CellValueType;
  private winningCoordinates: CoordinateGroup[];
  private grid: Grid;
  private rl: readline.Interface;
  public inputRow: number | null;
  public inputCol: number | null;

  constructor() {
    this.playerXCoords = [];
    this.playerOCoords = [];
    this.playerTurn = "X";
    this.winningCoordinates = [
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
    this.grid = new Grid();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.inputRow = null;
    this.inputCol = null;
  }

  async play(): Promise<void> {
    this.displayIntro();
    for (let i = 0; i < 9; i++) {
      this.grid.printGrid();
      try {
        if (this.playerTurn === "X") {
          this.xTurn(...(await this.getInput()));
          if (this.checkWin(this.playerXCoords, this.winningCoordinates)) {
            this.displayWin('X');
            break;
          }
        } else if (this.playerTurn === "O") {
          this.oTurn(...await this.getInput());
          if (this.checkWin(this.playerOCoords, this.winningCoordinates)) {
            this.displayWin('O');
            break;
          }
        }
      } catch (error) {
        console.error("Invalid input.");
        i--;
      }
    }
    if (this.grid.isGridFull()) {
      this.displayTie();
    }

    this.rl.close();
  }

  async getInput(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      this.rl.question(
        `It is now ${this.playerTurn}'s turn.\n`,
        (answer: string) => {
          const [row, col] = answer.split(" ").map(Number);

          if (!isNaN(row) &&
              !isNaN(col) &&
              row >= 0 &&
              row <= 2 &&
              col >= 0 &&
              col <= 2) {
            resolve([row, col]); // Resolves when valid input is provided
          } else {
            reject(
              new Error(
                "Invalid input. Please enter two numbers separated by a space."
              )
            );
          }
        }
      );
    });
  }

  close(): void {
    this.rl.close(); // Explicitly close the readline interface
  }

  xTurn(row: number, col: number): void {
    if (this.grid.gridItems[row][col].isValid()) {
      this.grid.gridItems[row][col].value = "X";
      this.playerXCoords.push([row, col]);
      this.playerTurn = "O";
    } else {
      console.error("\nCell is already occupied. Please choose another location.");
    }
  }

  oTurn(row: number, col: number): void {
    if (this.grid.gridItems[row][col].isValid()) {
      this.grid.gridItems[row][col].value = "O";
      this.playerOCoords.push([row, col]);
      this.playerTurn = "X";
    } else {
      console.error(
        "\nCell is already occupied. Please choose another location."
      );
    }
  }

  checkWin(playerCoords: [number, number][], winCoords: [number, number][][]): boolean {
    return winCoords.some(win =>
      win.every(winCoord =>
        playerCoords.some(
          playerCoord =>
            playerCoord[0] === winCoord[0] && playerCoord[1] === winCoord[1]
        )
      )
    );
  }

  displayIntro() {
    console.log("A new Tic-Tac-Toe game has begun!\n");
    this.grid.printDemoGrid();
    console.log("\nAs the board seen above, each square has a 2 digits defining it's position. \n\nWhen it is your turn, enter your desired position as so --> 'row col'\n");
    console.log("-".repeat(process.stdout.columns));
  }

  displayWin(winner?: CellValueType): void {
    console.log("\x1b[32m", `\n${winner} has won the game!`);
  }

  displayTie(): void {
    console.log("\x1b[33m", "\nGame is a tie.");
  }
}
