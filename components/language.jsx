import { useState, useEffect } from 'react';
import {LANG_EN} from './data/data-lang-en.js';
import {LANG_RU} from './data/data-lang-ru.js';

// let LANG = LANG_EN;

export function GetLocalisationString({text}){
    let [lang, setLang] = useState(LANG_EN);
    
    // useEffect(()=>{
    //     if(["uk-UA", "uk", "ru-RU", "ru"].includes(navigator.language))
    //         setLang(LANG_RU);
    // }, []);
    
    return (
        <>
            {((!!lang[text]) ? lang[text] : "Hz string translation")}
        </>
    )
}

export function getLocalisationStringFunction(text){
    let lang = LANG_EN;
    
    if(["uk-UA", "uk", "ru-RU", "ru"].includes(navigator.language))
        lang = LANG_RU;

    return ((!!lang[text]) ? lang[text] : "Hz string translation")
}
