import { h, Component } from 'preact';
import style from './style.css';

import Cell from '../cell';
import Separator from '../separator';
import { getSmallfuckInterpreter } from '../../interpreter';


class Interpreter extends Component {
  constructor() {
    super();
    this.interval = undefined;
    this.state = {
      interpreter: undefined,
      memoryState: [],
      program: "",
      automatic: false,
      steps: 0,
    };
  }

  // Lifecycle
  async componentDidMount() {
    const cleanProgram = this.props.program.replace(/[^\[\]*<>]/g, '');

    const Interpreter = await getSmallfuckInterpreter();
    const interpreter = new Interpreter(cleanProgram, this.props.memory);
    await interpreter.init();

    this.setState(state =>
      ({...state, memoryState: [...this.props.memory], interpreter: interpreter, program: cleanProgram})
    );
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  // Actions
  runOneStep = () => {
    const { interpreter } = this.state;

    if (interpreter.isRunning()) {
      interpreter.runStep();
      this.setState(state => ({...state, memoryState: interpreter.getState(), steps: state.steps + 1}));
    }
  }

  runHalts = () => {
    if (!this.interval) {
      this.setState(state => ({...state, automatic: true}));

      this.interval = setInterval(() => {
        const { interpreter } = this.state;

        if (!interpreter.isRunning()) {
          clearInterval(this.interval);
          this.interval = undefined;
        } else {
          this.runOneStep();
        }

      }, 1000 / 2);
    }
  }

  halted = () => {
    return this.state.interpreter && !this.state.interpreter.isRunning();
  }

  // Rendering
  render(props, state) {
    return (
      <div class={style.container}>
        <h1>Program</h1>
        <p>{ state.program }</p>
        <p class={style.label}>Memory:</p>
        <section class={style.memory}>
          { state.memoryState.map((alive, i) => (
            <Cell
              key={i}
              active={alive}
            />
          )) }
        </section>

        <Separator />

        { (state.interpreter && state.steps != 0) && (
            <p class="terminal-prompt">
              { this.halted() ? `Halted in ${state.steps} steps` : `Ran step ${state.steps}` }!
            </p>
        )}

        <div class={`btn-group ${style.group}`}>
          { (state.interpreter && !state.automatic) && (
            <div>
              <button class="btn btn-default btn-ghost" onClick={this.runOneStep}>Run 1 step</button>
              <button class="btn btn-default btn-ghost" onClick={this.runHalts}>Run until halts</button>
            </div>
          )}
          <button class="btn btn-error btn-ghost" onClick={props.unload}>Unload</button>
        </div>
      </div>
    );
  }
}

export default Interpreter;
