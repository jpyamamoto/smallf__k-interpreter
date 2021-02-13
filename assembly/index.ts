enum COMMAND {
  MOVE_RIGHT,
  MOVE_LEFT,
  FLIP,
  JUMP_OPEN,
  JUMP_CLOSE,
  INVALID,
};

export class Smallfuck {
  memory: Array<bool>;
  program: Array<COMMAND>;
  input: string;
  private running: bool;

  pointerMemory: i32;
  pointerProgram: i32;

  constructor(input: string, initialState: Array<bool>) {
    this.memory = initialState;
    this.input = input;
    this.program = new Array<COMMAND>(input.length);
    this.running = true;

    this.pointerProgram = 0;
    this.pointerMemory = 0;
  }

  init(): void {
    for (let i = 0; i < this.input.length; i++) {
      this.program[i] = this.charToCommand(this.input.codePointAt(i));
    }
  }

  runStep(): void {
    if (this.pointerProgram >= this.program.length) {
      this.running = false;
      return;
    }

    if (this.pointerMemory < 0 || this.pointerMemory >= this.memory.length) {
      this.running = false;
      return;
    }

    switch (this.program[this.pointerProgram]) {
      case COMMAND.MOVE_RIGHT:
        this.moveRight();
        break;
      case COMMAND.MOVE_LEFT:
        this.moveLeft();
        break;
      case COMMAND.FLIP:
        this.flip();
        break;
      case COMMAND.JUMP_OPEN:
        this.jumpOpen();
        break;
      case COMMAND.JUMP_CLOSE:
        this.jumpClose();
        break;
      default:
        break;
    }
  }

  state(): bool[] {
    return this.memory;
  }

  isRunning(): bool {
    return this.running;
  }

  charToCommand(letter: i32) : COMMAND {
    switch (letter) {
      case ">".charCodeAt(0): return COMMAND.MOVE_RIGHT;
      case "<".charCodeAt(0): return COMMAND.MOVE_LEFT;
      case "*".charCodeAt(0): return COMMAND.FLIP;
      case "[".charCodeAt(0): return COMMAND.JUMP_OPEN;
      case "]".charCodeAt(0): return COMMAND.JUMP_CLOSE;
      default: return COMMAND.INVALID;
    }
  }

  moveRight(): void {
    this.pointerMemory++;
    this.pointerProgram++;
  }

  moveLeft(): void {
    this.pointerMemory--;
    this.pointerProgram++;
  }

  flip(): void {
    this.memory[this.pointerMemory] = !this.memory[this.pointerMemory];
    this.pointerProgram++;
  }

  jumpOpen(): void {
    if (this.memory[this.pointerMemory]) {
      this.pointerProgram++;
      return;
    }

    let position = this.pointerProgram + 1;
    let counter: i32 = 1;
    while (true) {
      if (position >= this.program.length || counter == 0) {
        break;
      }

      if (this.program[position] == COMMAND.JUMP_OPEN) {
        counter++;
      } else if (this.program[position] == COMMAND.JUMP_CLOSE) {
        counter--;
      }

      position++;
    }

    this.pointerProgram = position;
  }

  jumpClose(): void {
    let position = this.pointerProgram;
    let counter: i32 = 0;
    while (true) {
      if (position < 0) {
        break;
      }

      if (this.program[position] == COMMAND.JUMP_OPEN) {
        counter++;
      } else if (this.program[position] == COMMAND.JUMP_CLOSE) {
        counter--;
      }

      if (counter == 0) {
        break;
      }

      position--;
    }

    this.pointerProgram = position;
  }
}

export const BoolArray_ID = idof<Array<bool>>()
