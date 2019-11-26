import {SetType} from '../class/set-type.js';
import {ClassType} from '../class/class-type.js';
import {HearthstoneApi} from './api.js';

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
