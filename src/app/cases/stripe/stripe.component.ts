import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { StripeService, StripeCardComponent, StripePaymentElementComponent } from 'ngx-stripe';
import {
  StripeElementsOptions
} from '@stripe/stripe-js';



@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.scss']
})
export class StripeComponent implements OnInit {
  @Input() paymentCase;
  @ViewChild(StripePaymentElementComponent) paymentElement: StripePaymentElementComponent;


  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  constructor(private stripeService: StripeService,
    ) { }

  ngOnInit(): void {

    console.log(this.paymentCase);

    this.elementsOptions.clientSecret = this.paymentCase.clientSecret;
  }

  pay(): void {
    this.stripeService.confirmPayment({
      elements: this.paymentElement.elements,
      redirect: 'if_required'
    }).subscribe(result => {
      console.log('Result', result);
      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        alert({ success: false, error: result.error.message });
      } else {
        // The payment has been processed!
        if (result.paymentIntent!.status === 'succeeded') {
          // Show a success message to your customer
          alert({ success: true });
        }
      }
    });
  }
}


























