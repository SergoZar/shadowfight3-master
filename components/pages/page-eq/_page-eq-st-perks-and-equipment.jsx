import clsx from "clsx";

import { CARD_PLACEHOLDER_TYPE_ITEM, CARD_TYPE_ITEM, CARD_TYPE_MOVE, CARD_TYPE_PERK, RARITY_COMMON, RARITY_EPIC, RARITY_RARE, SLOT_ARMOR, SLOT_HELM, SLOT_RANGED, SLOT_WEAPON } from "../../constants";
import { getPerksByIds } from "../../perks-functions";
import { UICardPlaceholder } from "../../ui/ui-card-placeholder";
import { superRandomKey } from "../../super-random-key";
import { getMoveById } from "../../moves-functions";
import { UICard } from "../../ui/ui-card";
import { getEquipmentItemByIdAndSlot } from "../../equipment-functions";

export function _PageEqStPerksAndEqipment({
    className, 
    perksLists, 
    handleAddPerkClick, 
    isBacgroundTransparent, 
    handleSetEquipmentItemClick, 
    handleSetSpecialMove, 
    handleRemovePerkClick,
    equipmentData,
    handleRemoveMoveClick,
    handleRemoveEqipmentItemClick
}){
    return (<div className={className}>
        <div className="page-eq-st-perks-and-eqipment" data-bg-transparent={isBacgroundTransparent}>
            <EquipmentRow 
                key={superRandomKey()} 
                className={"grid-area-a"} 
                handleRemovePerkClick={handleRemovePerkClick} 
                handleSetEquipmentItemClick={()=>{handleSetEquipmentItemClick(SLOT_HELM)}} 
                perksList={perksLists.helm} 
                handleAddPerkClick={()=> handleAddPerkClick(SLOT_HELM)} 
                slot={SLOT_HELM} 
                equipmentIdItem={equipmentData.equipmentIdHelm}
                handleRemoveMoveClick={()=>{handleRemoveMoveClick(SLOT_HELM)}}
                handleRemoveEqipmentItemClick={() => {handleRemoveEqipmentItemClick(SLOT_HELM)}}
            />
            <EquipmentRow 
                key={superRandomKey()} 
                className={"grid-area-b"} 
                handleRemovePerkClick={handleRemovePerkClick} 
                handleSetEquipmentItemClick={()=>{handleSetEquipmentItemClick(SLOT_ARMOR)}} 
                slot={SLOT_ARMOR} 
                handleSetSpecialMove={()=>{handleSetSpecialMove(SLOT_ARMOR)}} 
                perksList={perksLists.armor} 
                handleAddPerkClick={()=> handleAddPerkClick(SLOT_ARMOR)} 
                equipmentIdItem={equipmentData.equipmentIdArmor}
                specialMoveId={equipmentData.specialMoveIdArmor}
                handleRemoveMoveClick={()=>{handleRemoveMoveClick(SLOT_ARMOR)}}
                handleRemoveEqipmentItemClick={() => {handleRemoveEqipmentItemClick(SLOT_ARMOR)}}
            />
            <EquipmentRow 
                key={superRandomKey()} 
                className={"grid-area-c"} 
                handleRemovePerkClick={handleRemovePerkClick} 
                handleSetEquipmentItemClick={()=>{handleSetEquipmentItemClick(SLOT_WEAPON)}} 
                handleSetSpecialMove={()=>{handleSetSpecialMove(SLOT_WEAPON)}} 
                perksList={perksLists.weapon} 
                handleAddPerkClick={()=> handleAddPerkClick(SLOT_WEAPON)} 
                slot={SLOT_WEAPON} 
                equipmentIdItem={equipmentData.equipmentIdWeapon}
                specialMoveId={equipmentData.specialMoveIdWeapon}
                handleRemoveMoveClick={()=>{handleRemoveMoveClick(SLOT_WEAPON)}}
                handleRemoveEqipmentItemClick={() => {handleRemoveEqipmentItemClick(SLOT_WEAPON)}}
            />
            <EquipmentRow 
                key={superRandomKey()} 
                className={"grid-area-d"} 
                handleRemovePerkClick={handleRemovePerkClick} 
                handleSetEquipmentItemClick={()=>{handleSetEquipmentItemClick(SLOT_RANGED)}} 
                slot={SLOT_RANGED} 
                equipmentIdItem={equipmentData.equipmentIdRanged}
                handleRemoveMoveClick={()=>{handleRemoveMoveClick(SLOT_RANGED)}}
                handleRemoveEqipmentItemClick={() => {handleRemoveEqipmentItemClick(SLOT_RANGED)}}
            />
        </div>
    </div>)
}


