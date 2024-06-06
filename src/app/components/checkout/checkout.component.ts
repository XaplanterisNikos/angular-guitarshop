import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { Luv2ShopFormService } from '../../services/luv2-shop-form.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';
import { Luv2ShopValidators } from '../../validators/luv2-shop-validators';
import { CartService } from '../../services/cart.service';

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
  totalPrice: number =0;

  /**
   * The total quantity of items in the cart.
   * @type {number}
   */
  totalQuantity: number=0;

  /**
   * Array of credit card years.
   * @type {number[]}
   */
  creditCardYears: number[] = [];

  /**
   * Array of credit card months.
   * @type {number[]}
   */
  creditCardMonths: number[] =[];

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
  billingaddressStates: State[] =[];

  /**
 * Creates an instance of CheckoutComponent.
 * @param {FormBuilder} formBuilder - The form builder service.
 * @param {Luv2ShopFormService} luv2ShopFormService - The service for managing form operations.
 * @param {CartService} cartService - The service for managing cart operations.
 */
  constructor(private formBuilder: FormBuilder,
                    private luv2ShopFormService: Luv2ShopFormService, 
                    private cartService:CartService) {}


  // Methods, getters, and event handlers
  ngOnInit(): void {
    this.reviewCartDetails();

     // Initialize the form group - Validators
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',[Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace]),
        lastName: new FormControl('',[Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace]),
        email: new FormControl('',
          [Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]
        ),
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('',[Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace]),
        city: new FormControl('',[Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace]),
        state: new FormControl('',[Validators.required]),
        country: new FormControl('',[Validators.required]),
        zipCode: new FormControl('',[Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('',[Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace]),
        city: new FormControl('',[Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace]),
        state: new FormControl('',[Validators.required]),
        country: new FormControl('',[Validators.required]),
        zipCode: new FormControl('',[Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('',[Validators.required]),
        nameOnCard: new FormControl('',[Validators.required,Validators.minLength(2),Luv2ShopValidators.notOnlyWhitespace]),
        cardNumber: new FormControl('',[Validators.required ,Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('',[Validators.required ,Validators.pattern('[0-9]{3}')]),
        expirationMonth: [''],
        expirationYear:['']
      }),
    });

      // credit card months
      const startMonth: number = new Date().getMonth() +1;
      console.log("startMonth:" + startMonth);

      this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
        data => {
          console.log("Credit card months: "+ JSON.stringify(data));
          this.creditCardMonths = data;
        }
      );

      // credit card years
      this.luv2ShopFormService.getCreditCardYears().subscribe(
        data => {
          console.log("Credit card years: "+ JSON.stringify(data));
          this.creditCardYears = data;
        }
      );

      // countries
      this.luv2ShopFormService.getCountries().subscribe(
        data =>{
            console.log("Countries: "+ JSON.stringify(data));
            this.countries = data;
        }
      );
  }

  onSubmit() {
    console.log('Submit button');
    console.log(this.checkoutFormGroup.get('customer')!.value);

    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
    }
  }

  // Review Your Order Details
  reviewCartDetails(){

      // totalQuantity
      this.cartService.totalQuantity.subscribe(
        totalQuantity => this.totalQuantity = totalQuantity
      );
      // totalPrice
      this.cartService.totalPrice.subscribe(
        totalPrice => this.totalPrice = totalPrice
      );
  }

// Getters for form controls
  get firstName(){return this.checkoutFormGroup.get('customer.firstName');}
  get lastName(){return this.checkoutFormGroup.get('customer.lastName');}
  get email(){return this.checkoutFormGroup.get('customer.email');}

  get shippingAddressStreet(){return this.checkoutFormGroup.get('shippingAddress.street');}
  get shippingAddressCity(){return this.checkoutFormGroup.get('shippingAddress.city');}
  get shippingAddressState(){return this.checkoutFormGroup.get('shippingAddress.state');}
  get shippingAddressZipCode(){return this.checkoutFormGroup.get('shippingAddress.zipCode');}
  get shippingAddressCountry(){return this.checkoutFormGroup.get('shippingAddress.country');}

  get billingAddressStreet(){return this.checkoutFormGroup.get('billingAddress.street');}
  get billingAddressCity(){return this.checkoutFormGroup.get('billingAddress.city');}
  get billingAddressState(){return this.checkoutFormGroup.get('billingAddress.state');}
  get billingAddressZipCode(){return this.checkoutFormGroup.get('billingAddress.zipCode');}
  get billingAddressCountry(){return this.checkoutFormGroup.get('billingAddress.country');}

  get creditCardType(){return this.checkoutFormGroup.get('creditCard.cardType');}
  get creditCardNameOnCard(){return this.checkoutFormGroup.get('creditCard.nameOnCard');}
  get creditCardNumber(){return this.checkoutFormGroup.get('creditCard.cardNumber');}
  get creditCardSecurityCode(){return this.checkoutFormGroup.get('creditCard.securityCode');}


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
  handleMonthsAndYears(){
    const creditCardFormGroup = this.checkoutFormGroup.get('creitCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear:number = Number(creditCardFormGroup?.value.expirationYear);

    let startMonth: number;

    if(currentYear === selectedYear){
      startMonth = new Date().getMonth() +1;
    }
    else { 
      startMonth =1;
    }

    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Card Month: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )

  }

  // Get states based on country selection
  getStates(formGroupName: string){
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    if(formGroup !== null){

    
    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.luv2ShopFormService.getStates(countryCode).subscribe(
      data => {
        if(formGroupName === 'shippingAddress'){
            this.shippingAddressStates = data;
        }else{
          this.billingaddressStates = data;
        }

        formGroup.get('state')!.setValue(data[0]);
      }
    );
  }
  }
  
}
