import { FRACTION_DYNASTY, FRACTION_HERALDS, FRACTION_LEGION } from "../../constants";

import {useState, useEffect} from 'react';
import { GetLocalisationString } from "../../language";
import { UIRadioSelector } from "../../ui/ui-radio-selector";
import html2canvas from "../../../public/lib/html2canvas.min";
import { BUILD_TYPE_ONLY_PERKS, BUILD_TYPE_PERKS_AND_EQUIPMENT } from "./_constants";
import { UIButton } from "../../ui/ui-button";


export function _PageEqHeader({kodes, selectFraction, selectedFraction, handleCheckBoxClick, handleParseKodeClick, selectBuildType, currentBuildType}){
    let [activeId, setActiveId] = useState(null);
    
    useEffect (() => {        
        let id = [FRACTION_LEGION, FRACTION_DYNASTY, FRACTION_HERALDS].indexOf(selectedFraction);
        setActiveId(id);
    }, [selectedFraction]);
    
    const copyText = (id) => {
        let input = document.getElementById(id);
        input.select();
        document.execCommand("copy");
    }

    const handleCopyCodeClick = () => {
        copyText('kode-kopy-input');
    }

    const handleCopyUrlCodeClick = () => {
        copyText('url-kode-kopy-input');
    }
    
    let toImage = () => {
        let target = document.querySelector('.page-eq-st__only-perks') ?? document.querySelector(".page-eq-st-perks-and-eqipment");
        html2canvas(target, {backgroundColor: null}).then(canvas => {
            const a = document.createElement("a");
            a.href = canvas.toDataURL("image/png", 1);
            a.download = `sf3_buid__${kodes.kode}__.png`;
            a.click();
            a.remove();
        }).catch((err) => {
            setIsModalShow(true);
            setModalText(" "+ err);
        });;
    }

    let [modalText, setModalText] = useState("text");
    let [isModalShow, setIsModalShow]= useState(false);
    let [bodyOffsetHeight, setBodyOffsetHeight] = useState('100%');
    useEffect(()=>{
        setBodyOffsetHeight(document.body.offsetHeight+"px");
    }, []);

    
    

    return (
    <>
    <div id="modal" data-isnone={!isModalShow} style={{height: bodyOffsetHeight}}>
        <div>
            <div className="modal-text"> please send this error for me(my contacts in about page): <br/><br/> {modalText} </div>
            <button className="modal-x" onClick={()=>{setIsModalShow(false);}}>CLOSE</button>
        </div>
    </div>
        <header>
            <nav>
                <UIRadioSelector
                    texts={[
                        <GetLocalisationString text="Только перки"/>, 
                        <GetLocalisationString text="Перки и Экипировка"/>
                    ]}

                    onClicks={[
                        () => {selectBuildType(BUILD_TYPE_ONLY_PERKS)},
                        () => {selectBuildType(BUILD_TYPE_PERKS_AND_EQUIPMENT)},
                    ]}
                    setIdToActive={({[BUILD_TYPE_ONLY_PERKS]: 0,[BUILD_TYPE_PERKS_AND_EQUIPMENT]:1})[currentBuildType]}
                    requireOneSelected
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
                    defaultActiveId={0}
                    setIdToActive={activeId}
                    // requireOneSelected
                />
            </nav>
            <div className="kode-manipulation">
                <div className="huy">
                    <span className="nowrap"><GetLocalisationString text="Код сборки:"/></span> 
                    <input id="kode-kopy-input" value={kodes.kode} readOnly/> 
                    <UIButton onClick={handleCopyCodeClick} text=<GetLocalisationString text="Копировать"/> />
                </div>
                <div className="huy">
                    <span className="nowrap"><GetLocalisationString text="Вставь код сборки:"/></span>  
                    <input id="kode-input" type="text"/> 
                    <UIButton onClick={handleParseKodeClick} text=<GetLocalisationString text="Собрать"/> />
                </div>
            </div>
            <div className="kode-manipulation">
                <div className="huy">
                    <span className="nowrap"><GetLocalisationString text="Ссылка сборки:"/></span> 
                    <input id="url-kode-kopy-input" value={kodes.urlKode} readOnly/> 
                    <UIButton onClick={handleCopyUrlCodeClick} text=<GetLocalisationString text="Копировать"/> />
                </div>
            </div>
            <div className="kode-manipulation">
                <div className="huy">
                    <UIButton onClick={toImage} text=<GetLocalisationString text="В картинку"/> />
                    {/*<button onClick={toImage}><GetLocalisationString text="В картинку"/></button>*/}
                    <label htmlFor="chekbox-isbgtransparent" onClick={handleCheckBoxClick}>
                    <input id="chekbox-isbgtransparent" type="checkbox"/> 
                    <span className="nowrap"><GetLocalisationString text="Прозрачный фон"/></span> </label>
                </div>
            </div>
        </header>
    </>
    );
}