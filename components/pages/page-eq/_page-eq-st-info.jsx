import clsx from "clsx"
import { GetLocalisationString } from "../../language"
import { getPerkById } from "../../perks-functions"
import { useState } from "react"
import { UIButton } from "../../ui/ui-button"
import { superRandomKey } from "../../super-random-key"



export function _PageEqStInfo ({className, damages, handleRecalculateDamages}){
    return (
        <div className={clsx("page-eq-st__info", className)}>
            <h3><GetLocalisationString text="Приблизительный рассчёт урона"/></h3>
            <h4><GetLocalisationString text="имеется ввиду макс уровень перков и что перк срабатывает независимо от условия выполнения"/></h4>
            <h4><GetLocalisationString text="рандом учитывается по принципу"/></h4>
            <h4><GetLocalisationString text="Math.random() <= шанс"/></h4>
            
            <h5><GetLocalisationString text="это не 100% точный подсчёт"/></h5>
            <h5><GetLocalisationString text="я не ебу чё там под капотом игры"/></h5>
            <h5><GetLocalisationString text="может там вообще все не так как я думаю"/></h5>
            <div style={{marginBottom:'10px'}}></div>
            <div><GetLocalisationString text="Базовый урон:"/> {damages.baseDamage}</div>
            <div><GetLocalisationString text="Макcимальный урон за 1 удар(сработали все перки):"/> {round(damages.maxDamage)}</div>
            
            <div style={{marginTop: '10px', textAlign:"center"}}>
                <UIButton marginBottom="14px"  text=<GetLocalisationString text='Пересчитать'/> onClick={handleRecalculateDamages}/>
                <Spoiler title={<GetLocalisationString text='Таблица урона за 10 ударов' />}>
                    <DamagesTable  
                        baseDamage={damages.baseDamage} 
                        damages={damages.damagesPer10}
                    />
                </Spoiler>
                <Spoiler title={<GetLocalisationString text='Таблица урона за 100 ударов' />}>
                    <DamagesTable  
                        baseDamage={damages.baseDamage} 
                        damages={damages.damagesPer100}
                    />
                </Spoiler>
            </div>
        </div>
    )
}


function DamagesTable({damages, baseDamage, caption}){
    let damages_rows = damages.map((i, n) => <PerksWorkRow key={superRandomKey()} n={n+1} damages={i} baseDamage={baseDamage}/>)
    let columns = (damages?.[0]?.length ?? 0) + 2;
    let sum = round(sumDamage(damages, baseDamage));
    return (
        <div className="damage-table-container"> 
        <table className="damage-table">
            <thead>
                <HeadRow damages={damages?.[0]} />
            </thead>
            <tbody>
                {damages_rows}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={columns}><GetLocalisationString text='Суммарный урон за все удары'/></td>
                    <td>{sum}</td>
                </tr>
            </tfoot>
        </table>
        </div>
    )
}

function TablePerkIcon({src}){
    return <img className="table__perk-icon" src={src} alt=""/>
}


function HeadRow({damages}){
    let tds = null;
    if (damages)
        tds = damages.map((i) => <td className="table__perk__perk-icon-column" key={superRandomKey()}><TablePerkIcon src={getPerkById(i.id).icon} /></td>)
    return (
        <tr>
            <td>N</td>
            <td><GetLocalisationString text='Базовый урон'/></td>
            {tds}
            <td><GetLocalisationString text='Суммарный урон'/></td>
        </tr>
    )
}

function round(n) {
    return parseInt(n * 100) / 100;
}

function PerksWorkRow({n, damages, baseDamage}){
    let tds = null;
    let all_damage = baseDamage
    if (damages){
        tds = damages.map((i) => { 
            all_damage += i.damage;
            return <td key={superRandomKey()}>{(i.damage === 0) ? "X" : round(i.damage)}</td>
        })
    }
    return (
        <tr>
            <td>{n}</td>
            <td>{baseDamage}</td>
            {tds}
            <td>{round(all_damage)}</td>
        </tr>
    )
}

function sumDamage(damages, baseDamage){
    let all_damage = 0;
    for (let damage of damages)
        all_damage += baseDamage + damage.reduce((a, v) => a + v.damage, 0)
    return all_damage;
}


function Spoiler({children, title}){
    let [isShow, setIsShow] = useState(false);
    return (
        <div className="spoiler">
            <button 
                data-spoiler-isshow={isShow}
                className="spoiler__button" 
                onClick={()=>{setIsShow(!isShow)}}
            >
                {title}
            </button>
            <div 
                className="spoiler_content" 
                data-spoiler-isshow={isShow}
            >
                {children}
            </div>
        </div>
    )
}