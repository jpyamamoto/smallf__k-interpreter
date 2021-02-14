import { h } from 'preact';

const About = () => (
  <div id="about">
    <h1 class="terminal-prompt">About</h1>

    <h2>Smallfuck</h2>

    <p>Smallfuck is a very simple programming language by Nikita Ayzikovsky.</p>
    <p>The following commands are available:</p>
    <ul>
      <li><code>&gt;</code>: To move the memory pointer to the right.</li>
      <li><code>&lt;</code>: To move the memory pointer to the left.</li>
      <li><code>*</code>: To flip the bit on the memory pointer's location.</li>
      <li><code>[</code>: To jump to the instruction after the matching <code>]</code>.</li>
      <li><code>]</code>: To jump to the matching <code>[</code>.</li>
    </ul>

    <p>If given an unbounded tape, it can be shown to be Turing complete by a reduction to Boolfuck or Brainfuck, which are both quite similar. For this example the tape is bounded however, and defined before execution.</p>
    <p>Given a syntactically acceptable program, if the program was to halt, it will only do so after going past the last command or when going outside the boundaries of the memory tape.</p>
    <p>If you want to know more about Smallfuck, visit <a href="https://esolangs.org/wiki/Smallfuck">Smallfuck on Esolang</a>.</p>

    <h2>Implementation</h2>
    <p>You may have already noticed that nothing but only the accepted commands are considered as part of the program. Feel free to add comments about your code.</p>
    <p>This interpreter was implemented using <a href="https://webassembly.org/">WebAssembly</a> through <a href="https://www.assemblyscript.org/">AssemblyScript</a>, with the help of the <a href="https://github.com/torch2424/as-bind">as-bind</a> library.</p>
    <p><i>A big shout-out to the AssemblyScript community on <a href="https://discord.gg/U63XU2J">Discord</a>! Thank you for all your help.</i></p>
    <p>The interface was made using <a href="https://preactjs.com/">PreactJS</a>, and the <a href="https://terminalcss.xyz/">Terminal CSS</a> framework.</p>

    <h2>Author</h2>
    <p>Hey there! I'm Juan Pablo Yamamoto, a computer scientist from Mexico City.</p>
    <p>If you would like to check out the source code of this project, head over to the <a href="https://github.com/JPYamamoto/smallf__k-interpreter">GitHub repository</a>.</p>
    <p>Also, you should check some of my other projects on <a href="https://github.com/JPYamamoto/">GitHub</a> as well, or my social networks:</p>
    <ul>
      <li><a href="https://www.instagram.com/no.compila/">Instagram</a></li>
      <li><a href="https://twitter.com/JPYamamoto9">Twitter</a></li>
      <li><a href="mailto:jpyamamoto@ciencias.unam.mx">Email</a></li>
      <li><a href="https://jpyamamoto.com/">Website</a></li>
    </ul>
  </div>
);

export default About;
