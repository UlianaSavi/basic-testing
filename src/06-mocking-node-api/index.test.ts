import path from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

const callback = jest.fn(() => console.log('Text after timeout'));
const callbackEmpty = jest.fn();
const numForTimer = 100;
const pathToFile = '/src/01-simple-tests/index.ts';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, numForTimer);
    expect(setTimeout).toBeCalledWith(callback, numForTimer);
  });

  test('should call callback only after timeout', () => {
    expect(callback).not.toBeCalled();
    doStuffByTimeout(callback, numForTimer);
    jest.runAllTimers();
    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, numForTimer);
    expect(setInterval).toBeCalledWith(callback, numForTimer);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callbackEmpty, numForTimer);

    expect(callbackEmpty).not.toBeCalled();

    jest.runOnlyPendingTimers();

    expect(callbackEmpty).toBeCalledTimes(1);

    jest.runOnlyPendingTimers();

    expect(callbackEmpty).toBeCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const join = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(join).toBeCalled();
  });

  test('should return null if file does not exist', async () => {
    const testCase = await readFileAsynchronously(pathToFile);
    if (!testCase) {
      expect(testCase).toBeNull();
    }
  });

  test('should return file content if file exists', async () => {
    const testCase = await readFileAsynchronously(pathToFile);
    if (testCase) {
      await expect(readFileAsynchronously(pathToFile)).resolves.toBe(testCase);
    }
  });
});
