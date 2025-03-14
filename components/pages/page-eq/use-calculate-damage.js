import { getPerksByIds } from "../../perks-functions";


export function useCalculateDamage(damages, setDamages, perksLists) {
    if (perksLists.all.length === 0)
        setDamages((last) => ({
            ...last,
            maxDamage: damages.baseDamage,
            damagesPer10: damageCalc(10, damages.baseDamage, []),
            damagesPer100: damageCalc(100, damages.baseDamage, []),
        }));
    let bonuses = getPerksByIds(perksLists.all)
                    .map((perk) => perk.bonuses)
                    .filter(b => b !== undefined);
    
    if (bonuses.length === 0) return;

    let damagesPer10 = damageCalc(10, damages.baseDamage, getPerksByIds(perksLists.all));
    let damagesPer100 = damageCalc(100, damages.baseDamage, getPerksByIds(perksLists.all));
    
    let maxDamage = damages.baseDamage;

    for (let bonus of bonuses)
        maxDamage += damages.baseDamage * bonus.damage[1];
    
    setDamages((last) => {
        return {
            ...last,
            maxDamage: maxDamage,
            damagesPer10: damagesPer10,
            damagesPer100: damagesPer100,
        };
    });
}


function damageCalc(iterations, baseDamage, perks) {
    let table = [];
    // console.log(iterations, baseDamage, perks)
    for (let i = 0; i < iterations; i++) {
        let damage = baseDamage;
        let damages_per_hit = [];
        for (let perk of perks) {
            if (!perk.bonuses || !perk.bonuses.chance) continue;

            let temp = {
                id: perk.id,
                isWork: false,
                damage: 0
            }

            if (Math.random() <= perk.bonuses.chance[1]){
                temp.isWork = true;
                temp.damage = baseDamage * perk.bonuses.damage[1];
            }
            damages_per_hit.push(temp);
        }
        table.push(damages_per_hit)
    }

    return table;
}

