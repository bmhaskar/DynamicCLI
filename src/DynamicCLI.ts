/**
 * Created by bharatm on 18/06/16.
 */

import * as path from 'path';
const vorpal = require('vorpal');
const vorpalLog = require('vorpal-log');

import {loadCommands, vorpalCommandConfigInterface, addCommandsToVorpal} from './commands/commands';

export interface cliPropsExtensionsInterface {
    [index:string]:{"extFunc":Function, options:Object}
}
export interface cliPropsInterface {
    cliName?:string;
    pathToCommandFiles?:string;
    extensions?:cliPropsExtensionsInterface;
}
class DynamicCLI {
    vorpal:any;
    commandConfigCollection:Array<vorpalCommandConfigInterface>;
    defalts = {
        cliName: "",
        pathToCommandFiles: path.resolve('.', 'src', 'commands')
    } as cliPropsInterface;

    cliOptions:cliPropsInterface;
    logger:any;
    constructor(options:cliPropsInterface) {

        this.cliOptions = Object.assign(this.defalts, options);
        this.initialiseVorpal();
        this.addExtensionsToVorpal();

    }

    public start() {
        let _self = this;
        _self.loadCommands()
            .then(() => {
                _self.addCommandsToVorpal();
            })
            .then(() => {
                _self.vorpal.show();
            })
    }

    private initialiseVorpal() {
        this.vorpal = vorpal().use(vorpalLog);
        this.logger = vorpal.logger;
        this.vorpal.delimiter(this.cliOptions.cliName + '$');
    }

    private addExtensionsToVorpal() {
        let _self = this;

        Object.keys(this.cliOptions.extensions).map((extension) => {
            let extensionFunc = this.cliOptions.extensions[extension].extFunc;
            let extensionOptions = this.cliOptions.extensions[extension].options;
            _self.vorpal.use(extensionFunc, extensionOptions);
        })
    }

    private addCommandsToVorpal() {
        addCommandsToVorpal(this.vorpal, this.commandConfigCollection);
    }

    private loadCommands():Promise<void> {
        let _self = this;
        return loadCommands(this.cliOptions.pathToCommandFiles)
            .then((commands:Array<vorpalCommandConfigInterface>) => {
                _self.commandConfigCollection = commands;
            })
    }

};

export default DynamicCLI;