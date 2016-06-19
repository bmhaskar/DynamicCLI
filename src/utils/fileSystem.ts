/**
 * Created by bharatm on 18/06/16.
 */

import * as fs from 'fs';
import * as path from 'path';

export const readDir = function (pathName:string, nameMathcer?: RegExp ):Promise<Array<string>> {
    return new Promise((resolve, reject) => {
        
        return isDir(pathName).then((isDirectory: boolean) => {
            
            if(!isDirectory) reject("Provided path "+ pathName+ " is not a directory.");
            
            fs.readdir(pathName, (err, fileBuffer) => {
                if (err) {
                    reject(err);
                }
                
                let fileNames = fileBuffer.toString().split(',').map((fileName: string) => {
                    if((nameMathcer && nameMathcer.test(fileName)) || !nameMathcer ) {
                        return path.join(pathName,fileName);
                    }
                }).filter((fileName:string) => fileName != undefined );

                resolve(fileNames);
            })
        }).catch(reject);

    });
}



export const isDir = function (pathName:string):Promise<boolean> {
    return new Promise((resolve, reject)=> {
        getStats(pathName).then((stats: fs.Stats) => {
            resolve(stats.isDirectory());
        }).catch(reject)
    })
};

export const getStats = function (pathName:string):Promise<fs.Stats> {
    return new Promise((resolve, reject) => {
        fs.stat(pathName, (err, stats)=> {
            if (err) {
                reject(err);
            }
            resolve(stats);
        });
    });
};