import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

const value = 'value';
const errMessage = 'Some error!';
const errCustom = new MyAwesomeError();

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    await expect(resolveValue(value)).resolves.toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => {
      throwError(errMessage);
    }).toThrow(new Error(errMessage));
  });

  test('should throw error with default message if message is not provided', () => {
    expect(throwError).toThrow(new Error('Oops!'));
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrow(errCustom);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError).rejects.toThrow(errCustom);
  });
});
