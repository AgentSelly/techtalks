# Property Testing (with fast-check)

- Property Testing introduced/popularized with QuickCheck in Haskell in 1999
- Has re-implementations for almost every language
- Allows you to test properties about the system under test in the format
  "for all (x, y, ...), [such that precondition(x,y, ...) holds,] predicate (x,y, ...) is true
- Unlike Unit Testing, you test a property rather than input-output pairs

ex1 - demonstrates difference between unit test and property test

- Use "arbitraries" to randomly generate input data
- arbitraries come with "biases", to find error-prone values/edge cases
- when error is encountered, fast check shrinks input to find the smallest counterexample
- replay after failure

ex2 - arbitrary combinator and debugging with playback

- filter() and pre() to filter out values for which the predicate doesn't need to be true
- map() and chain() to transform arbitraries
- preview generated values with sample() and statistics()

ex3 - demonstrates use of chain(), sample() and statistics()

## Drawbacks, Limitations, Caveats

- (comparatively) computationally intensive (because lots of tests have to be generated)
- properties can sometimes be hard to discern (risk of re-implementing function under test as property)
- code under test might not behave differently for different inputs -> fast-check adds more unnecessary complexity without any gain

ex4 - Result does not behave differently for different inputs

- complexity of tests can be higher than regular unit tests
- test results (between runs) may vary in certain cases (e.g. small number of runs, but many arbitraries)

See propertyToAd.test.ts in monorepo/consumer-exporter for a test where too many arbitraries were used and as a result errors were only sometimes discovered with the default number of test runs (which is 100). Increasing number of runs to 1000 alleviated the issue in that case.
