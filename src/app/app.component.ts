import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title =''

  upper() {
    this.title = this.title.toLocaleUpperCase()
  }
}
