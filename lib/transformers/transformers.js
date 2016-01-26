


/**
 * Transform an array of symbol statuses into colored dots and x's.
 * @param  {array} symbolsStatusArray Array of strings containing 'passed' or 'failed'
 * @param  {{green: String, red: String, yellow: String, reset: String}} consoleStyles Object mapping to an enum from console-styles
 * @return {string}                   String of console color coded characters
 */
function transformSymbolsToDotLine(symbolsStatusArray, consoleStyles) {
    var ret = '';

    for ( var item, className, i = 0, l = symbolsStatusArray.length, last = l-1; i < l; ++i ) {
        item = symbolsStatusArray[i];
        className = item;
        if ( className === 'passed' )
            ret += consoleStyles.green + '.';
        else if ( className === 'failed' )
            ret += consoleStyles.red + 'x';
        else if ( className === 'pending' )
            ret += consoleStyles.yellow + '*';
        else
            ret += '?';
        // if ( i !== last)
        // ret += '\n';
    }

    ret += consoleStyles.reset;

    return ret;
}

module.exports.transformSymbolsToDotLine = transformSymbolsToDotLine;
