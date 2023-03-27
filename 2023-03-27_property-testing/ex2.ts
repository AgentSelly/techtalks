import test from "node:test";
import fc from "fast-check";

function unique(input: number[]) {
  return input.filter((n, i) => {
    return !input.slice(0, i).includes(n);
  });
}

test("unique should not contain duplicate numbers", () => {
  fc.assert(
    fc.property(fc.array(fc.nat({ max: 100 })), (ints) => {
      const expected = new Set(ints);
      return unique(ints).length === expected.size;
    }),
    {
      verbose: true,
      endOnFailure: false,
    }
  );
});
