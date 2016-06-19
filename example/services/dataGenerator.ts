/**
 * Created by bharatm on 19/06/16.
 */

export const dataGenerator = function(vorpal, options) {
    let generateData =  function (args: Object) {
        new Promise((resolve, reject) => {
            console.log("Called data generator",args);
            resolve();
        })
    };
    vorpal.generateData = generateData;
    return generateData;
};