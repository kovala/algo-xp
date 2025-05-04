import {expect, test} from "bun:test";
import {chain} from "lodash"

const findDuplicatesNaive = (arr: number[]) => {
  const result = chain(arr)
    .reduce((acc, i) => ((acc[i] = (acc[i] || 0) + 1), acc), {})
    .map((v,k)=>[+k, v])
    .filter(([_,count]) => count == 2)
    .map(([k,_]) => k)
    .value()
    ;

  return result;
}
test("findDuplicatesNaive", () => {
  const arr =  [4,3,2,7,8,2,3,1]
  const r = findDuplicatesNaive(arr)
  expect(r).toEqual([2,3])
})

const findDuplicates = (arr: number[]) => {
  const nums = [...arr]
  let result = []

  for (let n of nums) {
    // index of element where we store the marker
    const nn = Math.abs(n)
    // elmem to index
    const j = nn - 1;

    // marked - potentially could use bitmask
    if (nums[j] < 0)
      result.push(nn);
    else
      // use -nums[location] like a marker that location item exists in nums
      nums[j] = -nums[j];

    console.log({n, j, nums, result})
  }
  // for (let i=0; i<nums.length; i++) {
  //   nums[i] = Math.abs(nums[i]); // recover array
  // }
  return result;
}
test("case 1", () => {
  const arr =  [4,3,2,7,8,2,3,1]
  const r = findDuplicates(arr)
  expect(r).toEqual([2,3])

  // const arr1 =  [1,1,2]
  // const r1 = findDuplicates(arr1)
  // expect(r1).toEqual([1])

  // const arr2 = [1]
  // const r2 = findDuplicates(arr2)
  // expect(r2).toEqual([])
})
test.skip("case 2", () => {
  // const arr =  [4,3,2,7,8,2,3,1]
  // const r = findDuplicates(arr)
  // expect(r).toEqual([2,3])

  const arr1 =  [1,1,2]
  const r1 = findDuplicates(arr1)
  expect(r1).toEqual([1])

  // const arr2 = [1]
  // const r2 = findDuplicates(arr2)
  // expect(r2).toEqual([])
})
