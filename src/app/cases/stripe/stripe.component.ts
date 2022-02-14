import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { StripeService, StripePaymentElementComponent } from 'ngx-stripe';
import {
  StripeElementsOptions
} from '@stripe/stripe-js';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.scss']
})
export class StripeComponent implements OnInit {
  @Input() paymentCase;
  @ViewChild(StripePaymentElementComponent) paymentElement: StripePaymentElementComponent;
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  constructor(private stripeService: StripeService, private _snackBar: MatSnackBar) { }

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
        this._snackBar.open('Something is wrong','OK', {
          duration: 5000,
          verticalPosition: this.verticalPosition
        });
      } else {
        // The payment has been processed!
        if (result.paymentIntent!.status === 'succeeded') {
          // Show a success message to your customer
          this._snackBar.open('Successful payment', 'OK', {
            duration: 5000,
            verticalPosition: this.verticalPosition
          });
        }
      }
    });
  }
}


























