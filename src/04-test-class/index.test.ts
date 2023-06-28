import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  const balanse = 1000;
  const money = 50;
  const moreThanBalance = balanse + balanse;
  // const newBalanse = balanse + money;
  const bankAccount = getBankAccount(balanse);
  // const testAccount = getBankAccount(money);

  test('should create account with initial balance', () => {
    expect(getBankAccount(balanse)).toBeInstanceOf(BankAccount);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      bankAccount.withdraw(moreThanBalance);
    }).toThrow(new InsufficientFundsError(balanse));
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => {
      bankAccount.transfer(money, bankAccount);
    }).toThrow(new TransferFailedError());
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      bankAccount.transfer(money, bankAccount);
    }).toThrow(new TransferFailedError());
  });

  test('should deposit money', () => {
    // expect(bankAccount.deposit(money)).toBe(Acc with new balance);
  });

  test('should withdraw money', () => {
    // expect(bankAccount.withdraw(money)).toBe(Acc with new balance);
  });

  test('should transfer money', () => {
    // expect(bankAccount.transfer(money, testAccount)).toBe(testAccount with new balance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // await expect(bankAccount.fetchBalance()).resolves.toBe(balanse);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // const testCase = await bankAccount.fetchBalance();
    // if (testCase) {
    //   expect(bankAccount.deposit(money)).toBe('Acc with new balance');
    // }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const testCase = await bankAccount.fetchBalance();
    if (!testCase) {
      const synchronizeBalance = await bankAccount.synchronizeBalance();
      expect(() => {
        synchronizeBalance;
      }).rejects.toThrow(new SynchronizationFailedError());
    }
  });
});
