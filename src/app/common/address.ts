/**
 * Represents an address with details such as street, city, state, country, and zip code.
 */
export class Address {
  /**
   * The street name of the address.
   */
  street!: string;

  /**
   * The city of the address.
   */
  city!: string;

  /**
   * The state or province of the address.
   */
  state!: string;

  /**
   * The country of the address.
   */
  country!: string;

  /**
   * The ZIP or postal code of the address.
   */
  zipCode!: string;
}
