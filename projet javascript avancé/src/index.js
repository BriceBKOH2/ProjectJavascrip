import { HearthstoneApi } from './scripts/api.js';
import { ClassType } from './model/class-type.js';
import { SetType } from './model/set-type.js';
import { getCards } from './scripts/get-all.js'

const hearthstoneApi = new HearthstoneApi();

hearthstoneApi.info().then((allInfo) => {
    
    getCards('Basic', 'Druid');

    // //Set
    // const allPromiseSets = allInfo.sets
    //     .map(n => new SetType(n))
    //     .map(setType => {
    //         return hearthstoneApi.set(setType.name).then((cards => {
    //             if (Array.isArray(cards)) {
    //                 setType.cards = cards;
    //             }
    //             return setType;
    //         }));
    //     });

    // Promise.all(allPromiseSets).then(results => console.log(results));

    // // Class
    // const allPromiseClasses = allInfo.classes
    //     .map(n => new ClassType(n))
    //     .map(classType => {
    //         return hearthstoneApi.classes(classType.name).then((cards => {
    //             if (Array.isArray(cards)) {
    //                 classType.cards = cards;
    //             }
    //             return classType;
    //         }));
    //     });

    // Promise.all(allPromiseClasses).then(results => console.log(results));

});
