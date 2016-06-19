# Dynamic CLI

This is a [vorpal](https://github.com/dthree/vorpal/) wrapper. 
It provides a way to dynamically configure your commands with the help
of simple [yaml](http://yaml.org/) files.

It's main feature is to integration with the third party library functions, 
inside command executing function i.e. inside action.

Its work in progress, I am yet to integrate all possible vorpal options
via YAML config. 

## Installation

To install it via npm, mention it in package.json shown below
```json
 "dependencies": {
    "dynamic_cli_creator" : "git://github.com/bmhaskar/DynamicCLI.git#master"
  }
```

Import it via ES6 syntax like 
```javascript
import  DynamicCLI from 'dynamic_cli_creator';
```

## How to use

To create CLI, create an instance of imported class i.e. DynamicCLI with
 props having following interface 
 
```javascript
export interface cliPropsExtensionsInterface {
 [index:string]:{"extFunc":Function, options:Object}
}
export interface cliPropsInterface {
 cliName?:string;
 pathToCommandFiles?:string;
 extensions?:cliPropsExtensionsInterface;
}
```

For example 

```javascript

//I am using typescript in example, it does not restrict use of library 
//to typescript, it also can be used with ES6/ES5

const simulatorOptions = <cliPropsInterface> {
    cliName: "dataSimulator",
    pathToCommandFiles: path.resolve(__dirname , 'commands'),
    extensions: {"dataGenerator": { "extFunc": dataGenerator, options: {name: "commentsGenerator"}}}
} ;

const dataSimulator = new DynamicCLI(simulatorOptions);


```


For YAML command syntax checkout the `example/commands/command.yml` 
The interface of YAML config is as follows

```javascript
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
```
example for above is 
```yaml
command: 'foo <requiredArg> [optionalArg]'
option:
  optionName: "-v"
  description: "Option description"
description: 'Outputs "bar"'
alias: 'fooseball'
action: !!js/function >
          function (args, cb) {

            this.parent.generateData(args);
            console.log( 'Wow! JS-YAML Rocks!', args);

            cb();
          }
help: "This is a dummy command just logs arguments you passed."
cancel: !!js/function > 
          function() {
            console.log('Cancel function was called')
          }
```

`option` can be an array like 
```yaml
option: 
   - 
     optionName: "-o1"
     description: "Option1 description"
   - 
     optionName: "-o2"
     description: "Option2 description"
```
 
 
 
Use cases
---------
 This can be used when your porject need to do have Command Line 
 Interface and you dont want to recode stuff you already have you can
 use this library to create a CLI and integrate your existing code/functions. 
 
 This library helps in quick bootstrapping of CLI. No need of writting 
 the boilerplate for your commands, YAML configuration saves, writing 
 code and testing the same. 


## TODO
- [ ]  Add how it works
- [ ]  Create NPM package
- [ ]  Add tests
- [ ]  Add code coverage
