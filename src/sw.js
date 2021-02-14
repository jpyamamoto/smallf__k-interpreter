import { getFiles, setupPrecaching, setupRouting } from 'preact-cli/sw/';

setupRouting();

const links = getFiles();
links.push({url: '/assets/wasm/optimized.wasm', revision: null});

setupPrecaching(links);
