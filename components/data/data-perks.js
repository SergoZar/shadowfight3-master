/**
 * "bonuses": {
 *             1 / 10 level
 *  "chance": [min, max] > [10%, 15%] > [0.10, 0.15],
 *  "damage": [min, max] > [+65%, +86%] > [0.65, 0.86]
 *  "damage": [min, max] > [-65%, -86%] > [-0.65, -0.86]
 *  "damage": [one] > [+65%] > [0.65],
 *  "shied": [min, max] > [+30%, +60%] > [0.3, 0.6],
 *  "shied": [min, max] > [-30%, -60%] > [1.3, 1.6],
 *  "per_point": true/false,
 *  min_/max_ - 1/10 level, _max - max points
 *  "points": [min_max, max_max] > [0, 7]
 *  "points": [min_max, max_max] > [infinit, infinit] > [-1, -1] 
 *  "if": {
 *      "health<n": [min, max],
 *      "health_you": [min, max]
 *  }
 * }
 * 
 * 
 * 
 * 
 * 
*/

let bonuses_example = {
    ////// шкода
    // одаткова шкода 1 рівень +65% 10 рівень +86%
    "damage": [0.65, 0.86], // min 65% max 15%
    // одаткова шкода 1 рівень -65% 10 рівень -86%
    "damage": [-0.65, -0.86], // min -65% max -15%
    "shadow_damage": [0.65, 0.86],
    "shadow_damage": [-0.65, -0.86],
    //чи бонус за набрані очки чогось
    "points": [3, 7], // 1 lvl max 3, 10 lvl max 7
    // -1 - нема межі очок
    "points": [-1, -1], // -1 = unlimited points
    
    "defence": [0.1, 0.15], // захист 

    ////// умови спрацювання
    "chance": [0.1, 0.15], // min 10% max 15%
    "per_point": true, // true/false

    // умова спрацювання перку, якщо це не шанс і не очки
    "if": {
        "hp<n": [0.2, 0.5], // 1 lvl hp lower than 20%, 10 lvl hp lower than 50%
        "hp_you": true // true - for you hp, false - for hp opponent,
        //
    },
    "convert_damage_to_shadow_damage": true 
}


let bonuses_example2 = {
    "if": {
        "chance": [0.1, 0.15],
        "points": [3, 6],
        "range": ['?'],
        "hp<n": true,
    },
    "bonus_type": "damage" | "shadow_damage" | "defence" | "hp" | "shadow_energy",
    "for_you": true | false,
    "multiplier": [0.65, 0.86] | [-0.1, -0.15],
    "other": {
        "?": "?"
    }
}


