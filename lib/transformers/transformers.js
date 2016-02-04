


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
        if ( className === 'jasmine-passed' )
            ret += consoleStyles.green + '.';
        else if ( className === 'jasmine-failed' )
            ret += consoleStyles.red + 'x';
        else if ( className === 'jasmine-pending' )
            ret += consoleStyles.yellow + '*';
        else
            ret += '?';
        // if ( i !== last)
        // ret += '\n';
    }

    ret += consoleStyles.reset;

    return ret;
}

/**
 * Convert a pending specs list into a formatted section listing their names.
 *
 * @param {{name: String}[]} pendingSpecs Array of objects with 'name' property
 * @param {{white: String, bg_yellow: String, reset: String}} consoleStyles Object mapping to an enum from console-styles
 */
function transformAndPrintPendingSpecsToPendingSpecListSection(pendingSpecs, consoleStyles) {
    var i, pendingSpec;

    console.log( consoleStyles.bg_yellow + consoleStyles.white + 'Pending Tests (Skipped):' + consoleStyles.reset + '' );

    for ( i = 0, l = pendingSpecs.length; i < l; i++ ) {
        pendingSpec = pendingSpecs[ i ];

        // If there are multiple entries they will automatically be
        // comma separated by console.log
        console.log( pendingSpec.name );
    }

    console.log( '-----------' );

}

/**
 * Convert a failed specs list into a formatted section listing their names and stack traces.
 *
 * @param {{desc:*, fail:*, failStackTrace: *}[]} failedSpecs
 * @param {{bg_red: String, white: String, reset: String}} consoleStyles Object mapping to an enum from console-styles
 */
function transformAndPrintFailedSpecsToFailedListSection(failedSpecs, consoleStyles) {
    var i, failedSpec;

    console.log(consoleStyles.bg_red + consoleStyles.white + 'Failed Tests:' + consoleStyles.reset + '\n');

    for ( i = 0, l = failedSpecs.length; i < l; i++ ) {
        failedSpec = failedSpecs[i];

        // If there are multiple entries they will automatically be
        // comma separated by console.log
        console.log( failedSpec.desc );
        console.log( failedSpec.fail );
        // Commenting this out since the fail property contains the top of the stack trace
        //console.log( failedSpec.failStackTrace );
        console.log( '' );
    }

    console.log('-----------');

}

module.exports.transformSymbolsToDotLine = transformSymbolsToDotLine;
module.exports.transformAndPrintPendingSpecsToPendingSpecListSection = transformAndPrintPendingSpecsToPendingSpecListSection;
module.exports.transformAndPrintFailedSpecsToFailedListSection = transformAndPrintFailedSpecsToFailedListSection;
