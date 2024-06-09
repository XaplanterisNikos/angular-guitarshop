import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupName,
  Validators,
} from '@angular/forms';
import { GuitarFormService } from '../../services/guitar-form.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';
import { GuitarShopValidators } from '../../validators/guitar-shop-validators';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import { Router } from '@angular/router';
import { Order } from '../../common/order';
import { OrderItem } from '../../common/order-item';
import { CartItem } from '../../common/cart-item';
import { Purchase } from '../../common/purchase';

/**
 * Component responsible for managing the checkout process.
 */
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  /**
   * The form group for the checkout form.
   * @type {FormGroup}
   */
  checkoutFormGroup!: FormGroup;

  /**
   * The total price of items in the cart.
   * @type {number}
   */
  totalPrice: number = 0;

  /**
   * The total quantity of items in the cart.
   * @type {number}
   */
  totalQuantity: number = 0;

  /**
   * Array of credit card years.
   * @type {number[]}
   */
  creditCardYears: number[] = [];

  /**
   * Array of credit card months.
   * @type {number[]}
   */
  creditCardMonths: number[] = [];

  /**
   * Array of countries.
   * @type {Country[]}
   */
  countries: Country[] = [];

  /**
   * Array of states for shipping address.
   * @type {State[]}
   */
  shippingAddressStates: State[] = [];

  /**
   * Array of states for billing address.
   * @type {State[]}
   */
  billingaddressStates: State[] = [];

  /**
   * Creates an instance of CheckoutComponent.
   * @param {FormBuilder} formBuilder - The FormBuilder service for creating reactive forms.
   * @param {Luv2ShopFormService} luv2ShopFormService - The service for managing form operations.
   * @param {CartService} cartService - The service for managing cart operations.
   * @param {CheckoutService} checkoutService - The service for handling checkout operations.
   * @param {Router} router - The Angular router service for navigation.
   */
  constructor(
    private formBuilder: FormBuilder,
    private GuitarShopFormService: GuitarFormService,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  // Methods, getters, and event handlers
  ngOnInit(): void {
    this.reviewCartDetails();

    // Initialize the form group - Validators
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          GuitarShopValidators.notOnlyWhitespace,
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          GuitarShopValidators.notOnlyWhitespace,
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
          ),
        ]),
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          GuitarShopValidators.notOnlyWhitespace,
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          GuitarShopValidators.notOnlyWhitespace,
        ]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          GuitarShopValidators.notOnlyWhitespace,
        ]),
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          GuitarShopValidators.notOnlyWhitespace,
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          GuitarShopValidators.notOnlyWhitespace,
        ]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          GuitarShopValidators.notOnlyWhitespace,
        ]),
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          GuitarShopValidators.notOnlyWhitespace,
        ]),
        cardNumber: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{16}'),
        ]),
        securityCode: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{3}'),
        ]),
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });

    // credit card months
    const startMonth: number = new Date().getMonth() + 1;
    console.log('startMonth:' + startMonth);

    this.GuitarShopFormService
      .getCreditCardMonths(startMonth)
      .subscribe((data) => {
        console.log('Credit card months: ' + JSON.stringify(data));
        this.creditCardMonths = data;
      });

    // credit card years
    this.GuitarShopFormService.getCreditCardYears().subscribe((data) => {
      console.log('Credit card years: ' + JSON.stringify(data));
      this.creditCardYears = data;
    });

    // countries
    this.GuitarShopFormService.getCountries().subscribe((data) => {
      console.log('Countries: ' + JSON.stringify(data));
      this.countries = data;
    });
  }

  onSubmit() {
    console.log('Submit button');
    console.log(this.checkoutFormGroup.get('customer')!.value);

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    // set up order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart items
    const cartItems = this.cartService.cartItems;

    // create orderItems from cartItems
    let orderItems: OrderItem[] = [];
    for (let i = 0; i < cartItems.length; i++) {
      orderItems[i] = new OrderItem(cartItems[i]);
    }

    // set up purchase
    let purchase = new Purchase();

    // populate purchase - customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    // populate purchase - shipping address
    purchase.shippingAddress =
      this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(
      JSON.stringify(purchase.shippingAddress.state)
    );
    const shippingCountry: Country = JSON.parse(
      JSON.stringify(purchase.shippingAddress.country)
    );
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;

    // populate purchase - billing address
    purchase.billingAddress =
      this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState: State = JSON.parse(
      JSON.stringify(purchase.billingAddress.state)
    );
    const billingCountry: Country = JSON.parse(
      JSON.stringify(purchase.billingAddress.country)
    );
    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingCountry.name;

    // populate purchase - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;

    // call REST API via the CheckoutService
    this.checkoutService.placeOrder(purchase).subscribe({
      next: (responce) => {
        alert(
          `Your order has been received.\nOrder tracking number: ${responce.orderTrackingNumber}`
        );

        // reset cart
        this.resetCart();
      },
      error: (err) => {
        alert(`There was an error : ${err.message}`);
      },
    });
  }

  // Reset cart/form - navigate to the products page
  resetCart() {
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    this.checkoutFormGroup.reset();

    this.router.navigateByUrl('/products');
  }

  // Review Your Order Details
  reviewCartDetails() {
    // totalQuantity
    this.cartService.totalQuantity.subscribe(
      (totalQuantity) => (this.totalQuantity = totalQuantity)
    );
    // totalPrice
    this.cartService.totalPrice.subscribe(
      (totalPrice) => (this.totalPrice = totalPrice)
    );
  }

  // Getters for form controls
  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }
  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }
  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }

  get shippingAddressStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }
  get shippingAddressCity() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }
  get shippingAddressState() {
    return this.checkoutFormGroup.get('shippingAddress.state');
  }
  get shippingAddressZipCode() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }
  get shippingAddressCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }

  get billingAddressStreet() {
    return this.checkoutFormGroup.get('billingAddress.street');
  }
  get billingAddressCity() {
    return this.checkoutFormGroup.get('billingAddress.city');
  }
  get billingAddressState() {
    return this.checkoutFormGroup.get('billingAddress.state');
  }
  get billingAddressZipCode() {
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }
  get billingAddressCountry() {
    return this.checkoutFormGroup.get('billingAddress.country');
  }

  get creditCardType() {
    return this.checkoutFormGroup.get('creditCard.cardType');
  }
  get creditCardNameOnCard() {
    return this.checkoutFormGroup.get('creditCard.nameOnCard');
  }
  get creditCardNumber() {
    return this.checkoutFormGroup.get('creditCard.cardNumber');
  }
  get creditCardSecurityCode() {
    return this.checkoutFormGroup.get('creditCard.securityCode');
  }

  // Copy shipping address to billing address
  copyShippingAddressToBillingAddress(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      const shippingAddress = this.checkoutFormGroup.get('shippingAddress');
      const billingAddress = this.checkoutFormGroup.get('billingAddress');
      if (shippingAddress && billingAddress) {
        billingAddress.setValue(shippingAddress.value);
      }
      this.billingaddressStates = this.shippingAddressStates;
    } else {
      // clear the billing address if the checkbox is unchecked
      const billingAddress = this.checkoutFormGroup.get('billingAddress');
      if (billingAddress) {
        billingAddress.reset();
      }

      this.billingaddressStates = [];
    }
  }

  // Handle credit card months and years
  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creitCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(
      creditCardFormGroup?.value.expirationYear
    );

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.GuitarShopFormService
      .getCreditCardMonths(startMonth)
      .subscribe((data) => {
        console.log('Card Month: ' + JSON.stringify(data));
        this.creditCardMonths = data;
      });
  }

  // Get states based on country selection
  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    if (formGroup !== null) {
      const countryCode = formGroup.value.country.code;
      const countryName = formGroup.value.country.name;

      console.log(`${formGroupName} country code: ${countryCode}`);
      console.log(`${formGroupName} country name: ${countryName}`);

      this.GuitarShopFormService.getStates(countryCode).subscribe((data) => {
        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        } else {
          this.billingaddressStates = data;
        }

        formGroup.get('state')!.setValue(data[0]);
      });
    }
  }
}
