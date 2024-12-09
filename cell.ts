export type CellValueType = `X` | "O" | null;
export class Cell {
  constructor(
    private cellValue: CellValueType = null,
    private isValidCell: boolean = true
  ) {}

  set value(value: CellValueType) {
    this.cellValue = value;
    this.isValidCell = false;
  }

  get value(): CellValueType {
    return this.cellValue;
  }

  isValid() {
    if(this.cellValue !== null) {
      this.isValidCell = false
    } else {
      this.isValidCell = true;
    }
    return this.isValidCell;
  }

  clearCell() {
    this.cellValue = null;
    this.isValidCell = true;
  }
}

let cell = new Cell();