function EquipmentRow({
    className, 
    slot, 
    perksList, 
    equipmentIdItem, 
    specialMoveId, 
    handleAddPerkClick, 
    handleSetEquipmentItemClick, 
    handleSetSpecialMove, 
    handleRemovePerkClick,
    handleRemoveMoveClick,
    handleRemoveEqipmentItemClick
}){
    const specialMoveSlot = () => {
        if (equipmentIdItem){
            let item = getEquipmentItemByIdAndSlot(equipmentIdItem, slot);
            if (item.rarity === RARITY_COMMON) return null;
        }
        if (slot === SLOT_ARMOR || slot === SLOT_WEAPON)
            return (
                <>
                    <button
                        className="equipment-row__perks-list__special-move"
                        onClick={(specialMoveId) ? handleRemoveMoveClick : handleSetSpecialMove} 
                        data-row-item={CARD_TYPE_MOVE}
                        data-special-move-id={specialMoveId}
                    >
                        <HexagonSpecialMoveIcon src={getMoveById(specialMoveId)?.icon}/>
                    </button>
                    <div className="equipment-row__perks-list__divider"></div>
                </>
            )
        return null
    }

    const generatePerksPlaceholderList = (count) => new Array(count).fill(0).map(() => 
        <button 
            className="equipment-row__perks-list__perk"
            data-row-item={CARD_TYPE_PERK}
            key={superRandomKey()}
            onClick={handleAddPerkClick}
        ></button>)
    
    const perksSlots = () => {
        let minus = 0;
        let minus_helm = 0;
        
        if (equipmentIdItem){
            let item = getEquipmentItemByIdAndSlot(equipmentIdItem, slot);
            if (item.rarity === RARITY_EPIC)
                minus = 1
            else if(item.rarity === RARITY_RARE){
                minus = 1
                minus_helm = 1
            }
            else if (item.rarity === RARITY_COMMON){
                minus = 2
                minus_helm = 1
            }
        }

        if (slot === SLOT_ARMOR || slot === SLOT_WEAPON){
            return generatePerksPlaceholderList(3 - minus - perksList.length)
        }
        else if (slot === SLOT_HELM)
            return generatePerksPlaceholderList(2 - minus_helm - perksList.length)
        return null
    };

    const generatePerksList = () => {
        if (!perksList) return null;
        let perks = getPerksByIds(perksList);
        return perks.map((perk) => <button 
            className={clsx("equipment-row__perks-list__perk", perk.rarity)}
            data-row-item={CARD_TYPE_PERK}
            data-perk-id={perk.id}
            data-perk-slot={perk.slot}
            data-perk-fraction={perk.fraction}
            data-perk-rarity={perk.rarity}
            onClick={()=>{handleRemovePerkClick(perk.id, perk.slot)}}
            key={superRandomKey()}
        >
             <RoundedPerkIcon src={perk.icon}/> 
        </button>);
    };

    const equipmentCard = () => {
		
        if (equipmentIdItem){
            let item = getEquipmentItemByIdAndSlot(equipmentIdItem, slot)
			if (item) 
				return <UICard
					key={superRandomKey()}
					name={item.name}
					type={CARD_TYPE_ITEM}
					rarity={item.rarity}
					fraction={item.fraction}
					icon={item.icon}
					cardId={item.id}
					// slot={item.slot}
					shadowAbility={item.shadow_ability}
					onClick={handleRemoveEqipmentItemClick}
				/>
        }
        return <UICardPlaceholder onClick={handleSetEquipmentItemClick} placeholderType={CARD_PLACEHOLDER_TYPE_ITEM}/>
    }
    return (
        <div data-row-slot={slot} className={clsx("equipment-row", className)}>
               {equipmentCard()}
               <div className="equipment-row__sub-list">
                    {specialMoveSlot()}
                    <div className="equipment-row__perks-list">
                        {generatePerksList()}
                        {perksSlots()}
                    </div>
               </div>
        </div>
    )
}



function RoundedPerkIcon({src}){
    return <img className="equipment-row__perk-icon" src={src} alt=""/>
}

function HexagonSpecialMoveIcon({src}){
    if (!src) return null;
    return <img className="equipment-row__move-icon" src={src} alt=""/>
    // return (
    //     <svg className="equipment-row__move-icon" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
    //         <clipPath id="hexClip">
    //             <polygon points="128,0 238,64 238,192 128,255 18,192 18,64 128,0" fill="green"/>
    //         </clipPath>
    //         <image href={src} height="256" width="256" fill="red" clip-path="url(#hexClip)" />
    //     </svg>
    // )
}
