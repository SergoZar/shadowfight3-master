import {useState} from 'react';
import { PAGE_HOME, PAGE_EQUIPMENT, PAGE_EQUIPMENT_LIST, PAGE_ABOUT} from './constants.js';
import { UIRadioSelector } from './ui/ui-radio-selector.jsx';
import { GetLocalisationString} from './language.jsx';
import {PageAbout, PageEq, PageEqList, PageHome} from './pages';


export function Site(){
    // let [page, setPage] = useState(PAGE_HOME);
    // let [page, setPage] = useState(PAGE_EQUIPMENT_LIST);
    let [page, setPage] = useState(PAGE_EQUIPMENT);

    function handlePageClick(page){
        setPage(page);
    }
    
    return (
    <div className="app">
        <header id="header">    
            <nav>
                <UIRadioSelector 
                texts={[
                    <GetLocalisationString text="Домашняя страница"/>, 
                    <GetLocalisationString text="Сборка"/>, 
                    <GetLocalisationString text="Список вещей"/>, 
                    <GetLocalisationString text="О сайте"/>
                ]}
                onClicks={[
                    ()=>handlePageClick(PAGE_HOME),
                    ()=>handlePageClick(PAGE_EQUIPMENT),
                    ()=>handlePageClick(PAGE_EQUIPMENT_LIST),
                    ()=>handlePageClick(PAGE_ABOUT)
                ]}
                defaultActiveId={[PAGE_HOME, PAGE_EQUIPMENT, PAGE_EQUIPMENT_LIST, PAGE_ABOUT].findIndex((i) => i === page)}
                />
            </nav>
        </header>
        <section>
            <SwitchPage page={page}/>
        </section>
        <div id="suka"></div>
    </div>


    )
}


function SwitchPage({page}){
    switch(page){
        case PAGE_HOME: 
            return <PageHome/>
        case PAGE_EQUIPMENT: 
            return <PageEq/>
        case PAGE_EQUIPMENT_LIST: 
            return <PageEqList/>
        case PAGE_ABOUT: 
            return <PageAbout/>
        default:
            return <div><GetLocalisationString text="Такого нет:"/> {page}</div>
    }
}


