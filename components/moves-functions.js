import { DATA_MOVES, DATA_MOVES_FOR } from "./data/data-moves";
import { getItemById, getItems, getItemsByFraction, sortItems } from "./universal-data-functions";


function moves_for_to_int(for_) {
    return (DATA_MOVES_FOR.findIndex((t) => t === for_) + 1) * 10 
}

export function sortMoves(moves) {
    return sortItems(moves.sort((a,b)=> moves_for_to_int(b.for) - moves_for_to_int(a.for)))
}

export function getMoves(fraction, rarity, array=null, unavailable=false, withoutUnavailable=false) {
    return getItems(fraction, rarity, array, unavailable, withoutUnavailable);
}

export function getMovesToArmor(for_=null) {
    if (for_)
        return DATA_MOVES.filter((m) => m.for.includes("armor") && m.fraction === for_.fraction)
    return DATA_MOVES.filter((m) => m.for.includes("armor"))
}

export function getMoveById(id){
    return getItemById(id, DATA_MOVES);
}

export function getMovesToWeapon(for_=null) {
    if (for_){
        return DATA_MOVES.filter((m) => {
            console.log(m, for_)
            if (typeof m.for === "string")
                return m.for === for_.weapon_type
            if (m.for?.[0]) 
                return m.for?.includes(for_.weapon_type)
            return []
        });
            
    }
    return DATA_MOVES.filter((m) => !m.for.includes("armor"))
}

export function getMovesByFraction(fraction, array=DATA_MOVES) {
    return getItemsByFraction(fraction, array)
}