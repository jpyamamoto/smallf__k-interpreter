import { getFiles, setupPrecaching } from 'preact-cli/sw/';

setupPrecaching(getFiles());
