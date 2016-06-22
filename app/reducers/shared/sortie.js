import { getInitializedArray } from './general'

export function getShipDamage(data) {
    var shipDamage = getInitializedArray(0);
    shipDamage = mergeDamages(shipDamage, getKoukuDamage(data));
    shipDamage = mergeDamages(shipDamage, getOpeningDamage(data));
    shipDamage = mergeDamages(shipDamage, getHougekiDamage(data));
    shipDamage = mergeDamages(shipDamage, getRaigekiDamage(data));

    return shipDamage;
}

function mergeDamages(damageA, damageB) {
    return damageA.map(function (damage, i) {
        return damageB[i] + damage;
    });
}

function getKoukuDamage(data) {
    var kouku = data.api_kouku;
    if(!kouku.api_stage3) {
        return getInitializedArray(0);
    }
    var fdam = kouku.api_stage3.api_fdam;
    var edam = kouku.api_stage3.api_edam;
    // remove leading -1s
    fdam.shift();
    edam.shift();
    return fdam.concat(edam);
}

function getOpeningDamage(data) {
    // attack is misspelled as "atack"
    var opening_atack = data.api_opening_atack;
    if(!opening_atack) {
        return getInitializedArray(0);
    }
    var fdam = opening_atack.api_fdam;
    var edam = opening_atack.api_edam;
    // remove leading -1s
    fdam.shift();
    edam.shift();
    return fdam.concat(edam);
}

function getSingleHougekiDamage(hougeki) {
    if(!hougeki) {
        return getInitializedArray(0);
    }
    var df_list = hougeki.api_df_list;
    var damage = hougeki.api_damage;
    var shipDamage = getInitializedArray(0);

    for (var i = 0, len = df_list.length; i < len; i++) {
        // TODO: find case with multiple damages in single attack
        var target = df_list[i][0];
        var targetDamage = damage[i][0]
        // the arrays are 1-indexed, so subtract 1
        shipDamage[target-1] += targetDamage;
    }

    return shipDamage
}

function getHougekiDamage(data) {
    var shipDamage = getInitializedArray(0);

    var stages = ["api_hougeki1", "api_hougeki2", "api_hougeki3"]

    for(var i = 0, len = stages.length; i < len; i++) {
        if(data[stages[i]]) {
            var currentDamage = getSingleHougekiDamage(data[stages[i]])
            shipDamage = mergeDamages(shipDamage, currentDamage)
        }
    }
    return shipDamage;
}

function getRaigekiDamage(data) {
    var raigeki = data.api_raigeki;
    if(!raigeki) {
        return getInitializedArray(0);
    }
    var fdam = raigeki.api_fdam;
    var edam = raigeki.api_edam;
    // remove leading -1
    fdam.shift();
    edam.shift();
    return fdam.concat(edam);
}
