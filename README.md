# Dynamic CLI

This is a [vorpal](https://github.com/dthree/vorpal/) wrapper. 
It provides a way to dynamically configure your commands with the help of simple [yaml](http://yaml.org/) files.

It's main feature is to integration with the third party library functions, 
inside command executing function i.e. inside action.

Its work in progress, I am yet to integrate all possible vorpal options via YAML config. 
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
 

## TODO
- [ ]  Add how it works
- [ ]  Add tests
- [ ]  Add code coverage