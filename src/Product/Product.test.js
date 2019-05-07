import { Product } from './Product';
import { User } from '../User/User';

const userValid = new User(15, 'test@test.test', 'test', 'test');
const userNotValid = new User(15, 'test', 'test', 'test');

const productValid = new Product('test', userValid);
const productNotValid = new Product('test', userNotValid);

describe('Test Product is valid', () => {
  test('Check if product is valid', () => {
    expect(productValid.isValid()).toBeTruthy();
  });
  test('Check if product is not valid', () => {
    expect(productNotValid.isValid()).toBeFalsy();
  });
});
