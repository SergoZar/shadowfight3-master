import { CARD_PLACEHOLDER_TYPE_ITEM, CARD_PLACEHOLDER_TYPE_MOVE, CARD_PLACEHOLDER_TYPE_PERK } from "../constants"


export function UICardPlaceholder({onClick=null, placeholderType=CARD_PLACEHOLDER_TYPE_PERK}){
    let path = null;

    switch(placeholderType){
        case CARD_PLACEHOLDER_TYPE_PERK:
            path = "img_webp/placeholder-perk.webp";
            break;
        case CARD_PLACEHOLDER_TYPE_MOVE:
            path = "";
            break;
        case CARD_PLACEHOLDER_TYPE_ITEM:
            path = "img_webp/placeholder-item.webp";
            break;
    }

    return (
    <button className="card-placeholder" onClick={onClick}>
        <div className="card">
            <img className="card--bg" src={path}/>
        </div>
    </button>
    )
}