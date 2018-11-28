12:58 - Have skimmed over the repo beforehand
Tempted by Clojure, but haven't done any for a couple of years so worried i'll be rusty and waste time down rabbitholes.
Decided to go with JS.

13:00
Step 1 - need confidence in changes, existing testsuite is browser based, but also empty. I'd prefer something that runs in nodejs to help with iteration speed.

13:01 PAUSE
13:05 BACK

13:05 I prefer mocha to jasmine, but it seems like bad form to change test runner - even though there are no tests. Will go for jasmine and hope I don't hit any hiccups.
npm init
npm install --save-dev jasmine
npm test -- init
npm test
annoyingly the jasmine npm package leaves us with a deprecation warning that can't be silenced https://github.com/jasmine/jasmine-npm/issues/145

13:12
also had to add some module stuff to the files to make it work with nodejs
have guarded these with feature detection code to keep backwards compatibility

I would have preferred to modify update_quality to accept the items array as an argument, but elected not to to keep backwards compatibility
