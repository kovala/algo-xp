import {expect, test} from "bun:test";
import {map, take} from "lodash";
import {genRandomStrArray} from "../common/utils";
import {bench, run} from "mitata";

const asKey = (str: string) => [...str].sort().join("")
// O(m∗nlogn)
const groupAnagramsNaive = (arr: string[]) => {
  let m = new Map<string, string[]>
  for (let a of arr) {
    const k = asKey(a)
    if (m.has(k)) {
      m.get(k).push(a)
    } else {
      m.set(k, [a])
    }
  }
  return [...m.values()]
}

// create unified key
// {k: "10100000000000000001000000",}
const asKeySmart = (str: string) => {
  const count = new Array(26).fill(0);
  for (let c of str) {
    count[c.charCodeAt(0) - 'a'.charCodeAt(0)] += 1;
  }
  return count.join('');
}
const groupAnagramsOptimal = (arr: string[]) => {
  let m = new Map<string, string[]>
  for (let a of arr) {
    const k = asKeySmart(a)
    console.log({k})

    if (m.has(k)) {
      m.get(k).push(a)
    } else {
      m.set(k, [a])
    }
  }
  return [...m.values()]
}
test("text key function", () => {
  console.log(['cat', asKeySmart('cat')])
  console.log(['tac', asKeySmart('tac')])
})

test("group anagrams naive", () => {
  const expected = [["hat"],["act", "cat"],["stop", "pots", "tops"]]
  const result = groupAnagramsNaive(["act","pots","tops","cat","stop","hat"])

  const a = map(result, a=>a.sort().join('-')).sort()
  const b = map(expected, a=>a.sort().join('-')).sort()
  console.log({a, b})
  expect(a).toEqual(b)
})
test("group anagrams optimal", () => {
  const expected = [["hat"],["act", "cat"],["stop", "pots", "tops"]]
  const result = groupAnagramsOptimal(["act","pots","tops","cat","stop","hat"])

  const a = map(result, a=>a.sort().join('-')).sort()
  const b = map(expected, a=>a.sort().join('-')).sort()
  console.log({a, b})
  expect(a).toEqual(b)
})

test("benchmark: group anagrams", async () => {
  const big = 100_000
  const bigArr = genRandomStrArray(big, 1, 100)

  console.log(take(bigArr, 10))

  if (Bun.env['b'] == '1') {
    bench('groupAnagramsNaive big', () => groupAnagramsNaive(bigArr));
    bench('groupAnagramsOptimal big', () => groupAnagramsOptimal(bigArr));

    await run()
  }
})
