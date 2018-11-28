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
have guarded these with feature detection code to keep backwards compatibility with the existing API and browser-based test runner.

I would have preferred to modify update_quality to accept the items array as an argument, but elected not to to keep backwards compatibility. Have also stuck with existing naming style rather than the more populate js camelCase naming.

13:25
Skeleton nodejs support and test running is committed
Now to add regression tests for existing behaviour
I'm doing this by reading the README specification, and iteratively writing tests, trying to avoid looking at the real code yet if possible

13:32
Have set up jasmine to run on change as documented here: https://github.com/jasmine/jasmine-npm/issues/5
`nodemon --exec jasmine`, using this to see test results as each test is added.

13:52
Completed regression pack and added README for how to run tests

13:54 PAUSE
13:57 BACK

13:57
Ok, now we have a solid foundation to build upon, on to the actual problem at hand.
We're told that we can't modify the Item function, so that suggests we're not allowed to add any additional fields to store the fact an item is conjured. Given this constraint, and the fact that most existing logic hangs off the item name field, it seems reasonable to treat "Conjured" as a potential prefix on an item name, and use this to distinguish.
I'm also going to assume for now that Conjured items are distinct from the existing special-cases, ie you cannot have "Conjured Aged Brie".
In a real-life scenario this is definitely something I'd seek input on from the wider team / the customers / the supplier / the product team etc.
As this input isn't available for the test, I'm choosing to go with the simplest approach and the one which I expect to take the least time, as time can be spent later - but cannot be unspent.

14:02
Adding testcase for new behaviour, I'm going to try and remember to commit often during this phase so that the git history shows the intermediary steps
I'm going to use a pairwise-inspired scheme for the test data to ensure that conjured is treated as a prefix, where each scenario uses a different conjured item. It would be possible to write code which only applies one aspect of the conjured logic to each test scenario and still pass these tests, but that code we'd expect to look obviously wrong.
