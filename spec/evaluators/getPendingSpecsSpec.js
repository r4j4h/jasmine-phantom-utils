var jsdom = require('jsdom');

describe('getPendingSpecs', function() {

    describe('returns the pending tests with their names as objects in an array', function() {

        beforeAll(function() {
            this.evaluator = require('../../lib/evaluators/evaluators.js' ).getPendingSpecs;
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

        it('detects summary', function() {
            setDom('<div class="jasmine_html-reporter">' +
                '<div class="jasmine-summary">' +
                    '<div class="pending">' +
                        '<div class="jasmine-messages">' +
                            '<div class="jasmine-result-message">Some skipped test</div>' +
                        '</div>' +
                        '<div class="jasmine-stack-trace">stack trace info</div>' +
                        '</div>' +
                    '</div>' +
                '</div>');

            var actual = this.evaluator();
            expect( actual ).toEqual([{name:'Some skipped teststack trace info'}]);
        });

        it('detects multiple summaries', function() {
            setDom('<div class="jasmine_html-reporter">' +
                '<div class="jasmine-summary">' +
                '<div class="pending">' +
                    '<div class="jasmine-messages">' +
                    '<div class="jasmine-result-message">Some skipped test1</div>' +
                    '</div>' +
                    '<div class="jasmine-stack-trace">stack trace info1</div>' +
                '</div>' +
                '<div class="pending">' +
                    '<div class="jasmine-messages">' +
                    '<div class="jasmine-result-message">Some skipped test2</div>' +
                    '</div>' +
                    '<div class="jasmine-stack-trace">stack trace info2</div>' +
                '</div>' +
                '</div>');

            var actual = this.evaluator();
            expect( actual ).toEqual([
                {name:'Some skipped test1stack trace info1'},
                {name:'Some skipped test2stack trace info2'}
            ]);
        });

    });

});
