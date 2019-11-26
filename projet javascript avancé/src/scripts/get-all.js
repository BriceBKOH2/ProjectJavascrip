import { SetType } from '../model/set-type.js';
import { ClassType } from '../model/class-type.js';
import { HearthstoneApi } from './api.js';

const hearthstoneApi = new HearthstoneApi();
function createAllPromiseFor(data, ConstructorType, apiCalled) {
  return data
    .map(n => new ConstructorType(n))
    .map(type => {
      return hearthstoneApi[apiCalled]([type.name]).then((cards => {
        type.cards = cards;
        return type;
      })).catch(() => {
        return type;
      });
    });
}

export function getAllSetAndClasses() {
  return hearthstoneApi.info().then((allInfo) => {
    return [allInfo.sets, allInfo.classes];
  }).then(([sets, classes]) => {
    const allPromiseSets = createAllPromiseFor(sets, SetType, 'set');
    const allPromiseClasses = createAllPromiseFor(classes, ClassType, 'classes');
    return [allPromiseSets, allPromiseClasses];
  }).then(([allPromiseForSets, allPromiseForClasses]) => {
    return [Promise.all(allPromiseForSets), Promise.all(allPromiseForClasses)];
  }).then((allPromise => {
    return Promise.all(allPromise);
  }));
}

// Get all the card that is the result of the intersection between a set and a class
export function getCards(setName, className) {
  return Promise.all([
    hearthstoneApi.set(setName),
    hearthstoneApi.classes(className)
  ]).then(([setsCards, classesCards]) => {
    let resultCards = intersection(setsCards, classesCards);
    console.log(resultCards);
    return resultCards;
  });
}

function intersection(arrayCard1, arrayCard2) {
  return arrayCard1.filter(card1 => arrayCard2.find(card2 => card2.cardId === card1.cardId));
}