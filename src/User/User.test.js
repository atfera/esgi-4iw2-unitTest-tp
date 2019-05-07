import { User } from './User';

const userValid = new User(15, 'test@test.test', 'test', 'test');
const userNotValid = new User(15, 'test', 'test', 'test');

describe('Test isValid', () => {
  test('Check if user is valid', () => {
    expect(userValid.isValid()).toBeTruthy();
  });
  test('Check if user is not valid', () => {
    expect(userNotValid.isValid()).toBeFalsy();
  });
});
