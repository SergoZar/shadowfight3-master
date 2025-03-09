import { CARD_TYPE_MOVE, CARD_TYPE_PERK, CARD_TYPE_SET_ITEMS, CARD_TYPE_WITHOUT_SET_ITEM, FRACTION_DYNASTY, FRACTION_HERALDS, FRACTION_LEGION } from "../constants";
import { getEquipmentItems, getEquipmentSets, sortEquipmentSets } from "../equipment-functions";
import { getMoves } from "../moves-functions";
import { getPerks } from "../perks-functions";
import { superRandomKey } from "../super-random-key";
import { getItems } from "../universal-data-functions";
import { UICardsListSection } from "./ui-cards-list-section";

export function UICardsList({array, type, isOneRow=false, isMultipleTypes=false}){
    // console.log("type", type)
    if(isOneRow ){
        return <UICardsListSection array={array} type={type}/>
    }

    let sections = [];
    if (isMultipleTypes){
        sections = sections
                    .concat(getSectionsPerks(array[CARD_TYPE_PERK]))
                    .concat(getSectionsMoves(array[CARD_TYPE_MOVE]))
                    .concat(getSectionSetItems(array[CARD_TYPE_SET_ITEMS]))
                    .concat(getSectionsWithoutSetItems(array[CARD_TYPE_WITHOUT_SET_ITEM]));
    }
    else{
        if (type === CARD_TYPE_MOVE)
            sections = sections.concat(getSectionsMoves(array));
        else if (type === CARD_TYPE_PERK)
            sections = sections.concat(getSectionsPerks(array));
        else if (type === CARD_TYPE_SET_ITEMS)
            sections = sections.concat(getSectionSetItems(array));
        else if (type === CARD_TYPE_WITHOUT_SET_ITEM)
            sections = sections.concat(getSectionsWithoutSetItems(array))
        
    }
    return (
        <div className="cards-list">
            {sections}
        </div>
    )
}


function splitItemsByFractions(array, withoutUnavailable=false){
    return { 
        legion: getMoves(FRACTION_LEGION, "", array, false, withoutUnavailable),
        dynasty: getMoves(FRACTION_DYNASTY, "", array, false, withoutUnavailable),
        heralds: getMoves(FRACTION_HERALDS, "", array, false, withoutUnavailable),
        none: getMoves("", "", array, true)
    }
}


function getSectionsPerks(array){
    let {legion, dynasty, heralds, none} = splitItemsByFractions(array);

    return [
        <UICardsListSection key={superRandomKey()} array={legion}  type={CARD_TYPE_PERK}/>,
        <UICardsListSection key={superRandomKey()} array={dynasty} type={CARD_TYPE_PERK}/>,
        <UICardsListSection key={superRandomKey()} array={heralds} type={CARD_TYPE_PERK}/>,
        <UICardsListSection key={superRandomKey()} array={none}    type={CARD_TYPE_PERK}/>
    ];
}

function getSectionsMoves(array){
    let {legion, dynasty, heralds, none} = splitItemsByFractions(array, true);

    return [
        <UICardsListSection key={superRandomKey()} array={legion}  type={CARD_TYPE_MOVE}/>,
        <UICardsListSection key={superRandomKey()} array={dynasty} type={CARD_TYPE_MOVE}/>,
        <UICardsListSection key={superRandomKey()} array={heralds} type={CARD_TYPE_MOVE}/>,
        <UICardsListSection key={superRandomKey()} array={none}    type={CARD_TYPE_MOVE}/>
    ];
}


function getSectionsWithoutSetItems(array){
    let {legion, dynasty, heralds, _} = splitItemsByFractions(array);

    return [
        <UICardsListSection key={superRandomKey()} array={legion}  type={CARD_TYPE_WITHOUT_SET_ITEM}/>,
        <UICardsListSection key={superRandomKey()} array={dynasty} type={CARD_TYPE_WITHOUT_SET_ITEM}/>,
        <UICardsListSection key={superRandomKey()} array={heralds} type={CARD_TYPE_WITHOUT_SET_ITEM}/>,
    ];
}



function getSectionSetItems(array){
    let {legion, dynasty, heralds, _} = splitItemsByFractions(array);

    return [
        <UICardsListSection key={superRandomKey()} array={legion}  type={CARD_TYPE_SET_ITEMS}/>,
        <UICardsListSection key={superRandomKey()} array={dynasty} type={CARD_TYPE_SET_ITEMS}/>,
        <UICardsListSection key={superRandomKey()} array={heralds} type={CARD_TYPE_SET_ITEMS}/>,
    ];
}