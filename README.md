`jasmine-phantom-utils` is a small library providing helper functions for parsing [Jasmine](jasmine.github.io)'s Html SpecRunner's DOM when using a headless browser like [PhantomJS](https://github.com/ariya/phantomjs).

Geared for its [run-jasmine example](https://github.com/ariya/phantomjs/blob/master/examples/run-jasmine.js).

It is broken up into evaluators and transformers.

Evaluators are intended to be given to page.evaluate and return information about the DOM.

Transformers are intended to parse and transform that information into a more readable or otherwise useful format.
