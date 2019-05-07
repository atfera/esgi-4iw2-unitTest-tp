import { Exchange } from './Exchange';
import { Product } from '../Product';
import { User } from '../User';
import { DBConnection } from '../DBConnection';
import { EmailSender } from '../EmailSender';


jest.mock('../Product');
jest.mock('../User');
jest.mock('../DBConnection');
jest.mock('../EmailSender');

describe('Exchange unit testing', () => {

  const mockSaveExchange = jest.fn();
  const mockSendEmail = jest.fn();

  // Mock implementations for DBConnection.saveExchange and EmailSender.sendEmail
  beforeAll(() => {
    DBConnection.mockImplementation(() => ({
      saveExchange: mockSaveExchange,
    }));
    EmailSender.mockImplementation(() => ({
      sendEmail: mockSendEmail,
    }));
  })

  // Resets all mock information before each test
  beforeEach(() => {
    Product.mockClear();
    User.mockClear();
    EmailSender.mockClear();
    DBConnection.mockClear();
    mockSaveExchange.mockClear();
    mockSendEmail.mockClear();
  })

  test('Exchange is valid and saveExchange and sendEmail have been called', async () => {
    User.mockImplementation(() => ({
      age: 14,
      isValid: () => true,
    }));
    Product.mockImplementation(() => ({
      isValid: () => true,
    }));

    const product = new Product();
    const receiver = new User();
    const owner = new User();

    const dateStart = new Date('05-01-2019');
    const dateEnd = new Date('05-10-2019');

    const exchange = new Exchange(receiver, product, owner, dateStart, dateEnd);

    const result = await exchange.save();

    expect(result).toBeTruthy();
    expect(mockSaveExchange).toHaveBeenCalledTimes(1);
    expect(mockSendEmail).toHaveBeenCalledTimes(1);
  });

  test('Send email is not called if receiver age >= 18 ', async () => {
    User.mockImplementation(() => ({
      age: 18,
      isValid: () => true,
    }));
    Product.mockImplementation(() => ({
      isValid: () => true,
    }));

    const product = new Product();
    const receiver = new User();
    const owner = new User();

    const dateStart = new Date('05-01-2019');
    const dateEnd = new Date('05-10-2019');

    const exchange = new Exchange(receiver, product, owner, dateStart, dateEnd);

    const result = await exchange.save();

    expect(result).toBeTruthy();
    expect(mockSaveExchange).toHaveBeenCalledTimes(1);
    expect(mockSendEmail).toHaveBeenCalledTimes(0);
  });

  test('Save exchange should throw if dates are invalid', () => {
    User.mockImplementation(() => ({
      age: 14,
      isValid: () => true
    }));
    Product.mockImplementation(() => ({
      isValid: () => true
    }));

    const product = new Product();
    const receiver = new User();
    const owner = new User();

    const dateStart = new Date("05-01-2019");
    const dateEndInvalid = new Date("04-01-2019");

    const exchange = new Exchange(
      receiver,
      product,
      owner,
      dateStart,
      dateEndInvalid
    );

    expect(() => exchange.save()).toThrow();

    expect(mockSaveExchange).toHaveBeenCalledTimes(0);
    expect(mockSendEmail).toHaveBeenCalledTimes(0);
  });

  test('Save exchange should throw if product is invalid', () => {
    User.mockImplementation(() => ({
      age: 14,
      isValid: () => true
    }));
    Product.mockImplementation(() => ({
      isValid: () => false
    }));

    const productInvalid = new Product();
    const receiver = new User();
    const owner = new User();

    const dateStart = new Date("05-01-2019");
    const dateEndInvalid = new Date("05-10-2019");

    const exchange = new Exchange(
      receiver,
      productInvalid,
      owner,
      dateStart,
      dateEndInvalid
    );

    expect(() => exchange.save()).toThrow();

    expect(mockSaveExchange).toHaveBeenCalledTimes(0);
    expect(mockSendEmail).toHaveBeenCalledTimes(0);
  });

  test('Save exchange should throw if owner or receiver is invalid', () => {
    User.mockImplementation(() => ({
      age: 14,
      isValid: () => false
    }));
    Product.mockImplementation(() => ({
      isValid: () => false
    }));

    const product = new Product();
    const receiverInvalid = new User();
    const ownerInvalid = new User();

    const dateStart = new Date("05-01-2019");
    const dateEndInvalid = new Date("05-10-2019");

    const exchange = new Exchange(
      receiverInvalid,
      product,
      ownerInvalid,
      dateStart,
      dateEndInvalid
    );

    expect(() => exchange.save()).toThrow();

    expect(mockSaveExchange).toHaveBeenCalledTimes(0);
    expect(mockSendEmail).toHaveBeenCalledTimes(0);
  });
})