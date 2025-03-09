import clsx from "clsx"
import { UICardsList } from "../../ui/ui-cards-list"
import { sortPerks } from "../../perks-functions"
import { CARD_TYPE_PERK } from "../../constants"

export function _PageEqStItemsSelector({className, active, onClick, listToPrint, listType=CARD_TYPE_PERK}){
    return (
        <div className={clsx("page-eq-st-items-selector", className)} 
            data-active={active} 
            onClick={onClick}
        >
            <UICardsList array={sortPerks(listToPrint)} type={listType} isOneRow/>
        </div>
    )
}