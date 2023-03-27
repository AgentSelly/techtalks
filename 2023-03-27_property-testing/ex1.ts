import test from "node:test";
import fc from "fast-check";
import assert from "node:assert/strict";

function removeChar(s: string, c: string) {
  // return s.replaceAll(c, ""); // working version
  return s.replace(c, "");
}

test("removeChar should remove all occurrences of a char in a string", () => {
  // run test, then comment out next 4 lines and uncomment fc.assert statement, run again
  const str = "hello!";
  const char = "!";
  const expected = "hello";
  assert.equal(removeChar(str, char), expected);

  //   fc.assert(
  //     fc.property(
  //       // for all (x, y)
  //       fc.string(),
  //       fc.char(),
  //       (x, y) => {
  //         // such that precondition(x.includes(y)) holds
  //         fc.pre(x.includes(y));

  //         // predicate (!removeChar(x, y).includes(y)) is true
  //         return !removeChar(x, y).includes(y);
  //       }
  //     )
  //   );
});
