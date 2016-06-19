/**
 * Created by bharatm on 18/06/16.
 */

import * as yaml from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';

import {readDir} from '../utils/fileSystem';

export interface  autoCompleteInterface {
    T:{ data:() => Promise<Function> }  | { data:Function} | Array<string>
}

export interface commandInterface {
    commandString:string,
    description?:string,
}
export interface commandOptionsInterface {
    optionName:string,
    description?:string,
    autoComplete?:autoCompleteInterface
}
export interface optionInterface {

}
export interface vorpalCommandConfigInterface {
    command:commandInterface,
    action:(args:Object, cb?:Function) => void | Promise<void>,
    description?:string,
    alias?:string,
    autocomplete?:autoCompleteInterface,
    option?:commandOptionsInterface |  Array<commandOptionsInterface>,
    types?:Object,
    hidden?:boolean,
    parse?:(command:string, args:Object) => string,
    help?:(args:Object) => void
    validate?:(args:Object) => boolean | string,
    cancel?:() => void,
    use?:any;
}

export const loadCommands = function (commandFilesDirPath:string):Promise<Array<vorpalCommandConfigInterface>> {

    return readDir(commandFilesDirPath, /\.yml$/)
        .then((files:Array<string>) => {

            return files.map((filePath) => {

                return yaml.load(fs.readFileSync(filePath, 'utf-8'));
            })
        }).catch((err) => {
            throw Error("Could not load commands");
        })
};


export const addCommandsToVorpal = function (vorpal:any, commandConfigCollection:Array<vorpalCommandConfigInterface>) {

    commandConfigCollection.map((commandConfig:vorpalCommandConfigInterface) => {

        console.log(commandConfig);
        let vorpalCommand = vorpal.command(commandConfig.command);
        vorpalCommand.action(commandConfig.action);


        let commandConfigOptions:Array<string> = ["description", "alias", "types", "validate", "cancel", "parse"];

        commandConfigOptions.forEach((commandConfigOption:string) => {
            if (commandConfig.hasOwnProperty(commandConfigOption)) {
                vorpalCommand[commandConfigOption](commandConfig[commandConfigOption]);
            }
        })

    });
};
