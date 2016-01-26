describe('transformSymbolsToDotLine', function() {

    describe('converts array of result strings into coded symbols using consoleStyles', function() {

        var consoleStyles = require('console-styles' );
        var transformer = require('../../lib/transformers/transformers.js' ).transformSymbolsToDotLine;

        var standardConsoleStyles = consoleStyles.standard,
            noConsoleStyles = consoleStyles.empty;

        it('converts passed as a .', function() {
            expect( transformer(['passed', 'passed'], noConsoleStyles ) ).toBe('..');
        });

        it('converts pending as a *', function() {
            expect( transformer(['pending', 'pending'], noConsoleStyles ) ).toBe('**');
        });

        it('converts failed as a x', function() {
            expect( transformer(['failed', 'failed'], noConsoleStyles ) ).toBe('xx');
        });

        it('converts anything else to a ?', function() {
            expect( transformer(['foo', 'bar'], noConsoleStyles ) ).toBe('??');
        });

        it('handles mixture', function() {
            expect( transformer(['passed', 'failed', 'passed', 'pending'], noConsoleStyles ) ).toBe('.x.*');
        });

        it('uses console styles if given', function() {
            expect( JSON.stringify( transformer(['passed', 'failed', 'passed', 'pending'], noConsoleStyles ) ) ).toBe('".x.*"');
            expect( JSON.stringify( transformer(['passed', 'failed', 'passed', 'pending'], standardConsoleStyles ) ) ).toBe( JSON.stringify('\u001b[32m.\u001b[31mx\u001b[32m.\u001b[33m*\u001b[m'));
        });

    });

});