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
  const bankAccount = getBankAccount(balanse);
  const testAccount = getBankAccount(money);

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
    bankAccount.deposit(money);
    expect(bankAccount.getBalance()).toBe(balanse + money);
  });

  test('should withdraw money', () => {
    testAccount.withdraw(money);
    expect(testAccount.getBalance()).toBe(money - money);
  });

  test('should transfer money', () => {
    const accToTrans = getBankAccount(money);
    bankAccount.transfer(money, accToTrans);
    expect(accToTrans.getBalance()).toBe(money + money);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const moneyForDepos = await bankAccount.fetchBalance();
    if (moneyForDepos) {
      expect(moneyForDepos).toBe(moneyForDepos);
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const accToDepos = getBankAccount(money);
    const moneyForDepos = await accToDepos.fetchBalance();
    if (moneyForDepos) {
      accToDepos.deposit(moneyForDepos);
      expect(accToDepos.getBalance()).toBe(money + moneyForDepos);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const moneyForDepos = await bankAccount.fetchBalance();
    if (!moneyForDepos) {
      expect(async () => {
        await bankAccount.synchronizeBalance();
      }).rejects.toThrow(new SynchronizationFailedError());
    }
  });
});
