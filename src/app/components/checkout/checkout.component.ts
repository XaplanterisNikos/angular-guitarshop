import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;

  totalPrice: number =0;
  totalQuantity: number=0;


  constructor(private formBuilder: FormBuilder) {}

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
  
}
