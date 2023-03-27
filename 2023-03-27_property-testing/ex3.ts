import test from "node:test";
import assert from "node:assert/strict";
import fc from "fast-check";

function range(from: number, to: number) {
  let out: number[] = [];

  for (let i = from; i <= to; i++) {
    out.push(i);
  }

  return out;
}

console.log("SAMPLE", fc.sample(fc.integer(), 5));
fc.statistics(fc.integer(), (n) => (n % 2 === 0 ? "Even" : "Odd"), 50);

test("range should generate an array containing all integers between the start and end parameters (inclusive)", () => {
  fc.assert(
    fc.property(
      fc
        .nat({ max: Number.MAX_SAFE_INTEGER - 1000 })
        // generate new arbitrary based on existing arbitrary with chain (~flatMap)
        .chain((n) =>
          fc.tuple(fc.constant(n), fc.integer({ min: n + 1, max: n + 1000 }))
        ),
      ([from, to]: [number, number]) => {
        const expected = Array.from(
          { length: to - from + 1 },
          (_, i) => from + i
        );

        // expect, assert etc. from test frameworks can be used instead of returning
        assert.deepEqual(range(from, to), expected);
      }
    )
  );
});
