import * as hello from 'hellojs/dist/hello';

(window as any).hello = hello;
require('hellojs/src/modules/facebook');
require('hellojs/src/modules/google');

export default hello;
