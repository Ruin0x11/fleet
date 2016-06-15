import { createSelector } from 'reselect'
import { getState } from 'redux'

const getApiDeckList = (state) => state.portData.api_data.api_deck_port
const getApiShipList = (state) => state.portData.api_data.api_ship
const getApiBasicData = (state) => state.portData.api_data.api_basic

const getPlayerData = createSelector(
    getApiBasicData,
    (apiBasicData) => {

    }
)

const getShip = (id, ships) => {
    var ship = ships[id];
    if(id == -1) {
        return null;
    }
    return {
        id: ship.api_id,
        ship_id: ship.api_ship_id,
        level: ship.api_lv,
        nowExp: ship.api_exp[0],
        nextExp: ship.api_exp[1],
        nowHp: ship.api_nowhp,
        maxHp: ship.api_maxhp,
        fuel: ship.api_fuel,
        ammo: ship.api_bull,
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

const getDeck = (deck, shipList) => {
    return {
        id: deck.api_id,
        name: deck.api_name,
        ships: deck.api_ship.map(id => getShip(id, shipList)).filter(n => true),
        missions: deck.api_mission
    }
}

export const getDeckList = createSelector(
    getApiDeckList,
    getShipList,
    (apiDeckList, shipList) => {
        console.log(shipList)
        return apiDeckList.map(deck => getDeck(deck, shipList))
    }
)
