import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Case } from '../case';

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.scss']
})
export class CaseDetailsComponent implements OnInit {

  case: Case;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.case = this.route.snapshot.data.case;
    console.log(this.case);
  }

}
