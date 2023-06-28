import { doStuffByTimeout, doStuffByInterval } from '.';

const callback = jest.fn(() => console.log('Text after timeout'));
const callbackEmpty = jest.fn();
const numForTimer = 100;

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
    // Write your test here
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
  });

  test('should return file content if file exists', async () => {
    // Write your test here
  });
});