export const DATA_PERKS = [
    {
        "name": "Поглощение",
        "icon": "img_webp/perks/ICON_PERK_ABSORPTION.webp",
        "fraction": "legion",
        "rarity": "legendary",
        "id": 2,
        "slot": "armor"
    },
    {
        "name": "Аккумуляция",
        "icon": "img_webp/perks/ICON_PERK_ACCUMULATION.webp",
        "fraction": "heralds",
        "rarity": "rare",
        "id": 3,
        "slot": "helm"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_ACOLYTES_INSIGHT.webp",
        "fraction": "heralds",
        "rarity": "legendary",
        "id": 4,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_ACOLYTES_PRAYER.webp",
        "fraction": "legion",
        "rarity": "legendary",
        "id": 5,
        "slot": "helm"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_ACOLYTES_RENEWAL.webp",
        "fraction": "dynasty",
        "rarity": "legendary",
        "id": 6,
        "slot": "helm"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_AGILITY.webp",
        "fraction": "legion",
        "rarity": "legendary",
        "id": 7,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_AMORTIZATION.webp",
        "fraction": "heralds",
        "rarity": "epic",
        "id": 8,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_AMPLIFICATION.webp",
        "fraction": "heralds",
        "rarity": "epic",
        "id": 9,
        "slot": "helm"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_APHOTIC_BARRIER.webp",
        "fraction": "heralds",
        "rarity": "rare",
        "id": 10,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_BACKSTABBER.webp",
        "unavailable": true,
        "fraction": "",
        "rarity": "",
        "id": 11,
        "slot": "",
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_BASHER_ROUNDED.webp",
        "fraction": "legion",
        "rarity": "legendary",
        "id": 12,
        "slot": "weapon"
    },
    {
        "name": "Berserk",
        "icon": "img_webp/perks/ICON_PERK_BERSERK.webp",
        "fraction": "legion",
        "rarity": "legendary",
        "id": 13,
        "slot": "weapon",
        "bonuses": {
            "chance": [0.17, 0.35],
            "damage": [0.5, 1.1]
        }
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_BLEEDING.webp",
        "fraction": "legion",
        "rarity": "epic",
        "id": 14,
        "slot": "weapon",
        "bonuses": {
            "chance": [0.1, 0.2],
            "damage": [0.5, 1.5]
        }
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_BREACHER.webp",
        "fraction": "legion",
        "rarity": "epic",
        "id": 15,
        "slot": "weapon"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_BREAK.webp",
        "fraction": "dynasty",
        "rarity": "legendary",
        "id": 16,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_CATALYST.webp",
        "fraction": "heralds",
        "rarity": "rare",
        "id": 17,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_COBRA_DANCE.webp",
        "fraction": "dynasty",
        "rarity": "legendary",
        "id": 18,
        "slot": "weapon"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_COLD_REVENGE.webp",
        "fraction": "legion",
        "rarity": "epic",
        "id": 19,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_CONVERSION.webp",
        "fraction": "heralds",
        "rarity": "epic",
        "id": 20,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_CORNERED_CAT.webp",
        "unavailable": true,
        "fraction": "",
        "rarity": "",
        "id": 21,
        "slot": ""
    },
    {
        "name": "Distraction",
        "icon": "img_webp/perks/ICON_PERK_CRITICAL_FOCUS.webp",
        "fraction": "dynasty",
        "rarity": "epic",
        "id": 22,
        "slot": "weapon"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_CRITICAL_MASS.webp",
        "fraction": "heralds",
        "rarity": "rare",
        "id": 23,
        "slot": "weapon"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_DAMAGE_RETURN.webp",
        "fraction": "legion",
        "rarity": "legendary",
        "id": 24,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_DANCE_OF_ONSLAUGHT.webp",
        "fraction": "dynasty",
        "rarity": "legendary",
        "id": 25,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_DETERRENCE.webp",
        "fraction": "heralds",
        "rarity": "epic",
        "id": 26,
        "slot": "helm"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_DISCHARGE.webp",
        "fraction": "heralds",
        "rarity": "epic",
        "id": 27,
        "slot": "weapon"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_DROUGHT.webp",
        "fraction": "dynasty",
        "rarity": "legendary",
        "id": 28,
        "slot": "helm",
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_ELECTRO_SHOCK.webp",
        "unavailable": true,
        "fraction": "",
        "rarity": "",
        "id": 29,
        "slot": ""
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_FIELD_MEDICINE.webp",
        "fraction": "legion",
        "rarity": "legendary",
        "id": 30,
        "slot": "helm"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_FLURRY.webp",
        "fraction": "dynasty",
        "rarity": "legendary",
        "id": 31,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_FORTIFICATION.webp",
        "unavailable": true,
        "fraction": "",
        "rarity": "",
        "id": 32,
        "slot": ""
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_GROWING_APPETITE.webp",
        "fraction": "dynasty",
        "rarity": "rare",
        "id": 33,
        "slot": "weapon"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_HALFLIFE.webp",
        "fraction": "heralds",
        "rarity": "legendary",
        "id": 34,
        "slot": "armor"
    },
    {
        "name": "Strong Foot",
        "icon": "img_webp/perks/ICON_PERK_HEAVY_HAND.webp",
        "fraction": "dynasty",
        "rarity": "rare",
        "id": 35,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_HIMMELSTENS_POWER.webp",
        "fraction": "legion",
        "rarity": "legendary",
        "id": 36,
        "slot": "armor",
        "bonuses": {
            "chance": [1,1],
            "damage": [0.1,0.16],
            "points": [3,6]
        }
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_HIMMELSTENS_RESONANCE.webp",
        "fraction": "heralds",
        "rarity": "legendary",
        "id": 37,
        "slot": "helm"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_HIMMELSTENS_SONG.webp",
        "fraction": "dynasty",
        "rarity": "legendary",
        "id": 38,
        "slot": "weapon"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_IMPULSE_RESONATOR.webp",
        "fraction": "heralds",
        "rarity": "epic",
        "id": 39,
        "slot": "weapon"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_INTERFERENCE.webp",
        "fraction": "heralds",
        "rarity": "legendary",
        "id": 40,
        "slot": "weapon"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_INVINCIBLE_WIND.webp",
        "fraction": "dynasty",
        "rarity": "epic",
        "id": 41,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_IRON_GRIP.webp",
        "unavailable": true,
        "fraction": "",
        "rarity": "",
        "id": 42,
        "slot": ""
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_KINGS_BLESSING.webp",
        "fraction": "legion",
        "rarity": "legendary",
        "id": 43,
        "slot": "armor",
        "bonuses": {
            "chance": [0.1, 0.5],
            "damage": [0.1, 0.5]    
        }
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_LIFESTEAL.webp",
        "fraction": "legion",
        "rarity": "epic",
        "id": 44,
        "slot": "weapon"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_PAIN_CONDENSER.webp",
        "fraction": "heralds",
        "rarity": "legendary",
        "id": 45,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_PERFECTION_OF_FORM.webp",
        "fraction": "dynasty",
        "rarity": "legendary",
        "id": 46,
        "slot": "weapon"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_PERSEVERANCE.webp",
        "fraction": "legion",
        "rarity": "legendary",
        "id": 47,
        "slot": "helm"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_PLUCK.webp",
        "fraction": "dynasty",
        "rarity": "epic",
        "id": 48,
        "slot": "weapon"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_POISON.webp",
        "fraction": "dynasty",
        "rarity": "legendary",
        "id": 49,
        "slot": "weapon"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_POISON_SKIN_ROUNDED.webp",
        "fraction": "dynasty",
        "rarity": "rare",
        "id": 50,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_POLARIZED_REPEATER.webp",
        "fraction": "heralds",
        "rarity": "legendary",
        "id": 51,
        "slot": "armor"
    },
    {
        "name": "Shadow Kick",
        "icon": "img_webp/perks/ICON_PERK_POWERFUL_KICK.webp",
        "fraction": "dynasty",
        "rarity": "rare",
        "id": 52,
        "slot": "helm"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_PRECISION.webp",
        "fraction": "heralds",
        "rarity": "epic",
        "id": 53,
        "slot": "weapon"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_PREDATOR.webp",
        "fraction": "legion",
        "rarity": "epic",
        "id": 54,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_PREPARED_STRIKE.webp",
        "fraction": "heralds",
        "rarity": "rare",
        "id": 55,
        "slot": "weapon"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_PRICE_OF_VICTORY.webp",
        "fraction": "legion",
        "rarity": "legendary",
        "id": 56,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_PRIMARY_PROTECTION.webp",
        "fraction": "heralds",
        "rarity": "epic",
        "id": 57,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_PROBABILITY_RESONATOR.webp",
        "fraction": "heralds",
        "rarity": "legendary",
        "id": 58,
        "slot": "weapon"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_RECHARGE.webp",
        "fraction": "heralds",
        "rarity": "epic",
        "id": 59,
        "slot": "weapon"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_RECOLLECTION.webp",
        "fraction": "legion",
        "rarity": "rare",
        "id": 60,
        "slot": "helm",
        // "bonuses":{
            
        // }
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_REGENERATION.webp",
        "fraction": "dynasty",
        "rarity": "epic",
        "id": 61,
        "slot": "helm"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_REMOTE_MANIPULATOR.webp",
        "fraction": "heralds",
        "rarity": "epic",
        "id": 62,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_REPELLER.webp",
        "fraction": "legion",
        "rarity": "rare",
        "id": 63,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_RETRIBUTION.webp",
        "unavailable": true,
        "fraction": "",
        "rarity": "",
        "id": 64,
        "slot": ""
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_REVENGE.webp",
        "fraction": "legion",
        "rarity": "epic",
        "id": 65,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_RISING_TIDE.webp",
        "fraction": "dynasty",
        "rarity": "legendary",
        "id": 66,
        "slot": "helm"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_ROCK.webp",
        "fraction": "legion",
        "rarity": "legendary",
        "id": 67,
        "slot": "helm"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_RUOLANS_ARROGANCE.webp",
        "fraction": "legion",
        "rarity": "legendary",
        "id": 68,
        "slot": "weapon",
        "bonuses": {
            "chance": [1,1],
            "damage": [0.24, 0.48]
        }
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_RUOLANS_CUNNING.webp",
        "fraction": "heralds",
        "rarity": "legendary",
        "id": 69,
        "slot": "helm"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_RUOLANS_RITUAL.webp",
        "fraction": "dynasty",
        "rarity": "legendary",
        "id": 70,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_SECRET_RITUAL.webp",
        "fraction": "dynasty",
        "rarity": "epic",
        "id": 71,
        "slot": "helm"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_SHADOW_ADEPT.webp",
        "unavailable": true,
        "fraction": "",
        "rarity": "",
        "id": 72,
        "slot": ""
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_SHADOW_AFFINITY.webp",
        "fraction": "heralds",
        "rarity": "legendary",
        "id": 73,
        "slot": "helm"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_SHADOW_BALANCE.webp",
        "fraction": "legion",
        "rarity": "legendary",
        "id": 74,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_SHADOW_BERSERK.webp",
        "fraction": "legion",
        "rarity": "legendary",
        "id": 75,
        "slot": "weapon"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_SHADOW_BLADES.webp",
        "fraction": "legion",
        "rarity": "epic",
        "id": 76,
        "slot": "helm"
    },
    {
        "name": "Теневое выжигание",
        "icon": "img_webp/perks/ICON_PERK_SHADOW_BURN.webp",
        "fraction": "legion",
        "rarity": "legendary",
        "id": 77,
        "slot": "weapon",
        "bonuses": {
            //
            //         min, max
            "chance": [0.1,0.15],
            "damage": [0.65, 1]
        }
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_SHADOW_CHARGE.webp",
        "unavailable": true,
        "fraction": "",
        "rarity": "",
        "id": 78,
        "slot": ""
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_SHADOW_DRAIN.webp",
        "unavailable": true,
        "fraction": "",
        "rarity": "",
        "id": 79,
        "slot": ""
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_SHADOW_FANG.webp",
        "fraction": "dynasty",
        "rarity": "legendary",
        "id": 80,
        "slot": "weapon"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_SHADOW_NOURISHMENT.webp",
        "fraction": "legion",
        "rarity": "epic",
        "id": 81,
        "slot": "helm"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_SHADOW_PREP.webp",
        "fraction": "dynasty",
        "rarity": "legendary",
        "id": 82,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_SHADOW_REMEDY.webp",
        "fraction": "heralds",
        "rarity": "legendary",
        "id": 83,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_SHADOW_SHARD.webp",
        "fraction": "heralds",
        "rarity": "legendary",
        "id": 84,
        "slot": "weapon"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_SHADOW_STORM.webp",
        "fraction": "legion",
        "rarity": "epic",
        "id": 85,
        "slot": "weapon"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_SHADOW_TAX.webp",
        "fraction": "dynasty",
        "rarity": "legendary",
        "id": 86,
        "slot": "helm"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_SHADOW_THIRST.webp",
        "fraction": "legion",
        "rarity": "rare",
        "id": 87,
        "slot": "weapon"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_SHIELDING.webp",
        "fraction": "legion",
        "rarity": "rare",
        "id": 88,
        "slot": "armor",
        // "bonuses": {
        //     "chance": [0.25, 0.5],
        //     "defense": [0.2, 0.35],
        //     "you": true,
        //     "time": [3, 5]
        // }
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_SPIKED_ARMOR.webp",
        "fraction": "legion",
        "rarity": "epic",
        "id": 89,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_SPURT.webp",
        "unavailable": true,
        "fraction": "",
        "rarity": "",
        "id": 90,
        "slot": ""
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_STATIC_AMPLIFIER.webp",
        "fraction": "heralds",
        "rarity": "legendary",
        "id": 91,
        "slot": "weapon"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_STEEL_FOOT.webp",
        "unavailable": true,
        "fraction": "",
        "rarity": "",
        "id": 92,
        "slot": ""
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_STONE_SKIN.webp",
        "unavailable": true,
        "fraction": "",
        "rarity": "",
        "id": 93,
        "slot": ""
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_STRICT_MASTER.webp",
        "fraction": "dynasty",
        "rarity": "legendary",
        "id": 94,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_SWIFT_MONGOOSE.webp",
        "fraction": "dynasty",
        "rarity": "epic",
        "id": 95,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_SYNCHRONIZATION.webp",
        "fraction": "heralds",
        "rarity": "legendary",
        "id": 96,
        "slot": "weapon"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_TIGER_STEP.webp",
        "fraction": "dynasty",
        "rarity": "epic",
        "id": 97,
        "slot": "weapon"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_TIME_BOMB.webp",
        "fraction": "heralds",
        "rarity": "legendary",
        "id": 98,
        "slot": "weapon"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_TRANSFUSION.webp",
        "fraction": "heralds",
        "rarity": "legendary",
        "id": 99,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_UNITY.webp",
        "fraction": "dynasty",
        "rarity": "epic",
        "id": 100,
        "slot": "weapon"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_UNSTABLE_NEUTRALIZER.webp",
        "fraction": "heralds",
        "rarity": "legendary",
        "id": 101,
        "slot": "helm"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_VAPORIZATION.webp",
        "fraction": "heralds",
        "rarity": "legendary",
        "id": 102,
        "slot": "helm"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_VENGEFUL_TIGER.webp",
        "fraction": "dynasty",
        "rarity": "epic",
        "id": 103,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_VENOMOUS_LIMBS.webp",
        "fraction": "dynasty",
        "rarity": "epic",
        "id": 104,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_WEAKNESS.webp",
        "fraction": "dynasty",
        "rarity": "rare",
        "id": 105,
        "slot": "weapon"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_WILL_TO_WIN.webp",
        "fraction": "legion",
        "rarity": "rare",
        "id": 106,
        "slot": "weapon",
        // "bonuses": {
        //     "damage": [0.1,0.3],
        //     "if": {
        //         "health<n": [0.2, 0.5],
        //         "health_you": true
        //     }
        // }
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_WOLVERINE.webp",
        "fraction": "dynasty",
        "rarity": "legendary",
        "id": 107,
        "slot": "weapon"
    },


    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_DEFENCE_BREAKTHROUGH.webp",
        "fraction": "legion",
        "rarity": "legendary",
        "id": 108,
        "slot": "weapon"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_WISE_GENERAL.webp",
        "fraction": "dynasty",
        "rarity": "legendary",
        "id": 109,
        "slot": "armor"
    },
    {
        "name": "",
        "icon": "img_webp/perks/ICON_PERK_SHADOW_CORROSION.webp",
        "fraction": "heralds",
        "rarity": "legendary",
        "id": 110,
        "slot": "weapon"
    }
    
];


// {
//     "name": "",
//     "icon": "img_webp/perks/ICON_PERK_BLEEDING_STACK.webp",
//     "fraction": "",
//     "rarity": ""
// },

// {
//     "name": "",
//     "icon": "img_webp/perks/ICON_PERK_SHADOW_SHARD_2.webp",
//     "fraction": "heralds",
//     "rarity": "legendary"
// },

// {
//     "name": "",
//     "icon": "img_webp/perks/ICON_PERK_ARMOR_BREAK.webp",
//     "fraction": "dynasty",
//     "rarity": "legendary",
//     "id": 9,
//     "slot": "armor"
// },