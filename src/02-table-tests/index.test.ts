import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 4, b: 2, action: Action.Multiply, expected: 8 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
  { a: 4, b: 2, action: 'asd', expected: null },
  { a: '!', b: null, action: Action.Divide, expected: null },
];

describe('simpleCalculator', () => {
  it.each(testCases)('simpleCalculator($data) -> $expected', (input) => {
    const data = { a: input.a, b: input.b, action: input.action };
    expect(simpleCalculator(data)).toBe(input.expected);
  });
});
