import {test, expect} from "bun:test";
import {bench, run} from "mitata";
import {genRandomArray} from "../common/utils.ts";



// Naive recursive approach
const twoSumFullyRecursive = (arr: number[], target: number) => {
  const sumIt = (i: number, j: number) => {
    if (i == arr.length - 1) return []

    if (arr[i] + arr[j] === target) return [i, j]

    if (j == arr.length - 1) return sumIt(i + 1, i + 1)

    return sumIt(i, j + 1)
  }

  // (0,1),(0,2) .. (0,n)
  // (1,2),(1,3) .. (1,n)
  // (n-1,n)

  return sumIt(0,1)
}

// Try to cache
const twoSumRecursiveCached = (arr: number[], target: number) => {
  const map: { [k: number]: number } = {}
  const sumIt = (i: number) => {
    if (i == arr.length - 1) return []

    const v = arr[i];
    const k = target - v;
    if (map[k]) {
      return [map[k], i];
    }
    // store index
    map[v] = i

    // if (j == arr.length-1) {
    //   return sumIt(i + 1, i + 1)
    // }
    // return sumIt(i, j+1)

    return sumIt(i + 1)
  }
  return sumIt(0)
}
const twoSumRecursiveCachedWithMap = (arr: number[], target: number) => {
  const map = new Map<number, number>();

  const sumIt = (i: number) => {
    if (i == arr.length - 1) return []

    const v = arr[i];
    const k = target - v;
    if (map.has(k)) {
      return [map.get(k), i];
    }
    // store index
    map.set(k,  v)
    return sumIt(i + 1)
  }
  return sumIt(0)
}

// linear
const twoSumTwoPass = (nums, target) => {
  const indices = {};
  for (let i = 0; i < nums.length; i++) {
    indices[nums[i]] = i;
  }
  for (let i = 0; i < nums.length; i++) {
    let diff = target - nums[i];
    if (indices[diff] !== undefined && indices[diff] !== i) {
      return [i, indices[diff]];
    }
  }
  return [];
};
const twoSumWithMap = (arr: number[], target: number): number[] => {
  const map = new Map<number, number>();
  for (let i = 0; i < arr.length; i++) {
    const k = target - arr[i];
    if (map.has(k)) {
      return [map.get(k)!, i];
    }
    // store the current value and index in the map
    map.set(arr[i], i);
  }
  return [];
}
const twoSum = (arr: number[], target: number): number[] => {
  const map: { [k: number]: number } = {}

  for (let i = 0; i < arr.length; i++) {
    const k = target - arr[i];
    if (map[k]) {
      return [map[k], i];
    }
    // store the current value and index in the map
    map[k] = i
  }
  return [];
}

test("two sum 0 fully recursive", () => {
  const result = twoSumFullyRecursive([1, 7, 2, 6, 7, 3, 4, 5, 6], 13)
  expect(result).toEqual([1,3])
})
test("two sum 1 recursive cached", () => {
  const result = twoSumRecursiveCached([1, 7, 2, 6, 7, 3, 4, 5, 6], 13)
  expect(result).toEqual([1,3])
})
test("two sum 2 linear", () => {
  const result = twoSumWithMap([1, 7, 2, 6, 7, 3, 4, 5, 6], 13)
  expect(result).toEqual([1,3])
})


test("benchmark: two sum", async () => {
  const big = 1_000_000
  const bigArr = genRandomArray(big, 1, big);

  if (Bun.env['b'] == '1') {
    // const arr = [1, 7, 2, 6, 7, 3, 4, 5, 6]
    // const sum = 13
    // bench('twoSumFullyRecursive', () => twoSumFullyRecursive(arr, sum));
    // bench('twoSumRecursiveCached', () => twoSumRecursiveCached(arr, sum));
    // bench('twoSumRecursiveCachedWithMap', () => twoSumRecursiveCachedWithMap(arr, sum));

    bench('twoSumTwoPass big', () => twoSumTwoPass(bigArr, big));
    bench('twoSum big', () => twoSum(bigArr, big));
    bench('twoSumWithMap big', () => twoSumWithMap(bigArr, big));

    await run()
  }
})
