import { useEffect, useState } from "react";
import { CARD_TYPE_ITEM, CARD_TYPE_MOVE, CARD_TYPE_PERK, FRACTION_LEGION, SLOT_ARMOR, SLOT_HELM, SLOT_RANGED, SLOT_WEAPON } from "../../constants";
import { DATA_PERKS } from "../../data/data-perks";
import { getPerkById, getPerksByFraction, getPerksBySlot, getPerksWithoutIds, getPerks, sortPerks } from "../../perks-functions";
import { useCalculateDamage } from "./use-calculate-damage";
import { BUILD_TYPE_ONLY_PERKS, BUILD_TYPE_PERKS_AND_EQUIPMENT } from "./_constants";
import { DATA_ARMORS, DATA_HELMS, DATA_RANGEDS, DATA_WEAPONS } from "../../data/data-equipment-all-items";
import { getMoveById, getMovesToArmor, getMovesToWeapon } from "../../moves-functions";
import { getEquipmentItemByIdAndSlot, getEquipmentItemsByFractionAndSlot, getEquipmentItemsByMove } from "../../equipment-functions";
import { getItemsWithoutCommon, getItemWithoutUnavailable } from "../../universal-data-functions";
import { getLocalisationStringFunction } from "../../language";


export function usePageEq() {
    let [listToPrint, setListToPrint] = useState(() => getPerks(FRACTION_LEGION, null, sortPerks(DATA_PERKS)));

    let [perksLists, setPerksLists] = useState(() => ({
        helm: [],
        armor: [],
        weapon: [],
        all: []
    }));

    let [kodes, setKodes] = useState(() => ({
        kode: "",
        urlKode: ""
    }))

    let [equipmentData, setEquipmentData] = useState(() => ({
        specialMoveIdArmor: null,
        specialMoveIdWeapon: null,
        equipmentIdHelm: null,
        equipmentIdArmor: null,
        equipmentIdWeapon: null,
        equipmentIdRanged: null,
    }));

    let [active, setActive] = useState(false);
    let [selectedSlot, setSelectedSlot] = useState(SLOT_HELM);
    let [selectedFraction, setSelectedFraction] = useState(FRACTION_LEGION);
    let [listType, setListType] = useState(CARD_TYPE_PERK);

    const getPerksListAndSetterBySlot = (slot) => {
        let list_setter = {
            [SLOT_HELM]: [
                perksLists.helm, 
                function (arr) {
                    setPerksLists(l => ({ ...l, helm: arr }))
                }
            ],
            [SLOT_ARMOR]: [
                perksLists.armor, 
                function (arr) {
                    setPerksLists(l => ({ ...l, armor: arr }))
                }
            ],
            [SLOT_WEAPON]: [
                perksLists.weapon, 
                function (arr) {
                    setPerksLists(l => ({ ...l, weapon: arr }))
                }
            ],
        }
        return list_setter[slot];
    }

    const selectPerksListToPrint = (perksLists, slot, fraction = selectedFraction) => {
        let all_perks = getPerksWithoutIds(perksLists.all);
        if (!fraction)
            return getPerksBySlot(slot, all_perks);
        all_perks = getPerksByFraction(fraction, all_perks);
        return getPerksBySlot(slot, all_perks);
    }

    const itemsListActiveSwitcher= (slot, type)=>{
        if (slot !== selectedSlot || type !== listType)
            setActive(true);
        else
            setActive(!active);
    }

    const handleAddPerkClick = (slot) => {
        itemsListActiveSwitcher(slot, CARD_TYPE_PERK);
        setSelectedSlot(slot);
        setListType(CARD_TYPE_PERK);
        setListToPrint(selectPerksListToPrint(perksLists, slot));
    }

    const handleSetEquipmentItemClick = (slot) => {
        itemsListActiveSwitcher(slot, CARD_TYPE_ITEM);
        setSelectedSlot(slot);
        setListToPrintItems(slot);
    }

    const setListToPrintItems = (slot = selectedSlot, fraction = selectedFraction, id=false) => {
        let list = null;
        switch (slot) {
            case SLOT_HELM:
                list = DATA_HELMS;
                break;
            case SLOT_ARMOR:
                list = (equipmentData.specialMoveIdArmor && id !== null) ? getEquipmentItemsByMove(getMoveById(equipmentData.specialMoveIdArmor)) : DATA_ARMORS;
                if (equipmentData.specialMoveIdArmor)
                    list = getItemsWithoutCommon(list)
                break;
            case SLOT_WEAPON:
                list = (equipmentData.specialMoveIdWeapon && id !== null) ? getEquipmentItemsByMove(getMoveById(equipmentData.specialMoveIdWeapon)) : DATA_WEAPONS;
                if (equipmentData.specialMoveIdWeapon)
                    list = getItemsWithoutCommon(list)
                break;
            case SLOT_RANGED:
                list = DATA_RANGEDS;
                break;
        }
        setListType(CARD_TYPE_ITEM)
        if (fraction)
            list = getEquipmentItemsByFractionAndSlot(fraction, slot, list)
        setListToPrint(getItemWithoutUnavailable(list));
    }

    const handleSetSpecialMove = (slot) => {
        itemsListActiveSwitcher(slot, CARD_TYPE_MOVE);
        setListToPrintSpecialMoves(slot);
        setSelectedSlot(slot);
    }

    const setListToPrintSpecialMoves = (slot = selectedSlot, fraction = selectedFraction) => {
        let list = [];
        switch (slot) {
            case SLOT_ARMOR:
                list = getMovesToArmor(equipmentData.equipmentIdArmor ?  getEquipmentItemByIdAndSlot(equipmentData.equipmentIdArmor, SLOT_ARMOR) : null);
                // if ()
                break;
            case SLOT_WEAPON:
                list = getMovesToWeapon(equipmentData.equipmentIdWeapon ? getEquipmentItemByIdAndSlot(equipmentData.equipmentIdWeapon, SLOT_WEAPON) : null);
                break;
        }
        // console.log("sltpsm", slot, list )
        setListType(CARD_TYPE_MOVE)
        // !equipmentData.equipmentIdArmor || !equipmentData.equipmentIdWeapon
        // if (fraction && (!equipmentData.equipmentIdArmor || !equipmentData.equipmentIdWeapon))
            // list = getMovesByFraction(fraction, list)
        // setListToPrint(list);
        setListToPrint(getItemWithoutUnavailable(list));
    }

    const handleItemsSelectorOnclick = (target) => {
        let id = +target.target.parentNode.getAttribute("data-card-id");
        let type = target.target.parentNode.getAttribute("data-card-type");
        let slot = target.target.parentNode.getAttribute("data-card-slot");
        // console.log('handleItemsSelectorOnclick', id, type, slot)
        if (id) {
            let setter = {
                [CARD_TYPE_PERK]: setPerksToListToPrint,
                [CARD_TYPE_MOVE]: setMove,
                [CARD_TYPE_ITEM]: setItem,
            }
            setter[type]?.(id, slot)
        }
    };

    const isPerksFractionOne = (id, slot) => {
        const array_by_slot = {
            [SLOT_HELM]: perksLists.helm,
            [SLOT_ARMOR]: perksLists.armor,
            [SLOT_WEAPON]: perksLists.weapon
        };
        let ids = array_by_slot[slot] ?? [];

        if (ids.length === 0) return true;
        return getPerkById(ids[0]).fraction === getPerkById(id).fraction;
    }

    const sumisnistWorker = (id, slot, type) =>{
        let sumisnist = checkAllItemsInSlotSumisnist(slot, type, id, perksLists, equipmentData)
        if (!sumisnist || (type === CARD_TYPE_PERK && !isPerksFractionOne(id, slot))) {
            alert("Нельзя смешивать фракции в слоте одного типа экипировки")
            return false;
        }
        return true;
    }

    const setPerksToListToPrint = (id, slot) => {
        let [array, setter] = getPerksListAndSetterBySlot(selectedSlot);

        let kopy = [...array, id];
        setter(kopy);
        kopy = kopy.concat(perksLists.helm, perksLists.armor, perksLists.weapon);
        kopy = getPerksWithoutIds(kopy);
        kopy = getPerksByFraction(selectedFraction, kopy);
        setListToPrint(kopy);
        setActive(false);
    }

    const setMove = (id, slot) => {
        if (!sumisnistWorker(id, slot, CARD_TYPE_MOVE))  return;
        setEquipmentData((last) => ({
            ...last,
            specialMoveIdArmor : (slot === SLOT_ARMOR ) ? id : last.specialMoveIdArmor,
            specialMoveIdWeapon: (slot === SLOT_WEAPON) ? id : last.specialMoveIdWeapon,
        }));
    }

    const setItem = (id, slot) => {
        if (!sumisnistWorker(id, slot, CARD_TYPE_ITEM))  return;
        setEquipmentData((last) => ({
            ...last,
            equipmentIdHelm  : (slot === SLOT_HELM)   ? id : last.equipmentIdHelm,
            equipmentIdArmor : (slot === SLOT_ARMOR)  ? id : last.equipmentIdArmor,
            equipmentIdWeapon: (slot === SLOT_WEAPON) ? id : last.equipmentIdWeapon,
            equipmentIdRanged: (slot === SLOT_RANGED) ? id : last.equipmentIdRanged
        }));

    }

    const handleRemovePerkClick = (id, slot) => {
        if (slot && id) {
            let [array, setter] = getPerksListAndSetterBySlot(slot);
            let kopy = [...array].filter((i) => i != id);
            // console.log(kopy);
            setter(kopy);
            kopy = kopy
                .concat(perksLists.helm, perksLists.armor, perksLists.weapon)
                .filter((i) => i != id);
            kopy = getPerksWithoutIds(kopy);
            kopy = getPerksByFraction(selectedFraction, kopy);
            setListType(CARD_TYPE_PERK);
            setListToPrint(kopy);
            setActive(false);
        }
    }

    const handleRemoveMoveClick = (slot) => {
        setEquipmentData((last) => ({
            ...last,
            specialMoveIdArmor : (slot === SLOT_ARMOR) ? null : last.specialMoveIdArmor,
            specialMoveIdWeapon: (slot === SLOT_WEAPON) ? null : last.specialMoveIdWeapon,
        }))
        setActive(false);
        // setListToPrintItems(slot, selectedFraction, null)
    }

    const handleRemoveEqipmentItemClick = (slot) => {
        setEquipmentData((last) => ({
            ...last,
            equipmentIdHelm  : (slot === SLOT_HELM  ) ? null : last.equipmentIdHelm,
            equipmentIdArmor : (slot === SLOT_ARMOR ) ? null : last.equipmentIdArmor,
            equipmentIdWeapon: (slot === SLOT_WEAPON) ? null : last.equipmentIdWeapon,
            equipmentIdRanged: (slot === SLOT_RANGED) ? null : last.equipmentIdRanged,
        }));
        setActive(false);
    }

    const urlKodeParse = () => {
        let url = new URL(document.URL);
        let kode_op = url.searchParams.get("op");
        let kode_b = url.searchParams.get("b");
        // console.log(kode_b)
        if (kode_op || kode_b)
            useKodeParse(
                kode_op || kode_b,
                setPerksLists,
                setSelectedFraction,
                setListToPrint,
                selectPerksListToPrint,
                selectedSlot,
                selectedFraction,
                setEquipmentData,
                setCurrentBuildType
            )
    }

    function selectFraction(fraction) {
        if (selectedFraction === fraction)
            fraction = null;
        setSelectedFraction(fraction);

        switch (listType) {
            case CARD_TYPE_PERK:
                let perks = getPerksWithoutIds(perksLists.all);
                if (fraction)
                    perks = getPerksByFraction(fraction, perks);
                setListToPrint(perks);
                break;
            case CARD_TYPE_MOVE:
                setListToPrintSpecialMoves(selectedSlot, fraction)
                break;
            case CARD_TYPE_ITEM:
                setListToPrintItems(selectedSlot, fraction)
                break;
        }
    };

    let [damages, setDamages] = useState(() => ({
        baseDamage:  100,
        maxDamage: 100,
        damagesPer10: [],
        damagesPer100: []
    }));


    let [isBacgroundTransparent, setIsBacgroundTransparent] = useState(false);

    const handleCheckBoxClick = () => {
        let checkBox = document.getElementById('chekbox-isbgtransparent');
        setIsBacgroundTransparent(checkBox.checked);
    }

    const handleParseKodeClick = () => {
        let text = document.getElementById('kode-input').value;
        let kode = useKodeParse(text,
            setPerksLists,
            setSelectedFraction,
            setListToPrint,
            selectPerksListToPrint,
            selectedSlot, selectedFraction, setEquipmentData, setCurrentBuildType
        );
    }

    useEffect(() => {
        urlKodeParse();
    }, []);

    useEffect(() => {
        setKodes((last) => {
            let kode = generateKode(perksLists, equipmentData, currentBuildType);
            return {
                ...last,
                kode: kode,
                urlKode: generateUrlKode(kode)
            }
        })
        // useCalculateDamage(damages, setDamages, perksLists);
    }, [equipmentData, perksLists])

    useEffect(() => {
        setPerksLists((last) => ({ ...last, all: [].concat(perksLists.helm, perksLists.armor, perksLists.weapon) }))
    }, [perksLists.helm, perksLists.armor, perksLists.weapon])

    // let [currentBuildType, setCurrentBuildType] = useState(BUILD_TYPE_PERKS_AND_EQUIPMENT);
    let [currentBuildType, setCurrentBuildType] = useState(BUILD_TYPE_ONLY_PERKS);

    const selectBuildType = (type) => {
        setCurrentBuildType(type);
    }

    const handleRecalculateDamages = () => {
        useCalculateDamage(damages, setDamages, perksLists);
    }

    return {
        kodes,
        selectFraction,
        selectedFraction,
        handleCheckBoxClick,
        handleParseKodeClick,
        equipmentData,
        active,
        handleItemsSelectorOnclick,
        listToPrint,
        listType,
        perksLists,
        handleRemovePerkClick,
        handleRemoveMoveClick,
        handleRemoveEqipmentItemClick,
        handleAddPerkClick,
        isBacgroundTransparent,
        currentBuildType,
        selectBuildType,
        handleSetEquipmentItemClick,
        handleSetSpecialMove,
        handleRecalculateDamages,
        damages
    }
}


