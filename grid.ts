import { Cell } from "./cell";

export class Grid {
  gridItems: Cell[][] = [];
  constructor(private size: number = 3) {
    this.gridItems = this.initializeGrid(size);
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

  isGridFull(): boolean {
    for (let row: number = 0; row < this.size; row++) {
      for (let col: number = 0; col < this.size; col++) {
        if (this.gridItems[row][col].isValid() === true) {
          return false;
        }
      }
    }
    return true;
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
        .map((_, col: number) => `${row} ${col}`)
        .join(" | ");
      console.log(rowText);

      if (row < this.size - 1) {
        // Print a separator line between rows
        console.log("-".repeat(rowText.length));
      }
    }
  }
}
