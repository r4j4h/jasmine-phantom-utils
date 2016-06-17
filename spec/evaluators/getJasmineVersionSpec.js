var jsdom = require('jsdom');

describe('getJasmineVersion', function() {

    describe('returns jasmine title and version from page', function() {

        beforeAll(function() {
            this.evaluator = require('../../lib/evaluators/evaluators.js' ).getJasmineVersion;
        });

        beforeEach(function() {
            this.document = jsdom.jsdom('<body><div class="jasmine-banner">' +
                '<span class="jasmine-title">jasmine</span>' +
                '<li class="jasmine-version">?</li>' +
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
            expect( actual ).toBe('jasmine ?');
        });

    });

});
