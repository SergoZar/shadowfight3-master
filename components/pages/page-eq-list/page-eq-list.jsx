import { CARD_TYPE_ITEM, CARD_TYPE_MOVE, CARD_TYPE_NONE, CARD_TYPE_PERK, CARD_TYPE_SET_ITEMS, CARD_TYPE_WITHOUT_SET_ITEM, FRACTION_DYNASTY, FRACTION_HERALDS, FRACTION_LEGION, RARITY_COMMON, RARITY_EPIC, RARITY_LEGENDARY, RARITY_RARE, RARITY_UNIQUE, SLOT_ARMOR, SLOT_HELM, SLOT_RANGED, SLOT_WEAPON, UNAVAILABLE_ITEM } from "../../constants";
import { DATA_PERKS } from "../../data/data-perks";
import { getPerks, selectPerks, sortPerks } from "../../perks-functions";
import {useState} from 'react';
import { UIRadioSelector } from "../../ui/ui-radio-selector";
import { UICardsList } from "../../ui/ui-cards-list";
import {GetLocalisationString} from '../../language.jsx';
import { DATA_MOVES } from "../../data/data-moves.js";
import { getMoves, selectMoves, sortMoves } from "../../moves-functions.js";
import { DATA_EQUIPMENT } from "../../data/data-equipment.js";
import { getEquipmentItems, getEquipmentSets, selectEquipmentSets, sortEquipmentItems, sortEquipmentSets } from "../../equipment-functions.js";
import { _ARMORS, _HELMS, _RANGEDS, _WEAPONS } from "../../data/data-equipment-all-items.js";


export function PageEqList(){
    let sorted_perks = sortPerks(DATA_PERKS);
    let sorted_moves = sortMoves(DATA_MOVES);
    let sorted_sets = sortEquipmentSets(DATA_EQUIPMENT["sets"]);
    let sorted_without_set = sortEquipmentItems(DATA_EQUIPMENT["without_set"]);
    
    let [dataView, setDataView] = useState(()=>({
        fraction: null,
        rarity: null,
        unavailableItems: false,
        disableRaritiesIds: [0],
        cardType: CARD_TYPE_WITHOUT_SET_ITEM,
        listToPrint: sorted_without_set
    }));


    const selectFraction = (fraction) => {
        if (dataView.fraction === fraction)
            fraction = null;
        setDataView((last) => ({
            ...last,
            fraction: fraction,
            listToPrint: selectToPrint(last.cardType, fraction, last.rarity, last.unavailableItems)
        }));
    };

    const selectRarity = (rarity) => {
        if (dataView.rarity === rarity)
            rarity = null;
        setDataView((last) => ({
            ...last,
            rarity: rarity,
            unavailableItems: false,
            listToPrint: selectToPrint(last.cardType, last.fraction, rarity, false)
        }));
    };

    const selectUnavailable = ()=>{

        setDataView((last) => {

        return {
            ...last,
            unavailableItems: !last.unavailableItems,
            rarity: null,
            listToPrint: selectToPrint(last.cardType, last.fraction, null, !last.unavailableItems)
        }});
    }

    const selectCardType = (cardType) =>{
        if (dataView.cardType === cardType)
            cardType = null;
        setDataView((last) => {
                let disabled = getDisabledRarities(cardType);
                let rarity = (disabled.includes(last.rarity)) ? null : last.rarity;
                let unavailableItems = (disabled[0] === UNAVAILABLE_ITEM) ? false : last.unavailableItems;
                
                const disabled_to_ints = (disabled) => {
                    let rarities = [RARITY_UNIQUE, RARITY_LEGENDARY, RARITY_EPIC, RARITY_RARE, RARITY_COMMON, UNAVAILABLE_ITEM];
                    return disabled.map((d) => rarities.findIndex((r) => r === d));
                }

                disabled = disabled_to_ints(disabled);
                console.log("d", disabled)

                return {
                ...last,
                cardType: cardType,
                disableRaritiesIds: disabled,
                rarity: rarity, 
                unavailableItems: unavailableItems,
                listToPrint: selectToPrint(cardType, last.fraction, rarity, unavailableItems)
            }
        });
    };
    
    const getDisabledRarities = (cardType) => {
        let rarities = [];
        switch (cardType){
            case CARD_TYPE_PERK:
                rarities = [RARITY_UNIQUE, RARITY_COMMON];
                break;
            case CARD_TYPE_MOVE:
                rarities = [RARITY_UNIQUE, RARITY_LEGENDARY, RARITY_EPIC, RARITY_RARE ];
                break;
            case CARD_TYPE_SET_ITEMS:
                rarities = [UNAVAILABLE_ITEM];
                break;
            case CARD_TYPE_WITHOUT_SET_ITEM:
                rarities = [RARITY_UNIQUE];
                break;
        }
        return rarities
    }

    return (
    <div className="page-eq-st-container">
        <header>
            <nav>
                <UIRadioSelector 
                    texts={[
                        <GetLocalisationString text="Снаряжение без сетов"/>,
                        <GetLocalisationString text="Сеты"/>,
                        <GetLocalisationString text="Перки"/>,
                        <GetLocalisationString text="Спецприемы"/>,
                    ]} 
                    onClicks={[
                        ()=>{selectCardType(CARD_TYPE_WITHOUT_SET_ITEM)},
                        ()=>{selectCardType(CARD_TYPE_SET_ITEMS)},
                        ()=>{selectCardType(CARD_TYPE_PERK)},
                        ()=>{selectCardType(CARD_TYPE_MOVE)},
                    ]}
                    defaultActiveId={0}
                />
            </nav>
            <nav>
                <UIRadioSelector 
                    texts={[
                        <GetLocalisationString text="Легион"/>,
                        <GetLocalisationString text="Династия"/>,
                        <GetLocalisationString text="Вестники"/>
                    ]}
                    onClicks={[ 
                        ()=>{selectFraction(FRACTION_LEGION)}, 
                        ()=>{selectFraction(FRACTION_DYNASTY)},
                        ()=>{selectFraction(FRACTION_HERALDS)},
                    ]}
                />
            </nav>
            <nav>
                <UIRadioSelector 
                    texts={[
                        <GetLocalisationString text="Уникальное"/>,
                        <GetLocalisationString text="Легендарное"/>,
                        <GetLocalisationString text="Эпическое"/>,
                        <GetLocalisationString text="Редкое"/>,
                        <GetLocalisationString text="Обычное"/>,
                        <GetLocalisationString text="Не доступное"/>
                    ]}
                    onClicks={[
                        ()=>{selectRarity(RARITY_UNIQUE)},
                        ()=>{selectRarity(RARITY_LEGENDARY)},
                        ()=>{selectRarity(RARITY_EPIC)},
                        ()=>{selectRarity(RARITY_RARE)},
                        ()=>{selectRarity(RARITY_COMMON)},
                        ()=>{selectUnavailable()},
                    ]}
                    classesList={[
                        "text-unique", 
                        "text-legendary", 
                        "text-epic", 
                        "text-rare", 
                        "text-common",
                        "text-unavailable-item"
                    ]}
                    unavailableIds={dataView.disableRaritiesIds}
    
                />
            </nav>
        </header>
        <UICardsList array={dataView.listToPrint} type={dataView.cardType} isMultipleTypes={dataView.cardType === null}/>
    </div>
    )
}


