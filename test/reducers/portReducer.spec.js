import { expect } from 'chai';
import portReducer from '../../app/reducers/port';
import { PORT_UPDATE } from '../../app/actions/port';
import { SORTIE_UPDATE } from '../../app/actions/sortie';
import { BATTLE_RESULT_UPDATE } from '../../app/actions/battleResult';

function setup() {
    const portData = require('../mocks/portDataMock.json');
    const sortieData = require('../mocks/sortieDataMock.json')
    const battleResultData = require('../mocks/battleResultDataMock.json')
    return {
        portData,
        sortieData,
        battleResultData
    };
}

describe('reducers', () => {
    describe('portReducer', () => {
        it('should handle initial state', () => {
            expect(portReducer(undefined, {})).to.eql({});
        });

        it('should handle PORT_UPDATE', () => {
            const { portData } = setup();
            var result = portReducer({}, { type: PORT_UPDATE, data: portData });
            var ships = result.api_ship;
            expect(ships[0].api_id).to.equal(1);
            expect(ships[0].api_nowhp).to.equal(30);
            expect(ships[0].api_maxhp).to.equal(30);
            expect(ships[0].api_lv).to.equal(10);
            expect(ships[0].api_cond).to.equal(80);
        });

        it('should handle SORTIE_UPDATE', () => {
            const { portData, sortieData } = setup();
            var state = portReducer({}, { type: PORT_UPDATE, data: portData });
            var ships = state.api_ship
            expect(ships[0].api_nowhp).to.equal(30);
            var result = portReducer(state, { type: SORTIE_UPDATE, data: sortieData })
            ships = result.api_ship
            // there are a total of 6 stages, each of which do 1 damage to the first ship
            expect(ships[0].api_nowhp).to.equal(24);
        });

        it('should handle BATTLE_RESULT_UPDATE', () => {
            const { portData, battleResultData } = setup();
            var state = portReducer({}, { type: PORT_UPDATE, data: portData });
            var ships = state.api_ship
            expect(ships[0].api_exp[0]).to.equal(30000); // total
            expect(ships[0].api_exp[1]).to.equal(1200);  // to next level
            var result = portReducer(state, { type: BATTLE_RESULT_UPDATE, data: battleResultData })
            ships = result.api_ship
            // gained 540 experience, level up was at 1500
            expect(ships[0].api_exp[0]).to.equal(30540);
            expect(ships[0].api_exp[1]).to.equal(240);
        });

        it('should handle unknown action type', () => {
            expect(portReducer({}, { type: 'unknown' })).to.eql({});
        });
    });
});
