import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Luv2ShopFormService } from '../../services/luv2-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;

  totalPrice: number =0;
  totalQuantity: number=0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] =[];

  constructor(private formBuilder: FormBuilder,
                    private luv2ShopFormService: Luv2ShopFormService ) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstname: [''],
        lastname: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
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
      )

      // credit card years
      this.luv2ShopFormService.getCreditCardYears().subscribe(
        data => {
          console.log("Credit card years: "+ JSON.stringify(data));
          this.creditCardYears = data;
        }
      )
  }

  onSubmit() {
    console.log('Submit button');
    console.log(this.checkoutFormGroup.get('customer')!.value);
  }

  copyShippingAddressToBillingAddress(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      const shippingAddress = this.checkoutFormGroup.get('shippingAddress');
      const billingAddress = this.checkoutFormGroup.get('billingAddress');
      if (shippingAddress && billingAddress) {
        billingAddress.setValue(shippingAddress.value);
      }
    } else {
      // You might want to clear the billing address if the checkbox is unchecked
      const billingAddress = this.checkoutFormGroup.get('billingAddress');
      if (billingAddress) {
        billingAddress.reset();
      }
    }
  }

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
  
}