function selectToPrint(cardType, fraction, rarity, isUnavailableItems=false) {
    let selected = [];
    switch (cardType) {
        case CARD_TYPE_PERK:
            selected = sortPerks(getPerks(fraction, rarity, DATA_PERKS, isUnavailableItems));
            break;
        case CARD_TYPE_MOVE:
            selected = sortMoves(getMoves(fraction, rarity, DATA_MOVES, isUnavailableItems));
            break;
        case CARD_TYPE_SET_ITEMS:
            selected = sortEquipmentSets(getEquipmentSets(fraction, rarity, DATA_EQUIPMENT["sets"]), isUnavailableItems);
            break;
        case CARD_TYPE_WITHOUT_SET_ITEM:
            selected = sortEquipmentItems(getEquipmentItems(fraction, rarity, DATA_EQUIPMENT["without_set"], isUnavailableItems));
            break;
        case null:
            selected = {
                [CARD_TYPE_PERK]: sortPerks(getPerks(fraction, rarity, DATA_PERKS, isUnavailableItems)),
                [CARD_TYPE_MOVE]: sortMoves(getMoves(fraction, rarity, DATA_MOVES, isUnavailableItems)),
                [CARD_TYPE_SET_ITEMS]: sortEquipmentSets(getEquipmentSets(fraction, rarity, DATA_EQUIPMENT["sets"], isUnavailableItems)),
                [CARD_TYPE_WITHOUT_SET_ITEM]: sortEquipmentSets(getEquipmentItems(fraction, rarity, DATA_EQUIPMENT["without_set"], isUnavailableItems))
            };
        break;
        default:
            selected = [];
    }
    return selected;
}