function checkAllItemsInSlotSumisnist(slot, type, id, perksLists, equipmentData) {
    const isOneFraction = (perkId, itemId, moveId = null) => {
        let item = getEquipmentItemByIdAndSlot((type === CARD_TYPE_ITEM) ? id : itemId, slot);
        let move = getMoveById((type === CARD_TYPE_MOVE) ? id : moveId );
        let perk = getPerkById((type === CARD_TYPE_PERK) ? id : perkId );
        // console.log(slot, type, id)
        // console.log(slot,"ids","i", itemId, "m", moveId, "p", perkId)
        // console.log(slot,"i", item, "m", move, "p", perk)
        if (item && move && perk)
            return item.fraction === perk.fraction && perk.fraction === move.fraction;
        else if (item && move)
            return item.fraction === move.fraction;
        else if (item && perk){
            // console.log("wtf", item.fraction, perk.fraction, item.fraction === perk.fraction)
            return item.fraction === perk.fraction;
        }
        else if (move && perk)
            return move.fraction === perk.fraction;
        return true;
    }

    let isNorm = true;
    switch (slot) {
        case SLOT_HELM:
            isNorm = isOneFraction(perksLists.helm[0], equipmentData.equipmentIdHelm) 
            break;
        case SLOT_ARMOR:
            isNorm = isOneFraction(perksLists.armor[0], equipmentData.equipmentIdArmor, equipmentData.specialMoveIdArmor)
            break;
        case SLOT_WEAPON:
            isNorm = isOneFraction(perksLists.weapon[0], equipmentData.equipmentIdWeapon, equipmentData.specialMoveIdWeapon)
            break;
    }
    // console.log("isnorm", isNorm)
    return isNorm;
}


