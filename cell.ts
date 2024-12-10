export type CellValueType = `X` | "O" | null;
export class Cell {
  constructor(private cellValue: CellValueType = null) {}

  set value(value: CellValueType) {
    this.cellValue = value;
  }

  get value(): CellValueType {
    return this.cellValue;
  }

  isValid() {
    if(this.cellValue !== null) {
      return false;
    } 
    return true;
  }

  clearCell() {
    this.cellValue = null;
  }
}

let cell = new Cell();