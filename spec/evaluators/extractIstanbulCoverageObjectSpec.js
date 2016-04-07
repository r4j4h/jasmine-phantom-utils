describe('extractIstanbulCoverageObject', function() {

    it('returns global __coverage__ object from page', function() {
        var evaluator = require('../../lib/evaluators/evaluators.js' ).extractIstanbulCoverageObject;

        var global = (function() { return this; })();
        global.__coverage__ = 'yay';

        var actual = evaluator();

        expect( actual ).toBe('yay');
    });

});
