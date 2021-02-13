import { h } from 'preact';
import style from './style.css';

const Cell = (props) => (
  <div
    class={`${style.cell} ${props.active ? style.active : ''}`}
    onClick={props.onClick}
  ></div>
);

export default Cell;
