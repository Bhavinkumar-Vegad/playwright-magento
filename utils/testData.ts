import { faker } from '@faker-js/faker';

export function generateUserData() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  // Use mailinator for disposable email testing
  const email = `${firstName.toLowerCase()}${lastName.toLowerCase()}${faker.number.int({ min: 10000, max: 99999 })}@mailinator.com`;
  const password = 'Password123!'; // You can randomize this if needed
  return { firstName, lastName, email, password };
}
