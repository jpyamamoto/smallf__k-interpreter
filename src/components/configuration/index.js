import { h, Component } from 'preact';
import style from './style.css';

import Cell from '../cell';
import Separator from '../separator';

class Configuration extends Component {
  constructor() {
    super();
  }

  // Handlers
  inputProgram = (e) => {
    const { value } = e.target;
    this.props.programHandler(value);
  }

  inputNumberCells = (e) => {
    let { value } = e.target;
    value = Number.parseInt(value);

    const newCells = [...Array(Number.parseInt(value))]
        .fill(false)
        .map((_, i) => i < this.props.memory.length ? this.props.memory[i] : false);

    this.props.memoryHandler(newCells);
  }

  clickCell = (i) => {
    const newCells = [...this.props.memory];
    newCells[i] = !this.props.memory[i];

    this.props.memoryHandler(newCells);
  }

  resetMemory = () => {
    this.props.memoryHandler([...Array(this.props.memory.length)].fill(false));
  }

  // Rendering
  render(props, _) {
    return (
      <div class={style.home}>
        <h1 id="configuration">Configuration</h1>

        <fieldset>
          <div class="form-group">
            <label for="cells-input">Memory size: </label><br/>
            <input
              id="cells-input"
              name="cells-input"
              type="number"
              min="1"
              max="2147483648"
              value={props.memory.length}
              onInput={this.inputNumberCells}
              class={style.inputbox}
              required
            />
          </div>

          <div class="form-group">
            <label for="cells-input">Program: </label>
            <textarea
              id="program-input"
              rows="3"
              name="program-input"
              onInput={this.inputProgram}
              value={props.program}
            >{props.program}</textarea>
          </div>

          <p id="memory" class={style.label}>Initial State:</p>

          <section class={style.memory}>
            { props.memory.map((alive, i) => (
              <Cell
                key={i}
                active={alive}
                onClick={() => this.clickCell(i)}
              />
            )) }
          </section>

          <Separator />

          <button
            class={`btn btn-primary btn-ghost ${style.space}`}
            onClick={props.loadHandler}
          >Load</button>
          <button
            class={`btn btn-error btn-ghost ${style.space}`}
            onClick={this.resetMemory}
          >Reset Memory</button>
        </fieldset>
      </div>
    );
  }
}

export default Configuration;
