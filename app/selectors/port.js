import { createSelector } from 'reselect'

const getApiDeckList = (state) => state.portData.api_deck_port
const getApiShipList = (state) => state.portData.api_ship
const getApiBasicData = (state) => state.portData.api_basic
const getApiNdockData = (state) => state.portData.api_ndock
const getShipInfo = (state) => state.shipInfo

const getDock = (dock, shipInfo) => {
    var shipName = "None";
    if(dock.api_ship_id > 0) {
        shipName = shipInfo[dock.api_ship_id].api_name
    }
    return {
        id: dock.api_id,
        shipName: shipName,
        state: dock.api_state,
        // convert UNIX timestamp to milliseconds
        completionDate: new Date(Date.now (dock.api_complete_time * 1000))
    }
}

export const getDockInfo = createSelector(
    getApiNdockData,
    getShipInfo,
    (apiNdockData, shipInfo) => {
        return apiNdockData.map(dock => getDock(dock, shipInfo))
    }
)

export const getPlayerData = createSelector(
    getApiBasicData,
    getApiShipList,
    (apiBasicData, apiShipList) => {
        return {
            nickname: apiBasicData.api_nickname,
            comment: apiBasicData.api_comment,
            level: apiBasicData.api_level,
            rank: apiBasicData.api_rank,
            experience: apiBasicData.api_experience,
            numChara: apiShipList.length,
            maxChara: apiBasicData.api_max_chara,
            maxEquip: apiBasicData.api_max_slotitem,
        }
    }
)

const getShip = (id, ships, shipInfo) => {
    var ship = ships[id];
    if(id == -1) {
        return null;
    }
    return {
        id: ship.api_id,
        ship_id: ship.api_ship_id,
        name: shipInfo[ship.api_ship_id].name,
        level: ship.api_lv,
        nowExp: ship.api_exp[0],
        nextExp: ship.api_exp[1],
        nowHp: ship.api_nowhp,
        maxHp: ship.api_maxhp,
        fuel: ship.api_fuel,
        maxFuel: shipInfo[ship.api_ship_id].maxFuel,
        ammo: ship.api_bull,
        maxAmmo: shipInfo[ship.api_ship_id].maxAmmo,
        slots: ship.api_onslot,
        cond: ship.api_cond
    }
}

const getShipList = createSelector(
    getApiShipList,
    (apiShipList) => {
        var lookup = {};
        var array = apiShipList;
        for (var i = 0, len = array.length; i < len; i++) {
            lookup[array[i].api_id] = array[i];
        }
        return lookup;
    }
)

const getDeckDateWhenReady = (ships) => {
    var lowestCond = ships.reduce((lowest, ship) => {
        return ship.cond < lowest ? ship.cond : lowest;
    });

    var minutesRemaining = Math.ceil((49 - lowestCond)/3);
    var dateNow = new Date();
    var dateWhenReady = new Date(dateNow);
    dateWhenReady.setMinutes(dateNow.getMinutes() + minutesRemaining)
    return dateWhenReady
}

const getDeck = (deck, shipList, shipInfo) => {
    //remove empty ship slots
    var ships = deck.api_ship.map(id => getShip(id, shipList, shipInfo)).filter(n => true)
    return {
        id: deck.api_id,
        name: deck.api_name,
        ships: ships,
        missions: deck.api_mission,
        dateWhenReady: getDeckDateWhenReady(ships)
    }
}

export const getDeckList = createSelector(
    getApiDeckList,
    getShipList,
    getShipInfo,
    (apiDeckList, shipList, shipInfo) => {
        return apiDeckList.map(deck => getDeck(deck, shipList, shipInfo))
    }
)
