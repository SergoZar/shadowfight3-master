import clsx from "clsx"
import { GetLocalisationString } from "../../language"

export function _PageEqStInfo ({className, damages}){
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
            <div><GetLocalisationString text="Макcимальный урон за 1 удар(сработали все перки):"/> {damages.maxDamage}</div>
            <div><GetLocalisationString text="Cредний урон за 10 ударов:"/> {damages.midDamagePer10}</div>
            <div><GetLocalisationString text="Cуммарный урон за 10 ударов:"/> {damages.sumDamagePer10}</div>
            <div><GetLocalisationString text="Cредний урон за 100 ударов:"/> {damages.midDamagePer100}</div>
            <div><GetLocalisationString text="Cуммарный урон за 100 ударов:"/> {damages.sumDamagePer100}</div>
        </div>
    )
}