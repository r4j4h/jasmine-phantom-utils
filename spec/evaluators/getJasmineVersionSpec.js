
describe('getJasmineVersion', function() {

    describe('returns jasmine title and version from page', function() {

        beforeEach(function() {
            this.documentMock = jasmine.createSpy('document');
            this.documentMock.body = jasmine.createSpyObj('body', ['querySelector']);

            this.titleQuerySelectorResultMock = {
                innerText: 'title'
            };
            this.versionQuerySelectorResultMock = {
                innerText: 'version'
            };
            this.elseQuerySelectorResultMock = {
                innerText: 'some-unexpected-inner-text'
            };

            var that = this;
            this.documentMock.body.querySelector.and.callFake( function(selector) {
                if ( selector == '.jasmine-banner .jasmine-title' ) {
                    return that.titleQuerySelectorResultMock;
                } else if ( selector = '.jasmine-banner .jasmine-version' ) {
                    return that.versionQuerySelectorResultMock;
                } else {
                    return that.elseQuerySelectorResultMock;
                }
            } );

            var global = (function() { return this; })();
            global.document = this.documentMock;
        });

        it('returns jasmine title and version from page', function() {
            var evaluator = require('../../lib/evaluators/evaluators.js' ).getJasmineVersion;

            var actual = evaluator();

            expect( actual ).toBe('title version');
        });

    });

});
