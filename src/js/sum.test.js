// Test file for sum.js, created as part of guide here: https://jestjs.io/docs/getting-started 
// Can be deleted once we have examples of aaa.js files and aaa.test.js files in our project.

const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});