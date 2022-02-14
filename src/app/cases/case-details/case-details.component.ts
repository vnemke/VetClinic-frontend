import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@vetclinic-app/core/services/api.service';
import { Case } from '../case';

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.scss']
})
export class CaseDetailsComponent implements OnInit {
  case: Case;
  payment: any;
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  isPaid: string = 'No';
  toggle: boolean = false;
  price: any;
  constructor(private api: ApiService, private route: ActivatedRoute,
    public router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.case = this.route.snapshot.data.case;
    this.payment = this.route.snapshot.data.payment;
    // console.log(this.route.snapshot.data);
    
    // console.log(this.case);
    if (this.case.isPaid) {
      this.isPaid = 'Yes'
    }

    var sum = 0;
    this.case.casePetServices.forEach((p: any) => {
      sum += p.petService.price;
      this.price = sum;
    });
    // console.log('parent',this.price);

  }

  onPDF() {
    var msg = 'receipt sent'
    this.api.post("/api/pdfservice/" + this.case.id, msg)
      .subscribe(
        () => {
          console.log(msg);
          this._snackBar.open('Receipt sent', 'OK', {
            duration: 5000,
            verticalPosition: this.verticalPosition
          });
        }
      )
  }

  onShow() {
    this.toggle = !this.toggle;
  }

  onEdit() {
    this.router.navigate(['/app/cases/edit', this.case.id]);
  }

  onCancel() {
    this.router.navigate(['/app/cases']);
  }

}
