import { AsBind } from "as-bind";


const getWasmInstance = (async () => {
  const wasm = fetch("assets/wasm/optimized.wasm");

  return await AsBind.instantiate(wasm, {
    index: {
      consoleLog: message => {
        console.log(message);
      }
    }
  });
});

export const getSmallfuckInterpreter = async () => {
  const wasmInstance = await getWasmInstance();
  const { __newString, __newArray, __getArray, BoolArray_ID } = wasmInstance.exports;
  const Smallfuck = wasmInstance.unboundExports.Smallfuck;

  class SmallfuckInterpreter {
    interpreter;

    constructor(program, memory) {
      this.program = program;
      this.memory = memory;
    }

    async init() {
      const program = __newString(this.program);
      const memory = __newArray(BoolArray_ID, this.memory);

      this.interpreter = new Smallfuck(program, memory);
      await this.interpreter.init();
    }

    runStep() {
      this.interpreter.runStep();
    }

    getState() {
      return __getArray(this.interpreter.state()).map(val => !!val);
    }

    isRunning() {
      return this.interpreter.isRunning();
    }
  }

  return SmallfuckInterpreter;
}
