import { h, Component } from 'preact';

import Header from '../header';
import About from '../about';
import Configuration from '../configuration';
import Interpreter from '../interpreter';
import Separator from '../separator';


class App extends Component {
  constructor() {
    super();
    this.state = {
      program: "*[>*]" + "\nThe previous code sets all cells to 1 until you hit a cell already set to 1, or reach the end of memory.",
      memory: [...Array(64)].fill(false),
      loaded: false,
    };
  }

  // Handlers
  loadHandler = () => {
    this.setState({loaded: true, program: this.state.program, memory: this.state.memory});
  }

  programHandler = (value) => {
    this.setState(state => ({...state, program: value}));
  }

  memoryHandler = (value) => {
    this.setState(state => ({...state, memory: [...value]}));
  }

  unload = () => {
    this.setState(state => ({...state, loaded: false}));
  }

  // Rendering
  render(_, state) {
    return (
      <div id="app">
        <Header />

        { !state.loaded &&
          <Configuration
            loadHandler={this.loadHandler}
            program={state.program}
            memory={state.memory}
            programHandler={this.programHandler}
            memoryHandler={this.memoryHandler}
          />
        }
        { state.loaded &&
          <Interpreter
            program={state.program}
            memory={state.memory}
            unload={this.unload}
          />
        }

        <Separator />

        <About />
      </div>
    );
  }
}

export default App;
