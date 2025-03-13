import { CARD_TYPE_ITEM, CARD_TYPE_MOVE, CARD_TYPE_NONE, CARD_TYPE_PERK, CARD_TYPE_WITHOUT_SET_ITEM, FRACTION_DYNASTY, FRACTION_HERALDS, FRACTION_LEGION, RARITY_COMMON, RARITY_EPIC, RARITY_LEGENDARY, RARITY_RARE, RARITY_UNIQUE, RIGHT_TOP_ICON_TYPE_SHADOW_ABILITY, RIGHT_TOP_ICON_TYPE_SLOT, SLOT_ARMOR, SLOT_HELM, SLOT_RANGED, SLOT_WEAPON } from "../constants";
import { superRandomKey } from "../super-random-key";

export function UICard({name, rarity, type, fraction, icon, cardId, slot, shadowAbility, additionalShadowAbilities, isUnavailable, onClick, isCalculate}){
    let klas = "card " + rarity;

    let isShowSlotIcon = !shadowAbility && !([CARD_TYPE_ITEM, CARD_TYPE_WITHOUT_SET_ITEM].includes(type) && rarity === RARITY_COMMON) && !isUnavailable
    return (
        <div className="card-wrapper" onClick={onClick}>
            <div alt={name} title={name} className={klas} data-card-id={cardId} data-card-type={type} data-card-slot={slot} data-card-item-unavailable={isUnavailable} data-card-rarity={rarity} data-card-fraction={fraction}>
                <img className="card--bg" src="img_webp/card_bg.webp"/>
                <CardOutline type={type} rarity={rarity} isUnavailable={isUnavailable}/>
                <div className="card--card-icon-container"> 
                    <CardIcon type={type} icon={icon}/>
                </div>
                <FractionIcon fraction={fraction}/>
                <div className="card--right-top-icons-list">
                    {(isShowSlotIcon) ? <CardSlotIcon slot={slot}/> : null}
                    {(isCalculate) ?  <img  className="card-right-top-icon" src="img_webp/calculator1.webp" /> : null}
                    <CardShadowAbilityIcon ability={shadowAbility}/>
                    <CardAdditionalShadowAbilitiesIcons additionalShadowAbilities={additionalShadowAbilities}/>
                </div>
            </div>
        </div>
    )
}
//

function CardOutline({type, rarity, isUnavailable}){
    let path = "img_webp/card_outline";
    // console.log(rarity, type);
    switch(type){
        case CARD_TYPE_PERK:
            path += "_perk"
        break;
        case CARD_TYPE_MOVE:
            path += "_move";
        break;
        case CARD_TYPE_ITEM:
            path += "_item";
        break;
        case CARD_TYPE_NONE:
            path += "_";
        break;
        default:
            path += "_";
        break;
    }
    if (isUnavailable){
        path += "_unavailable.webp"
        return <img className="card--outline" src={path}/>
    }
    switch(rarity){
        case RARITY_UNIQUE:
            if (type === CARD_TYPE_ITEM || type === CARD_TYPE_ITEM) 
                path += "_unique";
            else
                path += "";
        break;
        case RARITY_LEGENDARY:
            path += "_legendary";
        break;
        case RARITY_EPIC:
            path += "_epic";
        break;
        case RARITY_RARE:
            path += "_rare";
        break;
        case RARITY_COMMON:
            path += "_common";
        break;
    }

    path += ".webp";

    return <img className="card--outline" src={path}/>
}

function FractionIcon({fraction}){
    let path = "";

    switch(fraction){
        case FRACTION_LEGION:
            path = "img_webp/legion.webp";
        break;
        case FRACTION_DYNASTY:
            path = "img_webp/dynasty.webp";
        break;
        case FRACTION_HERALDS:
            path = "img_webp/heralds.webp";
        break;
    }

    if (fraction && path)
        return <img className="card--fraction" src={path}/>;
    return "";
}


function CardIcon ({type, icon}){
    let className = "card--icon ";
    if (type === CARD_TYPE_ITEM || type === CARD_TYPE_NONE)
        className += "card--icon-item";
    else if (type === CARD_TYPE_MOVE)
        className += "card--icon-move"
    else if (type === CARD_TYPE_PERK)
        className += "card--icon-perk"
    if (icon)
        return <img className={className} src={icon}/>
    return null;
}


function CardSlotIcon({slot=null, text=null}){
    let path = null;
    switch (slot){
        case SLOT_HELM:
            path = "img_webp/helmet.webp" ;
        break;
        case SLOT_ARMOR:
            path = "img_webp/armor.webp";
        break;
        case SLOT_WEAPON:
            path = "img_webp/weapon.webp";
        break;
        case SLOT_RANGED:
            path = "img_webp/throw1.webp";
        break;
    }
    if (path)
        return <img className="card-right-top-icon card-slot-icon" data-icon-type={RIGHT_TOP_ICON_TYPE_SLOT} src={path}/>

    return null;
}



function CardShadowAbilityIcon({ability}){
    if (!ability) return null;
    return <img className="card-right-top-icon card-shadow-ability-icon" data-icon-type={RIGHT_TOP_ICON_TYPE_SHADOW_ABILITY} src={ability.icon}/>
}

function CardAdditionalShadowAbilitiesIcons({additionalShadowAbilities}){
    if (!additionalShadowAbilities) return null;
    let abilities = additionalShadowAbilities.map(
        (ability) => 
            <CardShadowAbilityIcon key={superRandomKey()} ability={ability} />
    );

    return (<>{abilities}</>);
}