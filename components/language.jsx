import { useState, useEffect } from 'react';
import {LANG_EN} from './data/data-lang-en.js';
import {LANG_RU} from './data/data-lang-ru.js';



function isRu(){
    return ["uk-UA", "uk", "ru-RU", "ru"].includes(navigator.language);
}

export function GetLocalisationString({text}){
    let [lang, setLang] = useState(LANG_EN);
    
    useEffect(()=>{
        if(isRu())
            setLang(LANG_RU);
    }, []);
    
    return (
        <>
            {((!!lang[text]) ? lang[text] : "Hz string translation")}
        </>
    )
}

export function getLocalisationStringFunction(text){
    let lang = LANG_EN;
    
    if(isRu())
        lang = LANG_RU;

    return ((!!lang[text]) ? lang[text] : "Hz string translation")
}
