import { h } from 'preact';
import style from './style.css';

const Header = () => (
  <header class={`terminal-nav header ${style.header}`}>
    <div class="terminal-logo">
      <div class="logo terminal-prompt"><a href="#" class="no-style">Smallfuck on the Browser</a></div>
    </div>
    <nav class="terminal-menu">
      <ul>
        <li><a class="menu-item" href="#about">About</a></li>
      </ul>
    </nav>
  </header>
);

export default Header;
