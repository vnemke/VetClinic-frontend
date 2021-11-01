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

  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
  constructor(private api: ApiService, private route: ActivatedRoute, 
    public router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.case = this.route.snapshot.data.case;
    console.log(this.case);
    
  }

  onPDF() {
    var msg = 'receipt sent'
    this.api.post("/api/pdfservice/"+ this.case.id, msg)
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

  onEdit() {
    this.router.navigate(['/app/cases/edit', this.case.id])
  }

  onCancel() {
    this.router.navigate(['/app/cases'])
  }

}
