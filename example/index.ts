

import  DynamicCLI from '../dist/index.js';
import {cliPropsInterface} from '../src/DynamicCLI';
import {dataGenerator} from './services/dataGenerator';

import * as path from 'path';

const simulatorOptions = <cliPropsInterface> {
    cliName: "dataSimulator",
    pathToCommandFiles: path.resolve(__dirname , 'commands'),
    extensions: {"dataGenerator": { "extFunc": dataGenerator, options: {name: "commentsGenerator"}}}
} ;

const dataSimulator = new DynamicCLI(simulatorOptions);



dataSimulator.start();

