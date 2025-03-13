import { _PageEqHeader } from "./_page-eq-header.jsx";
import { _PageEqStInfo } from "./_page-eq-st-info.jsx";

import { _PageEqStOnlyPerks } from "./_page-eq-st-onlyperks.jsx";
import { usePageEq } from "./use-page-eq.js";
import { _PageEqStPerksAndEqipment } from "./_page-eq-st-perks-and-equipment.jsx";
import { BUILD_TYPE_ONLY_PERKS } from "./_constants.js";
import { _PageEqStItemsSelector } from "./_page-eq-st-items-selector.jsx";

export function PageEq(){
    
    let {
        kodes, 
        selectFraction, 
        selectedFraction, 
        handleCheckBoxClick, 
        handleParseKodeClick, 
        active, 
        handleItemsSelectorOnclick, 
        listType,
        listToPrint, 
        equipmentData,
        perksLists, 
        handleRemovePerkClick, 
        handleRemoveMoveClick, 
        handleRemoveEqipmentItemClick,
        handleAddPerkClick, 
        isBacgroundTransparent, 
        selectBuildType,
        currentBuildType,
        handleSetEquipmentItemClick,
        handleSetSpecialMove,
        handleRecalculateDamages,
        damages
    } = usePageEq();        


    function getAreaB(){
        if (currentBuildType === BUILD_TYPE_ONLY_PERKS)
            return <_PageEqStOnlyPerks 
                    className="grid-area-b"
                    perksLists={perksLists}
                    handleRemovePerkClick={handleRemovePerkClick}
                    handleAddPerkClick={handleAddPerkClick}
                    isBacgroundTransparent={isBacgroundTransparent}
                />

        return <_PageEqStPerksAndEqipment 
                className="grid-area-b"
                perksLists={perksLists}
                handleAddPerkClick={handleAddPerkClick} 
                handleRemovePerkClick={handleRemovePerkClick}
                isBacgroundTransparent={isBacgroundTransparent}
                handleSetEquipmentItemClick={handleSetEquipmentItemClick}
                handleSetSpecialMove={handleSetSpecialMove}
                equipmentData={equipmentData}
                handleRemoveMoveClick={handleRemoveMoveClick} 
                handleRemoveEqipmentItemClick={handleRemoveEqipmentItemClick}
            />
    }


    return (

    <div className="page-eq-st-container">
        <_PageEqHeader 
            kodes={kodes}
            selectFraction={selectFraction}
            selectedFraction={selectedFraction}
            handleCheckBoxClick={handleCheckBoxClick}
            handleParseKodeClick={handleParseKodeClick}
            selectBuildType={selectBuildType}
            currentBuildType={currentBuildType}
        />
        <main className="container grid-test1">
            <_PageEqStItemsSelector
                className='grid-area-a'
                active={active}
                onClick={handleItemsSelectorOnclick} 
                listToPrint={listToPrint}
                listType={listType}
            />
            {getAreaB()}
            <_PageEqStInfo 
                className="grid-area-c"
                damages={damages}
                handleRecalculateDamages={handleRecalculateDamages}
            />
        </main>
    </div>
    )
}


