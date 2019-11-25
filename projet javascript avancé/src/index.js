import { HearthstoneApi } from './scripts/api.js';
import { ClassType } from "./model/class-type.js";
import { SetType } from "./model/set-type.js";

const hearthstoneApi = new HearthstoneApi();

hearthstoneApi.info().then((allInfo) => {
    // console.log(allInfo.sets);
    // console.log(allInfo.classes);

    // Set
    // sans promise
    // let listSetType = allInfo.sets.map(n => new SetType(n));
    // listSetType.forEach(setType => {
    //     hearthstoneApi.set(setType.name).then(cardSet =>
    //         setType.cards = cardSet)
    // });
    // console.log(listSetType);

    const allPromiseSets = allInfo.sets
        .map(n => new SetType(n))
        .map(setType => {
            return hearthstoneApi.set(setType.name).then((cards => {
                if (Array.isArray(cards)) {
                    setType.cards = cards;
                }
                return setType;
            }));
        });

    Promise.all(allPromiseSets).then(results => console.log(results));

    // Class
    // sans promise
    // let listClassType = allInfo.classes.map(n => new ClassType(n));
    // listClassType.forEach(classType => {
    //     hearthstoneApi.classes(classType.name).then(cardSet =>
    //         classType.cards = cardSet)
    // });
    // console.log(listClassType);

    const allPromiseClasses = allInfo.classes
        .map(n => new ClassType(n))
        .map(classType => {
            return hearthstoneApi.classes(classType.name).then((cards => {
                if (Array.isArray(cards)) {
                    classType.cards = cards;
                }
                return classType;
            }));
        });

    Promise.all(allPromiseClasses).then(results => console.log(results));

});
