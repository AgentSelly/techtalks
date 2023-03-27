# Property Testing (with fast-check)

- Property Testing introduced/popularized with QuickCheck in Haskell in 1999
- Has re-implementations for almost every language
- Allows you to test properties about the system under test in the format
  "for all (x, y, ...), [such that precondition(x,y, ...) holds,] predicate (x,y, ...) is true
- Unlike Unit Testing, you test a property rather than input-output pairs

ex1

- Use "arbitraries" to randomly generate input data
- arbitraries come with "biases", to find error-prone values/edge cases
- when error is encountered, fast check shrinks input to find the smallest counterexample
- replay after failure

ex2

- filter() and pre() to filter out values for which the predicate doesn't need to be true
- map() and chain() to transform arbitraries
- preview generated values with sample() and statistics()

ex3

## Drawbacks, Limitations, Caveats

- (comparatively) computationally intensive
- properties can sometimes be hard to discern (risk of re-implementing function under test as property)
- code under test might not behave differently for different inputs

ex4

- complexity of tests can be higher than regular unit tests
- test results (between runs) may vary in certain cases (e.g. small number of runs, but many arbitraries)

See propertyToAd.test.ts
propertyToAd.test.ts