function generateKode(perksLists, equipmentData, currentBuildType) {
    // const isEquipmentData = (equipmentData) ? Object.values(equipmentData)?.filter(i => i).length > 0 : false;
    let kode = (currentBuildType === BUILD_TYPE_PERKS_AND_EQUIPMENT) ? "pai_" : "op_";

    // let kode =  "op_";
    kode += `h${perksLists.helm.join("_")}__`;
    kode += `a${perksLists.armor.join("_")}__`;
    kode += `w${perksLists.weapon.join("_")}`;
    if (currentBuildType === BUILD_TYPE_PERKS_AND_EQUIPMENT) {
        kode += `__h${equipmentData.equipmentIdHelm ?? ""}`;
        kode += `__a${equipmentData.equipmentIdArmor ?? ""}`
        if (equipmentData.specialMoveIdArmor)
            kode += `_${equipmentData.specialMoveIdArmor}`;
        kode += `__w${equipmentData.equipmentIdWeapon ?? ""}`
        if (equipmentData.specialMoveIdWeapon)
            kode += `_${equipmentData.specialMoveIdWeapon}`;
        kode += `__r${equipmentData.equipmentIdRanged ?? ""}`;
    }
    return (kode.match(/\d/)) ? kode : "";
}

function generateUrlKode(kode) {
    var url = new URL(document.URL);
    // b = bulid
    url.searchParams.set("b", kode);
    return url.toString();
}


