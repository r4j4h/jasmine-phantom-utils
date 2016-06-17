var jsdom = require('jsdom');

describe('getResultSummarySpec', function() {

    describe('returns the summary blurb from page', function() {

        beforeAll(function() {
            this.evaluator = require('../../lib/evaluators/evaluators.js' ).getResultSummary;
        });

        afterAll(function() {
            global.document = this.realDocument;
        });

        function setDom(dom) {
            this.document = jsdom.jsdom(dom);
            var global = (function() { return this; })();
            this.realDocument = global.document;
            global.document = this.document;
        }

        it('detects success summary', function() {
            setDom('<body><div class="jasmine-bar">' +
                '38 specs' +
                '</div></body>');

            var actual = this.evaluator();
            expect( actual ).toBe('38 specs');
        });

        it('detects failure', function() {
            setDom('<body><div class="jasmine-alert">' +
                '<span class="jasmine-bar">38 specs | 1 failing</span>' +
                '</div></body>');

            var actual = this.evaluator();
            expect( actual ).toBe('38 specs | 1 failing');
        });

    });

});
