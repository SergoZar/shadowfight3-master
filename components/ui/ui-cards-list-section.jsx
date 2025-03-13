import { UICard } from "./ui-card";
import {superRandomKey} from '../super-random-key.js';
import { DATA_MOVES } from "../data/data-moves.js";
import { DATA_PERKS } from "../data/data-perks.js";
import { CARD_TYPE_ITEM, CARD_TYPE_MOVE, CARD_TYPE_PERK, CARD_TYPE_SET_ITEMS, CARD_TYPE_WITHOUT_SET_ITEM, RIGHT_TOP_ICON_TYPE_SHADOW_ABILITY } from "../constants.js";

export function UICardsListSection({ array, type }) {
    if (array.length === 0) return null;
    let generateSection = (array) => {
        return <div key={superRandomKey()} className="cards-list--section">
            {array.map((item) => {
                switch (type){
                    case CARD_TYPE_SET_ITEMS:
                        return getSetCards(item);
                    break;
                    case CARD_TYPE_WITHOUT_SET_ITEM:
                        return getWithoutSetCards(item);
                    break;
                    case CARD_TYPE_ITEM:
                        return getWithoutSetCards(item);
                    break;
                    
                    default:
                        return getCard(item, type);
                }
            })}
        </div>;
    };

    return (
        <>{generateSection(array)}</>
    );
}


function detectCardType(item){
    if (DATA_MOVES.findIndex((i) => i.icon === item.icon) > -1){
        return CARD_TYPE_MOVE;
    }
    else if (DATA_PERKS.findIndex((i) => i.icon === item.icon) > -1){
        return CARD_TYPE_PERK;
    }
    else 
        return "";
}

function getCard(item, type){
    return (
        <UICard
            key={superRandomKey()}
            name={item.name}
            type={type}
            rarity={item.rarity}
            fraction={item.fraction}
            icon={item.icon}
            cardId={item.id}
            slot={item.slot} 
            isUnavailable={item.unavailable}
            isCalculate={!!item.bonuses}
        />
    )
}

function getSetCards(set){
    if (set.items === undefined){return null}
    return (
        <>
            <UICard
                key={superRandomKey()}
                name={set.name}
                type={CARD_TYPE_ITEM}
                rarity={set.rarity}
                fraction={set.fraction}
                icon={set.items.helm.icon}
                cardId={set.items.helm.id}
                shadowAbility={set.items.helm?.shadow_ability}  
                slot={set.items.helm?.slot}  
                additionalShadowAbilities={set.additional_shadow_abilities?.helm}
            />
            <UICard
                key={superRandomKey()}
                name={set.name}
                type={CARD_TYPE_ITEM}
                rarity={set.rarity}
                fraction={set.fraction}
                icon={set.items.armor.icon}
                cardId={set.items.armor.id}
                shadowAbility={set.items.armor?.shadow_ability}
                slot={set.items.armor?.slot}
                additionalShadowAbilities={set.additional_shadow_abilities?.armor} 
            />
            <UICard
                key={superRandomKey()}
                name={set.name}
                type={CARD_TYPE_ITEM}
                rarity={set.rarity}
                fraction={set.fraction}
                icon={set.items.weapon.icon}
                cardId={set.items.weapon.id}
                shadowAbility={set.items.weapon?.shadow_ability} 
                slot={set.items.weapon?.slot} 
                additionalShadowAbilities={set.additional_shadow_abilities?.weapon}
            />
            <UICard
                key={superRandomKey()}
                name={set.name}
                type={CARD_TYPE_ITEM}
                rarity={set.rarity}
                fraction={set.fraction}
                icon={set.items.ranged.icon}
                cardId={set.items.ranged.id}
                shadowAbility={set.items.ranged?.shadow_ability}
                slot={set.items.ranged?.slot}
                additionalShadowAbilities={set.additional_shadow_abilities?.ranged}

            />
            
        </>
    )
}


function getWithoutSetCards(card){
    // console.log(card);
    return (<UICard
                key={superRandomKey()}
                name={card.name}
                type={CARD_TYPE_ITEM}
                rarity={card.rarity}
                fraction={card.fraction}
                icon={card.icon}
                cardId={card.id}
                slot={card.slot}
                shadowAbility={card.shadow_ability}
                isUnavailable={card.unavailable}
            />)
}