function useKodeParse(text = "", setPerksLists, setSelectedFraction, setListToPrint, selectPerksListToPrint, selectedSlot, selectedFraction, setEquipmentData, setCurrentBuildType) {
    const isOPKodeValid = (text) => !!text.match(/^op_h((\d+_)|_)+_a((\d+_)|_)+_w((\d+(_|$))+|$)/);
    const isPAIKodeVaild = (text) => !!text.match(/^pai_h((\d+_)|_)+_a((\d+_)|_)+_w((\d+_)|_)+_h(\d|_)+_a((\d+_)|_)+_w((\d+_)|_)+_r(\d+|$)$/);
    if (isOPKodeValid(text) || isPAIKodeVaild(text))
        setKodeToData(text, isOPKodeValid(text) ? "op_" : "pai_", setPerksLists, setSelectedFraction, setListToPrint, selectPerksListToPrint, selectedSlot, selectedFraction, setEquipmentData, setCurrentBuildType);
    else
        if (text)
            alert(getLocalisationStringFunction("Код не правильный"));
}


function setKodeToData(kode, type = "op_", setPerksLists, setSelectedFraction, setListToPrint, selectPerksListToPrint, selectedSlot, selectedFraction, setEquipmentData, setCurrentBuildType) {
    const parse_numbers = (i) => i.split('_').map((n) => parseInt(n)).filter((n) => n);
    const parse_slot = (arr, slot) => arr.filter(i => i.startsWith(slot))[0].replace(slot, '');
    const parse_slot_numbers = (arr, slot) => parse_numbers(parse_slot(arr, slot));
    let arr = kode.replace(type, "").split("__");
    // let helm = arr.filter((s) => s.startsWith('h'))[0].replace("h", "");
    let helm = parse_slot_numbers(arr, 'h');
    let armor = parse_slot_numbers(arr, "a");
    let weapon = parse_slot_numbers(arr, "w");
    if (type === "pai_") {

        const parse_item_and_move = (arr, slot) => {
            let item_move = parse_slot(arr, slot);
            if (item_move.startsWith("_"))
                return { item: null, move: parseInt(item_move.slice(1)) ?? null }
            let numbers = parse_numbers(item_move);
            return { item: numbers?.[0] ?? null, move: numbers?.[1] ?? null }
        }

        arr = arr.slice(3)

        let helm = parse_slot_numbers(arr, 'h')[0] ?? null;
        let ranged = parse_slot_numbers(arr, "r")[0] ?? null;
        let armor = parse_item_and_move(arr, "a");
        let weapon = parse_item_and_move(arr, "w");
        setEquipmentData((last) => ({
            ...last,
            specialMoveIdArmor: armor.move,
            specialMoveIdWeapon: weapon.move,
            equipmentIdHelm: helm,
            equipmentIdArmor: armor.item,
            equipmentIdWeapon: weapon.item,
            equipmentIdRanged: ranged
        }));

        setCurrentBuildType(BUILD_TYPE_PERKS_AND_EQUIPMENT)
    } else {
        setCurrentBuildType(BUILD_TYPE_ONLY_PERKS)
    }
    setPerksLists((last) => ({
        ...last,
        helm: helm,
        armor: armor,
        weapon: weapon,
    }));

    let all_perks = [].concat(helm, armor, weapon);
    if (all_perks.length > 0) {
        let fraction = getPerkById(all_perks[0]).fraction;
        setSelectedFraction(fraction);
        setListToPrint(selectPerksListToPrint({ helm: helm, armor: armor, weapon: weapon, all: all_perks }, selectedSlot, fraction));
    } else {
        setListToPrint(selectPerksListToPrint({ helm: helm, armor: armor, weapon: weapon, all: all_perks }, selectedSlot, selectedFraction));
    }
}