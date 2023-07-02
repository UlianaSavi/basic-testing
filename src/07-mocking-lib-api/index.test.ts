import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const relativePath = 'this/is/path';
const response = {
  this: 'is',
  data: [],
};

let axiosMock = jest
  .spyOn(axios.Axios.prototype, 'get')
  .mockImplementation(async () => ({ data: response }));

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    axiosMock = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(async () => ({ data: response }));

    jest.useFakeTimers();
  });

  afterAll(() => {
    axiosMock.mockRestore();

    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const createSpy = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi('some-path');

    jest.runAllTimers();

    const mockUrl = createSpy.mock.calls.at(0)?.at(0)?.baseURL;
    const { baseURL } = createSpy.mock.results.at(0)?.value.defaults;

    expect(mockUrl).toBe(baseURL);
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(relativePath);

    jest.runAllTimers();

    const mockPath = axiosMock.mock.calls.at(0)?.at(0);

    expect(mockPath).toBe(relativePath);
  });

  test('should return response data', async () => {
    const dataFromApi = await throttledGetDataFromApi(relativePath);

    jest.runAllTimers();

    expect(dataFromApi).toBe(response);
  });
});
