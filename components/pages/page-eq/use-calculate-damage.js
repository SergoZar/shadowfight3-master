import { getPerksByIds } from "../../perks-functions";

export function useCalculateDamage(damages, setDamages, perksLists) {
    let all_perks = [].concat(perksLists.armor, perksLists.helm, perksLists.weapon);
    all_perks = getPerksByIds(all_perks);

    let bonuses = all_perks.map((perk) => perk.bonuses).filter(b => b !== undefined);
    if (bonuses.length === 0) return;

    const damage_calc = (iterations) => {
        let all_damage = 0;
        for (let i = 0; i < iterations; i++) {
            let damage = damages.baseDamage;
            for (let bonus of bonuses){
                if (!bonus.chance) continue
                if (Math.random() <= bonus.chance[1])
                    damage += damages.baseDamage * bonus.damage[1];
            }
            all_damage += damage;
        }
        return [all_damage / iterations, all_damage];
    };
    let midDamagePer10, sumDamagePer10;
    [midDamagePer10, sumDamagePer10] = damage_calc(10);
    let [midDamagePer100, sumDamagePer100] = damage_calc(100);

    let maxDamage = damages.baseDamage;
    for (let bonus of bonuses)
        maxDamage += damages.baseDamage * bonus.damage[1];

    const round = (n) => parseInt(n * 100) / 100;

    setDamages((l) => {
        return {
            ...l,
            maxDamage: round(maxDamage),
            midDamagePer10: round(midDamagePer10),
            midDamagePer100: round(midDamagePer100),
            sumDamagePer10: round(sumDamagePer10),
            sumDamagePer100: round(sumDamagePer100),
        };
    });
}
