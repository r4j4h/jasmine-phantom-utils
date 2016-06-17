/**
 * PhantomJS Page Evaluated Function
 *
 * Verify if the basic html reporter container div is in place.
 *
 * @returns {boolean}
 */
function hasJasmineStartedYet() {
    // The duration div is added upon all tests completing
    if (document.body.querySelector('.jasmine_html-reporter')) {
        return true;
    }
    return false;
}

/**
 * PhantomJS Page Evaluated Function
 *
 * Verify if the duration alert div appended after tests have finished running is in place.
 *
 * @returns {boolean}
 */
function hasJasmineCompletedYet() {
    // The duration div is added upon all tests completing
    if (document.body.querySelector('.jasmine-alert .jasmine-duration')) {
        return true;
    }
    return false;
}

/**
 * PhantomJS Page Evaluated Function
 *
 * Get all failed tests, their descriptions, messages, and stack traces
 * and return as objects in an array
 * @return {{desc:*, fail:*, failStackTrace: *}[]} Array of objects with 'desc', 'fail', and 'failStackTrace' properties
 */
function getFailedSpecs() {
    var i, j, failedSpecs = [];

    // Get failing spec's details
    list = document.body.querySelectorAll('div.jasmine_html-reporter .jasmine-spec-detail.jasmine-failed');
    for (i = 0; i < list.length; ++i) {
        el = list[i];
        desc           = el.querySelectorAll('.jasmine-description');
        fail           = el.querySelectorAll('.jasmine-messages .jasmine-result-message');
        failStackTrace = el.querySelectorAll('.jasmine-stack-trace');

        failedSpecs[i] = failedSpecs[i] || {};

        for (j = 0; j < desc.length; ++j) {
            failedSpecs[i].desc = failedSpecs[i].desc || [];
            failedSpecs[i].desc.push( desc[j].textContent );
        }
        for (j = 0; j < fail.length; ++j) {
            failedSpecs[i].fail = failedSpecs[i].fail || [];
            failedSpecs[i].fail.push( fail[j].textContent );
        }
        for (j = 0; j < failStackTrace.length; ++j) {
            failedSpecs[i].failStackTrace = failedSpecs[i].failStackTrace || [];
            failedSpecs[i].failStackTrace.push( failStackTrace[j].textContent );
        }
    }

    return failedSpecs;
}



/**
 * PhantomJS Page Evaluated Function
 *
 * Get all pending tests and their names
 * and return as objects in an array
 * @return {{name: String}[]} Array of objects with 'name' property
 */
function getPendingSpecs() {
    var i, j, pendingSpecs = [];

    // Get failing spec's details
    list = document.body.querySelectorAll('div.jasmine_html-reporter .jasmine-summary .pending');//div.jasmine_html-reporter .spec-detail.failed');
    for (i = 0; i < list.length; ++i) {
        el = list[i];
        desc           = el.innerHTML;
        fail           = el.querySelectorAll('.jasmine-messages .jasmine-result-message');
        failStackTrace = el.querySelectorAll('.jasmine-stack-trace');

        pendingSpecs[i] = pendingSpecs[i] || {};

        pendingSpecs[i].name = el.textContent;

    }

    return pendingSpecs;
}



/**
 * PhantomJS Page Evaluated Function
 *
 * Get 38 specs | 1 failing alert bar text
 * @return {string} Alert bar result summary text
 */
function getResultSummary() {
    return ( document.body.querySelector('.jasmine-alert .jasmine-bar') || document.body.querySelector('.jasmine-bar') ).textContent;
}


/**
 * PhantomJS Page Evaluated Function
 *
 * Get the version and title from the Jasmine HTMLRunner divs
 * @return {string} Title and Version
 */
function getJasmineVersion() {
    return document.body.querySelector('.jasmine-banner .jasmine-title').textContent + ' ' + document.body.querySelector('.jasmine-banner .jasmine-version').textContent;
}

/**
 * PhantomJS Page Evaluated Function
 *
 * Get an array of strings containing either 'passed', 'pending', or 'failed'.
 * If tests have finished, there should be no 'pending' strings present, but
 * this is not enforced.
 * @return {array} Array of strings
 */
function getSymbolsStatusArray() {
    var symbols = [],
        dotElements = document.body.querySelectorAll('.jasmine-symbol-summary > li'),
        i, item;

    for ( i = 0, l = dotElements.length; i < l; ++i ) {
        symbols.push( dotElements[i].className );
    }

    return symbols;
}

/**
 * PhantomJS Page Evaluated Function
 *
 * Grab the global __coverage__ object created by code instrumented by Istanbul code coverage library.
 */
function extractIstanbulCoverageObject() {
    return __coverage__;
}

module.exports.hasJasmineStartedYet = hasJasmineStartedYet;
module.exports.hasJasmineCompletedYet = hasJasmineCompletedYet;

module.exports.getFailedSpecs = getFailedSpecs;
module.exports.getPendingSpecs = getPendingSpecs;
module.exports.getResultSummary = getResultSummary;
module.exports.getJasmineVersion = getJasmineVersion;
module.exports.getSymbolsStatusArray = getSymbolsStatusArray;

module.exports.extractIstanbulCoverageObject = extractIstanbulCoverageObject;
