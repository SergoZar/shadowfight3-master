import { DATA_PERKS } from "./data/data-perks.js";
import { getItemById, getItems, getItemsByFraction, getItemsByIds, getItemsBySlot, getItemsWithoutIds, sortItems } from "./universal-data-functions.js";

export function sortPerks(perks){
    return sortItems(perks); 
}

export function getPerks(fraction, rarity, array=null, unavailable=false, withoutUnavailable=false){
    return getItems(fraction, rarity, array, unavailable, withoutUnavailable)
}


export function getPerkById(id){
    return getItemById(id, copyPerks(DATA_PERKS));
}

export function getPerksByIds(ids){
    return getItemsByIds(ids, copyPerks(DATA_PERKS));
}

export function getPerksWithoutIds(ids){
    return getItemsWithoutIds(ids, copyPerks(DATA_PERKS));
}

export function getPerksBySlot(slot, array){
    return getItemsBySlot(slot, copyPerks(array));
}

export function getPerksByFraction(fraction, array){
    return getItemsByFraction(fraction, copyPerks(array));
}

export function copyPerks(array){
    return array.map((i) => {return {...i}})
}

