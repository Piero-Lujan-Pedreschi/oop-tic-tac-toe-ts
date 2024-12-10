import { Cell } from "./cell";

export class Grid {
  gridItems: Cell[][] = [];
  private isGridFull: boolean;
  constructor(private size: number = 3) {
    this.gridItems = this.initializeGrid(size);
    this.isGridFull = false;
  }

  initializeGrid(size: number): Cell[][] {
    this.gridItems = [];
    for (let row: number = 0; row < size; row++) {
      this.gridItems[row] = [];
      for (let col: number = 0; col < size; col++) {
        this.gridItems[row][col] = new Cell();
      }
    }
    return this.gridItems;
  }

  checkFullGrid() {
    for (let row: number = 0; row < this.size; row++) {
      for (let col: number = 0; col < this.size; col++) {
        if (this.gridItems[row][col].isValid() === true) {
          this.isGridFull = false;
          return this.isGridFull;
        }
      }
    }
    this.isGridFull = true;
    return this.isGridFull;
  }

  printGrid(): void {
    console.log('\n');
    for (let row: number = 0; row < this.size; row++) {
      // Generate each row's text as `grid[row][col]`
      const rowText = this.gridItems[row]
        .map((_, col: number) => this.gridItems[row][col].value)
        .join(" | ");
      console.log(rowText);

      if (row < this.size - 1) {
        // Print a separator line between rows
        console.log("-".repeat(rowText.length));
      }
    }
    console.log("\n");
  }

  printDemoGrid(): void {
    for (let row: number = 0; row < this.size; row++) {
      // Generate each row's text as `grid[row][col]`
      const rowText = this.gridItems[row]
        .map((_, col: number) => `grid[${row}][${col}]`)
        .join(" | ");
      console.log(rowText);

      if (row < this.size - 1) {
        // Print a separator line between rows
        console.log("-".repeat(rowText.length));
      }
    }
  }
}

// let grid = new Grid();
// console.log(grid);
// grid.updateGrid();
// console.log(grid.checkFullGrid());

