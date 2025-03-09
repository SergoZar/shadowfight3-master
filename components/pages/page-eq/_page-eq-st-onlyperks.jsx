import { SLOT_ARMOR, SLOT_HELM, SLOT_WEAPON } from "../../constants";
import { getPerksByIds } from "../../perks-functions";
import { CARD_TYPE_PERK } from "../../constants";
import { superRandomKey } from "../../super-random-key";
import { UICard } from "../../ui/ui-card";
import { UICardPlaceholder } from "../../ui/ui-card-placeholder";

export function _PageEqStOnlyPerks({className, perksLists, handleRemovePerkClick, handleAddPerkClick, isBacgroundTransparent=false}){
    return (
        <div className={className}>
            <div className="page-eq-st__only-perks" data-bg-transparent={isBacgroundTransparent}>
                <CardsRow array={getPerksByIds(perksLists.helm)} handleRemovePerkClick={handleRemovePerkClick} maxCards={2} onClick={()=>{handleAddPerkClick(SLOT_HELM)}}  />
                <CardsRow array={getPerksByIds(perksLists.armor)} handleRemovePerkClick={handleRemovePerkClick} onClick={()=>{handleAddPerkClick(SLOT_ARMOR)}} />
                <CardsRow array={getPerksByIds(perksLists.weapon)} handleRemovePerkClick={handleRemovePerkClick} onClick={()=>{handleAddPerkClick(SLOT_WEAPON)}}/>
            </div>
        </div>
    )
}

export function CardsRow({ array = [], onClick = null, maxCards = 3, handleRemovePerkClick }) {
    let cards_count = 0;
    if (array.length < maxCards) {
        cards_count = maxCards - array.length;
    }
    const generatePlaceholder = () => {
        return <UICardPlaceholder key={superRandomKey()} onClick={onClick} />;
    };
    let cards = Array(cards_count).fill(null).map(() => generatePlaceholder());
    let a = array.map((item) => <UICard
        key={superRandomKey()}
        name={item.name}
        type={CARD_TYPE_PERK}
        rarity={item.rarity}
        fraction={item.fraction}
        icon={item.icon}
        cardId={item.id}
        slot={item.slot}
        onClick={() => {handleRemovePerkClick(item.id, item.slot)}}
     />);

    return (
        <div className="cards-row">
            {a}{cards}
        </div>
    );
}
