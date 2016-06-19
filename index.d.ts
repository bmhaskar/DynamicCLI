
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


export interface cliPropsExtensionsInterface {
    [index: string]: {
        "extFunc": Function;
        options: Object;
    };
}
export interface cliPropsInterface {
    cliName?: string;
    pathToCommandFiles?: string;
    extensions?: cliPropsExtensionsInterface;
}
declare class DynamicCLI {
    vorpal: any;
    commandConfigCollection: Array<vorpalCommandConfigInterface>;
    defalts: cliPropsInterface;
    cliOptions: cliPropsInterface;
    logger: any;
    constructor(options: cliPropsInterface);
    start(): void;
    private initialiseVorpal();
    private addExtensionsToVorpal();
    private addCommandsToVorpal();
    private loadCommands();
}
export default DynamicCLI;
