import { simpleCalculator, Action } from './index';

const inputAdd = { a: 4, b: 2, action: Action.Add };
const inputSubstract = { a: 4, b: 2, action: Action.Subtract };
const inputMultiply = { a: 4, b: 2, action: Action.Multiply };
const inputDivide = { a: 4, b: 2, action: Action.Divide };
const inputExpon = { a: 4, b: 2, action: Action.Exponentiate };
const invalidAction = { a: 4, b: 2, action: 'asd' };
const invalidArgs = { a: '!', b: null, action: Action.Divide };

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator(inputAdd)).toBe(6);
  });

  test('should substract two numbers', () => {
    expect(simpleCalculator(inputSubstract)).toBe(2);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator(inputMultiply)).toBe(8);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator(inputDivide)).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator(inputExpon)).toBe(16);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator(invalidAction)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator(invalidArgs)).toBeNull();
  });
});
