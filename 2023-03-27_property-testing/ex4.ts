import fc from "fast-check";
import test from "node:test";
import assert from "node:assert/strict";

export abstract class Result<T, E> {
  protected constructor(
    private value: { data: T; ok: true } | { err: E; ok: false }
  ) {}

  public static ok<T>(data: T) {
    return new Ok<T>(data);
  }

  public static err<E>(err: E) {
    return new Err<E>(err);
  }

  public static fromPromise<T>(promise: Promise<T>) {
    return promise.then(Result.ok).catch(Result.err);
  }

  public flatMap<U, F>(f: (value: T) => Result<U, F>): Result<U, F> | Err<E> {
    if (!this.value.ok) return Result.err(this.value.err);

    return f(this.value.data);
  }

  public isOk() {
    return this.value.ok;
  }

  public isErr() {
    return !this.value.ok;
  }

  public map<U>(f: (value: T) => U): Result<U, E> {
    return this.flatMap((value) => Result.ok(f(value)));
  }

  public unwrap(): T {
    if (this.value.ok) return this.value.data;

    throw new Error("Result is Err and could not be unwrapped");
  }

  public unwrapErr(): E {
    if (!this.value.ok) return this.value.err;

    throw new Error("Result Ok and its error could be unwrapped");
  }

  public unwrapOrElse<F>(f: (err: E) => F): T | F {
    if (this.value.ok) return this.value.data;

    return f(this.value.err);
  }

  public unwrapOr(defaultValue: T): T {
    return this.unwrapOrElse(() => defaultValue);
  }
}

class Ok<T> extends Result<T, never> {
  constructor(value: T) {
    super({ data: value, ok: true });
  }
}

class Err<E> extends Result<never, E> {
  constructor(err: E) {
    super({ err: err, ok: false });
  }
}

test("flatMap must follow the left identity law return a >>= f === f a] for Result.ok", () => {
  fc.assert(
    fc.property(fc.integer(), (a) => {
      const f = (x: number) => Result.ok(2 * x);
      assert.deepEqual(Result.ok(a).flatMap(f), f(a));
    })
  );
});
