var jsdom = require('jsdom');

describe('getFailedSpecs', function() {

    describe('returns the failed tests with their names, failure reason, and call stacks as objects in an array', function() {

        beforeAll(function() {
            this.evaluator = require('../../lib/evaluators/evaluators.js' ).getFailedSpecs;
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
            setDom('<body><div class="jasmine_html-reporter">' +
                '<div class="jasmine-spec-detail jasmine-failed">' +
                    '<div class="jasmine-description">desc1</div>' +
                    '<div class="jasmine-messages">' +
                        '<div class="jasmine-result-message">msg1.1</div>' +
                    '</div>' +
                    '<div class="jasmine-stack-trace">stacktrace1</div>' +
                '</div>' +
                '<div class="jasmine-spec-detail jasmine-failed">' +
                    '<div class="jasmine-description">desc2</div>' +
                    '<div class="jasmine-messages">' +
                        '<div class="jasmine-result-message">msg2.1</div>' +
                        '<div class="jasmine-result-message">msg2.2</div>' +
                    '</div>' +
                    '<div class="jasmine-stack-trace">stacktrace2</div>' +
                '</div>' +
                '</div></body>');

            var actual = this.evaluator();
            expect( actual ).toEqual([
                {
                    desc: ['desc1'],
                    fail: ['msg1.1'],
                    failStackTrace: ['stacktrace1']
                },
                {
                    desc: ['desc2'],
                    fail: ['msg2.1', 'msg2.2'],
                    failStackTrace: ['stacktrace2']
                }
            ]);
        });

    });

});
