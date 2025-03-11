import { SLOT_ARMOR, SLOT_HELM, SLOT_RANGED, SLOT_WEAPON } from "./constants";
import { _WEAPONS, DATA_ARMORS, DATA_HELMS, DATA_RANGEDS, DATA_WEAPONS, DATA_WEAPONS_TYPES } from "./data/data-equipment-all-items";
import { getItemById, getItems, getItemsByFraction, sortItems } from "./universal-data-functions";


function copyEquipmentSets(sets) {
    return sets.map((s)=> ({...s, items: {...s.items}}));
}

export function sortEquipmentSets(sets){
    return sortItems(copyEquipmentSets(sets));
}

export function getEquipmentSets(fraction, rarity, array=null, unavailable=false, withoutUnavailable=false){
    return getItems(fraction, rarity, array, unavailable, withoutUnavailable);
}



function copyEquipmentItems(items) {
    return items.map((s)=> ({...s, items: {...s.items}}));
}

function weapon_type_to_int(type) {
    return (DATA_WEAPONS_TYPES.findIndex((t) => t === type) + 1) * 10
}

export function sortEquipmentItems(items){
    return sortItems(copyEquipmentItems(items).sort((a,b)=> weapon_type_to_int(b.weapon_type) - weapon_type_to_int(a.weapon_type)));
}

export function getEquipmentItems(fraction, rarity, array=null, unavailable=false, withoutUnavailable=false) {
    return getItems(fraction, rarity, array, unavailable, withoutUnavailable);
}

export function getEquipmentItemByIdAndSlot(id, slot) {
    let list = [];
    switch (slot) {
        case SLOT_HELM:
            list = DATA_HELMS;
        break;
        case SLOT_ARMOR:
            list = DATA_ARMORS;
        break;
        case SLOT_WEAPON:
            list = DATA_WEAPONS;
        break;
        case SLOT_RANGED:
            list = DATA_RANGEDS;
        break;
    }

    return getItemById(id, list);
}

export function getEquipmentItemsByMove(move){
    let list = [];
    switch (move.slot) {
        case SLOT_ARMOR:
            list = DATA_ARMORS.filter((a) => a.fraction === move.fraction);
        break;
        case SLOT_WEAPON:
            list = DATA_WEAPONS.filter((w) => {
                console.log(w, move)
                if (typeof move.for === "string")
                    return move.for === w.weapon_type
                if (move.for?.[0]) 
                    return move.for?.includes(w.weapon_type)
                return []
        });
        break;
    }
    return list;
}

export function getEquipmentItemsByFractionAndSlot(fraction,slot=null, array=[]) {
    let list = []
    switch (slot) {
        case SLOT_HELM:
            list = DATA_HELMS;
        break;
        case SLOT_ARMOR:
            list = DATA_ARMORS;
        break;
        case SLOT_WEAPON:
            list = DATA_WEAPONS;
        break;
        case SLOT_RANGED:
            list = DATA_RANGEDS;
        break;
        default:
            list = [].concat(DATA_HELMS, DATA_ARMORS, DATA_WEAPONS, DATA_RANGEDS)
    }
    return getItemsByFraction(fraction, array);
}

