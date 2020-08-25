import { uuid } from 'uuidv4';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income: number = this.transactions
      .filter(transaction => transaction.type === 'income')
      .map(transaction => transaction.value)
      .reduce((previous, current) => previous + current, 0);

    const outcome: number = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(transaction => transaction.value)
      .reduce((previous, current) => previous + current, 0);

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = {
      id: uuid(),
      title,
      value,
      type,
    };

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
