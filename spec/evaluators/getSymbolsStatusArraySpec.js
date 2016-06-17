var jsdom = require('jsdom');

describe('getSymbolsStatusArray', function() {

    describe('returns the status array from page', function() {

        beforeAll(function() {
            this.evaluator = require('../../lib/evaluators/evaluators.js' ).getSymbolsStatusArray;
        });

        beforeEach(function() {
            this.document = jsdom.jsdom('<body><div class="jasmine-symbol-summary">' +
                '<li class="passing">.</li>' +
                '<li class="pending">?</li>' +
                '<li class="failed">x</li>' +
                '<li class="passing">.</li>' +
                '<li class="unexpected">Y?</li>' +
                '</div></body>');

            var global = (function() { return this; })();
            this.realDocument = global.document;
            global.document = this.document;
        });

        afterAll(function() {
            global.document = this.realDocument;
        });

        it('returns jasmine title and version from page', function() {
            var actual = this.evaluator();
            expect( actual ).toEqual([
                'passing',
                'pending',
                'failed',
                'passing',
                'unexpected'
            ]);
        });

    });

});
