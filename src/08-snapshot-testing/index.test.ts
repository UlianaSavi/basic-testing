import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const objFromList = {
    value: {
      a: 1,
    },
    next: {
      value: null,
      next: null,
    },
  };

  test('should generate linked list from values 1', () => {
    const list = generateLinkedList([{ a: 1 }]);
    expect(list).toStrictEqual(objFromList);
  });

  test('should generate linked list from values 2', () => {
    const objFromList = {
      value: {
        a: 1,
      },
      next: {
        value: {
          a: 2,
        },
        next: {
          value: null,
          next: null,
        },
      },
    };

    const list = generateLinkedList([{ a: 1 }, { a: 2 }]);
    expect(list).toMatchSnapshot(objFromList);
  });
});
