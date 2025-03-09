import { FRACTION_DYNASTY, FRACTION_HERALDS, FRACTION_LEGION, RARITY_COMMON, RARITY_EPIC, RARITY_LEGENDARY, RARITY_RARE, RARITY_UNIQUE, SLOT_ARMOR, SLOT_HELM, SLOT_RANGED, SLOT_WEAPON } from "./constants";

function rarity_to_int(rarity) {
    switch (rarity) {
        case RARITY_UNIQUE:
            return 100;
        case RARITY_LEGENDARY:
            return 90;
        case RARITY_EPIC:
            return 80;
        case RARITY_RARE:
            return 70;
        case RARITY_COMMON:
            return 60;
        default:
            return 0;
    }
}

function fraction_to_int(fraction) {
    switch (fraction) {
        case FRACTION_LEGION:
            return 100;
        case FRACTION_DYNASTY:
            return 90;
        case FRACTION_HERALDS:
            return 80;
        default:
            return 0;
    }
}

function slot_to_int(slot) {
    switch (slot) {
        case SLOT_HELM:
            return 100;
        case SLOT_ARMOR:
            return 90;
        case SLOT_WEAPON:
            return 80;
        case SLOT_RANGED:
            return 70;
        default:
            return 0;
    }
}


export function sortItems(items){
    let copy = items.map((i) => {return {...i}});
    // якщо предмет unavailable то значення буде 0
    // інакше конвертується через функцію
    const sort_rule_rarity = (a,b) => (b.unavailable ? 0 : rarity_to_int(b.rarity)) - (a.unavailable ? 0 : rarity_to_int(a.rarity));
    const sort_rule_fraction = (a, b) => fraction_to_int(b.fraction) - fraction_to_int(a.fraction);
    const sort_rule_slot = (a, b) => slot_to_int(b.slot) - slot_to_int(a.slot);
    const sort_rule_unavailable = (a, b) => a.unavailable ? 1 : 0;
    
    copy.sort(sort_rule_slot)
    copy.sort(sort_rule_rarity)
    copy.sort(sort_rule_fraction)
    copy.sort(sort_rule_unavailable);

    return copy;
}

export function getItems(fraction, rarity, array, unavailable=false, withoutUnavailable=false){   
    fraction = fraction ?? "";
    rarity = rarity ?? "";

    if (unavailable){
        if (fraction === ""){
            return array.filter((i) => i.unavailable)
        }
        return array.filter((i) => i.fraction === fraction && i.unavailable);
    }

    let result = array;
    if ((fraction && rarity) )
        result = array.filter((p) => p.fraction === fraction && p.rarity === rarity)
    else if (fraction)
        result = array.filter((p) => p.fraction === fraction);
    else if (rarity)
        result = array.filter((p) => p.rarity === rarity);

    if(withoutUnavailable)
        result = result.filter((i) => !i.unavailable)
    
    return result
}


export function getItemById(id, array){
    return copyItems(array).find((item) => item.id === id);
}

export function getItemsByIds(ids, array){
    return copyItems(array).filter((item) => ids.includes(item.id));
}

export function getItemsWithoutIds(ids, array){
    return copyItems(array).filter((item) => !ids.includes(item.id));
}

export function getItemsBySlot(slot, array){
    return copyItems(array).filter((item) => item.slot === slot);
}

export function getItemsByFraction(fraction, array){
    return copyItems(array).filter((item) => item.fraction === fraction);
}

function copyItems(array){
    return array.map((i) => {return {...i}})
}


export function getItemWithoutUnavailable(array){
    return array.filter(i => !i.unavailable)
}

export function getItemsWithoutCommon(array) {
    return array.filter(i => i.rarity !== RARITY_COMMON)
}