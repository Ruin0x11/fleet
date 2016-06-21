import { expect } from 'chai';
import messageReducer from '../../app/reducers/message';
import portReducer from '../../app/reducers/port';
import { PORT_UPDATE } from '../../app/actions/port';
import { SORTIE_UPDATE } from '../../app/actions/sortie';
import { BATTLE_RESULT_UPDATE } from '../../app/actions/battleResult';

function setup() {
    const portData = require('../mocks/portDataMock.json');
    const state = portReducer({}, { type: PORT_UPDATE, data: portData })
    const sortieEnemyRemains = require('../mocks/sortieEnemyRemains.json')
    const sortieHeavilyDamaged = require('../mocks/sortieHeavilyDamaged.json')
    const sortieAllEnemiesDestroyed = require('../mocks/sortieAllEnemiesDestroyed.json')
    const battleResultData = require('../mocks/battleResultDataMock.json')
    return {
        state,
        sortieAllEnemiesDestroyed,
        sortieEnemyRemains,
        sortieHeavilyDamaged,
        battleResultData
    };
}

describe('reducers', () => {
    describe('messageReducer', () => {
        it('should handle initial state', () => {
            expect(messageReducer(undefined, {})).to.eql({ message: "" });
        });

        it('notifies when all enemies are destroyed', () => {
            const { state, sortieAllEnemiesDestroyed } = setup();
            var result = messageReducer(state, { type: SORTIE_UPDATE,
                                                 data: sortieAllEnemiesDestroyed })
            expect(result.message).to.eql("All enemies defeated. Moving to next stage.")
        });

        it('notifies when enemies remain after a battle', () => {
            const { state, sortieEnemyRemains } = setup();
            var result = messageReducer(state, { type: SORTIE_UPDATE,
                                                 data: sortieEnemyRemains })
            expect(result.message).to.eql("6 enemies still remain. Waiting for night battle/retreat.")
        });

        it('notifies when a ship is heavily damaged', () => {
            const { state, sortieHeavilyDamaged } = setup();
            var result = messageReducer(state, { type: SORTIE_UPDATE,
                                                 data: sortieHeavilyDamaged })
            expect(result.message).to.eql("One or more ships heavily damaged. Return immediately!")
        });

        it('notifies when a ship is obtained', () => {
            const { state, battleResultData } = setup();
            var result = messageReducer(state, { type: BATTLE_RESULT_UPDATE,
                                                 data: battleResultData })
            expect(result.message).to.include("Obtained ship")
            expect(result.message).to.include("霞")
        });

        it('should handle unknown action type', () => {
            expect(messageReducer({}, { type: 'unknown' })).to.eql({});
        });
    });
});
