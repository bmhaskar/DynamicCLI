

import  DynamicCLI from '../dist/index.js';
import {cliPropsInterface} from '../src/DynamicCLI';
import {dataGenerator} from './services/dataGenerator';

import * as path from 'path';

console.log(path.resolve(__dirname , 'example','commands'));
const simulatorOptions = <cliPropsInterface> {
    simulatorName: "dataSimulator",
    pathToCommandFiles: path.resolve(__dirname , 'commands'),
    extensions: {"dataGenerator": { "extFunc": dataGenerator, options: {name: "commentsGenerator"}}}
} ;

const dataSimulator = new DynamicCLI(simulatorOptions);


if(process && process.argv[2] == "start") {
    dataSimulator.start();
}
