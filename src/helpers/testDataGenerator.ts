import { faker } from '@faker-js/faker';

/**
 * Test Data Generator - Provides realistic test data using Faker.js
 * Centralizes data generation logic for maintainable and consistent test data
 * Email addresses include 'test_' prefix for easy database identification
 */
export class TestDataGenerator {
  /**
   * Generate a random string with specified length and character set
   */
  static generateRandomString(
    length: number,
    chars: string = 'abcdefghijklmnopqrstuvwxyz'
  ): string {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generate a random email with specific prefix format
   * @param prefix - Email prefix (default: 'romiortega88')
   * @param suffixLength - Length of random suffix (default: 8)
   * @returns Email in format: prefix+test_randomSuffix@gmail.com
   */
  static generateTestEmail(prefix: string = 'romiortega88', suffixLength: number = 8): string {
    const randomSuffix = this.generateRandomString(suffixLength);
    return `${prefix}+test_${randomSuffix}@gmail.com`;
  }

  /**
   * Generate a realistic random name using Faker
   * @param length - If specified, generates a random string of this length instead of realistic name
   */
  static generateRandomName(length?: number): string {
    if (length) {
      return this.generateRandomString(length);
    }
    return faker.person.fullName();
  }

  /**
   * Generate a random first name using Faker
   */
  static generateRandomFirstName(): string {
    return faker.person.firstName();
  }

  /**
   * Generate a random last name using Faker
   */
  static generateRandomLastName(): string {
    return faker.person.lastName();
  }

  /**
   * Generate a realistic email address using Faker
   * @param domain - Email domain (default: 'gmail.com')
   */
  static generateRealisticEmail(domain: string = 'gmail.com'): string {
    const username = faker.internet.username().toLowerCase();
    return `test_${username}@${domain}`;
  }

  /**
   * Generate a strong password
   * @param length - Password length (default: 8)
   * @param includeSymbols - Include special characters (default: false)
   */
  static generatePassword(length: number = 8, includeSymbols: boolean = false): string {
    return faker.internet.password({
      length,
      memorable: false,
      pattern: includeSymbols ? /[A-Za-z0-9!@#$%^&*]/ : /[A-Za-z0-9]/,
    });
  }

  /**
   * Generate a complete test user with realistic data
   * @param useRealisticEmail - Use Faker email or test email format (default: false)
   */
  static generateTestUser(useRealisticEmail: boolean = false) {
    return {
      name: this.generateRandomName(),
      email: useRealisticEmail ? this.generateRealisticEmail() : this.generateTestEmail(),
      password: '1234567', // Standard test password
    };
  }

  /**
   * Generate test user for registration with specific format
   * Uses the romiortega88+random@gmail.com format for email consistency
   */
  static generateRegistrationTestUser() {
    return {
      name: this.generateRandomName(10), // 10 character name as specified
      email: this.generateTestEmail('romiortega88', 8), // 8 character suffix
      password: '1234567',
    };
  }

  /**
   * Generate test user with existing email (for negative testing)
   */
  static generateExistingEmailTestUser() {
    return {
      name: faker.person.fullName(),
      email: 'fedegastos@gmail.com', // Known existing email from testConfig
      password: faker.internet.password({ length: 8 }),
    };
  }

  /**
   * Generate a clean test user name without faker (for specific length requirements)
   * @param length - Length of the random name part (default: 10)
   */
  static generateTestUserName(length: number = 10): string {
    const randomName = this.generateRandomString(length);
    return randomName;
  }

  /**
   * Utility method to add test prefix to any string
   * @param value - The value to prefix
   */
  static addTestPrefix(value: string): string {
    return `test_${value}`;
  }
}
